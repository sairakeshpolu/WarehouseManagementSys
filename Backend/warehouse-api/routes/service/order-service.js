const Items = require("../models/inventoryItems");
const Orders = require("../models/orders");
const OrderItems = require("../models/orderItems");
const User = require("../models/user");

class OrderService {
    
    mapOrderToResponse(orderItems, item) {
        return {
            item_name: item.item_name,
            category: item.category,
            price: orderItems.price,
            quantity: orderItems.quantity,
        };
    }

    async getOrderNumber() {
        const result = await Orders.find().sort("-orderNumber").limit(1);
        if (result[0] != null && result[0] != undefined && result[0].orderNumber != undefined) {
            return result[0].orderNumber + 1;
        } else {
            return 1;
        }
    }

    async getOrderItems(orderId){
        const orderDetails = await Orders.findById(orderId);
        const data = await OrderItems.find({ orderId: orderDetails });
        const result = [];
        for (let i = 0; i < data.length; i++) {
            const item = await Items.findById(data[i].item_name);
            result.push(this.mapOrderToResponse(data[i], item));
        }
        return result;
    }

    async saveOrder(reqData, loggedInUser) {
        if (reqData.orderType == 'PO')
            return await this.savePurchaseOrder(reqData, loggedInUser);
        else
            return await this.saveSalesOrder(reqData, loggedInUser);
    }

    async savePurchaseOrder(reqData, loggedInUser) {
        const user = await User.findOne({ username: loggedInUser });
        var orderNumber = await this.getOrderNumber();
        const orderResult = await this.saveOrderDetails(orderNumber, reqData.orderType, user, null);
        this.savePurchaseOrderItems(reqData, orderResult);
        return orderResult;
    }

    async saveSalesOrder(reqData, loggedInUser) {
        const user = await User.findOne({ username: loggedInUser });
        var orderNumber = await this.getOrderNumber();
        const orderResult = await this.saveOrderDetails(orderNumber, reqData.orderType, user, reqData.customer);
        this.saveSalesOrderItems(reqData, orderResult);
        return orderResult;
    }

    async saveOrderDetails(orderNumber, type, loggedUser, customerDetails) {
        const orderData = new Orders({
            orderNumber: orderNumber,
            type: type,
            customer_name: customerDetails,
            created_by: loggedUser
        });
        return await orderData.save();
    }

    async savePurchaseOrderItems(param, orderResult) {
        for (const item of param.items) {
            let itemDetails = await Items.findOne({ item_name: item.item_name, category: item.category });
            if (itemDetails == null) {
                itemDetails = new Items({
                    item_name: item.item_name,
                    category: item.category,
                    quantity: 0,
                    price: 0,
                });
                itemDetails = await itemDetails.save();
            }
            const orderDetailsData = new OrderItems({
                orderId: orderResult,
                item_name: itemDetails,
                quantity: item.quantity,
                price: item.price,
            });
            await orderDetailsData.save();
            var price = ((item.quantity * item.price) + (itemDetails.quantity * itemDetails.price)) / (item.quantity + itemDetails.quantity);

            await Items.findOneAndUpdate(
                { _id: itemDetails._id },
                {
                    $set:
                    {
                        quantity: (item.quantity + itemDetails.quantity),
                        price: price
                    }
                }
            );
        }
    }

    async saveSalesOrderItems(param, orderResult) {
        for (const item of param.items) {
            let itemDetails = await Items.findOne({ item_name: item.item_name, category: item.category });
            const orderDetailsData = new OrderItems({
                orderId: orderResult,
                item_name: itemDetails,
                quantity: item.quantity,
                price: item.price,
            });
            await orderDetailsData.save();

            await Items.findOneAndUpdate(
                { _id: itemDetails._id },
                {
                    $set:
                    {
                        quantity: (itemDetails.quantity - item.quantity)
                    }
                }
            );
        }
    }
}
module.exports = OrderService;
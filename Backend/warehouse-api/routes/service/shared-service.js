const Orders = require("../models/orders");

class SharedService {
    async getOrderNumber() {
        const result = await Orders.find().sort("-orderNumber").limit(1);
        if (result[0] != null && result[0] !=undefined && result[0].orderNumber!=undefined) {
            return result[0].orderNumber + 1;
        } else {
            return 1;
		}
    }
}

module.exports = SharedService;

const express = require('express');
const Orders = require("../models/orders");
const router = express.Router();
const authenticateToken = require("../security/authorization_old.js");
const OrderService = require('../service/order-service');
const orderService = new OrderService();
const User = require("../models/user");

router.post('/', authenticateToken.authenticateToken, async (req, res) => {
    const param = req.body;
    const loggedInUser = req.user.username;
    const orderResult = await orderService.saveOrder(param, loggedInUser);    
    return res.json(orderResult);
});


router.get('/:orderId/items', authenticateToken.authenticateToken, async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const data = await orderService.getOrderItems(orderId);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error processing request at this time!" });
    }   
});

router.get('/', authenticateToken.authenticateToken, async (req, res) => {
    try {
        const loggedInUser = req.user.username;
        const user = await User.findOne({ username: loggedInUser });
        const data = await Orders.find({ created_by: user });
        return res.json(data);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
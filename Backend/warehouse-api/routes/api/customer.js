const express = require('express');
const router = express.Router();
const authenticateToken = require("../security/authorization_old.js");
const CustomerService = require('../service/customer-service');
const customerService = new CustomerService();

router.post('/', authenticateToken.authenticateToken, async (req, res) => {
    try {
        const data = await customerService.saveCustomerDetails(req.body);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error processing request at this time!" });
    }
});

router.get('/', authenticateToken.authenticateToken, async (req, res) => {
    try {
        const data = await customerService.getAllCustomerDetails();
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error processing request at this time!" });
    }
});

module.exports = router;
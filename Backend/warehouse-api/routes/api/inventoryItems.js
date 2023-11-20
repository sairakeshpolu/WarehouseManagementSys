const express = require('express');
const Items = require("../models/inventoryItems");
const router = express.Router();
const authenticateToken = require("../security/authorization_old.js");

//only for internal creation of items
router.post('/', authenticateToken.authenticateToken, async (req, res) => {
    const param = req.body;
    const newData = new Items({
        item_name: param.item_name,
        category: param.category,
        quantity: param.quantity,
        price: param.price,
    });
    const result = await newData.save();
    return res.json(result);
    
});

router.get('/', async (req, res) => {
    try {
        const data = await Items.find();
        return res.json(data);
    } catch (error) {
        console.log(error);
    }
});

router.get('/:category/:item', async (req, res) => {
    try {
        const category = req.params.category;
        const item_name = req.params.item;
        const data = await Items.findOne({ item_name: item_name, category: category });
        return res.json(data);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
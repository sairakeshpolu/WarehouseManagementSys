const express = require('express');
const List = require("../models/list");
const router = express.Router();

router.post('/', async (req, res) => {
    const param = req.body;
    const newData = new List({
        image: param.image,
        name: param.name,
        quantity: param.quantity,
    });
    const result = await newData.save();
    console.log('result: ', result);
    return res.json(result);
    
});


module.exports = router;
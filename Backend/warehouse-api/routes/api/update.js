const express = require('express');
const List = require("../models/list");
const router = express.Router();

router.patch('/', async (req, res) => {
    const param = req.body;
    const result = await List.findOneAndUpdate(
        { _id: param._id },
        { $set: { name: param.name, quantity: param.quantity, image: param.image } }
    );

    return res.json(result);
});

module.exports = router;
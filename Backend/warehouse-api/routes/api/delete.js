const express = require('express');
const mongoose = require('mongoose');
const List = require("../models/list");
const router = express.Router();

router.post('/', async (req, res) => {
    const param = req.body;
    const result = await List.deleteOne(
        { _id: param._id },
        function (err, result) {
            if (err) {
                console.log('Error deleting document:', err);
            } else {
                console.log('Document deleted successfully');
            }
        });

    return res.json(result);
});


module.exports = router;
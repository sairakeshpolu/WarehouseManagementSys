const express = require('express');
const List = require("../models/list");
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const params = req.body;
        for (let index = 0; index < params.length; index++) {
            const element = params[index];
            const newData = new List({
                id: element.id,
                userId: element.userId,
                completed: element.completed,
                title: element.title
            })
            await newData.save();
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
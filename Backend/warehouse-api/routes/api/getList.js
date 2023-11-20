const express = require('express');
const List = require("../models/list");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await List.find();
        
        console.log('data: ', data);
        return res.json(data);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
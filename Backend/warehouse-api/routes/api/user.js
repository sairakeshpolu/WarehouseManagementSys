const express = require('express');
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const authenticateToken = require("../security/authorization_old.js");

router.post('/create', async (req, res) => {
    const { firstName, lastName, username, password, usertype } = req.body;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" });
        } else {
            const user = new User({
                username: username,
                password: hash,
                usertype: usertype,
                firstName: firstName,
                lastName: lastName
            });

            try{
                user.save();
                res.status(200).json({ message: "User registered successfully" });
            }catch(error){
                res.status(400).json({ message: "User already exists" });
            }
        }
    }); 
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username:username});
    if (!user) {
        return res.status(401).json({ error: "Invalid username" });
    }
    try {
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }
        const accessToken = jwt.sign({ username: user.username }, "secret");
        res.json({
            accessToken: accessToken,
            username: user.username,
            nameOfUser: user.firstName + ", " + user.lastName,
            role: user.usertype
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route for handling logout
router.get("/logout", authenticateToken.authenticateToken, (req, res) => {
    res.clearCookie("accessToken");
    res.sendStatus(200);
});

module.exports = router;
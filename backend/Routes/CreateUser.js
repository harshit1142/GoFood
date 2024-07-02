const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User = require("../models/User.js")
const dotenv=require("dotenv");
dotenv.config();

const jwtSecret=process.env.JWT_Secret;

router.post("/createuser",
    [body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })]
    , async (req, res) => {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }
        const salt= await bcrypt.genSalt(10);
        let secPassword=await bcrypt.hash(req.body.password,salt);
        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
                location: req.body.location
            })
            let userData = await User.findOne({ email: req.body.email });
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            res.json({ success: true, authToken: authToken });
        } catch (error) {
            // console.log(error);
            res.json({ success: false });
        }
    })

router.post("/loginuser",
    [body('email').isEmail(),
    body('password').isLength({ min: 5 })], async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }

        let email = req.body.email;
        try {
            let userData = await User.findOne({email:email});
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct input" });
            }
            const jwtCompare=await bcrypt.compare(req.body.password,userData.password)
            if (!jwtCompare) {
                return res.status(400).json({ errors: "Try logging with correct input" });
            }
            const data={
                user:{
                    id:userData.id
                }
            }
            const authToken= jwt.sign(data,jwtSecret);
            res.json({ success: true ,authToken:authToken});
        } catch (error) {
            res.json({ success: false });
        }
    })

module.exports = router;
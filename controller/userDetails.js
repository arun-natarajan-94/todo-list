const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/User");

module.exports = {

    //Register New User
    createUser: async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;

    //Checking existing Email    
        const checkEmail = await User.findOne({email: email});
        if(checkEmail)
        {
            return res.send("There is already an account with this email!");
        }
    //Hasing Password
        const salt = bcrypt.genSaltSync(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            email:email,
            password:hashedPass
        });
    //Save the details into database    
        try {
            const addUser = await newUser.save();
            res.status(200).send({
                Success:1,
                Message:"New User registered!",
                userID: ({_id: newUser._id})
            })
        }
        catch(err){
            res.end(err);
        }
    },

    login: async (req, res) => {

        //Login User
        const existUser = await User.findOne({email: req.body.email});

        // Verify Email
        if(!existUser) {
            return res.status(401).send({
                Success:0,
                Message: "User did not exist! Please signup!"
            })
        }
        //Compare password
        const checkPass = await bcrypt.compare(req.body.password, existUser.password);
        if(!checkPass) {
            return res.send({
                Success:0,
                Message:"Incorrect Password"
            })
        }
        const tokenData = {
            email: existUser.email,
            userId: existUser._id
        }
        //Generate token
        const token = jwt.sign(tokenData, process.env.SECRET_KEY);
        res.status(200).send({
            Success:0,
            result: token
        });
    }
}
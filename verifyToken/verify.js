const jwt = require("jsonwebtoken");
const User = require("../model/User");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


//Verify Token

module.exports = {
    checkToken : async (req, res, next) => {
        const token = req.headers["authorization"];
        if(!token){
            res.status(401).send({
                Success:0,
                Message:"Access Denaid! Please provide your token!"
            })
        }

        let decoded =  await jwt.verify(token, process.env.SECRET_KEY)
        const existUser = await User.findOne({email: decoded.email, _id: ObjectId(decoded.userId)});
        if(existUser){
            req.user = decoded;
            return next();
        } else {
            return res.status(401).send({
                Success:0,
                Message:"Invalid token!"
            });
        }
    }
}
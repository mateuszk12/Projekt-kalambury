const User = require("../models/user")
const jwt = require("jsonwebtoken")
require("dotenv").config({path:"./config.env"});
const bcrypt = require("bcrypt")
const handleRegister = async (req,res) =>{
    const {username,password} = req.body;
    if (!username || !password) return res.status(400)
    const userDuplicate = await User.findOne({username: username}).exec();
    if (userDuplicate) return res.sendStatus(409)
    const hash = await bcrypt.hash(password,10)
    try {
        const createUser = await User.create({
            "username":username,
            "password":hash
        })
        const Atoken = jwt.sign(
            {"username":username},
            process.env.ACCESS_TOKEN,
            {expiresIn: "3h"}
        )
        console.log(`${createUser} created`)
    res.status(200).json({username,Atoken})
    } catch(err){
        res.status(500)
    }
}
module.exports = { handleRegister }
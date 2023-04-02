const User = require("../models/user")
const jwt = require("jsonwebtoken")
require("dotenv").config({path:"./config.env"});
const bcrypt = require("bcrypt")
const handleLogin = async (req,res) => {
    const {username,password} = req.body;
    console.log("dziala")
    try{
        if (!username || !password) return res.status(400)
        const user = await User.findOne({username: username});
        const roles = user.roles
        console.log(roles)
        if (!user) res.status(401).json("invalid password or username")
        const passAuth = await bcrypt.compare(password,user.password)
    if (passAuth){
        const Atoken = jwt.sign(
            {"username":user.username,"roles":roles},
            process.env.ACCESS_TOKEN,
            {expiresIn: "3h"}
        )

        res.status(200).json(Atoken)
    } else {
        res.status(401).json("invalid password or username")
    }
    } catch(err){
        res.sendStatus(500)
    }
    

}

module.exports = { handleLogin }
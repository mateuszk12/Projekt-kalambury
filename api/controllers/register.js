
const User = require("../models/user")
const handleRegister = async (req,res) =>{
    const {username,password} = req.body;
    const userDuplicate = await User.findOne({username: username}).exec();
    if (userDuplicate) return res.sendStatus(409)
    try {
        const createUser = await User.create({
            "username":username,
            "password":password
        })
        await Game.create({
            "image": "test123"
        })

        console.log(`${createUser} created`)
    res.status(201).send(`${createUser} created`)
    } catch(err){
        res.status(500)
    }
}
module.exports = { handleRegister }
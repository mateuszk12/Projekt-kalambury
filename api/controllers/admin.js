const User = require("../models/user")
const handleDelete = async (req,res) => { 
    const {username} = req.body
    console.log(req.body)
    try{
        const result2 = await User.findOne({username:username})
        if(result2){
            await User.deleteOne({username:username})
            console.log("usunięte")
            res.status(200).send({username:username})
        } else {    
            res.sendStatus(420)
        }
        
    } catch {
        res.sendStatus(500)
    }
}


module.exports = {handleDelete}
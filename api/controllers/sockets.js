const Game = require("../models/game")
const Word = require("../models/word")

const handleGamePut = async(req,res) => {
    const {gameId,username,image,message} = req.body
    try{
        const result = await Game.updateOne({gameId:gameId},{
            $push:{users:username},
            $push:{messages:{username:username,message:message}},
            latestImage:image
        })
        if (result){
            res.status(200).json("game has been updated")
        }  else {
            res.status(409)
        }
    } catch(err){
        res.status(500)
    }
    
}



module.exports = {handleGamePut}
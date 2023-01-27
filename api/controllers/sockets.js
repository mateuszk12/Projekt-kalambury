const Game = require("../models/game")
const Word = require("../models/word")

const handleGamePut = async(req,res) => {
    const {gameId,username,image,message} = req.body
    const data = {};
    try{
        const game = await Game.findOne({game:gameId})
        console.log(game.words.includes(message))
        if (game.words.includes(message)){
            data.guess = true
            data.word = message
            data.username = username
        } else {
            data.guess = false
            data.word = false
            data.username = false
        }
        const result = await Game.updateOne({gameId:gameId},{
            $push:{users:username},
            $push:{messages:{username:username,message:message}},
            latestImage:image
        })
        if (result){
            res.status(200).json(data)
        }  else {
            res.status(409)
        }
    } catch(err){
        res.status(500)
    }
}



module.exports = {handleGamePut}
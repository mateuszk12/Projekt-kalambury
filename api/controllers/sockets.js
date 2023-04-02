const Game = require("../models/game")
const User = require("../models/user")
const Word = require("../models/word")

const handleGamePut = async(req,res) => {
    const id = req.params.id
    console.log(id)
    const {gameId,username,image,message} = req.body
    const data = {};
    try{
        const game = await Game.findOne({gameId:gameId})
        if (game.words[0] === message){
            data.guess = true
            data.word = message
            data.username = username
            await Game.updateOne({gameId:gameId},{
                $pull:{words:game.words[0]},
                $push:{guessed:game.words[0]},
                currentUser:username,
                latestImage:""
            })
            await User.updateOne({username:username},{
                $inc:{points:5}
            })
            if (game.words.length === 1){

            }
        } else {
            data.guess = false
            data.word = false
            data.username = false
        }
        if (message !== undefined){
            const result = await Game.updateOne({gameId:gameId},{
                $push:{users:username},
                $push:{messages:{username:username,message:message}},
            })
            if (result){
                res.status(200).json(data)
            }  else {
                res.sendStatus(409)
            }
        }
        if (image !== undefined){
            const result = await Game.updateOne({gameId:gameId},{
                latestImage:image
            })
            if (result){
                res.status(200)
            }  else {
                res.sendStatus(409)
            }
        }
        
    } catch(err){
        res.sendStatus(420)
    }
}
const getPoints = async (req,res) => {
        const result = await User.aggregate([{$sort:{points:-1}},{$limit:20},{$project:{_id:0,username:1,points:1}}])
        res.send(result)
}


module.exports = {handleGamePut,getPoints}
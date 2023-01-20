const Game = require("../models/game")
const nanoid = require("nanoid")
const handleGameGet = async(req,res) => {
    const {gameId} = req.query
    console.log(gameId)
    try{
        const result = await Game.findOne({gameId:gameId}).exec()
        const filteredMessages = result.messages.filter(val => JSON.stringify(val) !== '{}')
        res.status(200).send(filteredMessages)
        // const createGame = await Game.create({
        //     "gameId": nanoid(8)
        // })
        // res.status(201).send(`${createGame} created`)
        
    } catch(err){
        res.status(500)
    }
}
const handleGamePost = async(req,res) => {
    
}
const handleGamePut = async(req,res) => {
    const {gameId,username,image,message} = req.body
    try{
        const result = await Game.updateOne({gameId:gameId},{
            $push:{users:username},
            $push:{messages:{username:username,message:message}},
            latestImage:image
        })
        if (result){
            res.status(200).json("game is finished")
        }  else {
            res.status(409)
        }
    } catch(err){
        res.status(500)
    }
    
}
const handleGameDelete = async(req,res) => {
    
}
module.exports = {handleGameGet,handleGamePost,handleGamePut,handleGameDelete}
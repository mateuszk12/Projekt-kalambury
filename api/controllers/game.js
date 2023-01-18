const Game = require("../models/game")
const short = require("shortid")
const handleGameGet = async(req,res) => {

}
const handleGamePost = async(req,res) => {
    const unique =  await Game.findOne({gameId:gameId}).exec()
    if (unique) return res.sendStatus(409)
    const createGame = await Game.create({
        "gameId":
    })
}
const handleGamePut = async(req,res) => {
    
}
module.exports = {handleGameGet,handleGamePost,handleGamePut}
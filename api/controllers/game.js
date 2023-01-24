const Game = require("../models/game")
const Word = require("../models/word")
const nanoid = require("nanoid")



const handleGamePost = async(req,res) => {
    
}

const handleGameDelete = async(req,res) => {
    
}
const handleGameCreate = async(req,res) => {
    const {users,number} = req.body
    const code = nanoid(8) 
    const words = await Word.find().distinct("words")
    const bannedUsers = []
    try{
        if (users) {
            const tmp = users.split(",")
            bannedUsers.push(...tmp)
        }
        console.log(bannedUsers)
        await Game.create({
            "gameId": code,
            "max":number,
            "bannedUsers":bannedUsers,
            "words":words.slice(0,number),
            })
        res.status(201).send(code)
    } catch {
        res.sendStatus(500)
    }  
}
const getGameInfo = async (req,res) => {
    console.log("cos")
    const {gameId} = req.query
    if (gameId){
        const info = await Game.findOne({gameId:gameId})
        res.status(200).send({banned:info.bannedUsers,max:info.max,words:info.words,status:info.status})
    }
}
const joinGame = async (req,res) => {
    const {gameId,username} = req.query
    if(gameId && username){
        const result = await Game.findOne({gameId:gameId})
        // const isBanned = result.bannedUsers.includes(username)
        // console.log(isBanned)
        // const numberOfp = result.currentState.curentUsers
        if (result){
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
        
    } else {
        res.sendStatus(403)
    }
}
const handleGameGet = async(req,res) => {
    const {gameId} = req.query
    const {id} = req.params
    console.log(gameId,id)
    try{
        if (!(gameId===undefined)){
            const result = await Game.findOne({gameId:gameId})
            const filteredMessages = result.messages.filter(val => JSON.stringify(val) !== '{}')
            const img = result.latestImage
            if (id === "chat"){
                res.status(200).send(filteredMessages)
            } 
            if (id === "image"){
                res.status(200).send(img)
            }
        } else {
            res.sendStatus(400)
        }
    } catch(err){
        res.status(500)
    }
}
module.exports = {handleGamePost,handleGameDelete,handleGameCreate,getGameInfo,joinGame,handleGameGet}
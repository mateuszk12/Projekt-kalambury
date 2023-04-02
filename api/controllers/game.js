const Game = require("../models/game")
const User = require("../models/user")
const Word = require("../models/word")
const nanoid = require("nanoid")


const handleGamePost = async(req,res) => {
    
}

const handleGameDelete = async(req,res) => {
    
}
const handleGameCreate = async(req,res) => {
    const {users,number,username,category} = req.body
    console.log(users,number,username,category)
    const code = nanoid(8) 
    const cat = (category === undefined ? "default" : category)
    console.log(cat)
    const result = await Word.findOne({category:cat})
    const words = result.words
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
            "users":[username],
            "currentUser":username
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
        console.log(gameId,username)
        const result = await Game.findOne({gameId:gameId})
        const isBanned = result.bannedUsers.includes(username)
        // const numberOfp = result.currentState.curentUsers
        if (result && !isBanned){
            await Game.updateOne({gameId:gameId},{
                $push:{users:username}
            })
            res.sendStatus(200)
        } else {
            res.status(401).json({message:"you can't join the game ;("})
        }
        
    } else {
        res.status(403)
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
                res.status(200).send({messages:filteredMessages,username:result.currentUser})
            } 
            if (id === "image"){
                res.status(200).send({image:img,username:result.currentUser})
            }
        } else {
            res.sendStatus(400)
        }
    } catch(err){
        res.status(500)
    }
}
const handleGameStats = async(req,res)=>{
    const {username} = req.query
    try{
        data = {}
        const result = await User.findOne({username:username})
        data.points = result.points
        const games = await Game.aggregate([
            {
              $match: {
                users: { $elemMatch: { $eq: "testKonto2" } }
              }
            },
            {
              $count: "count"
            }
          ]);
          data.games = games[0]
          res.status(200).send(data)
    } catch {
        res.sendStatus(500)
    }
}
const getWord = async (req,res) => {
    const {username,gameId} = req.query
    const result = Game.findOne({gameId:gameId})
    if (result.currentUser === username){
        res.status(200).send(result.words[0])
    } else {
        res.sendStatus(403)
    }
}
module.exports = {handleGamePost,handleGameDelete,handleGameCreate,getGameInfo,joinGame,handleGameGet,handleGameStats,getWord}
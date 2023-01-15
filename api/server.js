const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const register = require('./models/register')
require('dotenv').config()
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: 'http://localhost:3000'
    }
})


io.on("connection",(socket) => {
    socket.on("image",(data)=>{
        socket.broadcast.emit("receive_image",data)
    })
    socket.on("joinRoom",({gameId})=>{
        socket.join(gameId)
    })
    socket.on("imageGame",({gameId,image})=>{
        socket.to(gameId).emit("receiveImageGame",image)
        
    })
    socket.on("chat",({gameId,message})=>{
        socket.to(gameId).emit("chatReceived",message)
        console.log(message)
    })
    
})

const players = require("./testFiles/test.json")
app.get("/bestPlayers",(req,res)=>{
    const sorted = players
    .sort((a,b)=>{
        return b.points-a.points
    })
    .slice(0,20)
    res.send(JSON.stringify(sorted))
})





server.listen(process.env.APIPORT,() => console.log("server started on port: 3001"))
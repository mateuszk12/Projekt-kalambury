const express = require('express')
const axios = require("axios")
const http = require('http')

// const mongoose = require('mongoose')
// const Game = require("../models/game")
require('dotenv').config({path: "./config.env"})
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
        // axios.put("http://localhost:3001/game",{gameId:gameId,image:image})
    })
    socket.on("chat",({gameId,message,username})=>{
        socket.to(gameId).emit("chatReceived",message)
        // axios.put("http://localhost:3001/game",{gameId:gameId,message:message,username:username})
    })
    
})

server.listen(process.env.SOCKETPORT,() => console.log(`socket server started on port:${process.env.SOCKETPORT}`))
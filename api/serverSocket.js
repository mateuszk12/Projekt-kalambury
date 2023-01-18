const express = require('express')
const http = require('http')
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
        
    })
    socket.on("chat",({gameId,message})=>{
        socket.to(gameId).emit("chatReceived",message)
        console.log(message)
    })
    
})

server.listen(process.env.SOCKETPORT,() => console.log(`socket server started on port:${process.env.SOCKETPORT}`))
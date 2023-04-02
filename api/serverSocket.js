const express = require('express')
const axios = require("axios")
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
    socket.on("joinRoom",({gameId,username})=>{
        io.in(gameId).emit("chatReceived",{message:`${username} has joined game`,username:"server"})
        socket.join(gameId)
    })
    socket.on("imageGame",({gameId,image,username})=>{
        socket.to(gameId).emit("receiveImageGame",image)
        axios.put("http://localhost:3001/sockets/image",{gameId:gameId,image:image})
             .then((res) => console.log(res.data))
             .catch((err) => console.log(err))
        
    })
    socket.on("chat",({gameId,message,username})=>{
        console.log(username,message)
        axios.put("http://localhost:3001/sockets/chat",{gameId:gameId,message:message,username:username})
            .then((res) => {
                const data = {}
                if (res.data.guess){
                    data.message = `uzytkownik ${res.data.username} zgadl haslo: ${res.data.word}`
                    io.in(gameId).emit("chatReceived",{message:data.message,username:"server"})
                    io.in(gameId).emit("drawUs",{user:res.data.username})
                    socket.to(gameId).emit("receiveImageGame","")
                } else {
                    socket.to(gameId).emit("chatReceived",{message:message,username:username})
                }
            })
            .catch((err) => console.log(err))
    })
    
})

server.listen(process.env.SOCKETPORT,() => console.log(`socket server started on port:${process.env.SOCKETPORT}`))
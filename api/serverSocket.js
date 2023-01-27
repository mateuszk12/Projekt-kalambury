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
        socket.join(gameId)
        socket.to(gameId).emit("chatReceived",{message:`${username} has joined game`,username:"server"})
        axios.put("http://localhost:3001/sockets",{username:username})
             .then((res) => console.log(res.data))
    })
    socket.on("imageGame",({gameId,image,username})=>{
        if (username === "testKonto"){
        socket.to(gameId).emit("receiveImageGame",image)
            axios.put("http://localhost:3001/sockets",{gameId:gameId,image:image})
             .then((res) => console.log(res.data))
        }
        
    })
    socket.on("chat",({gameId,message,username})=>{
        socket.to(gameId).emit("chatReceived",{message:message,username:username})
        axios.put("http://localhost:3001/sockets",{gameId:gameId,message:message,username:username})
            .then((res) => {
                const data = {}
                console.log(res.data)
                if (res.data.guess){
                    data.message = `uzytkownik ${res.data.username} zgadl haslo: ${res.data.word}`
                } else {
                    data.message = message
                }
                socket.to(gameId).emit("chatReceived",{message:data.message,username:username})
            })
    })
    
})

server.listen(process.env.SOCKETPORT,() => console.log(`socket server started on port:${process.env.SOCKETPORT}`))
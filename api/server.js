const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const register = require('./models/register')
require('dotenv').config()
// const ws = require("ws")
// const { Server } = require("socket.io")

const app = express()
mongoose.connect(process.env.DATABASE)
    .then((result) => console.log("connected to the db"))
    .catch((err) => console.log(err))
app.get('/register',(req,res)=>{
    const user = new register({
        username: "secondApe",
        password: "apesdontusepassword"
    })
    user.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})
app.get('/getusers',(req,res)=>{
    register.find()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err)
        })
})




app.listen(process.env.APIPORT,()=>{
    console.log(`listening on port ${process.env.APIPORT}`)
})
//zakomentowane rzeczy  zostaną zmodyfikowane i wprowadzone póżniej
// const server = http.createServer(app)



// const io = new Server(server,{
//     cors:{
//         origin: 'http://localhost:3000'
//     }
// })
// io.on("connection",(socket) => {
//     socket.on("message",(data)=>{
//         socket.broadcast.emit("receive_message",data)
//     })
// })
// // const wss = new WebSocket.Server({ server })

// const players = require("./testFiles/test.json")
// app.get("/bestPlayers",(req,res)=>{
//     const sorted = players
//     .sort((a,b)=>{
//         return b.points-a.points
//     })
//     .slice(0,20)
//     res.send(JSON.stringify(sorted))
// })





// server.listen(3001,() => console.log("server started on port: 3001"))
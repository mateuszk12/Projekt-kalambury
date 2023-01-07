const express = require('express')
const app = express()
// const mongoose = require('mongoose')
// require('dotenv').config()


// mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true})
// const db = mongoose.connection
// db.on('error',(error) => console.log(error))
// db.once('open',()=>console.log('Conneced to the database'))
const players = require("./testFiles/test.json")
app.get("/bestPlayers",(req,res)=>{
    const sorted = players
    .sort((a,b)=>{
        return b.points-a.points
    })
    .slice(0,20)
    res.send(JSON.stringify(sorted))
})

app.listen(3001,() => console.log("server started on port: 3001"))
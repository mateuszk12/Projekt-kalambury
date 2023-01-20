const express = require("express");

const cors = require("cors")
require("dotenv").config({path:"./config.env"});
const mongoose = require('mongoose')
const DbConnection = require("./db/conn")
const register = require("./routes/register")
const login = require("./routes/login")
const game = require("./routes/game")
const port = process.env.SERVERPORT
DbConnection();
const app = express()
const corsOptions = {
    origin : ['http://localhost:3000'],
 }
app.use(cors(corsOptions))
app.use(express.json())
app.use("/register",register)
app.use("/login",login)
app.use("/game",game)
mongoose.connection.once('open',() => {
    console.log("connected to databse");
    app.listen(port,()=>{
        console.log(`server running on port ${port} `)
    })
})



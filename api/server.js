const express = require("express");
const cors = require("cors")
require("dotenv").config({path:"./config.env"});
const mongoose = require('mongoose')
const DbConnection = require("./db/conn")
const register = require("./routes/register")
const port = process.env.SERVERPORT
DbConnection();
const app = express()
let corsOptions = {
    origin : ['http://localhost:3000'],
 }
app.use(cors(corsOptions))
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("dziala")
})
app.use("/register",register)
mongoose.connection.once('open',() => {
    console.log("connected to databse");
    app.listen(port,()=>{
        console.log(`server running on port ${port} `)
    })
})



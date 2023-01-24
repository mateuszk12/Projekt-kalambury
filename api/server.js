const express = require("express");
const jwt = require("jsonwebtoken")
const cors = require("cors")
require("dotenv").config({path:"./config.env"});
const mongoose = require('mongoose')
const DbConnection = require("./db/conn")
const register = require("./routes/register")
const login = require("./routes/login")
const sockets = require("./routes/sockets")
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
app.use("/sockets",sockets)
app.use((req,res,next)=>{
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token,process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                res.sendStatus(403);
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }

})
app.use("/game",game)
mongoose.connection.once('open',() => {
    console.log("connected to databse");
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
    })
})



const mongoose = require("mongoose")
const Schema = mongoose.Schema

const currentGameSchema = new Schema({
    gameId:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    users:[String],
},{timestamps:true})

module.exports = mongoose.model("currentGame",currentGameSchema)
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const messageSchema = new Schema({
    username:{
        type:String
    },
    message:{
        type:String
    }
},{_id:false})
const gameSchema = new Schema({
    gameId:{
        type:String,
        required:true
    },
    latestImage:{
        type:String,
        default:""
    },
    users:[String],
    max:{
        type:Number,
        default:5
    },
    words:[String],
    messages:[messageSchema],
    status:{
        type:String,
        default:"running"
    },
    currentUsers:[String]
},{timestamps:true})

module.exports = mongoose.model("Game",gameSchema)
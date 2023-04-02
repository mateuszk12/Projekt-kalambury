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
    bannedUsers:[String],
    max:{
        type:Number,
        default:5
    },
    words:[String],
    guessed:[String],
    messages:[messageSchema],
    status:{
        type:String,
        default:"running"
    },
    currentUser:{
        type:String
    }
    
},{timestamps:true})

module.exports = mongoose.model("Game",gameSchema)
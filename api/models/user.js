const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    roles:{
        User:{
            type:Number,
            default: 1
        },
        Admin:{
            type:Number,
            default: 0
        }
    },
    points:{
        type:Number
    }
},{timestamps:true});


module.exports = mongoose.model('User',userSchema);
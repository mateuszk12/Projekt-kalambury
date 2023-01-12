const mongoose = require('mongoose')
const Schema = mongoose.Schema

const registerSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

const register = mongoose.model('register',registerSchema);
module.exports = register;
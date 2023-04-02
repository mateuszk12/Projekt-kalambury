const mongoose = require("mongoose")
const Schema = mongoose.Schema

const wordSchema = new Schema({
    words:{
        type:[String],
    },
    category:{
        type:String
    }
})

module.exports = mongoose.model("Word",wordSchema)
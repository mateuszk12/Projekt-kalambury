const mongoose = require("mongoose")
const Schema = mongoose.Schema

const wordSchema = new Schema({
    word:{
        type:[String],
    }
})

module.exports = mongoose.model("Word",wordSchema)
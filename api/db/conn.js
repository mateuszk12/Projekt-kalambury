const mongoose = require('mongoose')

const DbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(process.env.DATABASE)
    } catch (err){
        console.error(err)
    }
}

module.exports = DbConnection
const Word = require("../models/word")
const handleAdd = async (req,res) => {
    try{
        const {word,category} = req.body
    console.log(word,category)
    const result = await Word.findOne({category:category})
    if (result){
        const resultWord = await Word.findOne({word:word}).exec()
        if (!resultWord){
            res.sendStatus(418)
        } else {
            await Word.updateOne({category:category},{$push:{words:word}})
            res.status(200).send(`dodano ${word} do kategorii ${category}`)
        }
        
    } else {
        await Word.create({category:category})
        await Word.updateOne({category:category},{$push:{words:word}})
        res.status(200).send(`stworzono ${category} i dodano haslo ${word}`)
    }
    } catch {
        res.status(500)
    }
    
}
const handleGetCat = async (req,res) => {
    const result = await Word.aggregate([{$project:{category:1,_id:0}}])
    res.send(result)
}


module.exports = {handleAdd,handleGetCat}
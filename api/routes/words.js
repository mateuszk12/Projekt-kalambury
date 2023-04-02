const express = require("express")
const {handleAdd,handleGetCat} = require("../controllers/word")
const router = express.Router()

router.route("/")
    .get(handleGetCat)
router.route("/add")
    .post(handleAdd)

module.exports = router;
const express = require("express")
const {handleGamePut,getPoints} = require("../controllers/sockets")
const router = express.Router()


router.route('/:id')
    .put(handleGamePut)
    .get(getPoints)
module.exports = router;
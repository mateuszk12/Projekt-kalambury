const express = require("express")
const {handleGamePut} = require("../controllers/sockets")
const router = express.Router()


router.route('/')
    .put(handleGamePut)
module.exports = router;
const express = require("express")
const { handleGameDelete,handleGamePost,handleGamePut,handleGameGet} = require("../controllers/game")
const router = express.Router()

router.route('/')
    .post(handleGamePost)
    .get(handleGameGet)
    .put(handleGamePut)
    .delete(handleGameDelete)
module.exports = router;
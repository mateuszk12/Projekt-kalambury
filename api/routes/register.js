const express = require("express")
const {handleRegister} = require("../controllers/register")
const router = express.Router()

router.route('/')
    .post(handleRegister)
module.exports = router;
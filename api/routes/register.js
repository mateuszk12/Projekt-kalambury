const express = require("express")
const registerController = require("../controllers/register")
const router = express.Router()

router.route('/')
    .post(registerController.handleRegister)
module.exports = router;
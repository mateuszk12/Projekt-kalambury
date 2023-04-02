const express = require("express")
const {handleDelete} = require("../controllers/admin")
const router = express.Router()

router.route('/')
    .delete(handleDelete)
module.exports = router;
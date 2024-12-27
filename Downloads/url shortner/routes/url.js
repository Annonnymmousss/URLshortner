const express = require("express")
const {handleGenerateNewSortURl} = require("../controllers/url")

const router = express.Router()

router.post('/',handleGenerateNewSortURl)

module.exports= router;
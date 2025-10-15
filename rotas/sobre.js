const express = require("express")
const sobre = express.Router()

sobre.get("/sobre", (req, res)=>{
    res.render("sobre")
})

module.exports = sobre
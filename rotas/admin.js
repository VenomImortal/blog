const express = require("express");
const auth = require("../middleware/auth");
const rotaAdmin = express.Router()


rotaAdmin.get("/", auth, (req, res)=>{
    res.render("admin", {admin: req.session.admin})
})
module.exports = rotaAdmin ;

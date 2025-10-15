const express = require('express')
const router =  express.Router()
const perfil = require("../models/perfil")
const auth = require("../middleware/auth")


router.get("/", auth,  (req, res)=>{
    perfil.findAll({order:[["id", "DESC"]]})
    .then((perfil)=>{
        const user = perfil.map(dados => dados.toJSON())
        res.render("feedback", {perfil: user})
    })
    .catch((err)=>{
        res.user("erro ao listar feedback "+err)
    })
})

module.exports= router
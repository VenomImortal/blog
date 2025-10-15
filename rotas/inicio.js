const express = require("express")
const rota = express.Router()
const Post= require("../models/post")

rota.get("/", (req, res)=>{
    Post.findAll({limit: 7, order:[["createdAt", "DESC"]]})
    .then((artigos)=>{
        const dados = artigos.map(artigo => artigo.toJSON())
        res.render("inicio", {artigos: dados
        })
    })
    .catch((err)=>{
        res.send("erro ao carregar artigo "+err)
    })
})

module.exports = rota;
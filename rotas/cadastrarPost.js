const express = require("express")
const rotaCadastrar = express.Router()
const Post = require("../models/post")
const path = require("path")
const { where } = require("sequelize")
const auth = require("../middleware/auth")



rotaCadastrar.get("/:categoria", auth, (req, res)=>{
    const categoria = req.params.categoria
    res.render("cadastrarPost", {ocultarFooter: true, categoria});
})

rotaCadastrar.post("/", (req, res)=>{
    let imagem = null
    let novaImagem = null
    let destino = null
    if(req.files && req.files.imagem){
    imagem = req.files.imagem
     novaImagem = Date.now()+"_"+imagem.name
     destino = path.join(__dirname,"..", "public", "uploads", novaImagem)

     imagem.mv(destino,(err)=>{
        if(err) return res.send("erro ao salvar imagem "+err)
    })
    }
   
    

    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        imagem: novaImagem,
        categoria: req.body.categoria
        
    })
    .then(()=>{
        res.redirect("/")
    })
    .catch((err)=>{
        res.send("erro ao salvar "+err)
    })
})




module.exports = rotaCadastrar
const express= require("express")
const categoria = express.Router()
const Post = require("../models/post")
const { where } = require("sequelize")
const { post } = require("./cadastrarPost")

categoria.get("/categoria/:nome", (req, res)=>{
    const nomeCategoria = req.params.nome
    Post.findAll({where:{categoria: nomeCategoria}, order:[["createdAt", "DESC"]]})
    
    .then(artigos=>{
         if(artigos.length === 0){
        res.render("categoria", { mensagem: "nenhum post encontrado nesta categoria"})
       }
       else{
        const dados = artigos.map(post=> post.toJSON())
        res.render("categoria", {artigos: dados})
        }
    })
    .catch((err)=>{
      
        
    })
})

module.exports = categoria
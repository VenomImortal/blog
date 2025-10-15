const express = require("express")
const leitura = express.Router()
const Post = require("../models/post")

leitura.get("/post/:id", (req, res)=>{
    const id = req.params.id
    Post.findByPk(id)
    .then(post =>{
        if(post){
            res.render("leitura", {post: post.toJSON()})
        }
        else{
            res.send("post não encontrado")
        }
    })
    .catch(err=>{
        res.send("Post não encontrado "+err)
    })
})

module.exports = leitura;
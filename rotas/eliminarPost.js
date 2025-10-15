const express = require("express")
const eliminar = express.Router()
const Post = require("../models/post")
const path = require("path")
const fs = require("fs")
const { where } = require("sequelize")
const auth = require("../middleware/auth")


eliminar.get("/remover/:id", auth, (req, res) => {
    const id = req.params.id;
    const imagem = req.query.imagem;

    Post.destroy({ where: { id: id } })
        .then(() => {
            if (imagem) {
                const caminho = path.join(__dirname, "..", "public", "uploads", imagem);
                fs.unlink(caminho, (err) => {
                    if (err) {
                        console.log("Erro ao apagar imagem:", err);
                    }
                    res.redirect("/");
                });
            } else {
                res.redirect("/");
            }
        })
        .catch((err) => {
            res.send("erro ao apagar Post " + err);
        });
});

module.exports = eliminar;


    


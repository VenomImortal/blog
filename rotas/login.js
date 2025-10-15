const express = require("express")
const login = express.Router()
const USERNAME = process.env.USERNAME_ADMIN
const PASSWORD = process.env.SENHA_ADMIN

login.get("/admin/login", (req, res)=>{
    res.render("login", {ocultarFooter: true})
})

login.post("/admin/login",(req, res)=>{
    const {usuario, senha}= req.body
    if(USERNAME === usuario && PASSWORD===senha){
        req.session.admin = true
        console.log("logado com sucesso")
        res.redirect("/")
    }
    else{
        res.redirect("/admin/login")
    }
})

login.get("/logout", (req, res)=>{
    req.session.destroy(()=>{
        res.redirect("/")
    })
})
module.exports = login
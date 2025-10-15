const express = require("express")
const router = express.Router()

const perfil = require("../models/perfil")

router.get("/contacto",(req, res)=>{
    res.render("contacto")
    

})

router.post("/sms", (req, res)=>{
    
    perfil.create({
        user: req.body.user,
        mensagem: req.body.mensagem
    })
      .then(()=>{
        res.redirect("/")
      })  
      .catch((err)=>{
        res.send("erro ao criar perfil "+err)
      }) 
    }
   
)
module.exports = router
const express = require("express")
const { where } = require("sequelize")
const router = express.Router()
perfil = require("../models/perfil")
const auth = require("../middleware/auth")

router.get("/remover/feedback/:id", auth, (req,res)=>{
    const id = req.params.id

    perfil.destroy({where:{id: id}})
    .then(()=>{
        res.redirect("/admin/feedback")
    })
    .catch((err)=>{
        res.send("erro ao eliminar post"+err)
    })
})
module.exports = router
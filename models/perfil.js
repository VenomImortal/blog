const { Model } = require("sequelize")
const db = require("./db")

const perfil = db.sequelize.define("Perfil",{
    user:{
        type: db.Sequelize.STRING
    },
    mensagem:{
        type: db.Sequelize.TEXT
    }
})

perfil.sync({alter: true})
module.exports = perfil
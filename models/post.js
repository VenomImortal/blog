const db = require("./db")
const Post= db.sequelize.define("poster", {
    titulo:{
        type: db.Sequelize.STRING
    },
    
    conteudo:{
        type: db.Sequelize.TEXT
    },
    imagem:{
        type: db.Sequelize.STRING
    }, 
    categoria:{
        type: db.Sequelize.STRING
    }
})

//Post.sync({force: true})
module.exports = Post
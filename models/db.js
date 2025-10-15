const Sequelize = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE,{
    dialect: process.env.DIALECT_DB,
    dialectOptions: {
        ssl:{
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

sequelize.authenticate() 
.then(()=>{
    console.log("Conectando ao banco de dados !")
})

.catch((err)=>{
    console.log("Falha ao conectar com o banco de dados "+err)

})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
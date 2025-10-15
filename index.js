//============ Iniciar Dependências ==================
require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 8080
const Post = require("./models/post")
const perfil = require("./models/perfil")
const {engine: exphbs} = require("express-handlebars")
const handlebars = require("handlebars")
const marked = require("marked")
const path = require("path")
const fs = require("fs")
const fileupload = require("express-fileupload")
const session = require("express-session")

app.use(session({
    secret:"venomimortal",
    resave:false,
    saveUninitialized: false,
    cookie:{maxAge: 60000 * 15}
}))

app.use((req, res, next) => {
    
  res.locals.admin = req.session.admin || false;
  next();
});

app.use(express.urlencoded({extended: true}))
app.use(express.json())


//========== Exportação De Rotas ======================
const inicioRota = require("./rotas/inicio")
const adminRota = require("./rotas/admin")
const cadastrarRota = require("./rotas/cadastrarPost")
const leituraRota = require("./rotas/leituraIndividual")
const eliminarRota = require("./rotas/eliminarPost")
const categoriaRota = require("./rotas/categoria")
const loginRota =require("./rotas/login")
const sobreRota = require("./rotas/sobre")
const contactoRota = require("./rotas/contacto")
const feedbackRota = require("./rotas/feedback")
const removerfeedbackRota = require("./rotas/eliminarFeedback")
const { helpers } = require("handlebars")
const { text } = require("body-parser")

//=====================================================

//=============== Liberar Pasta de Arquivo ============

app.use(express.static("public"))


//============= CONFIG HANDLEBARS =====================

app.engine('handlebars', exphbs({defaultLayout: "main", partialsDir: path.join(__dirname, "views", "partials"), helpers:{
   formatarTexto: function (texto){
        if(!texto) return "";

        let formatado = texto.replace(/\*\*(.*?)\*\*/g, '<strong>$</strong>');

        formatado = formatado.replace(/\n/g, '<br>');

        formatado = formatado.replace(/ /g, '&nbsp;&nbsp;');
         return new handlebars.SafeString(formatado);
   },
    limitar: function(texto){
        return texto.length > 15 ? texto.substring(0, 150)+"...": texto
    }

}}))
app.set("view engine", 'handlebars')
//=====================================================


app.use(fileupload())


//============== USAR ROTAS EXPORTADAS ================

app.use("/", inicioRota)
app.use("/", categoriaRota)
app.use("/admin", adminRota)
app.use("/admin/postar", cadastrarRota)
app.use("/admin", eliminarRota)
app.use("/admin/feedback", feedbackRota)
app.use("/", leituraRota)
app.use("/", loginRota)
app.use("/", sobreRota)
app.use("/", contactoRota)
app.use("/admin", removerfeedbackRota)



//=====================================================

app.listen(PORT, ()=>{
    console.log(`servidor rodando na porta ${PORT}`)
})

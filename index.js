//============ Iniciar Dependências ==================
require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 8080
const Post = require("./models/post")
const perfil = require("./models/perfil")
const { engine: exphbs } = require("express-handlebars")
const handlebars = require("handlebars")
const marked = require("marked")
const path = require("path")
const fs = require("fs")
const fileupload = require("express-fileupload")
const session = require("express-session")
const pgSession = require("connect-pg-simple")(session)
const { Pool } = require("pg")

//=============== Configuração do PostgreSQL ===============
const pgPool = new Pool({
  connectionString: process.env.DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
})

//=============== Configuração da Session ===============
app.set('trust proxy', 1) // necessário no Render

app.use(session({
  store: new pgSession({
    pool: pgPool,
    tableName: 'session'
  }),
  secret: process.env.SESSION_SECRET || 'venomimortal',
  resave: false,
  saveUninitialized: false,
  name: 'capitalzero.sid',
  cookie: {
    secure: true,       // HTTPS
    httpOnly: true,
    sameSite: 'none',   // necessário para cross-site no Render
    maxAge: 1000 * 60 * 60 * 24 // 1 dia
  }
}))

//=============== Variáveis Locais para Handlebars ===============
app.use((req, res, next) => {
  res.locals.admin = req.session.admin || false
  next()
})

//=============== Body Parser ===============
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//========== Exportação De Rotas ======================
const inicioRota = require("./rotas/inicio")
const adminRota = require("./rotas/admin")
const cadastrarRota = require("./rotas/cadastrarPost")
const leituraRota = require("./rotas/leituraIndividual")
const eliminarRota = require("./rotas/eliminarPost")
const categoriaRota = require("./rotas/categoria")
const loginRota = require("./rotas/login")
const sobreRota = require("./rotas/sobre")
const contactoRota = require("./rotas/contacto")
const feedbackRota = require("./rotas/feedback")
const removerfeedbackRota = require("./rotas/eliminarFeedback")
const { helpers } = require("handlebars")
const { text } = require("body-parser")

//=============== Liberar Pasta de Arquivo ===============
app.use(express.static("public"))

//============= CONFIG HANDLEBARS =====================
app.engine('handlebars', exphbs({
  defaultLayout: "main",
  partialsDir: path.join(__dirname, "views", "partials"),
  helpers: {
    formatarTexto: function (texto) {
      if (!texto) return ""

      let formatado = texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      formatado = formatado.replace(/\n/g, '<br>')
      formatado = formatado.replace(/ /g, '&nbsp;&nbsp;')
      return new handlebars.SafeString(formatado)
    },
    limitar: function (texto) {
      return texto.length > 150 ? texto.substring(0, 150) + "..." : texto
    }
  }
}))
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

//============== ROTA DE LOGIN ADMIN ==================


//============== MIDDLEWARE ADMIN =====================
function adminAuth(req, res, next) {
  if (!req.session.admin) {
    return res.redirect("/login")
  }
  next()
}

//=====================================================

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

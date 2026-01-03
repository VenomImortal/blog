const express = require("express")
const login = express.Router()

login.get("/admin/login", (req, res) => {
  res.render("login", { ocultarFooter: true })
})

login.post("/admin/login", (req, res) => {
  const { usuario, senha } = req.body

  if (
    usuario === process.env.USERNAME_ADMIN &&
    senha === process.env.SENHA_ADMIN
  ) {
    req.session.admin = true
    console.log("ADMIN LOGADO")
    return res.redirect("/admin")
  }

  return res.render("login", {
    error: "Usuário ou senha inválidos"
  })
})

login.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/")
  })
})

module.exports = login

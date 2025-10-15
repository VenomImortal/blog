function auth(req, res, next){
    if(req.session && req.session.admin === true){
        return next()
    }
    else{
        res.redirect("/admin/login")
    }
    
}
module.exports = auth
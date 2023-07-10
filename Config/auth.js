module.exports={
     ensureAuthenticated:(req,res,next)=>{
        if(req.isAuthenticated()){
            next();
        }
        else{
            req.flash("error","Login to view the page");
            res.redirect("/");
        }

    }
}
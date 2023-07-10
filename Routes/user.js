const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../Config/auth");
const passport = require("passport");
const User = require("../Models/User");
const bcrypt = require("bcryptjs/dist/bcrypt");





router.get("/logout", ensureAuthenticated, (req, res) => {
    req.logout((err) => { if (err) { console.log(err); } });
    req.flash("success", "Logged Out Successfully");
    res.redirect("/");

})
router.get("/login", (req, res) => {
    res.redirect("/");
})
router.get("/register", (req, res) => {
    res.redirect("/");

})

router.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    let error_msg = "";
    if (!email || !password) {
        error_msg = "Please fill all necessary fields";
        res.render("signin", { error_msg })
        return;
    }
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next)

});

router.post("/register", (req, res, next) => {
    var error_msg = "";
    const { email, password, name, password2 } = req.body;
    if (!email || !password || !password2 || !name) {
        error_msg = "Please fill all necessary fields";

    }
    else if (password != password2) {
        error_msg = "Password and Confirm Password must be same";

    }
    else if (password.length < 6) {
        error_msg = "Password is very weak";
    }
    if (error_msg != "") {

        res.render("signin", {
            error_msg,
            name,
            email
        })
    }
    else {
        User.findOne({ email: email }).then((user) => {
            if (user) {
                error_msg = "Email Already Registered";
                res.render("signin", {
                    error_msg,
                    name,
                    email
                })
            }
            else {
                const newUser = new User({
                    name: name,
                    password: password,
                    email: email
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        newUser.password = hash;
                        newUser.save().then(user => {
                            req.flash("success_msg", "Registered Successfully.You can login now");
                            res.redirect("/");


                        }).catch(err => console.log(err))

                    })
                })

            }

        })
    }

})


module.exports = router;

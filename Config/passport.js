const LocalStrategy=require("passport-local").Strategy;
const bcrypt=require("bcryptjs");
const User=require("../Models/User");

module.exports=function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done)=>{
            User.findOne({email:email}).then((user)=>{
                if(!user){
                    return done(null,false,{message:"User not Registered"});
                }

                else{
                    bcrypt.compare(password,user.password,(err,isMatch)=>{
                        if(err){
                            throw err;
                        }
                        if(isMatch){
                            return done(null,user);
                        }
                        else{
                            return done(null,false,{message:"Invalid Password"});
                        }

                    })
                }
            }).catch(err=>console.log(err));


        })
    )

    passport.serializeUser(function(user,done){
        if(user.provider=='google'){
            return done(null,user);
        }
        done(null,user.id);
    })
    passport.deserializeUser(function(id,done){
        if(id.provider=='google'){
            
            return done(null,id);
        }
        
        User.findById(id,(err,user)=>{
            done(err,user);
        })
    })
}
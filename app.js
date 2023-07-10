const express=require("express");
const app=express();
const mongoose=require("mongoose");
const expressLayouts=require("express-ejs-layouts");
const passport=require("passport");
const cors=require("cors");
// CORS POLICY
app.use(cors());


// SETTING VIEW ENGINE
app.use(expressLayouts);
app.use('/static',express.static('static'));
app.set("view engine","ejs");

// INCLUDING SESSIONS
const session=require("express-session");
const flash=require("connect-flash");

require("dotenv").config();

require("./Config/passport")(passport);




mongoose.connect(process.env.mongouri,{useNewUrlParser:true,useUnifiedTopology:false}).then(()=>{
    console.log("Connection Successful");
}).catch(err=>{console.log(err)});

const PORT=process.env.PORT||3000;

// EXPRESS SESSION
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true

}));

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// SPECIFYING REQUEST HEADERS

app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.success=req.flash("success");
    res.header('Cache-Control', 'nocache, no-store, max-age=0, must-revalidate');
    res.header('Expires', 'Sat, 26 Jul 1997 05:00:00 GMT');
    res.header('Pragma', 'no-cache');
    next();
});




app.use(express.urlencoded({extended:false}));
app.use('/',require("./Routes/index"));
app.use('/user',require("./Routes/user"));

require("./Config/google")(passport);
app.use('/google',require("./Routes/google"));



app.listen(PORT,console.log(`Server Started at ${PORT}`));






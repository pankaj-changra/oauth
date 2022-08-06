 const express= require("express");
const passport = require("./auth");
const auth=require("./auth");
const session=require("express-session")

 const app =express()

 function isLogged(req,res,next){
    res.user? next():res.status(401)
 }
app.use(session({secret:"cats",resave:true,
 saveUninitialized: true}));
app.use(passport.initialize())
app.use(passport.session({ 
    // secret: "cats",
    resave: true,
    saveUninitialized: true}))


 app.get("/",(req,res)=>{
    res.send(`<a href ="/auth/google">Authenticate with code</a>`)
 })

 app.get("/auth/google",
 passport.authenticate("google",{scope:["email","profile"]})
 );

 app.get("/google/oauthcallback",
 passport.authenticate("google",{
    successRedirect:'/protected',
    failureRedirect:"/auth/failure"
 }))


 app.get("/protected",(req,res)=>{
    res.send(`hello you are protected \n <a href ="/auth/logout">logout the app/web</a>`)
 })
 app.get("/auth/failure",(req,res)=>{
    req.send("something went wrong")
 })
 app.post("/auth/logout",(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
      //   res.session.destroy();
        res.redirect('/');
      });
    
})
// 

 app.listen(3000,(error)=>{
    if(error) throw error;
    console.log("listening on port 3000")
 })




 
//  s%3APh-3vCXrhIWjlTy-mEFVEVMjaQNxMhkQ.%2F4uoaJB133zz4MrrVg9evb5%2B%2FGEgH4f5lmG9dMJqXM0
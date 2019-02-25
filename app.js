var express = require("express");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var jsonParser = bodyParser.json();

mongoose.connect("mongodb://localhost:27017/hostel",{ useNewUrlParser: true});

//require models
var User = require("./models/user");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
    secret: "hate you!!",
    resave: false,
    saveUninitialized: false
 }));
 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new localStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());

 app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
 });

app.get("/", function(req, res){
    res.render("index");
});
app.get("/register", function(req, res){
    res.render("register");
});
app.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        name : req.body.name,
        roll: req.body.roll,
        mobile: req.body.mobile,
        branch: req.body.branch,
        sem : req.body.sem,
        gender: req.body.gender
    });
    User.register(newUser, req.body.password, function(err, user){
       if(err){
          return res.redirect("register");
       }else{
            passport.authenticate("local")(req, res, function(){
              console.log(req.body.username);
             res.redirect("/");
          });
       }
    }); 
});
app.get("/login", function(req, res){
    res.render("login");
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
 }),function(req, res){
 });

 app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
 });

app.get("*", function(req, res){
    res.send("SOORY!! Page Not Found");
});
app.listen(process.env.PORT || 3000,function(){
    console.log("Server Connected!!");
});
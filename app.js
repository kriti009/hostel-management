var express = require("express");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var autoIncrement = require('mongoose-auto-increment');
var jsonParser = bodyParser.json();

mongoose.connect("mongodb://localhost:27017/hostel",{ useNewUrlParser: true});
var connection = mongoose.createConnection("mongodb://localhost:27017/hostel");
autoIncrement.initialize(connection);

//require models
var User = require("./models/user");
var Hostel = require("./models/hostel");
// var UserInfo = require("./models/userInfo");
var Floor = require("./models/floor");
var Room = require("./models/room");
var seedDB = require("./seeds")

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

 //seeding data to the db
//  seedDB();

 app.get("/", function(req, res){
     Hostel.find({},function(err, foundHostel){
        if(err){
            console.log(err);
        }else{
            res.render("index", {hostel : foundHostel});
        }
     });
});
app.get("/hostel/:id", function(req, res){
    Hostel.findById(req.params.id)
    .populate([{ path: 'floors', populate: { path: 'rooms' }}])
    .exec(function(err, foundHostel){
        if(err){
            console.log(err);
        }else{
            res.render("show", {hostel: foundHostel});
        }
    })
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
app.get("/admin", function(req, res){
    res.render("admin");
});
app.get("/login", function(req, res){
    res.render("login");
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
 }),function(req, res){
     if(req.body.username == "admin123"){
         res.redirect("/admin");
     }
 });
 app.get("/admin-login", function(req, res){
    res.render("admin-login");
 });
 app.post("/admin-login", function(req, res){
    if(req.body.username == "admin123" && req.body.password == "password123")
        res.redirect("/admin");
    else
    return res.redirect("/admin-login");
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
var express      = require("express");
var router       = express.Router({mergeParams:true});
var passport     =require("passport");
var User = require("../models/user");

//====================
// auth routes
//====================
router.get("/",function(req,res) {
    res.render("landing");
});

  //SCHEMA SETUP
  

 
//  Campground.create({
//      name: "emily_peppa_pig",
//      image:"https://i.ytimg.com/vi/RQZI6k5iGe4/maxresdefault.jpg",
//      description:"this is very very interesting!!!"
//  },function(err,campground){
//      if(err){
//          console.log("something goes wrong!");
//      }else {
//          console.log("newly created campground");
//          console.log(campground);
//      }
//  });


//show register form
router.get("/register",function(req,res){
    res.render("register");
});

//handle sign up logic
router.post("/register",function(req,res){
    var newUser =  new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        });
    });
});

// show login form
router.get("/login",function(req,res){
    res.render("login",{message:req.flash("error")});
});
//handling login logic
router.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }),function(req,res){
});

//log out route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("error","logged you out!");
    res.redirect("/campgrounds");
})

// make a middleware
function IsLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;
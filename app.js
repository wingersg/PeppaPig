require('dotenv').config();

var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    flash        = require("connect-flash"),
    passport     =require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment      = require("./models/comment"),
    User = require("./models/user"),
    seedDB       = require("./seeds");
    
//requring routes
    var commentRoutes  = require("./routes/comments"),
        campgroundRoutes = require("./routes/campgrounds"),
        indexRoutes      =require("./routes/index");


// var campgrounds = [
//         {name:"katie",image: "https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/koch-741952728795-Full-Image_GalleryBackground-en-US-1483993179160._RI_SX940_.jpg"},
//         {name:"emily",image: "https://i.ytimg.com/vi/RQZI6k5iGe4/maxresdefault.jpg"},
//         {name:"didi",image: "https://pbs.twimg.com/profile_images/986624424379146240/y73xQtW2.jpg"},
//         {name:"tony",image: "http://assets.rebelcircus.com/blog/wp-content/uploads/2017/11/4234234-42.jpg"},
//         {name:"pepa",image:"http://cdn.kidscreen.com/wp/wp-content/uploads/2017/05/Peppa-Family.jpg?ebbec3"},
//         {name:"haha",image:"https://cdn.shopify.com/s/files/1/1521/5006/products/Peppa-Pig-logo_8513cde4-9284-4953-b5f1-3df7371da24b_large.png?v=1511542610"},
//         {name:"maoyin",image:"https://metrouk2.files.wordpress.com/2018/05/peppa-pig-china.jpg?w=620&h=348&crop=1"},
//         {name:"baoni",image:"https://i.ytimg.com/vi/jy7gGQlo82E/maxresdefault.jpg"}
//         ]
    
//seedDB(); // see the database
//pasport configuration
app.use(require("express-session")({
    secret:"once again rusty wins cutes dog!",
    resave:false,
    saveUninitialized:false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.locals.moment = require('moment');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
})

mongoose.connect("mongodb://localhost/yelp_camp");
//mongoose.connect("mongodb://tony:tonysmu98@ds135760.mlab.com:35760/yelpcamp");
   
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());


app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
 
// make a middleware
function IsLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("PeppaPig has started!!!");
});
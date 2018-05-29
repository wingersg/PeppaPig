var express      = require("express");
var router       = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);


// INDEX routes- show all campgrounds
router.get("/",function(req,res) {
    //get all campgrounds from DB
    Campground.find({},function(err,AllCampgrounds){
        if(err){
            console.log(err);
        }else {
           res.render("campgrounds/index",{campgrounds:AllCampgrounds,currentUser:req.user});  
        }
    })
       
});

//create, add new campgrounds
// router.post("/",IsLoggedIn,function(req,res){

//     var name=req.body.name;
//     var image=req.body.image;
//     var desc = req.body.description;
//     var author ={
//         id: req.user._id,
//         username:req.user.username
//     }
//     var newCampground = {name: name, image: image,description: desc,author:author};
//     //console.log(req.user);
    
//     // create a new campground and save to db
//     Campground.create(newCampground,function(err,newlyCreated){
//         if(err){
//             console.log(err)
//         }else {
//          res.redirect("/campgrounds");
//         }
//     })
//     //campgrounds.push(newCampground);
    
   
// });

//CREATE - add new campground to DB
router.post("/", IsLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newCampground = {name: name, image: image, description: desc, author:author, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
  });
});
   
// NEW-show form to create new campground    
router.get("/new",IsLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

// show more about the new campground
router.get("/:id",function(req,res){
    //find one campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
           //render show that template with that campground 
            res.render("campgrounds/show",{campground:foundCampground});
        }
    })
});
//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",checkCampgroundOwnership,function(req,res){
    // is user logged in?
                    Campground.findById(req.params.id,function(err,foundCampground){
                        res.render("campgrounds/edit",{campground: foundCampground});
                    });
});


// UPDATE CAMPGROUND ROUTE
// router.put("/:id",checkCampgroundOwnership,function(req,res){
//     //find and update the correct campground

//     Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
//         if(err){
//             res.redirect("/campground");
//         }else {
//             res.redirect("/campgrounds/"+ req.params.id);
//         }
//     })
//     //redirect somewhere(show page)
// });

// UPDATE CAMPGROUND ROUTE
router.put("/:id", checkCampgroundOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.campground.lat = data[0].latitude;
    req.body.campground.lng = data[0].longitude;
    req.body.campground.location = data[0].formattedAddress;

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});

//DESTROY campground route
router.delete("/:id",checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    })
})

// make a middleware
function IsLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

//CHECK CAMPGROUND OWNERSHIP MIDDLEWARE

function checkCampgroundOwnership(req,res,next){
    if(req.isAuthenticated()){
                    Campground.findById(req.params.id,function(err,foundCampground){
                if(err){
                    res.redirect("/campgrounds")
                }else{
                    // does user own the campground?
                    //console.log(foundCampground.author.id);
                    //console.log(req.user._id);
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                        //res.render("campgrounds/edit",{campground: foundCampground});
                    }else {
                        res.redirect("back");
                        //res.send("you do not have permission to do that");
                    }
                     
                }
            });
        
    }else{
        res.redirect("back");
    }
    
}


module.exports = router;
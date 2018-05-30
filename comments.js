var express      = require("express");
var router       = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//===========================
//COMMENTS ROUTES
//============================

router.get("/new",IsLoggedIn,function(req,res){
    //find campground by id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    })
    
});

router.post("/",IsLoggedIn,function(req,res){
    //lookup campgrounds using ID
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    // add username and id to comment
                    comment.author.id =req.user._id;
                    comment.author.username=req.user.username;
                    console.log("New comment's username will be:" + req.user.username);
                    //save the comment
                    comment.save();
                    console.log(comment);
                    campground.comments.push(comment);
                    campground.save();
                   res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    }
    // create new comment
    //connect new comments to campground
    //redirect campground show page
    )
});

// COMMENT EDIT route
router.get("/:comment_id/edit", function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          //res.redirect("back");
          console.log(err);
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
   });
});


//COMMENT UPDATE

router.put("/:comment_id",checkCampgroundOwnership,function(req,res){
    //res.send("you hit the update comment!");
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updateComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id",checkCampgroundOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// make a middleware
function IsLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


function checkCampgroundOwnership(req,res,next){
    if(req.isAuthenticated()){
                    Comment.findById(req.params.comment_id,function(err,foundComment){
                if(err){
                    res.redirect("back")
                }else{
                    // does user own the campground?
                    //console.log(foundCampground.author.id);
                    //console.log(req.user._id);
                    if(foundComment.author.id.equals(req.user._id)){
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
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/post");
var User = require("./models/user");


// //POST - title,content

// var postSchema = new mongoose.Schema({
//     title: String,
//     content: String
// })

// var Post = mongoose.model("Post",postSchema);


// //USER - email, name

// var userSchema = new mongoose.Schema({
//     email: String,
//     name: String,
//     posts:[postSchema]
// });

// var User = mongoose.model("User",userSchema);


Post.create({
    title: "how to cook the best burger",
    content: "this is the protocol"
},function(err,post){
    if(err){
        console.log(err);
    }else {
            User.findOne({email: "bob@gmail.com"},function(err,foundUser){
        if(err){
            console.log(err);
        }else {
            foundUser.posts.push(post);
            foundUser.save(function(err,data){
                if(err){
                    console.log(err);
                }else {
                    console.log(data);
                }
            })
        }
    })
    }

});

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// })
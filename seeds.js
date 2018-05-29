var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment    =require("./models/comment");

var data = [
    {
        name: "emily",
        image: "http://images.nickjr.com/nickjr/properties/peppa-pig/peppa-pig-1x1.jpg",
        description: "Peppa Pig is a children's television programme broadcasting on Channel 5 and Nick Jr. in the UK, Nickelodeon/Nick Jr. in the USA, ABC 4 Kids in Australia and Discovery Kids in Latin America, including Brazil. Each episode is approximately 5 minutes long. The show revolves around Peppa, an anthropomorphic female pig, and her family and friends. Each of her friends is a different species of mammal. Peppa's friends are the same age as she is, and Peppa's younger brother George's friends are the same age as him. Episodes tend to feature everyday activities such as attending playgroup, going swimming, visiting their grandparents, cousins, going to the playground or riding their bikes."
    },
        {
        name: "katie",
        image: "https://i.ytimg.com/vi/dV5_Chrp2WA/maxresdefault.jpg",
        description: "Peppa Pig is a children's television programme broadcasting on Channel 5 and Nick Jr. in the UK, Nickelodeon/Nick Jr. in the USA, ABC 4 Kids in Australia and Discovery Kids in Latin America, including Brazil. Each episode is approximately 5 minutes long. The show revolves around Peppa, an anthropomorphic female pig, and her family and friends. Each of her friends is a different species of mammal. Peppa's friends are the same age as she is, and Peppa's younger brother George's friends are the same age as him. Episodes tend to feature everyday activities such as attending playgroup, going swimming, visiting their grandparents, cousins, going to the playground or riding their bikes."
    },
        {
        name: "didi",
        image: "https://i.ytimg.com/vi/RQZI6k5iGe4/maxresdefault.jpg",
        description: "Peppa Pig is a children's television programme broadcasting on Channel 5 and Nick Jr. in the UK, Nickelodeon/Nick Jr. in the USA, ABC 4 Kids in Australia and Discovery Kids in Latin America, including Brazil. Each episode is approximately 5 minutes long. The show revolves around Peppa, an anthropomorphic female pig, and her family and friends. Each of her friends is a different species of mammal. Peppa's friends are the same age as she is, and Peppa's younger brother George's friends are the same age as him. Episodes tend to feature everyday activities such as attending playgroup, going swimming, visiting their grandparents, cousins, going to the playground or riding their bikes."
    },
            {
        name: "peppa1",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHNy2NxTKsWFpJZ6qKhq4gS8v5ky3hd9i-dCFyD1SCEk9mF7n4zw",
        description: "Peppa Pig is a children's television programme broadcasting on Channel 5 and Nick Jr. in the UK, Nickelodeon/Nick Jr. in the USA, ABC 4 Kids in Australia and Discovery Kids in Latin America, including Brazil. Each episode is approximately 5 minutes long. The show revolves around Peppa, an anthropomorphic female pig, and her family and friends. Each of her friends is a different species of mammal. Peppa's friends are the same age as she is, and Peppa's younger brother George's friends are the same age as him. Episodes tend to feature everyday activities such as attending playgroup, going swimming, visiting their grandparents, cousins, going to the playground or riding their bikes."
    },
            {
        name: "peppa2",
        image: "https://vignette.wikia.nocookie.net/peppapedia/images/1/19/Mummy_Pig.png/revision/latest?cb=20141215155635",
        description: "Peppa Pig is a children's television programme broadcasting on Channel 5 and Nick Jr. in the UK, Nickelodeon/Nick Jr. in the USA, ABC 4 Kids in Australia and Discovery Kids in Latin America, including Brazil. Each episode is approximately 5 minutes long. The show revolves around Peppa, an anthropomorphic female pig, and her family and friends. Each of her friends is a different species of mammal. Peppa's friends are the same age as she is, and Peppa's younger brother George's friends are the same age as him. Episodes tend to feature everyday activities such as attending playgroup, going swimming, visiting their grandparents, cousins, going to the playground or riding their bikes."
    },
            {
        name: "peppa3",
        image: "https://media.cardfactory.co.uk/88053/images/products/00/16600/rwf/peppa-pig-large-gift-bag_a.jpg?width=700",
        description: "Peppa Pig is a children's television programme broadcasting on Channel 5 and Nick Jr. in the UK, Nickelodeon/Nick Jr. in the USA, ABC 4 Kids in Australia and Discovery Kids in Latin America, including Brazil. Each episode is approximately 5 minutes long. The show revolves around Peppa, an anthropomorphic female pig, and her family and friends. Each of her friends is a different species of mammal. Peppa's friends are the same age as she is, and Peppa's younger brother George's friends are the same age as him. Episodes tend to feature everyday activities such as attending playgroup, going swimming, visiting their grandparents, cousins, going to the playground or riding their bikes."
    }
    ];


// add a few comments
module.exports = seedDB;


// function seedDB(){
//   //Remove all campgrounds
//   Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//         Comment.remove({}, function(err) {
//             if(err){
//                 console.log(err);
//             }
//             console.log("removed comments!");
//              //add a few campgrounds
//             data.forEach(function(seed){
//                 Campground.create(seed, function(err, campground){
//                     if(err){
//                         console.log(err)
//                     } else {
//                         console.log("added a campground");
//                         //create a comment
//                         Comment.create(
//                             {
//                                 text: "This place is great, but I wish there was internet",
//                                 author: "Homer"
//                             }, function(err, comment){
//                                 if(err){
//                                     console.log(err);
//                                 } else {
//                                     campground.comments.push(comment);
//                                     campground.save();
//                                     console.log("Created new comment");
//                                 }
//                             });
//                     }
//                 });
//             });
//         });
//     }); 
//     //add a few comments
// }
    

function seedDB(){
    //remove all campgrounds
    Campground.remove({},function(err){
    //     if(err){
    //       console.log(err); 
    //             }
    //     console.log("removed campgrounds"); 
    //         // add a few campgrounds
    // data.forEach(function(seed){
    //     Campground.create(seed,function(err,campground){
    //         if(err){
    //             console.log(err);
    //         }else{
    //             console.log("added a campground");
    //             // create a comment
    //             Comment.create(
    //                 {
    //                     text: "小猪佩奇是一个可爱的小猪。她已经五岁了，与她的猪妈妈，猪爸爸，和弟弟乔治生活在一起。佩奇最喜欢做的事情是玩游戏，打扮的漂漂亮亮，度假，以及在小泥坑里快乐的跳上跳下和与苏西羊（她最好的朋友）乔治（她的弟弟）一起玩儿，拜访她的猪爷爷，猪奶奶。故事内容多数环绕日常生活，比如小孩子们参加学前游戏小组（playgroup）、探访祖父母和表亲、在游乐场游玩、踏单车等等",
    //                     author: "holmer"
    //                 },function(err,comment){
    //                     if(err){
    //                         console.log(err);
    //                     }else{
    //                         campground.comments.push(comment);
    //                         campground.save();
    //                         console.log("Create new comment");
    //                     }
    //                 }
    //                 )
                
    //         }
    //     })
    // })
    
      })
    };
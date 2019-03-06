const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('./../../models/post');
// Profile model
const Profile = require('./../../models/profile');

// Validation
const validatePostInput = require('./../../validation/post');





router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Profile.findOne({user:req.user.id})
          .then(profile=>{
            let allfriendspost=[];
            let freindsPost=profile.allFriends.map(friend=>{
              return Post.find({user:friend.id})
                    .then(
                      posts=>{
                        return allfriendspost.push(posts)
                      }
                    )
            })

            Promise.all(freindsPost).then((completed) =>
            {


              return   res.json(allfriendspost);

            }
          );
          })
})





router.post('/',passport.authenticate('jwt', { session: false }),(req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);



router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res)=>{
Post.find({user:req.user.id})
    .then(pro=>{
      return res.json(pro);
    })
});


module.exports = router;

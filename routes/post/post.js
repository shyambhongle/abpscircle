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
   Post.find()
  .sort({ date: -1 })
  .then(posts => res.json(posts))
  .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
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




module.exports = router;

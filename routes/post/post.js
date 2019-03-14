const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('./../../models/post');
// Profile model
const Profile = require('./../../models/profile');

const multer = require("multer");
const cloudinary = require("cloudinary");


cloudinary.config({
cloud_name: 'shyambhongle',
api_key: '366169741728964',
api_secret: 'DxBneDVi-N71kHLxOWjRvF6FTeI'
});

const upload= multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
      cb(new Error('File is not supported'), false)
      return
    }
    cb(null, true)
  }
})





router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Profile.findOne({user:req.user.id})
          .then(profile=>{
            let allfriendspost=[];
            let freindsPost=profile.allFriends.map(friend=>{
              return Post.find({user:friend.id})
                    .then(
                      posts=>{
                        posts.map(singlepost=>{
                          return allfriendspost.push(singlepost)
                        })
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



router.post('/image',passport.authenticate('jwt', { session: false }),upload.single('img'),(req,res)=>{
  cloudinary.v2.uploader.upload(req.file.path,{folder:"social"},
  (error, result)=>
  {
    let title=req.body.text?req.body.text:""
    const newPost = new Post({
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar,
      user: req.user.id,
      img:{
        image:result.url,
        imageTitle:title,
        imageId:result.public_id
      }
    });
    newPost.save().then(post => res.json(post));
  })
}
);

router.post('/',passport.authenticate('jwt', { session: false }),(req,res)=>{
  console.log(req.body.text);
    const newPost = new Post({
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar,
      user: req.user.id,
      img:{
        image:false,
        imageTitle:false,
        imageId:false
      }
    });
    newPost.save().then(post => res.json(post));
  });





router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res)=>{
Post.find({user:req.user.id})
    .then(pro=>{
      return res.json(pro);
    })
});

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this post' });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
          let notifyData={
            message:`${req.user.fullName} liked your post.`,
            data:post._id
          }
          Profile.findOneAndUpdate(
            {user:post.user},
            {$push:{allnotification:notifyData},$inc:{"notification.newnotification":1}},
            {multi:true,new:true},
          ).then(newNotify=>{
            if (req.io.myclients[post.user]){
                req.io.sockets.connected[req.io.myclients[post.user].socket].emit("newnotification",newNotify);
              }else {
                console.log("not happend");
              }
          })
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));

  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));

  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        // Add to comments array
        post.comments.unshift(newComment);
        // Save
        post.save().then(post => res.json(post));
        let notifyData={
          message:`${req.user.fullName} commented on your post.`,
          data:post._id
        }
        Profile.findOneAndUpdate(
          {user:post.user},
          {$push:{allnotification:notifyData},$inc:{"notification.newnotification":1}},
          {multi:true,new:true},
        ).then(newNotify=>{
          if (req.io.myclients[post.user]){
              req.io.sockets.connected[req.io.myclients[post.user].socket].emit("newnotification",newNotify);
            }else {
              console.log("not happend");
            }
        })
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);




module.exports = router;

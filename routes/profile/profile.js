const express=require('express');
const router=express.Router();
const passport=require('passport');
const Profile=require('./../../models/profile');
const User=require('./../../models/user');
const Post=require('./../../models/post');


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





router.get('/',passport.authenticate('jwt', { session: false }),  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {

           res.json(profile);

        }else {
          let newProfile=new Profile({
            user:req.user.id,
            name:req.user.name,
            avatar:req.user.avatar,
            handle:Math.floor(req.user.date.getTime()/1000),
            fullName:req.user.fullName
          }).save().then(newprofile=>{
            return res.json(newprofile);
          })
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post('/profilepicture',passport.authenticate('jwt',{session:false}),
upload.single('img'),(req,res)=>{
  cloudinary.v2.uploader.upload(req.file.path,{public_id:req.user.avatarId,folder:"profile"},
  (error, result)=>
  {
    User.findOneAndUpdate(
      {_id:req.user.id},
      {$set:{avatar:result.url}},
      {new:true}
    ).then(up=>{console.log('')});
    Profile.findOneAndUpdate(
      {user:req.user.id},
      {$set:{avatar:result.url}},
      {new:true}
    ).then(update=>res.json(update))
  })
})



router.post('/clear/friendRequest',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Profile.findOneAndUpdate(
    {_id:req.body.id},
    {$set:{"notification.friendRequest":0}},
    {new:true}
  ).then(pro=>res.json(pro))
})

router.post('/clear/newnotification',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Profile.findOneAndUpdate(
    {_id:req.body.id},
    {$set:{"notification.newnotification":0}},
    {new:true}
  ).then(pro=>res.json(pro))
})

router.post('/clear/newmessage',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Profile.findOneAndUpdate(
    {_id:req.body.id},
    {$set:{"notification.newmessage":0}},
    {new:true}
  ).then(pro=>res.json(pro))
})


router.post('/getselectedpost',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Post.findById(req.body.id)
      .exec()
      .then(post=>{
        res.json(post)
      })
})



module.exports=router;

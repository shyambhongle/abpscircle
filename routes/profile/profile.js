const express=require('express');
const router=express.Router();
const passport=require('passport');
const Profile=require('./../../models/profile');
const User=require('./../../models/user');
const Post=require('./../../models/post');



router.get('/',passport.authenticate('jwt', { session: false }),  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          let newProfile=new Profile({
            user:req.user.id,
            name:req.user.name,
            avatar:req.user.avatar,
            handle:Math.floor(req.user.date.getTime()/1000)
          }).save().then(newprofile=>{
            return res.json(newprofile);
          })
        }else {
          return res.json(profile);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);








module.exports=router;

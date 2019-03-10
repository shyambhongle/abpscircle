const express=require('express');
const router=express.Router();
const passport=require('passport');
const Profile=require('./../../models/profile');
const Post=require('./../../models/post');
const User=require('./../../models/user');




router.post('/input',(req,res)=>{
  User.find()
      .then(users=>{
        let newList=[];
        let test=users.map(user=>{
          let x= user.fullName.includes(req.body.keyword.toLowerCase());
          return x?newList.push({friend:user.fullName,id:user._id,avatar:user.avatar}):null
        })
        Promise.all(test).then((completed)=>{
      return res.json(newList)
        })
      })
})


router.post('/friendprofile',(req,res)=>{
Profile.findOne({user:req.body.id})
    .then(profile=>{
      return res.json(profile);
    })
})

router.post('/friendpost',(req,res)=>{
  console.log(req.body.id);
  Post.find({user:req.body.id})
      .then(post=>{
        return res.json(post)
      })
})


module.exports=router;

const express=require('express');
const router=express.Router();
const passport=require('passport');
const Profile=require('./../../models/profile');
const Post=require('./../../models/post');




router.post('/input',(req,res)=>{
  Profile.find()
      .then(users=>{
        let newList=[];
        let test=users.map(user=>{
          let x= user.name.includes(req.body.keyword.toLowerCase());
          return x?newList.push({friend:user.name,id:user._id}):null
        })
        Promise.all(test).then((completed)=>{
      return res.json(newList)
        })
      })
})


router.post('/friendprofile',(req,res)=>{
Profile.findById(req.body.id)
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

const express=require('express');
const router=express.Router();
const Post=require('./../../models/post');
const passport=require('passport')
const Messages=require('./../../models/messages');



router.get('/onlinefriends',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Profile.findOne({user:req.user.id})
          .exec()
          .then(profile=>{
            let onlineFriends=[];
            profile.allFriends.map(fri=>{
              return req.io.myclients[fri.user]!==undefined?onlineFriends.push(fri):null
            })
            console.log(onlineFriends);
          })
})

router.post('/usermessage',passport.authenticate('jwt',{session:false}),(req,res)=>{

Profile.findOne({user:req.user.id})
        .exec()
        .then(profile=>{
          console.log(req.body.id);
          let test=false;
          console.log(profile);
          profile.commonId.map(i=>{
            return i.reciver==req.body.id?test=i.common:null;
          });
          console.log(test);
          if (test!==false) {
            Messages.findById(test)
                    .then(allMsg=>{
                      res.json(allMsg.message)
                    })
          }else {
            res.json([])
          }
        })

})




router.post('/newmessage',passport.authenticate('jwt',{session:false}),(req,res)=>{

  Profile.findOne({user:req.user.id})
         .exec()
         .then(profile=>{
          let test=false;
          profile.commonId.map(i=>{
            return i.reciver==req.body.id?test=i.common:null;
          });
          if (test!==false) {
            let msgData={
              userName:req.user.fullName,
              msg:req.body.text,
              date:new Date()
            }
            console.log("update");
            Messages.findOneAndUpdate(
              {_id:test},
              {$push:{message:msgData}},
              {new:true}
            ).then(re=>{res.json(re)})
          }else{
            console.log("new");
            let msgUser=[req.body.id,req.user.id]
            let msgData={
              userName:req.user.fullName,
              msg:req.body.text,
              date:new Date()
            }
            const newMessage=new Messages({
              users:[...msgUser],
              message:[msgData]
            }).save().then(msg=>{

              Profile.findOneAndUpdate(
                {user:req.user.id},
                {$push:{commonId:{reciver:req.body.id,common:msg._id}}},
                {new:true}
              ).then(re=>{res.json(re)})

              Profile.findOneAndUpdate(
                {user:req.body.id},
                {$push:{commonId:{reciver:req.user.id,common:msg._id}}},
                {new:true}
              ).then(re=>{console.log(re)})

            })
          }


         })


 })






module.exports=router;

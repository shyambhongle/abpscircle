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
            Profile.findOneAndUpdate(
              {user:req.body.id},
              {$inc:{"notification.newmessage":1}},
              {new:true}
            ).exec().then(n=>{
              if (req.io.myclients[req.body.id]){
                  req.io.sockets.connected[req.io.myclients[req.body.id].socket].emit("newMessageNot",n);
                }else {
                  console.log("not happend");
                }
            });

            Messages.findOneAndUpdate(
              {_id:test},
              {$push:{message:msgData},$set:{date:new Date()}},
              {new:true}
            ).then(re=>{res.json(re);
                if (req.io.myclients[req.body.id]){
                    req.io.sockets.connected[req.io.myclients[req.body.id].socket].emit("newMessage",re);
                  }else {
                    console.log("not happend");
                  }
            })


          }else{
            console.log("new",req.body);
            let msgUser=[{user:req.body.id,name:req.body.name,avatar:req.body.senderAvatar},
            {user:req.user.id,name:req.user.fullName,avatar:req.user.avatar}]
            let msgData={
              userName:req.user.fullName,
              msg:req.body.text,
              date:new Date()
            }
            const newMessage=new Messages({
              users:[...msgUser],
              message:[msgData],
              date:new Date()
            }).save().then(msg=>{

              Profile.findOneAndUpdate(
                {user:req.user.id},
                {$push:{commonId:{reciver:req.body.id,common:msg._id}}},
                {new:true}
              ).then(re=>{res.json(msg)})

              Profile.findOneAndUpdate(
                {user:req.body.id},
                {$push:{commonId:{reciver:req.user.id,common:msg._id}},
                $inc:{"notification.newmessage":1}},
                {new:true}
              ).then(re=>{console.log(re)})

            })
          }

         })
 })


router.post('/inbox',passport.authenticate('jwt',{session:false}),(req,res)=>{
  let allMessages=[];
  let myInbox=req.body.commonId.map(ids=>{
    return Messages.findById({_id:ids.common})
          .then(
            msg=>{
              let msgUser;
                msg.users.map(i=>{
                  return i.user!==req.user.id?msgUser=i:null;
                })
                return allMessages.push(
                  {user:msgUser,
                  message:msg.message[msg.message.length-1]})
              })
            });

  Promise.all(myInbox).then((completed) =>
  {
    return   res.json(allMessages);
  }
);
})




module.exports=router;

const express=require('express');
const router=express.Router();
const Profile=require('./../../models/profile');
const mongoose=require('mongoose');
const passport=require('passport');




router.post('/addfriend',passport.authenticate('jwt',{session:false}),(req,res)=>{
      let data={
        id:req.user.id,
        name:req.user.fullName,
        avatar:req.user.avatar
      }
      Profile.findOneAndUpdate(
        {user:req.body.id},
        {$push:{friendRequest:data},$inc:{"notification.friendRequest":1}},
        {multi:true,new:true},
      ).exec().then(n=>{
        if (req.io.myclients[req.body.id]){
            req.io.sockets.connected[req.io.myclients[req.body.id].socket].emit("newrequest", n);
          }else {
            console.log("not happend");
          }});

      let oppdata={
        id:req.body.id,
        name:req.body.fullName,
        avatar:req.body.avatar
      }
      Profile.findOneAndUpdate(
        {user:req.user.id},
        {$push:{sentRequest:oppdata}},
        {new:true},
      ).exec().then(newreq=>{
        res.json(newreq)})
})





router.post('/acceptrequest',passport.authenticate('jwt',{session:false}),(req,res)=>{
Profile.findOne({user:req.user.id})
        .exec()
        .then(profile=>{
          let data={
            id:req.body.id,
            name:req.body.name
          }
          let oppdata={
            id:req.user.id,
            name:req.user.fullName,
            avatar:req.user.avatar
          }
          //adding seneder to friendslist of accepted
          Profile.findOneAndUpdate(
            {user:req.user.id},
            {$push:{allFriends:data}},
            {new:true},
          ).exec().then(ne=>{})

          //deleteing friendRequest which was  accepted
          Profile.findOneAndUpdate(
            {user:req.user.id},
            {$pull:{friendRequest:{id:req.body.id}},$inc:{"notification.friendRequest":-1}},
            {new:true,multi:true},
          ).exec().then(ne=>{res.json(ne)})

        //adding accpter to friendlist of senders
            Profile.findOneAndUpdate(
              {user:req.body.id},
              {$push:{allFriends:oppdata}},
              {new:true}
            ).exec().then(ne=>{})

            //deleteing sent request from senders
            Profile.findOneAndUpdate(
              {user:req.body.id},
              {$pull:{sentRequest:{id:req.user.id}}},
              {new:true}
            ).exec().then(ne=>{  if (req.io.myclients[req.body.id]){
                  req.io.sockets.connected[req.io.myclients[req.body.id].socket].emit("newrequest", ne);
                }else {
                  console.log("not happend");
                }})
        })

})




router.post('/cancelrequest',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOneAndUpdate(
      {user:req.body.id},
      {$pull:{friendRequest:{id:req.user.id}},$inc:{"notification.friendRequest":-1}},
      {multi:true,new:true}
    ).exec().then(n=>{
      if (req.io.myclients[req.body.id]){
          req.io.sockets.connected[req.io.myclients[req.body.id].socket].emit("newrequest", n);
        }else {
          console.log("not happend");
        }
    })
    Profile.findOneAndUpdate(
      {user:req.user.id},
      {$pull:{sentRequest:{id:req.body.id}}},
      {new:true},
    ).exec().then(newreq=>{res.json(newreq)})
})



router.post('/reject',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOneAndUpdate(
      {user:req.body.id},
      {$pull:{sentRequest:{id:req.user.id}}},
      {new:true},
    ).exec().then(n=>{
      if (req.io.myclients[req.body.id]){
          req.io.sockets.connected[req.io.myclients[req.body.id].socket].emit("newrequest", n);
        }else {
          console.log("not happend");
        }
    })
    Profile.findOneAndUpdate(
      {user:req.user.id},
      {$pull:{friendRequest:{id:req.body.id}}},
      {new:true},
    ).exec().then(newreq=>{})
})



router.post('/unfriend',passport.authenticate('jwt',{session:false}),(req,res)=>{

    Profile.findOneAndUpdate(
      {user:req.body.id},
      {$pull:{allFriends:{id:req.user.id}}},
      {new:true},
    ).exec().then(n=>{
      if (req.io.myclients[req.body.id]){
          req.io.sockets.connected[req.io.myclients[req.body.id].socket].emit("newrequest", n);
        }else {
          console.log("not happend");
        }
    })
    Profile.findOneAndUpdate(
      {user:req.user.id},
      {$pull:{allFriends:{id:req.body.id}}},
      {new:true},
    ).exec().then(newreq=>{res.json(newreq)})
})
module.exports=router;

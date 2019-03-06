const express=require('express');
const router=express.Router();
const Profile=require('./../../models/profile');
const mongoose=require('mongoose');
const passport=require('passport');




router.post('/addfriend',passport.authenticate('jwt',{session:false}),(req,res)=>{
      let data={
        id:req.user.id,
        name:req.user.name
      }
      Profile.findOneAndUpdate(
        {user:req.body.id},
        {$push:{friendRequest:data}},
        {new:true},
      ).then(n=>{
        if (req.io.myclients[req.body.id]){
            req.io.sockets.connected[req.io.myclients[req.body.id].socket].emit("newrequest", n);
          }
});
      let oppdata={
        id:req.body.id,
        name:req.body.name
      }
      Profile.findOneAndUpdate(
        {user:req.user.id},
        {$push:{sentRequest:oppdata}},
        {new:true},
      ).then(newreq=>{
        res.json(newreq)})
})





router.post('/acceptrequest',passport.authenticate('jwt',{session:false}),(req,res)=>{
Profile.findOne({user:req.user.id})
        .then(profile=>{
          let data={
            id:req.body.id,
            name:req.body.name
          }
          let oppdata={
            id:req.user.id,
            name:req.user.name
          }
          //adding seneder to friendslist of accepted
          Profile.findOneAndUpdate(
            {user:req.user.id},
            {$push:{allFriends:data}},
            {new:true},
          ).then(ne=>{console.log(ne.allFriends)})

          //deleteing friendRequest which was  accepted
          Profile.findOneAndUpdate(
            {user:req.user.id},
            {$pull:{friendRequest:{id:req.body.id}}},
            {new:true},
          ).then(ne=>{res.json(ne)})

        //adding accpter to friendlist of senders
            Profile.findOneAndUpdate(
              {user:req.body.id},
              {$push:{allFriends:oppdata}},
              {new:true}
            ).then(ne=>{console.log(ne.allFriends)})

            //deleteing sent request from senders
            Profile.findOneAndUpdate(
              {user:req.body.id},
              {$pull:{sentRequest:{id:req.user.id}}},
              {new:true}
            ).then(ne=>{  if (req.io.myclients[req.body.id]){
                  req.io.sockets.connected[req.io.myclients[req.body.id].socket].emit("newrequest", ne);
                }})
        })

})




router.post('/cancelrequest',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOneAndUpdate(
      {user:req.body.id},
      {$pull:{friendRequest:{id:req.user.id}}},
      {new:true},
    ).then(n=>{
      if (req.io.myclients[req.body.id]){
          req.io.sockets.connected[req.io.myclients[req.body.id].socket].emit("newrequest", n);
        }
    })
    Profile.findOneAndUpdate(
      {user:req.user.id},
      {$pull:{sentRequest:{id:req.body.id}}},
      {new:true},
    ).then(newreq=>{res.json(newreq)})
})



router.post('/reject',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOneAndUpdate(
      {user:req.body.id},
      {$pull:{sentRequest:{id:req.user.id}}},
      {new:true},
    ).then(n=>{
      if (req.io.myclients[req.body.id]){
          req.io.sockets.connected[req.io.myclients[req.body.id].socket].emit("newrequest", n);
        }
    })
    Profile.findOneAndUpdate(
      {user:req.user.id},
      {$pull:{friendRequest:{id:req.body.id}}},
      {new:true},
    ).then(newreq=>{console.log(newreq)})
})



router.post('/unfriend',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOneAndUpdate(
      {user:req.body.id},
      {$pull:{allFriends:{id:req.user.id}}},
      {new:true},
    ).then(n=>{
      if (req.io.myclients[req.body.id]){
          req.io.sockets.connected[req.io.myclients[req.body.id].socket].emit("newrequest", n);
        }
    })
    Profile.findOneAndUpdate(
      {user:req.user.id},
      {$pull:{allFriends:{id:req.body.id}}},
      {new:true},
    ).then(newreq=>{res.json(newreq)})
})









module.exports=router;

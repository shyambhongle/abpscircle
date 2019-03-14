const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
      type: Schema.Types.ObjectId
  },
  name: {
  firstName:{
    type:String,
    required:true,
    trim:true
  },
  lastName:{
    type:String,
    required:true,
    trim:true
  }
  },
  fullName:{
    type:String
  },
  avatar:{
    type:String,
    required:true
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  notification:{
    friendRequest:{
      type:Number,
      default:0
    },
    newmessage:{
      type:Number,
      default:0
    },
    newnotification:{
      type:Number,
      default:0
    },
  },
  allnotification:{
    type:Array
  },
  commonId:{
    type:Array
  },
  inbox:{
    type:Array
  },
  date: {
    type: Date,
    default: Date.now
  },
    friendRequest:{
      type:Array
    },
    sentRequest:{
      type:Array
    },
    allFriends:{
      type:Array
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);

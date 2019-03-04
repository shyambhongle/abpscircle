const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  name:{
    type:String,
    required:true
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

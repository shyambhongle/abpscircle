const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type:String
  },
  text: {
    type: String,
  },
  img:{
    type:Object
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
  }},
  someoneid:{
    id:{type:String,default:"no"},
    avatar:{type:String,default:"no"},
    name:{type:String,default:"no"}
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: String
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
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
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const messageSchema=new Schema({
  users:{
    type:Array
  },
  message:{
    type:Array
  },
  date:{
    type:String
  }
})

const Messages=mongoose.model('messages',messageSchema);

module.exports=Messages;

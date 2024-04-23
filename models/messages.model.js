const  mongoose=require('mongoose');
const validator = require('validator');
const MessageSchema=mongoose.Schema({
   CategoryId:{
    type:mongoose.Types.ObjectId,
    ref:'Category'
   },
   Country:{
   type:String
   },
   sendTo:{
    type:String,
    enum:["sendall","sendPerCountry","SendPerCategory"]
   },
   message:{
    type:String,
   }
})

const MessageModel=mongoose.model('Message',MessageSchema);
module.exports={
  MessageModel
}
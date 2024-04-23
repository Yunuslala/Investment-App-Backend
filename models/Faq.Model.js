const  mongoose=require('mongoose');
const validator = require('validator');
const FaqSchema=mongoose.Schema({
   question:{
    type:String
   },
   answer:{
    type:String
   },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

const FaqModel=mongoose.model('Faq',FaqSchema);
module.exports={
  FaqModel
}
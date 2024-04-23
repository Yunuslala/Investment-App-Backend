const  mongoose=require('mongoose');
const validator = require('validator');
const UserPortfollioSchema=mongoose.Schema({
   InvestOptionId:{
    type:mongoose.Types.ObjectId,
    ref:'InvestmentOption'
   },
   UserId:{
    type:mongoose.Types.ObjectId,
    ref:'User'
   },
   CategoryId:{
    type:mongoose.Types.ObjectId,
    ref:'Category'
   },
   isActivated:{
    type:Boolean,
    dafault:true,
    required:true,
   },
   paidMoney:{
    type:String
   },
   createdAt: {
    type: Date,
    default: Date.now,
  },
})

const UserPortfollioModel=mongoose.model('UserPortfollio',UserPortfollioSchema);
module.exports={
  UserPortfollioModel
}
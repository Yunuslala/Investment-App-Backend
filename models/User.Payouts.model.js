const  mongoose=require('mongoose');
const validator = require('validator');
const payoutSchema=mongoose.Schema({
    UserId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    DateOfPayoutIssued:{
        type:Date,
    },
    AmountTransfered:{
        type:String
    },
    TransactionType:{
        type:String
    },
    CurrentReturnRate:{
        type:String
    },
    CategoryId:{
        type:mongoose.Types.ObjectId,
        ref:'Category'
    },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

const PayoutModel=mongoose.model('Payout',payoutSchema);
module.exports={
  PayoutModel
}
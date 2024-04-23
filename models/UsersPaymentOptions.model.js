const  mongoose=require('mongoose');
const validator = require('validator');
const PaymentOptions=mongoose.Schema({
    UserId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    Username:{
        type:String,
    },
    accountNumber:{
        type:String,
    },
    BankName:{
        type:String,
    },
    BankAddress:{
        type:String,
    },
    SwiftCode:{
        type:String,
    },
    IfscCode:{
        type:String,
    },
    ContactNumber:{
        type:String
    },
    PaypalLink:{
        type:String
    },
    otherPayoutLinks:{
        type:String
    },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

const PaymentOptionsModel=mongoose.model('PaymentOptions',PaymentOptions);
module.exports={
  PaymentOptionsModel
}
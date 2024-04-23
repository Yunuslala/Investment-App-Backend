const  mongoose=require('mongoose');
const validator = require('validator');
const InvestmentOptionSchema=mongoose.Schema({
    CompanyName: {
        type: String,
        unique:true,
      },
      Logo:{
        type:String
      },
      VideoMessage:{
        type:String
      },
      Documents:{
        type:String
      },
      CategoryId:{
        type:mongoose.Types.ObjectId,
        ref:'Category'
      },
      AboutCompany: {
        type: String,
        
      },
      HashTags: {
        type: String,
      },
      BuisnessType: {
        type: String,
      },
     
      WebsiteLink:{
        type:String
      },
      InvestmentSizeMin: {
        type: String,
      },
      InvestmentSizeMax: {
        type: String,
      },
      LockingPeriod: {
        type: String,
      },
      Payouts: {
        type: String,
        enum:["Quarterly","Half-Yearly","Yearly"]
      },
      ReturnRateMin: {
        type: String,
      },
      ReturnRateMax: {
        type: String,
      },
      OperationsOfCompany: {
        type: String,
      },
      isDeleted:{
        type:Boolean,
        default:false
      },
     
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

const InvestmentOptionModel=mongoose.model('InvestmentOption',InvestmentOptionSchema);
module.exports={
  InvestmentOptionModel
}
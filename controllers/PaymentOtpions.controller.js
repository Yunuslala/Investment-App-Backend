const AsyncErrorHandler = require("../middlewares/AsyncerrorHandler");
const { ErrorHandler } = require("../utils/Error.Handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const SentMail = require("../utils/SentMail");
const { InvestmentOptionModel } = require("../models/InvestmentOption.model");
const { PaymentOptionsModel } = require("../models/UsersPaymentOptions.model");

exports.RegisterPaymentOptions = AsyncErrorHandler(async (req, res, next) => {
  const {
   UserId,
   Username,
   accountNumber,
   BankName,
   BankAddress,
   SwiftCode,
   IfscCode,
   Number,
   PaypalLink,
   otherpayoutLinks
  } = req.body;


  console.log(req.body)
  const findUser=await PaymentOptionsModel.findOne({UserId});
  if(findUser){
    const UpdateOptions=await PaymentOptionsModel.findByIdAndUpdate({UserId},{
      Username:Username? Username:findUser.Username,
      accountNumber:accountNumber? accountNumber:findUser.accountNumber,
      BankName:BankName? BankName:findUser.BankName,
      BankAddress:BankAddress? BankAddress:findUser.BankAddress,
      SwiftCode:SwiftCode? SwiftCode:findUser.SwiftCode,
      IfscCode:IfscCode? IfscCode:findUser.IfscCode,
      ContactNumber:ContactNumber? ContactNumber:findUser.ContactNumber,
      PaypalLink:PaypalLink? PaypalLink:findUser.PaypalLink,
      otherpayoutLinks:otherpayoutLinks? otherpayoutLinks:findUser.otherpayoutLinks,
  },{new:true})
    return res.status(201).send({
      success: true,
      msg: "Payout Options has been registered sucessfully",
      data: UpdateOptions,
    });
  }
  const Investment = new PaymentOptionsModel({
    UserId,
    Username,
    accountNumber,
    BankName,
    BankAddress,
    SwiftCode,
    IfscCode,
    Number,
    PaypalLink,
    otherpayoutLinks
  });
  await Investment.save();
  return res.status(201).send({
    success: true,
    msg: "Payout Options has been registered sucessfully",
    data: Investment,
  });
});



exports.getUserpayoutOptions = AsyncErrorHandler(async (req, res, next) => {
    const UserId=req.params.id;
  const UsersData = await PaymentOptionsModel.findOne({UserId});
  if(!UsersData){
    return next(new ErrorHandler(404,"user pay options does not exist "))
  }
  return res.status(200).send({
    sucess: true,
    msg: "User pay options disprersed",
    data: UsersData,
  });
});


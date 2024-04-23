const AsyncErrorHandler = require("../middlewares/AsyncerrorHandler");
const { ErrorHandler } = require("../utils/Error.Handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const SentMail = require("../utils/SentMail");
const { PayoutModel } = require("../models/User.Payouts.model");


exports.CreateUsersPayout = AsyncErrorHandler(async (req, res, next) => {
  const {
    SelectId,
    DateOPayoutIssued,
    TransactionType,
    CurrentRatingRate,
    CategoryId
  } = req.body;
  const CreatePayout = new PayoutModel({
    UserId:SelectId,
    DateOPayoutIssued,
    TransactionType,
    CurrentRatingRate,
    CategoryId
  });
  await CreatePayout.save();
  return res.status(201).send({
    success: true,
    msg: "User payout has been created sucessfully",
    data:CreatePayout
  });


});

exports.GetUsersPayout= AsyncErrorHandler(async (req, res, next) => {
  const UserId=req.params._id;
  const GetUserPayout=await PayoutModel.find({UserId}).populate('CategoryId');
  if(!GetUserPayout.length){
    return next(new ErrorHandler(404,"Users payout details does not exist"))
  }
  return res.status(200).send({
    success:true,
    msg:"users payouts detail",
    data:GetUserPayout
  })
});





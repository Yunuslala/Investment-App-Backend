const AsyncErrorHandler = require("../middlewares/AsyncerrorHandler");
const { ErrorHandler } = require("../utils/Error.Handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const SentMail = require("../utils/SentMail");
const { InvestmentOptionModel } = require("../models/InvestmentOption.model");
const { MessageModel } = require("../models/messages.model");

exports.SendMessages = AsyncErrorHandler(async (req, res, next) => {
  const {
    CategoryId,
    Country,
    SendTo,
    message
  } = req.body;
  const payload={Country,
    SendTo,
    message}
  if(CategoryId){
    payload["CategoryId"]=CategoryId
  }
  console.log("payload",payload,"reqbody",req.body)
  const Message = new MessageModel(payload);
  await Message.save();
  return res.status(201).send({
    success: true,
    msg: "message has been send sucessfully",
    data:Message,
  });
});

exports.GetMessages = AsyncErrorHandler(
  async (req, res, next) => {
   const getAllMessage=await MessageModel.find()
    return res.status(200).send({
      success: true,
      msg: "All messages has been dispersed",
      token,
      data: getAllMessage,
    });
  }
);
exports.GetMessagesPerCountry= AsyncErrorHandler(
    async (req, res, next) => {
        const {Country}=req.body;
     const getAllMessage=await MessageModel.find({Country})
      return res.status(200).send({
        success: true,
        msg: "All messages per country dispersed",
        token,
        data: getAllMessage,
      });
    }
  );

exports.GetMessagesPerCategory= AsyncErrorHandler(
    async (req, res, next) => {
        const {CategoryId}=req.body;
     const getAllMessage=await MessageModel.find({CategoryId})
      return res.status(200).send({
        success: true,
        msg: "All messages per Categories dispersed",
        token,
        data: getAllMessage,
      });
    }
  );


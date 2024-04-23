const AsyncErrorHandler = require("../middlewares/AsyncerrorHandler");
const { ErrorHandler } = require("../utils/Error.Handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const { TicketModel } = require("../models/CreatTicke.model");

exports.RegisterTicket = AsyncErrorHandler(async (req, res, next) => {
  const {
    Subject,
    type,
    Description,
    UserId
  } = req.body;
  let TicketFile
  if(req.file){
    TicketFile=req.file.path
  }
  const Investment = new TicketModel({
    Subject,
    type,
    Description,
    TicketFile,
    UserId
  });
  await Investment.save();
  return res.status(201).send({
    success: true,
    msg: "Ticket has been raised",
    data: Investment,
  });
});

exports.GetAllTickets = AsyncErrorHandler(async (req, res, next) => {
   const Tickets=await TicketModel.find()
    return res.status(201).send({
      success: true,
      msg: "All Tickets has been dispersed",
      data: Tickets,
    });
  });

exports.GetTicketsByUserId=AsyncErrorHandler(async(req,res,next)=>{
    const {UserId}=req.body;
    const findById=await TicketModel.find({UserId});
    return res.status(200).send({success:true,msg:"Users Ticket dispersed",data:findById})
})
const AsyncErrorHandler = require("../middlewares/AsyncerrorHandler");
const { ErrorHandler } = require("../utils/Error.Handler");
require("dotenv").config();
const { UserPortfollioModel } = require("../models/Portfollio.Model");
const {InvestmentOptionModel}=require("../models/InvestmentOption.model")
exports.SubscribeOptions = AsyncErrorHandler(async (req, res, next) => {
  const {
  InvestOptionId,UserId,paidMoney
  } = req.body;
  const findPortfolio=await UserPortfollioModel.findOne({InvestOptionId,UserId})
 
  if(findPortfolio){
    return next(new ErrorHandler(400,"Already subscribed"))
  }

  const findInvest=await InvestmentOptionModel.findOne({_id:InvestOptionId})
  const SubscribeInvestment = new UserPortfollioModel({
    InvestOptionId,UserId,paidMoney,CategoryId:findInvest?.CategoryId,isActivated:true
  });
  await SubscribeInvestment.save();
  return res.status(201).send({
    success: true,
    msg: "Subscribe Investment Option has been registered sucessfully",
    data: SubscribeInvestment ,
  });
});

exports.GetPortfolliosByCategory = AsyncErrorHandler(
  async (req, res, next) => {
    const {CategoryId}=req.body;
    const UserId=req.params.id
    const AllPortfollios=await UserPortfollioModel.findOne({UserId,CategoryId}).populate('InvestOptionId').populate('UserId').populate("CategoryId");
    return res.status(200).send({
        success:true,
        msg:"All portfollios of users",
        data:AllPortfollios
    })
  }
);

exports.getAllPortfollios = AsyncErrorHandler(async (req, res, next) => {
  const UsersData = await UserPortfollioModel.find().populate('InvestOptionId').populate('UserId').populate("CategoryId");
  return res.status(200).send({
    sucess: true,
    msg: "All Options disprersed",
    data: UsersData,
  });
});
exports.userPortfollio= AsyncErrorHandler(async (req, res, next) => {
    const UsersData = await UserPortfollioModel.find({UserId:req.body.UserId}).populate('InvestOptionId').populate('UserId').populate("CategoryId");
    return res.status(200).send({
      sucess: true,
      msg: "User portfollio dispersed",
      data: UsersData,
    });
  });

const express=require("express");
const PayoutDetailsRouter=express.Router();
const {Authentication}=require("../middlewares/Authenitcation");
const { CreateUsersPayout, GetUsersPayout } = require("../controllers/User.Payout.Controller");


PayoutDetailsRouter.route("/User/Create-Payouts").post(Authentication,CreateUsersPayout);
PayoutDetailsRouter.route("/User/getUsersPayout").get(Authentication,GetUsersPayout);



module.exports={
    PayoutDetailsRouter
}
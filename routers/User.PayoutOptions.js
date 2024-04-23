const express=require("express");
const PayoutOptionsRouter=express.Router();
const {Authentication}=require("../middlewares/Authenitcation");
const { CreateUsersPayout, GetUsersPayout } = require("../controllers/User.Payout.Controller");
const { RegisterPaymentOptions, updatePayoutOptions, getUserpayoutOptions } = require("../controllers/PaymentOtpions.controller");


PayoutOptionsRouter.route("/User/Create-PayoutOptions").post(Authentication,RegisterPaymentOptions);
PayoutOptionsRouter.route("/User/Get-PayoutOptions/:id").get(Authentication,getUserpayoutOptions);



module.exports={
    PayoutOptionsRouter
}
const express=require("express");
const portfollioRouter=express.Router();
const {Authentication}=require("../middlewares/Authenitcation");
const { SubscribeOptions, GetPortfolliosByCategory, getAllPortfollios, userPortfollio } = require("../controllers/UserPortfollio.Controller");


portfollioRouter.route("/User/Subscribe-Options").post(Authentication,SubscribeOptions);
portfollioRouter.route("/Admin/GetPortfollios-Category/:id").post(Authentication,GetPortfolliosByCategory);
portfollioRouter.route("/User/getAllPortfollios").get(Authentication,getAllPortfollios);
portfollioRouter.route("/User/Portfollio").get(Authentication,userPortfollio);




module.exports={
    portfollioRouter
}
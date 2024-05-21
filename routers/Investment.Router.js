const express=require("express");
const InvestmentOptionsRouter=express.Router();
const {Authentication}=require("../middlewares/Authenitcation");
const { upload } = require("../utils/multer");
const { RegisterInvestmentOption, UpdateRegisterInvestmentOption, getAllInvestmentOption, getAllInvestmentOptionByCategory } = require("../controllers/Investment.Controller");
InvestmentOptionsRouter.route("/Admin/register-Investment").post(upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]),Authentication,RegisterInvestmentOption);
InvestmentOptionsRouter.route("/Admin/Update-Investment/:id").patch(upload.fields([
  { name: 'image', maxCount: 1 }, // For image file
  { name: 'video', maxCount: 1 }, // For video file
  { name: 'pdf', maxCount: 1 },   // For PDF file
]),Authentication,UpdateRegisterInvestmentOption);
InvestmentOptionsRouter.route("/User/getAllOptions").get(Authentication,getAllInvestmentOption);
InvestmentOptionsRouter.route("/User/getOptions/:id").get(Authentication,getAllInvestmentOptionByCategory);



module.exports={
    InvestmentOptionsRouter
}
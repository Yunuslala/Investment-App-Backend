const express=require("express");
const CategoryRouter=express.Router();
const {Authentication}=require("../middlewares/Authenitcation");
const { RegisterInvestmentOption, UpdateRegisterInvestmentOption, getAllInvestmentOption, getAllInvestmentOptionByCategory } = require("../controllers/Investment.Controller");
const { RegisterCategory, UpdateCateogry, getAllCategory } = require("../controllers/Categories.Controller");


CategoryRouter.route("/Admin/register-Category").post(Authentication,RegisterCategory);
CategoryRouter.route("/Admin/Update-Category").post(Authentication,UpdateCateogry);
CategoryRouter.route("/User/getAllCategory").get(getAllCategory);



module.exports={
    CategoryRouter
}
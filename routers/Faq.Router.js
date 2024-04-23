const express=require("express");
const FaqRouter=express.Router();
const {Authentication}=require("../middlewares/Authenitcation");
const { CreateFaq, getAllFaq } = require("../controllers/Faq.Controller");


FaqRouter.route("/Admin/Create-Faq").post(Authentication,CreateFaq);
FaqRouter.route("/User/getAllFaq").get(getAllFaq);



module.exports={
    FaqRouter
}
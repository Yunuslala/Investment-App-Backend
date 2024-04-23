const AsyncErrorHandler = require("../middlewares/AsyncerrorHandler");
const { ErrorHandler } = require("../utils/Error.Handler");
require("dotenv").config();
const { FaqModel } = require("../models/Faq.Model");


exports.CreateFaq= AsyncErrorHandler(async (req, res, next) => {
  const {
  question,answer
  } = req.body;

  const saveUser = new FaqModel({
    question,answer
  });
  await saveUser.save();
  return res.status(201).send({
    success: true,
    msg: "Faqr has been registered sucessfully",
  });
});



exports.getAllFaq=AsyncErrorHandler(async(req,res,next)=>{
    const UsersData=await FaqModel.find();
    return res.status(200).send({
        sucess:true,
        msg:"All users disprersed",
        data:UsersData
    });
})



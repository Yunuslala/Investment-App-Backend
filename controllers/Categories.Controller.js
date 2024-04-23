const AsyncErrorHandler = require("../middlewares/AsyncerrorHandler");
const { ErrorHandler } = require("../utils/Error.Handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const SentMail = require("../utils/SentMail");
const { CategoryModel } = require("../models/Categories.Model");


exports.RegisterCategory= AsyncErrorHandler(async (req, res, next) => {
  const {
  name
  } = req.body;
  const findExisting = await CategoryModel.findOne({ name });
  if (findExisting) {
    return next(new ErrorHandler(400, "this category already exist"));
  }
 
  const saveUser = new CategoryModel({
   name
  });
  await saveUser.save();
  return res.status(201).send({
    success: true,
    msg: "Category has been registered sucessfully",
  });
});

exports.UpdateCateogry = AsyncErrorHandler(async (req, res, next) => {
  const { name, updatedText } = req.body;
  let finduser = await CategoryModel.findOne({ name })
  if (!finduser) {
    return next(
      new ErrorHandler(404, "this category does not exist")
    );
  }
 const updateCategory=await CategoryModel.findByIdAndUpdate({name},{
    name:updatedText
 },{new:true})
    return res.status(200).send({
      success: true,
      msg: "User has been login sucessfully",
      token,
      data:updateCategory,
    });
});

exports.getAllCategory=AsyncErrorHandler(async(req,res,next)=>{
    const UsersData=await CategoryModel.find();
    return res.status(200).send({
        sucess:true,
        msg:"All users disprersed",
        data:UsersData
    });
})



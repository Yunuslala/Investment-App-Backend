const  {RegisterUser,loginUser,updatePassword,resetPassword,getAllUser, getSingleUser, updateUserRole, deleteUser,MyProfile, forgotPassword, updateAvtar}=require("../controllers/User.Controller");
const express=require("express");
const env=require("../config/env")
const UserRouter=express.Router();
const {Authentication}=require("../middlewares/Authenitcation");
var multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
    cloud_name:env.cloud_name,
    api_key: env.cloudapikey,
    api_secret: env.cloudapisecret,
  });
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "E-Commerce/images/Users",
      allowed_formats: [ // Specify allowed formats for uploads
            "jpg", "avif", "webp", "jpeg", "png", // Images
            "xlsx", "xls", "pdf", // Documents
            "mp4", "mov", "avi" // Videos
        ],
    },
  });
  const upload = multer({ storage: storage });

UserRouter.route("/User/register").post(upload.single('IdCard'),RegisterUser);
UserRouter.route("/User/login").post(loginUser);
UserRouter.route("/User/update-password").patch(Authentication,updatePassword);
UserRouter.route("/User/update-avtar").patch(upload.single('profile'),Authentication,updateAvtar);
UserRouter.route("/User/Alluser").get(Authentication,getAllUser);
UserRouter.route("/User/profile").get(Authentication,MyProfile);
UserRouter.route("/User/SingleUser/:id").get(Authentication,getSingleUser);
UserRouter.route("/User/update-role/:id").patch(Authentication,updateUserRole);
UserRouter.route("/User/deleteUser/:id").delete(Authentication,deleteUser);
UserRouter.route("/User/forget/password").patch(forgotPassword);
UserRouter.route("/User/reset/password").patch(resetPassword);


module.exports={
    UserRouter
}
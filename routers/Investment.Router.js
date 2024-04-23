const express=require("express");
const InvestmentOptionsRouter=express.Router();
const {Authentication}=require("../middlewares/Authenitcation");
const { upload } = require("../utils/multer");
// var multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { RegisterInvestmentOption, UpdateRegisterInvestmentOption, getAllInvestmentOption, getAllInvestmentOptionByCategory } = require("../controllers/Investment.Controller");
// cloudinary.config({
//   cloud_name: 'dzvbykaxd',
//   api_key: '816369768655571',
//   api_secret: 'Zp-oaGNt7KNtisqBveTAen0DHW4',
// });

// // Multer storage configuration
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'E-Commerce/images/Users',
//     allowed_formats: ['jpg', 'avif', 'webp', 'jpeg', 'png', 'xlsx', 'xls', 'pdf', 'mp4', 'mov', 'avi'],
//   },
// });
//   const upload = multer({ storage: storage });
// video: 'https://res.cloudinary.com/dzvbykaxd/video/upload/v1713570085/ftec066rrd3uvwjh6k4j.mp4',
//   pdf: 'https://res.cloudinary.com/dzvbykaxd/raw/upload/v1713570086/z52gab8sfxz8mxnvdopk.pdf',
//   image: 'https://res.cloudinary.com/dzvbykaxd/image/upload/v1713570090/djhsxrvt2be28ilhm48i.png'
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
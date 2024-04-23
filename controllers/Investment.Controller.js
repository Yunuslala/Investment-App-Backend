const AsyncErrorHandler = require("../middlewares/AsyncerrorHandler");
const { ErrorHandler } = require("../utils/Error.Handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SentMail = require("../utils/SentMail");
const { InvestmentOptionModel } = require("../models/InvestmentOption.model");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const fs=require("fs")
cloudinary.config({
  cloud_name: 'dzvbykaxd',
  api_key: '816369768655571',
  api_secret: 'Zp-oaGNt7KNtisqBveTAen0DHW4',
});

exports.RegisterInvestmentOption = AsyncErrorHandler(async (req, res, next) => {
  const {
    CompanyName,
    CategoryId,
    AboutCompany,
    HashTags,
    BuisnessType,
    WebsiteLink,
    InvestmentSizeMin,
    InvestmentSizeMax,
    LockingPeriod,
    Payouts,
    ReturnRateMin,
    ReturnRateMax,
    OperationsOfCompany,
    role
  } = req.body;
  if(role!="admin"){
    return next(new ErrorHandler(402,"You are not authorised for admin routes"))
  }
  // Check if there is a file uploaded
  const filePaths = {}; // Object to store paths of uploaded files

// Check if files were uploaded
if (req.files) {
  // Loop through each file type and get its path
  for (const fileType in req.files) {
    if (Object.prototype.hasOwnProperty.call(req.files, fileType)) {
      const file = req.files[fileType][0];
      let filepath = '';

      // Check the fieldname to determine the filepath
      if (fileType === "video") {
        // Upload video to Cloudinary
        const uploadVideo = await cloudinary.uploader.upload(file.path, { resource_type: "video" });
        // Set the filepath to the Cloudinary URL
        filepath = uploadVideo.secure_url;
        fs.unlinkSync(file.path);
      } else if (fileType === "image") {
        // For image files, upload to Cloudinary with resource_type: "image"
        const uploadImage = await cloudinary.uploader.upload(file.path, { resource_type: "image" });
        filepath = uploadImage.secure_url;
        fs.unlinkSync(file.path);
      } else if (fileType === "pdf") {
        // For PDF files, upload to Cloudinary with resource_type: "raw" or "auto" (if unsure)
        const uploadPDF = await cloudinary.uploader.upload(file.path, {
          resource_type: "auto",
          type: "upload",
          overwrite: true,
          public_id: file.originalname.split('.').slice(0, -1).join('.'),
          context: "type=pdf",
          eager: [
            { format: "pdf", transformation: [{ page: "1" }] }
          ],
          tags: "pdf",
          folder: "pdfs"
        });
        
        
        filepath = uploadPDF.secure_url;
        fs.unlinkSync(file.path);
      }

      // Store filepath in the object
      filePaths[fileType] = filepath;
    }
 
  }
}
console.log(req.body,filePaths);
// CategoryId: '66224fd93017a517a171ce28',
// CompanyName: 'dummy compny',
// AboutCompany: 'this is about dummy company',
// HashTags: 'www.google.com',
// WebsiteLink: '',
// investmentSizeMin: '20',
// investmentSizeMax: '10',
// ReturnRateMin: '20',
// ReturnRateMax: '40',
// LockingPeriod: '10 motnhs',
// operationsOfCompany: 'this is dummy operations of companuy',
// Payouts: 'Half-Yearly'
  const Investment = new InvestmentOptionModel({
    CompanyName,
    CategoryId,
    AboutCompany,
    HashTags,
    BuisnessType,
    WebsiteLink,
    InvestmentSizeMin,
    InvestmentSizeMax,
    LockingPeriod,
    Payouts,
    ReturnRateMin,
    ReturnRateMax,
    OperationsOfCompany,
    Logo: filePaths.image,
    Documents: filePaths.pdf,
    VideoMessage: filePaths.video,
  });
  await Investment.save();
  console.log("Investment",Investment)
  return res.status(201).send({
    success: true,
    msg: "InvestmentOption has been registered sucessfully",
    data: Investment,
  });
});

exports.UpdateRegisterInvestmentOption = AsyncErrorHandler(
  async (req, res, next) => {
   
    const {
      CompanyName,
      CategoryId,
      AboutCompany,
      HashTags,
      BuisnessType,
      WebsiteLink,
      InvestmentSizeMin,
      InvestmentSizeMax,
      LockingPeriod,
      Payouts,
      ReturnRateMin,
      ReturnRateMax,
      OperationsOfCompany,
      role
    } = req.body;
    if(role!="admin"){
      return next(new ErrorHandler(402,"You are not authorised for admin routes"))
    }
    const filePaths = {}; // Object to store paths of uploaded files

    // Check if files were uploaded
    if (req.files) {
      // Loop through each file type and get its path
      for (const fileType in req.files) {
        if (Object.prototype.hasOwnProperty.call(req.files, fileType)) {
          const file = req.files[fileType][0];
          let filepath = '';
    
          // Check the fieldname to determine the filepath
          if (fileType === "video") {
            // Upload video to Cloudinary
            const uploadVideo = await cloudinary.uploader.upload(file.path, { resource_type: "video" });
            // Set the filepath to the Cloudinary URL
            filepath = uploadVideo.secure_url;
          } else if (fileType === "image") {
            // For image files, upload to Cloudinary with resource_type: "image"
            const uploadImage = await cloudinary.uploader.upload(file.path, { resource_type: "image" });
            filepath = uploadImage.secure_url;
          } else if (fileType === "pdf") {
            // For PDF files, upload to Cloudinary with resource_type: "raw" or "auto" (if unsure)
            const uploadPDF = await cloudinary.uploader.upload(file.path, {
              resource_type: "auto",
              type: "upload",
              overwrite: true,
              public_id: file.originalname.split('.').slice(0, -1).join('.'),
              context: "type=pdf",
              eager: [
                { format: "pdf", transformation: [{ page: "1" }] }
              ],
              tags: "pdf",
              folder: "pdfs"
            });
            
            
            filepath = uploadPDF.secure_url;
          }
    
          // Store filepath in the object
          filePaths[fileType] = filepath;
        }
     
      }
    }
    let finduser = await InvestmentOptionModel.findOne({ _id: req.params.id});
    if (!finduser) {
      return next(new ErrorHandler(404, "Investment does not exist"));
    }
    const updateCategory = await InvestmentOptionModel.findByIdAndUpdate(
      { _id: req.params.id},
      {
        CompanyName: CompanyName ? CompanyName : finduser.CompanyName,
        CategoryId: CategoryId ? CategoryId : finduser.CategoryId,
        AboutCompany: AboutCompany ? AboutCompany : finduser.AboutCompany,
        HashTags: HashTags ? HashTags : finduser.HashTags,
        BuisnessType: BuisnessType ? BuisnessType : finduser.BuisnessType,
        WebsiteLink: WebsiteLink ? WebsiteLink : finduser.WebsiteLink,
        InvestmentSizeMin: InvestmentSizeMin
          ? InvestmentSizeMin
          : finduser.InvestmentSizeMin,
          InvestmentSizeMax: InvestmentSizeMax
          ? InvestmentSizeMax
          : finduser.InvestmentSizeMax,
        LockingPeriod: LockingPeriod ? LockingPeriod : finduser.LockingPeriod,
        Payouts: Payouts ? Payouts : finduser.Payouts,
        ReturnRateMin: ReturnRateMin ? ReturnRateMin : finduser.ReturnRateMin,
        ReturnRateMax: ReturnRateMax ? ReturnRateMax : finduser.ReturnRateMax,
        OperationsOfCompany: OperationsOfCompany
          ? OperationsOfCompany
          : finduser.OperationsOfCompany,
        Logo: filePaths?.image ? filePaths.image : finduser.Logo,
        Document:filePaths?.pdf ? filePaths.pdf : finduser.Documents,
        VideoMessage: filePaths?.video ? filePaths?.VideoMessage : finduser.VideoMessage,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      msg: "Invest Options Update sucessfully",
      data: updateCategory,
    });
  }
);

exports.getAllInvestmentOption = AsyncErrorHandler(async (req, res, next) => {
  const UsersData = await InvestmentOptionModel.find({isDeleted:false}).populate("CategoryId");
  return res.status(200).send({
    sucess: true,
    msg: "All Options disprersed",
    data: UsersData,
  });
});

exports.getAllInvestmentOptionByCategory = AsyncErrorHandler(async (req, res, next) => {
  const UsersData = await InvestmentOptionModel.find({CategoryId:req.params.id,isDeleted:false}).populate("CategoryId");
  return res.status(200).send({
    sucess: true,
    msg: "All Options disprersed",
    data: UsersData,
  });
});

exports.DeleteOption = AsyncErrorHandler(async (req, res, next) => {
  const UsersData = await InvestmentOptionModel.findByIdAndUpdate({_id:req.params.id},{isDeleted:true});
  return res.status(200).send({
    sucess: true,
    msg: "All Options disprersed",
    data: UsersData,
  });
});
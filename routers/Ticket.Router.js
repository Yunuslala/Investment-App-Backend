const express=require("express");
const TicketRouter=express.Router();
const {Authentication}=require("../middlewares/Authenitcation");
const { GetAllTickets, RegisterTicket, GetTicketsByUserId } = require("../controllers/Ticket.Controller");
var multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
    cloud_name: "dzvbykaxd",
    api_key: "816369768655571",
    api_secret: "Zp-oaGNt7KNtisqBveTAen0DHW4",
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

TicketRouter.route("/User/RegisterTicket").post(upload.single('file'),Authentication,RegisterTicket);
TicketRouter.route("/Admin/GetAllTickets").post(Authentication,GetAllTickets);
TicketRouter.route("/User/getTicketsById").get(Authentication,GetTicketsByUserId);

module.exports={
    TicketRouter
}
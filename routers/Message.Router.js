const express=require("express");
const MessageRouter=express.Router();
const {Authentication}=require("../middlewares/Authenitcation");
const { SendMessages, GetMessages, GetMessagesPerCountry, GetMessagesPerCategory } = require("../controllers/Message.Controller");


MessageRouter.route("/Admin/SendMessage").post(Authentication,SendMessages);
MessageRouter.route("/Admin/GetAllMessage").get(Authentication,GetMessages);
MessageRouter.route("/User/getPerCountry").get(Authentication,GetMessagesPerCountry);
MessageRouter.route("/User/getPerCategory").get(Authentication,GetMessagesPerCategory);




module.exports={
    MessageRouter
}
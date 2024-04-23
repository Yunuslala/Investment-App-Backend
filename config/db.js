require('dotenv').config()
const mongoose=require("mongoose");

const connection=mongoose.connect("mongodb+srv://saifsiddiqui7379527559:saif@cluster0.v8t5jlp.mongodb.net/InvestApp?retryWrites=true&w=majority&appName=Cluster0");

module.exports={
    connection,
}

  

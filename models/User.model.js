const  mongoose=require('mongoose');
const validator = require('validator');

const UserSchema=mongoose.Schema({
    Region: {
        type: String
      },
      Country: {
        type: String,
        required: [true, "Please Enter Your Country"]  
      },
      State: {
        type: String,
        required: [true, "Please Enter Your State"]
      },
      Locality:{
        type:String
      },
      Status:{
        type:String,
      },
      City: {
        type: String,
        required: [true, "Please Enter Your City"]
      },
      zip:{
        type: String,
        required: [true, "Please Enter Your City"]
      },
      Intrests:[{
        type:String
      }],
      FirstName: {
        type: String,
        required: [true, "Please Enter Your Category"]
      },
      MiddleName: {
        type: String
      },
      LastName: {
        type: String,
        required: [true, "Please Enter Your Category"]
      },
      email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
      },
      password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minlength: [6, "Password should be greater than 8 characters"],
        select: false,
      },
      Contact: {
        type: String,
        required: true,
        unique:true,
        validate: {
          validator: function(v) {
            // Regular expression for a valid phone number
            return /\d{10}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        }
      },
      Gender:{
        type:String
      },
      ReferalId:{
        type:String
      },
      buisness:{
        type:String
      },
      avatar: {
          type:String
      },
      IdCard:{
        type:String,
        
      },
      role: {
        type: String,
        default: "user",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

const UserModel=mongoose.model('User',UserSchema);
module.exports={
  UserModel
}
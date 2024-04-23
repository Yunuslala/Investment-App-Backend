const  mongoose=require('mongoose');
const validator = require('validator');
const CategorySchema=mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
    },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

const CategoryModel=mongoose.model('Category',CategorySchema);
module.exports={
  CategoryModel
}
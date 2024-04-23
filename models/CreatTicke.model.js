const  mongoose=require('mongoose');
const validator = require('validator');
const TiketSchema=mongoose.Schema({
    Subject:{
        type:String,
    },
    type:{
        type:String
    },
    Description:{
        type:String
    },
    TicketFile:{
        type:String
    },
    UserId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

const TicketModel=mongoose.model('Ticket',TiketSchema);
module.exports={
  TicketModel
}
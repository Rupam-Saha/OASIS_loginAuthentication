const mongoose=require("mongoose");
const x=new mongoose.Schema({
    Email:{
        type:String,
        required:true
    },
    User_name:{
        type:String,
        required:true
    },
    Contact:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
});
const regSchema=mongoose.model("register",x);
module.exports=regSchema;


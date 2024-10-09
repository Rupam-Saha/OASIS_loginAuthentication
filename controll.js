const regSchema=require("../models/register-model");
const bcrypt=require("bcryptjs");
const register=async(req,res)=>{
    try{
        const data=req.body;
        const ch=await regSchema.findOne({Email:data.Email});
        if(!ch){
            const newpwd=await bcrypt.hash(data.Password,10);
            const x=await regSchema.create({Email:data.Email,User_name:data.User_name,Contact:data.Contact,Password:newpwd});
            res.status(200).json({msg:"Successfully Registered"});
        }
        else{
            res.status(400).json({msg:"This Email Id Is Already Registered"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const login=async (req,res)=>{
    try{
        const data=req.body;
        const check=await regSchema.findOne({Email:data.Email});
        if(check){
            const check1=await bcrypt.compare(data.Password,check.Password);
            if(check1){
                res.status(200).json({msg:"Login Successfully"});
            }
            else{
                res.status(400).json({msg:"Wrong Password"});
            }
        }
        else{
            res.status(400).json({msg:"Invalid Email Id"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
module.exports={register,login}
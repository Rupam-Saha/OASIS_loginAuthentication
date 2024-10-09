const express=require("express");
const r=express.Router();
const {register,login}=require("../controller/controll");
const check=require("../middleware/register");
r.route("/register").post(check(),register);
r.route("/login").post(login);
module.exports=r;
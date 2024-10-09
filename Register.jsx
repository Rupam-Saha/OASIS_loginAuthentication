import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const Register=()=>{
    const navi=useNavigate();
    const gotologin=()=>{
        navi("/login");
    }
    const [data,setdata]=useState({
        Email:"",
        User_name:"",
        Contact:"",
        Password:""
    });
    const changVal=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setdata({
            ...data,
            [nm]:val
        })
    }
    const submitFunc=async (e)=>{
        //console.log(image);
        //console.log(formData);
        e.preventDefault();
        try{
            const respo=await fetch("http://localhost:4000/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            })
            const x=await respo.json();
            if(respo.status==200){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                })
                setdata({
                    Email:"",
                    User_name:"",
                    Contact:"",
                    Password:""
                })
                navi("/login");
            }
            else{
                Swal.fire({
                    text:x.msg,
                    icon:"error",
                    background:"white"
                })
            }    
        }
        catch(error){
            console.log(error);
        }
    }
    return(
        <>
        <div className="rupam">
            <div className="detail">
                <h1><b><u>REGISTER</u></b></h1>
            </div>
            <div className="register">
                <div className="email">
                    <p><b>EMAIL</b></p>
                    <input 
                    type="email"
                    name="Email"
                    placeholder="Enter Your Email"
                    value={data.Email}
                    onChange={changVal}
                    />
                </div>
                <div className="usernm">
                    <p><b>USER NAME</b></p>
                    <input 
                    type="text"
                    name="User_name"
                    placeholder="Enter Your Name"
                    value={data.User_name}
                    onChange={changVal}
                    />
                </div>
                <div className="contact">
                    <p><b>CONTACT</b></p>
                    <input 
                    type="text"
                    name="Contact"
                    placeholder="Enter Your Contact No."
                    value={data.Contact}
                    onChange={changVal}
                    />
                </div>
                <div className="pwd">
                    <p><b>PASSWORD</b></p>
                    <input 
                    type="password"
                    name="Password"
                    placeholder="Enter Your Password"
                    value={data.Password}
                    onChange={changVal}
                    />
                </div>
                <div className="sayani">
                    <button onClick={submitFunc}><span id="ab">REGISTER</span></button>
                </div>
                <div className="text">
                    <p>You have an Account ??<span onClick={gotologin} id="login"><b>Login</b></span></p>
                </div>
            </div>
        </div>
        </>
    )
}

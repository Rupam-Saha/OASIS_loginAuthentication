import "./login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
export const Login=()=>{
    const [data,setdata]=useState({
        Email:"",
        Password:""
    });
    const navi=useNavigate();
    const gotoback=()=>{
        navi("/");
    }
    const changVal=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setdata({
            ...data,
            [nm]:val
        })
    }
    const submitFunc=async(e)=>{
        e.preventDefault();
        try{
            const respo=await fetch("http://localhost:4000/login",{
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
                });
                navi("/home");
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
            <h1><b><u>LOGIN</u></b></h1>
       </div>
        <div className="login">
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
                    <button onClick={submitFunc}><span id="ab">LOGIN</span></button>
                    <button><span id="ab" onClick={gotoback}>BACK</span></button>
                </div>
            </div>
        </div>
        </>
    )
}

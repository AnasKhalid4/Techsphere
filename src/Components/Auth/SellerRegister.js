
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RegisterStyle.css";
import Home from "../Home";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import toast, { Toaster } from 'react-hot-toast';
function SellerRegister() {
//states for email,phone , name , password 
const [name, setname]= useState("")
const [email, setemail]= useState("")
const [password, setpassword]= useState("")
const [phone, setphone]= useState("")
const [address, setaddress]= useState("")
const navigate = useNavigate();

//submit function
const handleSubmit = async(e)=>{
e.preventDefault();

if (!name.trim()) {
  toast.error("Name is required");
  return;
} 

if (!address.trim()) {
  toast.error("Please enter  address");
  return;
} 

if (!email.trim() || !/^[^\s@]+@(gmail\.com|yahoo\.com)$/i.test(email)) {
  toast.error("Invalid email address");
  return;
} 
if (!password.trim() || password.length < 8) {
  toast.error("Password must be at least 8 characters");
  return;
} 

if (!phone.trim() || !/^\d{11}$/.test(phone)) {
  toast.error("Invalid phone number. Must be 11 digits");
  return;
} 
try{
const res = await axios.post("http://localhost:5000/api/sellerregister",{name,email,password,phone,address})
if(res && res.data.success){
toast.success(res.data && res.data.message)
navigate("/SellerLogin");
}else{
toast.error("Already registered email")

}


}

catch(error){
console.log(error)
toast.error("There is an error")
}
}




  return (
    <div>
      <Header />
      <div class="h-6"></div>
      <div class="get2">
        <div className="containerss">
          <h2>Create Seller Account</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                value={name}
                placeholder="username"
                required
                onChange={(e) => setname(e.target.value)}
              />
            </div>

            <div>
              <input
                type="email"
                value={email}
                placeholder="Email"
                required
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div>
              <input
                class="input1"
                value={password}
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div>
              <input
                class="input1"
                value={phone}
                type="text"
                placeholder="phone"
                required
                onChange={(e) => setphone(e.target.value)}
              />
            </div>

            <div>
              <input
                type="text"
                value={address}
                placeholder="Address"
                required
                onChange={(e) => setaddress(e.target.value)}
              />
            </div>

            <button
              class="w-full px-12 py-2 flex justify-center rounded-lg text-gray-50 font-normal tracking-wide bg-[#6441a5] hover:scale-105 ease-in duration-200"
              type="submit"
            >
              Register
            </button>
            <span>
              Already have an account ?<Link to="/SellerLogin"> Login</Link>
            </span>
          </form>
          <Toaster />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default SellerRegister;

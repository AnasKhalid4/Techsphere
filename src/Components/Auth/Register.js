import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RegisterStyle.css";

import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import toast, { Toaster } from 'react-hot-toast';
function Register() {
//states for email,phone , name , password 
const [name, setname]= useState("")
const [email, setemail]= useState("")
const [password, setpassword]= useState("")
const [phone, setphone]= useState("")

const navigate = useNavigate();

//submit function
const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation checks
  if (!name.trim()) {
    toast.error("Please enter a username");
    return;
  }

  if (!email.trim() || !/^[^\s@]+@(gmail\.com|yahoo\.com)$/i.test(email)) {
    toast.error("Please enter correct email format");
    return;
  }

  const phoneRegex = /^\d{11}$/;
  if (!phone.trim() || !phoneRegex.test(phone)) {
    toast.error("Please enter a valid 11-digit phone number");
    return;
  }

  if (password.length < 8) {
    toast.error("Password should be at least 8 characters long");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/register", {
      name,
      email,
      password,
      phone,
    });

    if (res && res.data.success) {
      toast.success(res.data && res.data.message);
      navigate("/Login");
    } else {
      toast.error("Already registered email");
    }
  } catch (error) {
    console.log(error);
    toast.error("Server error ");
  }
};



  return (
    <div>
      <Header/>
      <div class="get2">
        <div className="containerss">
          <h2>Create Account</h2>
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

            <button
              class="w-full px-12 py-2 flex justify-center rounded-lg text-gray-50 font-normal tracking-wide bg-[#6441a5] hover:scale-105 ease-in duration-200"
              type="submit"
            >
              Register
            </button>
            <span>
              Already have an account ?<Link to="/Login"> Login</Link>
            </span>
          </form>
          <Toaster />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Register;

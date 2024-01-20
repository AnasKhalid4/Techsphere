import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RegisterStyle.css";
import { useSellerAuth } from "../ContextAuth/Sellerauthcontext";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../Footer";
import Header from "../Header";
function SellerForgotPassword() {
  //states for email,phone , name , password
  const [email, setemail] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [phone, setphone] = useState("");

  //display data of user using Auth fron context API
  const [seller,setsellerAuth ] = useSellerAuth();

  const navigate = useNavigate();
  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/forgot-seller-password",
        {
          email,
          newpassword,
          phone,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/Login");
      } else {
        toast.error("Please enter correct email or phone number");
      }
    } catch (error) {
      console.log(error);
      toast.error("Please enter correct email or phone number");
    }
  };

  return (
    <div>
      <Header />
      <div class="get2">
        <div className="containerss">
          <h2>Seller Reset Password </h2>
          <form onSubmit={handleSubmit}>
            <div></div>

            <div>
              <input
                type="email"
                value={email}
                placeholder="Email"
                required
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <input
              class="input1"
              value={phone}
              type="text"
              placeholder="Phone number"
              required
              onChange={(e) => setphone(e.target.value)}
            />
            

            <div>
              <input
                class="input1"
                value={newpassword}
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setnewpassword(e.target.value)}
              />
            </div>
            
            <button
              class="w-full px-12 py-2 flex justify-center rounded-lg text-gray-50 font-normal tracking-wide bg-[#6441a5] hover:scale-105 ease-in duration-200"
              type="submit"
            >
              Submit
            </button>

            <span>
              Already Login? <Link to="/SellerLogin"> Login</Link>
            </span>
          </form>
          <Toaster />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SellerForgotPassword;

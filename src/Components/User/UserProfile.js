import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Footer from "../Footer";
import "./UserProfileStyles.css";
import Header from "../Header";
import { Link } from "react-router-dom";
import { useAuth } from "../ContextAuth/Auth";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { faEdit } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const UserProfile = () => {
  const [auth, setAuth] = useAuth();

  const compare_id = auth?.user?._id;

  const [orders, getorders] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        const newproduct = data.filter(
          (ordercustomer) => ordercustomer.customerdata[0] === compare_id
        );
        
        getorders(newproduct);
      });
  }, []);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
  };



  //user profile
  const [userInfo, getuserInfo] = useState();
  // save id that comes from auth into variable
  
  //get user data
  useEffect(() => {
    fetch("http://localhost:5000/adminHome/users")
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        const userdata = data.find((user) => user._id === compare_id);
        console.log(userdata);
        getuserInfo(userdata);
        console.log(getuserInfo);
      });
      // eslint-disable-next-line
  }, []); 


  //edit user profile 
  const [editProfile, seteditProfile] = useState(false);
  const [name,setname]= useState()
  const [phone,setphone]= useState()
  const handleEditProfile = (id) => {
    seteditProfile(true);
    console.log(id);
  };


  const handleNameSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.put(`http://localhost:5000/adminHome/users/${auth?.user?._id}`, { name, phone });
    seteditProfile(false)
    toast.success("Profile   updated successfully")
    
    } catch (error) {
      console.error("Error updating user name:", error);
      toast.error("There is an error in updating Profile ")
    }
  };
  

  return (
       
           <div>  
            <Header/>   
    
          <div class="justify-center mt-32"> 
          <h1 class="flex justify-center pb-16 text-2xl  text-gray-700 font-bold">My Account</h1>
          <div class="bg-gray-50  mb-9 shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
            
              <h3 class="text-lg  font-bold leading-6 text-gray-900">
                Profile 
                <span title="Edit Profile"> <button class="text-blue-500 hover:text-blue-900 pl-4"    onClick={handleEditProfile} ><FontAwesomeIcon icon="fas fa-edit" /></button></span>
              
              </h3>
             
           

              
            
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Full name</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userInfo?.name}
                  </dd>
                </div>

                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                   {userInfo?.email}
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Phone Number
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userInfo?.phone}
                  </dd>
                </div>
                <div class="bg-gray-50 px-5 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt>

                  </dt>
                  <dd>
                    <Link to = "/Home">
                  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-xl" onClick={handleLogout}>
                    Logout
                  </button>
                  </Link>
                  </dd>
                 
                </div>
              </dl>
            </div>
          </div>


          <h2 class="flex justify-center pb-16 text-2xl font-bold">Order History</h2>
         
<div class="flex items-center justify-center pb-10">


  <div class="overflow-x-auto">
    <table class="min-w-full bg-white shadow-md">
      <thead>
        <tr class="bg-blue-gray-100 text-gray-700">
        <th class="py-3 px-4 text-left">Order ID</th>
          <th class="py-3 px-4 text-left">Product Name</th>
          <th class="py-3 px-4 text-left">Price</th>
          <th class="py-3 px-4 text-left">Quantity</th>
        
          <th class="py-3 px-4 text-left">Status</th>
        </tr>
      </thead>
     

      {orders?.map((item) => (
        
      <tbody  class="text-blue-gray-900">
     
        <tr class="border-b border-blue-gray-200">
        <td class="py-3 px-4">{item?._id} </td>
          <td class="py-3 px-4">{item.items[0].name} </td>
          <td class="py-3 px-4">Rs.{item.items[0].price} </td>
          <td class="py-3 px-4">{item.items[0].counter}</td>
        
          <td class="py-3 px-4"> 
          {item.ParcelStatus}
          </td>
        </tr>
        
      
     
       
      </tbody>
    
       ))}
    </table>
  
  </div>
</div>
          {editProfile && (
          <div class="fixed inset-0 flex items-center justify-center  bg-black/40 backdrop-blur-sm icon-index">
            <div className="flex flex-col items-center py-6 px-4 bg-white rounded-xl">
            <span
                      onClick={() => seteditProfile(false)}
                      className="absolute top-0.5 right-0.5 hover:text-red-700 rounded-full p-1 cursor-pointer "
                    >
                      <AiOutlineCloseCircle size={28}  class=""/>
                    </span>
              <div>
                <p className="text-gray-600 font-medium tracking-wide pb-2">
                  Update Profile
                </p>
                <form onSubmit={handleNameSubmit} >
                  <div>
                    <input
                      type="text"
                      value={name}
                      placeholder="Full Name "
                      required
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={phone}
                      placeholder="Phone "
                      required
                      onChange={(e) => setphone(e.target.value)}
                    />
                  </div>
                  <button className=" py-1  bg-violet-500 rounded-md text-white">
                  Edit
                </button>

               

                </form>

              </div>
              <div className="flex justify-end gap-4 py-2 ">
              
            
              </div>
            </div>
          </div>
        )}
  <Toaster/>
          </div>
          <Footer/>
          </div>  
  );
};

export default UserProfile;

import React, { useState, Fragment, useRef, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { BiSearch } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from "../Components/ContextAuth/Auth";
import axios from "axios";
import { Orbitals } from "react-spinners-css";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import SideBar from "./SideBar";

import logo from "../Assets/TechSphere.svg";
import preview from "../Assets/headphones-category.jpg";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoWarningOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const AdminOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [StatusPrompt, setStatusPrompt] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [viewPrompt, setViewPrompt] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [auth] = useAuth();
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filtereds = allOrders.filter((orders, index) => {
    return orders.items[0].name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const fetchOrders = async () => {
    setIsLoading(true);

    try {
      const orders = await axios.get("http://localhost:5000/orders");

      setAllOrders(orders.data);
      console.log(orders.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewPrompt = (order) => {
    setSelectedOrder(order);
    setViewPrompt(true);
  };

  const handleStatusPrompt = (id) => {
    setStatusPrompt(true);
    setSelectedId(id);
    console.log(id);
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/orders/${selectedId}`
      );

      setStatusPrompt(false);
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen overflow-hidden">
      <div className="flex justify-between items-center fixed w-full h-[8vh] p-4 bg-transparent backdrop-blur-sm border-b-2 border-violet-300 z-10">
        <div className="">
          <img src={logo} alt="logo" className="h-9" />
        </div>

        <div>
          <h2>search bar</h2>
        </div>
        <div>
          <h2 className="text-black">{auth?.user?.name}</h2>
        </div>
      </div>

      <div className="w-full grid grid-cols-5 h-screen">
        <div className="col-span-1">
          <SideBar />
        </div>

        <div className="flex flex-col col-span-4 px-4 py-16 bg-[#f4effc] overflow-y-auto relative">
          <div className="w-full p-2 flex items-center justify-center bg-violet-200 rounded-lg">
            {/* Search Bar and filter */}
            <div className="w-[40%] flex justify-center items-center rounded-lg bg-white p-0.5 gap-2">
              <input
                value={searchTerm}
                onChange={handleSearch}
                type="text"
                placeholder="Search users..."
                className="outline-none border-0 px-4 py-1 w-[100%] font-normal text-base text-gray-600 rounded-lg"
              />

              <div className="flex items-center justify-center text-gray-600 text-xl rounded-md p-2 cursor-pointer">
                <BiSearch />
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <Orbitals />
            </div>
          ) : (
            <div class="w-full py-8">
              {filtereds.length === 0 ? (
                <div className="w-full grid place-items-center py-10">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    No Orders found!
                  </h3>
                </div>
              ) : (
                <>
                  <div className="">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-md ">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Order ID
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Bought Items
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Buyer Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtereds.map((order, index) => (
                          <tr className="bg-white border-b dark:bg-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-300">
                            <td className="flex items-center px-6 py-4  whitespace-nowrap dark:text-white">
                             <p className="text-black"> {order._id}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="ps-4 text-black">{order.items.length}</p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="">
                                <p className="text-base font-semibold text-black">
                                  {order.Lastname}
                                </p>
                                <p className="font-normal text-gray-500">
                                  {order.email}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div
                                  className={`h-2.5 w-2.5 rounded-full ${
                                    order.ParcelStatus === "Delivered"
                                      ? "bg-green-500"
                                      : "bg-orange-500"
                                  } me-2`}
                                />
                              <p className="text-black"> {order.ParcelStatus} </p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {/* <!-- Modal toggle --> */}
                              <button
                                disabled={
                                  order.ParcelStatus === "Delivered"
                                    ? true
                                    : false
                                }
                                onClick={() => handleStatusPrompt(order._id)}
                                className={`font-medium px-5 py-2 mx-2 rounded-md ${
                                  order.ParcelStatus === "Delivered"
                                    ? "bg-blue-200/10 text-blue-300"
                                    : "bg-blue-200/50 text-blue-600 hover:bg-blue-200 dark:text-blue-500"
                                }`}
                              >
                                Edit status
                              </button>
                              <button
                                onClick={() => handleViewPrompt(order)}
                                className="px-5 py-2 font-medium tracking-wide rounded-md bg-green-200/50 text-green-600 hover:bg-green-200"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <AnimatePresence>
                    {viewPrompt && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{
                          opacity: 0,
                        }}
                        className="fixed inset-0 p-16 bg-black/30 backdrop-blur-sm z-10"
                      >
                        <div className="w-full h-full grid place-items-center p-4">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{
                              opacity: 0,
                              scale: 0.9,
                            }}
                            className="flex flex-col items-center justify-start w-full h-full max-w-lg rounded-lg p-4 bg-white relative z-0 overflow-hidden"
                          >
                            <span
                              onClick={() => setViewPrompt(false)}
                              className="absolute top-1 right-1 z-10 cursor-pointer"
                            >
                              <RxCross2 size={20} />
                            </span>
                            <div className="flex flex-col px-6 items-start justify-start font-sans w-full h-full max-h-fit py-2 overflow-y-auto">
                              <div className="flex flex-col w-full my-2 items-start justify-start">
                                <p className="text-gray-600 font-bold tracking-tight font-sans">
                                  Order ID
                                </p>
                                <p className="font-medium text-gray-800">
                                  {selectedOrder._id}
                                </p>
                              </div>
                              <div className="flex flex-col w-full my-2 items-start justify-start">
                                <p className="text-gray-600 font-bold tracking-tight font-sans">
                                  Buyer Name
                                </p>
                                <p className="font-medium text-gray-800">
                                  {selectedOrder.Lastname}
                                </p>
                              </div>
                              <div className="flex flex-col w-full my-2 items-start justify-start">
                                <p className="text-gray-600 font-bold tracking-tight font-sans">
                                  Email
                                </p>
                                <p className="font-medium text-gray-800">
                                  {selectedOrder.email}
                                </p>
                              </div>
                              <div className="flex flex-col w-full my-2 items-start justify-start">
                                <p className="text-gray-600 font-bold tracking-tight font-sans">
                                  City
                                </p>
                                <p className="font-medium text-gray-800">
                                  {selectedOrder.City}
                                </p>
                              </div>
                              <div className="flex flex-col w-full my-2 items-start justify-start">
                                <p className="text-gray-600 font-bold tracking-tight font-sans">
                                  Address
                                </p>
                                <p className="font-medium text-gray-800">
                                  {selectedOrder.Address}
                                </p>
                              </div>

                              <div className="w-full">
                                <p className="font-bold font-sans tracking-tighter text-gray-600">
                                  Products
                                </p>
                                <Accordion allowMultiple>
                                  {selectedOrder.items.map((product, index) => (
                                    <AccordionItem>
                                      <h2>
                                        <AccordionButton>
                                          <span className="flex-1 text-left">
                                            {product.name}
                                          </span>
                                          <AccordionIcon />
                                        </AccordionButton>
                                      </h2>
                                      <AccordionPanel pb={4}>
                                        <div className="">
                                          <p className="font-bold font-sans tracking-tighter text-gray-600">
                                            Product price
                                          </p>
                                          <p className="text-gray-800">
                                            {product.price}
                                          </p>
                                        </div>
                                        <div className="my-1">
                                          <p className="font-bold font-sans tracking-tighter text-gray-600">
                                            Seller name
                                          </p>
                                          <p className="text-gray-800">
                                            {product.SellerName}
                                          </p>
                                        </div>
                                      </AccordionPanel>
                                    </AccordionItem>
                                  ))}
                                </Accordion>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {StatusPrompt && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{
                          opacity: 0,
                        }}
                        className="fixed inset-0 p-16 bg-black/30 backdrop-blur-sm z-10"
                      >
                        <div className="w-full h-full grid place-items-center p-4">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{
                              opacity: 0,
                              scale: 0.9,
                            }}
                            className="flex flex-col items-center justify-start w-full h-auto max-w-md rounded-lg p-2 bg-white relative z-0"
                          >
                            <span
                              onClick={() => setStatusPrompt(false)}
                              className="absolute top-1 right-1 z-10 cursor-pointer"
                            >
                              <RxCross2 size={20} />
                            </span>
                            <div className="flex flex-col items-center font-sans gap-2 w-full py-2">
                              <span className="p-2 rounded-full text-blue-600 bg-blue-200/50">
                                <IoWarningOutline size={24} />
                              </span>
                              <h1 className="px-1 text-xl font-semibold text-gray-700">
                                Update delivery status
                              </h1>
                            </div>
                            <div className="py-2 flex flex-col items-center">
                              <p>Please select the delivery status</p>
                              <div className="flex justify-between w-full py-4 gap-2">
                                <button
                                  onClick={handleUpdateStatus}
                                  className="px-4 py-2 w-full bg-green-200/50 text-green-600 rounded-md hover:bg-green-200"
                                >
                                  Delivered
                                </button>
                                <button
                                  onClick={() => setStatusPrompt(false)}
                                  className="px-4 py-2 w-full bg-orange-200/50 text-orange-600 rounded-md hover:bg-orange-200"
                                >
                                  Pending
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;

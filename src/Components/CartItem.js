import React, { useState, useEffect } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CartItem.css";
import { useCartContext } from "./Cart_context";
import CartAmountToggle from "./CartAmountToggle";
const CartItem = ({ _id, name, total, counter, price, image ,specs ,SellerAuth,SellerName}) => {
  const { removeitem, Decerement, Increment } = useCartContext();
  const [counterCart, setCounterCart] = useState(0);
  const { total_price } = useCartContext();
  // const Increment = () => {
  // setCounterCart(counterCart + 1);
  //  };

  // const Decerement = () => {
  //    setCounterCart((count) => Math.max(count - 2, 0));
  //  };

  console.log(SellerAuth)

  return (
    <div class="flow-root">
      <ul class="">
        <li class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
          <div class="shrink-0">
            <img src={image} className="h-28 bg-gray-500"></img>
          </div>

          <div class="relative flex flex-1 flex-col justify-between">
            <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
              <div class="pr-8 sm:pr-5">
                <p class="text-base font-semibold text-gray-900">{name}</p>
               <p class="text-base  text-gray-900">{specs}</p>
              </div>

              <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                  Rs.{price}
                </p>

                <div class="sm:order-1">
            <p  class="text-base  text-gray-900">1</p>
{/* 
                <CartAmountToggle
     counter={counter}
     Decerement={()=>Decerement(_id)}
     
     Increment={()=>Increment(_id)}
     /> */}
                  
                </div>
              </div>
            </div>

            <div class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
              <button
                type="button"
                onClick={() => removeitem(_id)}
                class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-red-600"
              >
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                    class=""
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </li>
        <hr></hr>
      </ul>
    </div>
  );
};

export default CartItem;

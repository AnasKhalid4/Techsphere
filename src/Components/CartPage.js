import React from "react";
import CheckoutPage from "./CheckoutPage";
import "./CartPageStyles.css";
import Header from "./Header";
import heroImage from "../Assets/homeBannerImg.png";
import { useCartContext } from "./Cart_context";
import CartItem from "./CartItem";
import Footer from "./Footer";
import { useAuth } from "./ContextAuth/Auth";
import { Link, useNavigate } from "react-router-dom";
function CartPage() {
  const { cart, total_price } = useCartContext();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  console.log(
    "🚀 ~ file: cartReducer.js ~ line 4 ~ cartReducer ~ product",
    cart
  );

  return (
    <div className="w-full overflow-hidden">
      <div>
        <Header />
      </div>
      {/* Hero Section */}
      <div className="flex justify-center items-center w-screen h-[60vh] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-black/70 z-10" />
        <img
          className="absolute z-0 object-cover blur-[2px]"
          src={heroImage}
          alt="/"
        />
        <div
          classNam
          e="absolute top-[50] left-[50] translate-x-[50] translate-y-[50] z-20 "
        >
          <h1 className="text-center text-gray-100 text-5xl font-bold tracking-wide">
            Add To Cart
          </h1>
        </div>
      </div>
      <div className="flex justify-center pt-10 text-3xl font-bold">Your Cart</div>
      <section class="h-full bg-white-100 py-12 sm:py-16 lg:py-20">
  <div class="mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-2xl md:">
      <div class="bg-white shadow">
        <div class="px-4 py-6 sm:px-8 sm:py-10">
         

          {cart.map((current_item) => {
            return <CartItem key={current_item._id} {...current_item} />;
          })}
 <div class="mt-6  border-b py-2">
            <div class="flex items-center justify-between">
              <p class="text-sm text-gray-400">Subtotal</p>
              <p class="text-lg font-semibold text-gray-900">Rs.{total_price}</p>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-sm text-gray-400">Shipping</p>
              <p class="text-lg font-semibold text-gray-900">Rs.250</p>
            </div>
          </div>
         

          <div class="mt-12 text-center">
          {auth?.token ? (
          <Link to={"/CheckoutPage"}>
            {" "}
            <button class="group inline-flex w-80 items-center justify-center rounded-md bg-purple-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-purple-800">
              Checkout
              <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>{" "}
          </Link>
        ) : (
          <Link to={"/Login"}>
            {" "}
            <button class="group inline-flex w-80 items-center justify-center rounded-md bg-purple-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-purple-800">
              {" "}
             Login{" "}
             <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>{" "}
          </Link>
        )}
          
          </div>

          <div class="emptydiv"></div>
       

       
        <div class="emptydiv"></div>
</div>
      </div>
      </div>
      </div>
</section>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default CartPage;

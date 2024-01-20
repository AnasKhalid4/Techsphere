import React, { useState, useHistory, useEffect, useRef } from "react";
import { useCartContext } from "./Cart_context";
import "./CheckoutPageStyles.css";
import CartCheckout from "./CartCheckout";
import heroImage from "../Assets/homeBannerImg.png";
import { useAuth } from "./ContextAuth/Auth";
import Header from "./Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StripeCheckout from "react-stripe-checkout";
function CheckoutPage() {
  const [auth] = useAuth();
  const [address ,setAddress] =useState("")
  const autoCompleteRef = useRef(null);
  let autoComplete;
  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        componentRestrictions: { country: "PAK" },
      }
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();

    const query = addressObject.formatted_address;
    updateQuery(query);

    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };
  };

  useEffect(() => {
    handleScriptLoad(setAddress, autoCompleteRef);
  }, []);

  

  const { cart, total_price, shipping_fee } = useCartContext();
  let odertotal = total_price + shipping_fee;
  const [values, setValues] = useState({
    Firstname: "",
    Lastname: "",
    Address: "",
    email: "",
    City: "",
    State: "",
    Zipcode: "",
    ParcelStatus: "Pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.Lastname || !address || !values.email || !values.City || !values.State || !values.Zipcode) {
      toast.error("All fields are required", { autoClose: 2000 });
      return;
    }
    if ( !/^[a-zA-Z ]+$/.test(values.Lastname)) {
      toast.error("Name should only contain A-Z, a-z, or spaces", { autoClose: 2000 });
      return;
    }
    if (!values.email.includes("@gmail.com")) {
      toast.error("Email should be in proper format (e.g., your.email@gmail.com)", { autoClose: 2000 });
      return;
    }
  
  
    if (!/^[a-zA-Z]+$/.test(values.City)) {
      toast.error("Please enter Valid City ", { autoClose: 2000 });
      return;
    }
    if ( !/^[a-zA-Z]+$/.test(values.State)) {
      toast.error("Please enter Valid City  ", { autoClose: 2000 });
      return;
    }
  
    if (!/^\d+$/.test(values.Zipcode) || parseInt(values.Zipcode) <= 0) {
      toast.error("Please enter valid ZipCode", { autoClose: 2000 });
      return;
    }
  
   
  
    const userId = auth.user._id;
    const cartItems = cart;
    console.log(values);
    try {
      const { data } = await axios.post("http://localhost:5000/Checkoutpage", {
        Firstnam: values.Firstname,
        Lastname: values.Lastname,
        Address: address,
        email: values.email,
        City: values.City,
        State: values.State,
        Zipcode: values.Zipcode,
        ParcelStatus: "Pending",
        items: cartItems,
        customerdata: userId,
      });
      toast.success(" Successfully added", { autoClose: 1000 })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div class="h-32"></div>
      <div class="dividepage">
        <div>
          <div className="containerss">
            <h2>Billing Address</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
             

              <input
                type="text"
                name="Lastname"
                placeholder="Full Name"
                required
                
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />

              <div>
                <input
                  ref={autoCompleteRef}
                  type="text"
                  name="Address"
                  placeholder="Street address"
                  required
                  onChange={(event) => setAddress(event.target.value)}
                     value={address}
                  
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@gmail.com"
                  required
               
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>

              <div>
                <input
                  class="input1"
                  type="text"
                  placeholder="City"
                  name="City"
                  required
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>

              <div>
                <input
                  class="input1"
                  type="text"
                  placeholder="State"
                  name="State"
                  required
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>

              <div>
                <input
                  class="input1"
                  type="text"
                  placeholder="Zipcode"
                  name="Zipcode"
                  required
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div class="relative">
                <input
                  class="peer hidden"
                  id="radio_1"
                  type="radio"
                  name="radio"
                  checked
                />
                <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  for="radio_1"
                >
                  <div class="ml-5">
                    <span class="mt-2 font-semibold">Cash On delievery</span>
                  </div>
                </label>
              </div>
              <div class="relative">
                <button>
                  <input
                    class="peer hidden"
                    id="radio_2"
                    type="radio"
                    name="radio"
                    checked
                  />

                  <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                    for="radio_2"
                  >
                    <div class="ml-5">
                      <span class="mt-2 font-semibold">
                        <button className=".stripe-payment-button">
                          <StripeCheckout stripeKey="pk_test_51NFABoBUBBvJWKKpR9lk1alYC5cuTBBlgCh9zhc0qF0uJPUYieJpaBWqpiP74320RgzGTquSy4HiSJUHFSFCqlyn00NHWBI7Ri" />
                        </button>
                      </span>
                    </div>
                  </label>
                </button>
              </div>
              <div></div>

              <button
                type="submit"
                class="w-full px-12 py-2 flex justify-center rounded-lg text-gray-50 font-normal tracking-wide bg-[#6441a5]  hover:scale-105 ease-in duration-200"
              >
                Procceed
              </button>
            </form>
          </div>
        </div>

        {/* cart page   */}

        <div class="itemspage">
          <div class="yourcart">
            <h3> Your Cart</h3>
          </div>
          {cart.map((curElem) => {
            return <CartCheckout key={curElem.id} {...curElem} />;
          })}

          <div class="txtss">
            <div>
              <p> SubTotal: PKR {total_price}</p>
            </div>

            <div>
              <p>Shipping Fee :PKR{shipping_fee}</p>
            </div>
            <br></br>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default CheckoutPage;

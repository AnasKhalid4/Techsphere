import "./LaptopDetailPageStyles.css";
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useCartContext } from "./Cart_context";
import Header from "./Header";
import CartAmountToggle from "./CartAmountToggle";
import Footer from "./Footer";
import ThreeSixtyView from "./threeSixtyView";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useAuth } from "./ContextAuth/Auth";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reviews from "./Reviews";
import SellerReview from "./SellerReview";

function LaptopDetailPage() {
  const { _id } = useParams();

  const { addToCart } = useCartContext();
  const [products, setproduct] = useState();
  const [videoFrames, setVideoFrames] = useState([]);
  const [currentFrame, setCurrentFrame] = useState("");
  const [frameIndex, setFrameIndex] = useState(1);
  const [is360Visible, setIs360Visible] = useState(false);
  const [isVisible3D, setIsVisible3D] = useState(false);
  const [loading, setLoading] = useState(true);
  const [frameDimensions, setFrameDimensions] = useState({
    x: "",
    y: "",
  });
  const [date, setDate] = useState(new Date());
  const [reviewsSection, setReviewsSection] = useState(false);
  const handleEditProfile = () => {
    setReviewsSection(true);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const currentdate = date.toDateString();
  const [auth] = useAuth();
  // States for 360-degree view
  const [startX, setStartX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const imageRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/laptops")
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        const newproduct = data.find((item) => item._id == _id);
        //console.log(newproduct);
        setproduct(newproduct);
        setVideoFrames(newproduct.threeSixtyImages);
        setLoading(false);
        //console.log(videoFrames);
      });
  }, []);

  const [counter, setCounter] = useState(1);

  const Increment = () => {
    setCounter(counter + 1);
  };

  const Decerement = () => {
    counter > 1 ? setCounter(counter - 1) : setCounter(1);
  };

  /*price calculation using counter and original price*/
  let total;
  let t_price;
  t_price = products?.price;
  total = t_price * counter;
  

  // const handleNextImage = () => {
  //   if (frameIndex < videoFrames.length - 1) {
  //     setFrameIndex((prev) => prev + 1);
  //     setCurrentFrame(videoFrames[frameIndex + 1]);
  //   } else {
  //     setFrameIndex(0);
  //     setCurrentFrame(videoFrames[0]);
  //   }
  // };

  // const handlePreviousImage = () => {
  //   if (frameIndex > 0) {
  //     setFrameIndex((prev) => prev - 1);
  //     setCurrentFrame(videoFrames[frameIndex - 1]);
  //   } else {
  //     setFrameIndex(videoFrames.length - 1);
  //     setCurrentFrame(videoFrames[videoFrames.length - 1]);
  //   }
  // };

  const [selectedImage, setSelectedImage] = useState("");
  useEffect(() => {
    // Initialize selectedImage with the default image when the component mounts
    setSelectedImage(products?.images[0]);
  }, [products]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  function calculateImageDimensions(imageData) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Set crossOrigin attribute if needed

      img.onload = () => {
        const dimensions = {
          width: img.naturalWidth,
          height: img.naturalHeight,
        };
        resolve(dimensions);
      };

      img.onerror = () => {
        reject(new Error("Failed to load the image"));
      };

      // Check if imageData is a URL or base64 data
      if (imageData.startsWith("http") || imageData.startsWith("data:image")) {
        img.src = imageData;
      } else {
        reject(new Error("Invalid image data"));
      }
    });
  }

  const decreaseProductQuantity = async () => {
    if (  products?.quantity > 0) {
      try {
        // Make an API call to update the quantity
        await axios.patch(`http://localhost:5000/laptops/${_id}`, {
          quantity:   products?.quantity- 1,
        });
           
        // Update the local state with the decreased quantity
        setproduct((prevProduct) => ({
          ...prevProduct,
          quantity: prevProduct.quantity - 1,
        }));
        console.log(products?.quantity)
      } catch (error) {
        console.error("Error updating product quantity:", error);
        // Handle error (e.g., show a notification)
        toast.error("Failed to update product quantity");
      }
    } else {
      // Handle case where product_quantity is already zero (optional)
      console.log("Product quantity is already zero");
    }
  };


  // reviews component
  const Sellerid = products?.SellerAuth;
  const [rating, setrating] = useState("");
  const [comment, setComment] = useState("");
  const handleRatingChange = (event) => {
    setrating(parseInt(event.target.value, 10));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handlereviewChange = (e) => {
    setrating(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(rating);
    console.log(comment);
    try {
      const { data } = await axios.post("http://localhost:5000/reviewpage", {
        rating,
        comment,
        currentdate,
        customerdata: auth.user?.name || "user",
        productid: _id,
        Sellerid,
      });

      toast.success("Review submitted successfully");
    } catch (err) {
      console.log(err);
    }
  };

  //get reviews on this page of product

  if (loading) {
    return (
      <div>
        {" "}
        <Header />{" "}
        <div className="loading-space">
          {" "}
          <div class="changed-ring">
            Loading
            <span> </span>
          </div>{" "}
        </div>{" "}
        <Footer />{" "}
      </div>
    );
  }

  return (
    <div className="containerpd">
      <div>
        <Header />
      </div>
      <div className="emptydetaildiv"></div>

      <div className="tracking"></div>
      <div className="griddiv">
        <div>
          <div className="mainimagediv">
           
         

            <img
              className="mainimage"
              src={selectedImage || products?.images[0]}
              alt="/"
            />
          </div>

          <div className="grid_column">
            {products?.images.map((data, i) => (
              <div
                className={`thumbnail ${
                  data === selectedImage ? "selected" : ""
                }`}
                key={i}
                onClick={() => handleImageClick(data)}
              >
                <img className="smallimages cursor-pointer hover:shadow-2xl" src={data} alt="/" />
              </div>
            ))}
          </div>

          <div>
            <div class="flex items-center justify-center m-7">
              <button
                onClick={() => {
                  setIs360Visible(true);
                  // Replace with the URL or base64 data of your image from the state
                  const imageFromState =
                    "data:image/jpeg;base64," + videoFrames[0];
                  // console.log(videoFrames[0]);
                  calculateImageDimensions(imageFromState)
                    .then((dimensions) => {
                      setFrameDimensions((prev) => ({
                        ...prev,
                        x: dimensions.width,
                      }));
                      setFrameDimensions((prev) => ({
                        ...prev,
                        y: dimensions.height,
                      }));
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
                className="px-10 py-10  rounded-lg text-black shadow-[0_5px_15px_0px_rgb(0,0,0,0.35)] hover:shadow-xl  ml-5 mr-5 "
              >
                360 view
              </button>

              <button  onClick={() => {setIsVisible3D(true)}}                 className="px-10 py-10  rounded-lg text-black shadow-[0_5px_15px_0px_rgb(0,0,0,0.35)] hover:shadow-xl  "
 >
               3D View
                 
             </button>
            </div>

            
             


            
            {/* <img src={`data:image/jpeg;base64,${currentFrame}`} alt="/" />
        <button onClick={handleNextImage}>Next </button>
        <button onClick={handlePreviousImage}> previous</button> */}
            {is360Visible && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]">
                <div className="w-screen h-screen flex items-center justify-center p-8 relative">
                <span
                      onClick={() => setIs360Visible(false)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer"
                    >
                      <AiOutlineCloseCircle size={22} />
                    </span>
                  <div className="flex flex-col justify-center items-center bg-slate-300 rounded-xl shadow-lg shadow-black/20 p-4 max-w-2xl h-full relative">
                   
                    <ThreeSixtyView
                      images={videoFrames}
                      height={frameDimensions.y}
                      width={frameDimensions.x}
                    />
                  </div>
                </div>
              </div>
            )}
            {isVisible3D && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]">
                <div className="w-screen h-screen flex items-center justify-center p-8 relative">
                <span
                      onClick={() => setIsVisible3D(false)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer"
                    >
                      <AiOutlineCloseCircle size={22} />
                    </span>
                  <div className="flex flex-col justify-center items-center bg-slate-300 rounded-xl shadow-lg shadow-black/20 p-4 max-w-2xl h-full relative">
                   
                  <iframe title="Slim Laptop animatable clean low poly model" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/2959e27e75274b7abf86a3bd75396c7f/embed"></iframe>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>{" "}
        {/* pictures div*/}
        <div className="griddiv2">
          <p className="titleofproduct">{products?.name}</p>

          <p> Seller: {products?.SellerName}</p>

          <SellerReview SellerID={Sellerid} />
          <text className="priceofproduct">
            Rs.{(t_price = products?.price)}
          </text>
          <br></br>
          <li className="specsofproduct"> {products?.specs[0]}</li>
          <br></br>
          <li className="specsofproduct">{products?.specs[1]}</li>
          <br></br>
          <li className="specsofproduct"> {products?.specs[2]}</li>
          <br></br>
          <li className="specsofproduct"> {products?.specs[3]}</li>
          <br></br>

          {/* <text>Quantity </text>

          <CartAmountToggle
            counter={counter}
            Decerement={Decerement}
            Increment={Increment}
          /> */}

          <br></br>
         
          <Link onClick={() => addToCart(_id, counter, products, total)}
          >
            <button class="design" > Add To Cart </button>
          </Link>
          <hr className="hrline"></hr>
          <p class="leading-7"> SKU :{products?.sku}</p>
         
          <p class="leading-7"> Category : {products?.category}</p>
        
          <p class="leading-7"> Condition : {products?.condition}</p>
        </div>
        {/*details div*/}
      </div>
      
      <div className="flex flex-col justify-center items-center gap-4 w-full py-16 bg-slate-50">
        <div className="flex flex-col items-center justify-center">
          <h2 className="dexscriptiontag text-lg font-bold text-gray-700">
            Description:
          </h2>

          <p className="text-base text-gray-700 px-10">
            {products?.description}
          </p>
        </div>

        <div className="flex justify-center items-center gap-8 px-8 py-16 w-full images-div">
          <div className="w-auto h-[50vh] aspect-square rounded-lg shadow-md  overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={products?.images[1]}
              alt="/"
            />
          </div>
          <div className="w-auto h-[50vh] aspect-square rounded-lg  shadow-md  overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={products?.images[2]}
              alt="/"
            />
          </div>
        </div>
      </div>

      {/* review section start */}

      {reviewsSection && (
        <div class="fixed inset-0 flex items-center justify-center  bg-black/40 backdrop-blur-sm icon-index">
          <div className="flex flex-col items-center py-6 px-4 bg-white rounded-xl">
            <span
              onClick={() => setReviewsSection(false)}
              className="absolute top-0.5 right-0.5 hover:text-red-700 rounded-full p-1 cursor-pointer "
            >
              <AiOutlineCloseCircle size={28} class="" />
            </span>
            <div>
              <p className="text-gray-600 font-medium tracking-wide pb-2">
                FeedBack
              </p>
              <form onSubmit={handleSubmit}>
                <div>
                  <p>
                    Rating:{" "}
                    <span className="star-rating">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <React.Fragment key={i}>
                          <label htmlFor={`rate-${i}`} style={{ "--i": i }}>
                            <i className="fa-solid fa-star"></i>
                          </label>
                          <input
                            type="radio"
                            name="rating"
                            required
                            id={`rate-${i}`}
                            style={{ display: "none" }}
                            value={i}
                            checked={rating === i}
                            onChange={handleRatingChange}
                          />
                        </React.Fragment>
                      ))}
                    </span>
                  </p>
                  Comment:
                  <textarea
                    className="Comments"
                    type="text"
                    required
                    name="comment"
                    placeholder="comment"
                    value={comment}
                    onChange={handleCommentChange}
                  />
                </div>
                <button class="reviewdesign" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
   
      <div className="review-section">
      
        <Reviews ProductID={_id}  reviewhandler={handleEditProfile} />
      </div>

      <div>
        <Footer />
      </div>
     < ToastContainer/>
    </div>
  );
}

export default LaptopDetailPage;

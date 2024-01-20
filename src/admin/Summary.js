import React ,{useState,useEffect}from "react";
import SideBar from "./SideBar";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "./Summary.css";
import axios from "axios";
function Summary() {

  const [sortBy, setSortBy] = useState("Default");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/Users");
      
    
      setProducts(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  


  const orderdata = [
    { name: "2023-12-01", orders: 1 },
    { name: "2023-12-02", orders: 300 },
    // ... Add more data for each day
  ];

  return (
    <div className="w-screen overflow-hidden">
    <div className="flex justify-between items-center fixed w-full h-[8vh] p-4 bg-transparent backdrop-blur-sm border-b-2 border-violet-300 z-10">
      <div className="">
       
      </div>

      <div>
        <h2>search bar</h2>
      </div>
      <div>
        <h2>icons and account</h2>
      </div>
    </div>

    <div className="grid grid-cols-2 w-96 h-screen">
      <div className="col-span-1">
        <SideBar />
      </div>
      <div className="flex flex-col col-span-2 px-0 py-16   relative">
          <div className="w-full   flex items-center justify-center  rounded-lg">
            {/* Search Bar and filter */}
      <div className="main-container-dashboard ">
      

      <div className="main-cards-dashboard ">
        <div className="card_dashboard ">
          <div className="card_dashboard-inner">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon_dashboard" />
          </div>
          <h1>300</h1>
        </div>
        <div className="card_dashboard ">
          <div className="card_dashboard-inner">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="card_icon_dashboard" />
          </div>
          <h1>12</h1>
        </div>
        <div className="card_dashboard ">
          <div className="card_dashboard-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon_dashboard" />
          </div>
          <h1>33</h1>
        </div>
        <div className="card_dashboard ">
          <div className="card_dashboard-inner">
            <h3>ALERTS</h3>
            <BsFillBellFill className="card_icon_dashboard" />
          </div>
          <br></br>
          <br></br>
          <h1>42</h1>
        </div>
      </div>

    
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Summary;

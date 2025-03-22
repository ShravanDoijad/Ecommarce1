import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Add } from "./pages/Add";
import { ListItems } from "./pages/ListItems";
import { Orders } from "./pages/Orders";
import { Navbar } from "./Components/Navbar";
import { Navlinks } from "./Components/Navlinks";

import Cookies from "js-cookie";

function App() {
  const [token, settoken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      
      
      localStorage.setItem("token", token);
      
    }
  }, [token]);
 


  return (
    <div className="w-full h-screen px-10">
      <ToastContainer />

      {
        token===""?
        <Login token={token} settoken={settoken} />:
      <div className='container w-full h-screen'>
        <Navbar token={token} settoken={settoken} />
        <hr className='w-full text-gray-400' />
        <div className="flex">
          <Navlinks />

        <div className="w-full ">
          <Routes>
            
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<ListItems />} />
            <Route path="/orders" element={<Orders />} />
            
          </Routes>
          </div>
        </div>
      </div>
      
      } 
    </div>
    
  );
}

export default App;

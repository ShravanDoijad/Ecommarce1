import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import './App.css'
import Cookies from "js-cookie"
import { Routes, Route } from 'react-router-dom'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import About from './pages/About'
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import PlaceOrder from './pages/PlaceOrder'
import Cart from './pages/Cart'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Orders from './pages/Orders'
import Verify from './pages/Verify'


function App() {
  const [count, setCount] = useState(0)

  

  return (
    <div className='p-8 sm:px-16 bg-gray-100 '>
      <ToastContainer />
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/placeorder" element={<PlaceOrder />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path='/orders' element={<Orders/>}/> 
      <Route path='/verify' element={<Verify/>}/>
      <Route path='/loading' element={<div>Loading...</div>}/>


    </Routes>
     <Footer/>
    </div>
  )
}

export default App

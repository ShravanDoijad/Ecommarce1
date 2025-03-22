import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { ToastContainer, toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backenUrl = import.meta.env.VITE_BACKEND_URL

        const [products, setproducts] = useState([])
        const getproducts = async () => {
            try {
                const res = await fetch(`${backenUrl}/product/list`, {
                  method : "GET" ,
                  
                 
                })
                if (res.ok) {
                  const data =await res.json()
                  
                  
                  setproducts(data.product)
                  
                }
                else{
                    console.log("no data");
                  
                }
              } catch (error) {
                console.log('error',error);
                
              }
        }

        useEffect(()=>{
            getproducts();
        },[])
        
        
        
        const currency = '$';
        const deleivery_fee =10;
        const [searchBar, setsearchBar] = useState('');
        const [showSearch, setshowSearch] = useState(false)
        const [cartItem, setcartItem] = useState({})
        

        let cartData = structuredClone(cartItem);
        const addCart= async(itemId, size) => {
           if(size=="" ){
            toast.error("Please select size")
           }
           else{

               const response = await fetch(`${backenUrl}/cart/addCart`,{
                   method: "POST",
                   headers:{
                       "Content-Type": "application/json",
                   },
                   credentials: 'include',
                   body: JSON.stringify({itemId, size})
                  })
                  if (response.ok) {
                    const data = await response.json();
                    
                
                setcartItem(data.cartData);
                
              }
              else{
                console.log("no data", response);
                
              }
              
              
              
            }
            
        }
       
        
        const cartItemCount = () => {
            let count =0;
          for (const items in cartItem) {
           for (const item in cartItem[items]) {
                try {
                    
                    if (cartData[items][item]>0) {
                        count+=cartData[items][item]
                        
                    }
                } catch (error) {
                    console.log(error);
                    
                }
            
           }
          }
          return count;
        }

        const updateData = async(itemId, size, quantity) => {
          let cartData = structuredClone(cartItem)

          
          try {
            const response = await fetch(`${backenUrl}/cart/updateCart`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({itemId, size, quantity})
            })
            if (response.ok) {
             const data = await response.json();
             
             setcartItem(data.cartData);
             
            }
            else{
             console.log("no data", response);
             
            }
            
          } catch (error) {
            console.log("not updated itemdata");
            
          }
        }
        const getCart = async() => {
          let cartData = structuredClone(cartItem)

          
          try {
            const response = await fetch(`${backenUrl}/cart/getCart`,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                
            })
            if (response.ok) {
             const data = await response.json();
             
             setcartItem(data.cartData);
             
            }
            else{
             console.log("no data", response);
             alert("Need to Login")
             
            }
            
          } catch (error) {
            console.log("not updated itemdata");
            
          }
        }

        const totalAmt = () => {
          let totalAmount = 0;
          for (const items in cartItem) {
             const product = products.find((item)=>item._id===items)
             for (const item in cartItem[items]) {
                    if(cartItem[items][item]>0)
                    {
                        totalAmount+=cartItem[items][item]*product.prices
                    }

                    }
             }
               return totalAmount; 
            }
                
        useEffect(()=>{
            getCart();
        },[])
        
        
        
        const value ={
            currency,
            deleivery_fee,
            products,
            searchBar,
            setsearchBar,
            showSearch,
            setshowSearch,
            addCart,
            cartItemCount,
            cartItem,
            setcartItem,
            updateData,
            totalAmt
            


        }
    return (
        <ShopContext.Provider value={ value  }> 
        { props.children } 
        </ShopContext.Provider >
    )
}

export default ShopContextProvider;


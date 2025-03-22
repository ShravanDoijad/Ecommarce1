import React, { useEffect, useState, useRef, useContext } from "react";
import { ShopContext } from "../Contexts/ShopContext";
import Text from "./Text";
import Products from "./Products";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latest, setLatest] = useState([]);
  const latestProducts = useRef();

  useEffect(() => {
    setLatest(products.slice(0, 6));
    ScrollTrigger.refresh(); 
  }, [products]);

  useGSAP(() => {
    gsap.from(latestProducts.current, {
      opacity: 100,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });
  }, [latest]);

  useGSAP(() => {
    gsap.to(latestProducts.current, {
      x: "-50%", 
      duration: 1,
      delay:3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: latestProducts.current,
        start: "100px center",
        end: "bottom center",
        scrub: 2,
        yoyo: true,
        markers: true, 
        
        
    },
    
    });
  }, [latest]);

  return (
    <div className="overflow-hidden">
      <div className="mt-8 h-40 flex flex-col justify-center items-center">
        <Text text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="text-gray-600 text-center max-w-lg">
          Discover our latest collection. Scroll down to explore more.
        </p>
      </div>

      <div
        className="relative w-full overflow-x-auto overflow-y-clip  whitespace-nowrap p-10"
        style={{ scrollbarWidth: "none" }}
      >
        <div className=" flex gap-x-24 w-fit" ref={latestProducts}>
          {latest.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-[300px] h-[400px]">
              <Products
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.prices}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;

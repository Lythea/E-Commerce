"use client";
import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiSearch } from "react-icons/fi";

const Navbar = ({ openModal }: { openModal: (content: string) => void }) => {
   const [categories, setCategories] = useState<{ id: number; name: string; image: string }[]>([]);
     const [showPopup, setShowPopup] = useState(false);

      const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
    useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      {/* Navbar */}
      <div className="bg-white shadow-md py-4 sticky top-0 z-50">
        <div className="max-w-[60%] mx-auto flex justify-between items-center">
          {/* Left Side (Categories & Navigation) */}
          <div className="flex space-x-8 text-gray-700 font-medium">
                <div
        className="cursor-pointer relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#C9A25D] after:transition-all after:duration-300 hover:after:w-full"
        onClick={() => setShowPopup(!showPopup)}
      >
        Category
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="absolute top-10  bg-white shadow-lg rounded-lg p-4 w-[60%] mt-20 z-10 -ml-20">
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className="cursor-pointer p-2 hover:bg-gray-200 flex items-center gap-2"
                onClick={() => {
                  openModal(category.name);
                  setShowPopup(false);
                }}
              >
                <img src={category.image} alt={category.name} className="w-6 h-6 rounded-full" />
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      )}
            <div
              className="cursor-pointer relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#C9A25D] after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => openModal("Blog Section Content")}
            >
              Blog
            </div>
            <div
              className="cursor-pointer relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#C9A25D] after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => openModal("New Arrivals Content")}
            >
              New Arrivals
            </div>
            <div
              className="cursor-pointer relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#C9A25D] after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => openModal("Best Sellers Content")}
            >
              Best Sellers
            </div>
          </div>

    

          {/* Right Side (E-Commerce Essentials) */}
          <div className="flex space-x-8 text-gray-700 font-medium items-center">
            <div
              className="cursor-pointer relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#C9A25D] after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => openModal("Deals & Offers Content")}
            >
              Deals & Offers
            </div>
            <div
              className="cursor-pointer relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#C9A25D] after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => openModal("Order Tracking Content")}
            >
              Orders & Tracking
            </div>
            <div
              className="cursor-pointer relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#C9A25D] after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => openModal("Wishlist Content")}
            >
              Wishlist
            </div>

   
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

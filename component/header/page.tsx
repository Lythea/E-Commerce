"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBagIcon,MagnifyingGlassIcon } from '@heroicons/react/24/outline';
const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Searching for:", searchQuery);
  };

 return (
  <header className="shadow-md p-4 bg-[#000000] text-white">
  {/* Top links section */}
<div className="bg-black py-2">
  <div className="max-w-[60%] mx-auto flex justify-end text-sm font-medium">
    <div className="flex items-center space-x-4">
      <div className="cursor-pointer text-[#C9A25D] hover:text-[#C9A25D] hover:underline transition">
        <h2>Notification</h2>
      </div>
      <div className="text-[#C9A25D]">|</div>
      <div className="cursor-pointer text-[#C9A25D] hover:text-[#C9A25D] hover:underline transition">
        <h2>Help</h2>
      </div>
      <div className="text-[#C9A25D]">|</div>
      <div className="cursor-pointer text-[#C9A25D] hover:text-[#C9A25D] hover:underline transition">
        <h2>Contact</h2>
      </div>
      <div className="text-[#C9A25D]">|</div>
      <div className="cursor-pointer text-[#C9A25D] hover:text-[#C9A25D] hover:underline transition">
        <h2>Sign Up</h2>
      </div>
 
    </div>
  </div>
</div>



  <div className="max-w-[60%] mx-auto flex justify-between items-center w-full">
    {/* Logo Section */}
    <div className="flex items-center gap-4">
      <h1 className="text-3xl font-serif font-semibold text-[#C9A25D]">
        Leather Luxe
      </h1>
    </div>

    {/* Search Bar */}
    <div className="flex-1 mx-6">
      <form
        onSubmit={handleSearchSubmit}
        className="relative flex items-center border border-[#C9A25D] rounded-full shadow-md overflow-hidden bg-white"
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-3 flex-1 text-gray-900 focus:outline-none placeholder-gray-500"
        />
        <button
          type="submit"
          className="p-3 text-[#4E342E] hover:text-[#C9A25D] transition-all"
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
      </form>
    </div>

    {/* Navigation */}
    <nav>
      <ul className="flex space-x-6 text-lg font-medium">
        <li>
          <Link href="/shop" className="text-[#C9A25D] hover:text-[#C9A25D] transition">
            Shop
          </Link>
        </li>
        <li>
          <div>
            <Link
              href="/cart"
              className="text-[#C9A25D] flex items-center gap-2 hover:text-[#C9A25D] transition"
            >
              Cart
              <ShoppingBagIcon className="w-6 h-6" />
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</header>

);

};

export default Header;

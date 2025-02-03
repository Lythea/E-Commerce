"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  const [saleBanners, setSaleBanners] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Searching for:", searchQuery);
  };
  useEffect(() => {
    const fetchSaleBanners = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saleBanner`);
        const data = await response.json();
        setSaleBanners(data);
      } catch (error) {
        console.error("Error fetching sale banners:", error);
      }
    };

    fetchSaleBanners();
  }, []);

  return (
    <>
          {/* <div className="sale-banners  bg-black text-center justify-center ">
        {saleBanners.length > 0 ? (
          <ul>
            {saleBanners.map((banner: { id: number; title: string,description:string }) => (
              <li key={banner.id} className="text-white py-2">{banner.title}{banner.description}</li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No sale banners available.</p>
        )}
      </div> */}
     
     
<header style={{ backgroundColor: "#053038" }} className="shadow-md p-4 flex justify-between items-center h-20">
  <div className="flex gap-5">
    <div className="flex flex-col items-center text-center">
      <img
        src="/assets/Logo_cropped.jpg"
        alt="Logo"
        width={70}
        height={70}
        className="rounded-full mb-2"
      />
      <h1 className="text-sm font-bold text-blue-200 -mt-4">Leather Luxe</h1>
    </div>
  </div>

  {/* Centered Search Container */}
  <div className="flex justify-center w-full">
    <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full max-w-[700px]">
      <input
        type="text"
        placeholder="What are you looking for ..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="p-2 rounded-md text-black focus:outline-none pl-3 pr-10 w-full mt-1"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="absolute right-2 w-6 h-6 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </form>
  </div>

  {/* Navigation Links */}
  <nav>
    <ul className="flex space-x-6">
      <li>
        <Link href="/shop" className="text-white hover:text-blue-600">
          Shop
        </Link>
      </li>
      <li>
        <Link href="/profile" className="text-white hover:text-blue-600">
          Profile
        </Link>
      </li>
      <li>
        <Link href="/cart" className="text-white hover:text-blue-600">
          Cart
        </Link>
      </li>
    </ul>
  </nav>
</header>

      </>
   
  );
};

export default Header;

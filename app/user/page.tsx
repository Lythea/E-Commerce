"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { TagIcon } from '@heroicons/react/24/outline';

import Header from "./header/page";
import Navbar from "./navbar/page"
const UserHome = () => {
  const staticData = {
    banners: [
      {
        id: 1,
        title: "50% Off on Leather Bags",
        description: "Limited time offer. Don't miss out on this exclusive deal!",
        image: "/images/Item1.jpg",
      },
      {
        id: 2,
        title: "New Arrivals - Fall Collection",
        description: "Discover the latest trends in fashion. Fresh styles are here!",
        image: "/images/Item8.jpg",
      },
      {
        id: 3,
        title: "Special Offer: Buy One, Get One Free",
        description: "Shop now and enjoy this exclusive deal on selected items.",
        image: "/images/Item7.jpg",
      },
      {
        id: 4,
        title: "Up to 70% Off Winter Sale",
        description: "Clearance sale! Huge discounts on selected winter fashion.",
        image: "/images/Item4.jpg",
      },
      {
        id: 5,
        title: "Exclusive Member Offer",
        description: "Sign up for a special 20% discount on your first order!",
        image: "/images/Item5.jpg",
      },
      {
        id: 6,
        title: "New Season, New Style!",
        description: "Fresh styles for the new season, available now.",
        image: "/images/Item6.jpg",
      },
    ],
    welcomeMessage: {
      title: "Welcome Back, Fashion Lover!",
      description: "Explore our curated collection and enjoy exclusive deals tailored for you.",
      buttonText: "Start Shopping Now",
      buttonLink: "/shop",
    },
    featuredProducts: [
      { id: 1, title: "Classic Leather Bag", description: "Stylish and durable.", image: "/images/Item1.jpg" },
      { id: 2, title: "Fall Jacket", description: "Perfect for the cold season.", image: "/images/Item2.jpg" },
      // More products
    ],
    testimonials: [
      { id: 1, name: "Alice Johnson", message: "I love the quality and variety of the products!" },
      { id: 2, name: "Mark Smith", message: "Fantastic customer service, highly recommend." },
      // More testimonials
    ],
    categories: [
      { id: 1, name: "Leather Bags", image: "/images/category-bags.jpg" },
      { id: 2, name: "Winter Collection", image: "/images/category-winter.jpg" },
      // More categories
    ],
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const openModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
useEffect(() => {
  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/featuredProduct", {
        method: "GET", // Explicitly setting the method to GET
      });
      if (!response.ok) {
        throw new Error("Failed to fetch featured products");
      }
      const data = await response.json();
      console.log(data);
      setFeaturedProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchFeaturedProducts();
}, []);


  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Navbar
      openModal={openModal}/>
  <div className="w-1/2 mx-auto">
<div className="w-full max-w-5xl mx-auto mt-12">

  {/* Loading state */}
  {isLoading ? (
    <div className="text-center">Loading featured products...</div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredProducts.map((product: any) => (
        <div
          key={product.id}
          className="border rounded-lg p-8 shadow-lg bg-white transform transition-all hover:scale-105 hover:shadow-2xl"
        >
          {/* Image container */}
          <div className="relative mb-6">
            <Image
              src={`http://localhost:8000/${product.image_url}`}  // Adjust URL for the image source
              alt={product.name}
              width={450}  // Larger image size
              height={450}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* Product Name */}
          <h3 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-2">{product.description}</p>

          {/* Price container */}
          <div className="mt-6 flex items-center">
            <span className="text-2xl font-semibold text-red-600">{product.discounted_price}</span>
            <span className="text-lg text-gray-500 ml-4 line-through">{product.current_price}</span>
          </div>

          {/* View Details Button */}
          <Link
            href={`/product/${product.id}`}
            className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-all"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  )}
</div>


      
      {/* Modal for Popup Content */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-md max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-semibold mb-4">{modalContent}</h3>
            <p>Here goes the content for {modalContent}...</p>
            <button
              onClick={closeModal}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Swiper Carousel */}
     <div className="w-full max-w-5xl mx-auto mt-12">
  {/* Special Offer Section Title */}
  <h1 className="text-5xl font-extrabold text-center mb-6 text-blue-600">

  </h1>

  {/* Swiper Carousel */}
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    spaceBetween={30}
    slidesPerView={1}
    autoplay={{ delay: 3500, disableOnInteraction: false }}
    navigation
    pagination={{ clickable: true }}
    loop
    className="rounded-xl shadow-lg"
  >
    {staticData.banners.map((banner) => (
      <SwiperSlide key={banner.id}>
        <div className="relative w-full h-[400px]">
          <Image
            src={`/assets${banner.image}`}
            alt={banner.title}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-6">
            <h3 className="text-4xl font-bold mb-2">{banner.title}</h3>
            <p className="text-lg">{banner.description}</p>
            <Link
              href="/shop"
              className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>


 

      {/* Shop By Category */}
      <div className="w-full max-w-5xl mx-auto mt-12">
        <TagIcon></TagIcon>
        <h2 className="text-3xl font-semibold text-center mb-8">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {staticData.categories.map((category) => (
            <div key={category.id} className="border rounded-lg p-6 shadow-md bg-white text-center">
              <Image
                src={`/assets${category.image}`}
                alt={category.name}
                width={250}
                height={250}
                objectFit="cover"
                className="rounded-lg mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold">{category.name}</h3>
              <Link
                href={`/shop/category/${category.id}`}
                className="mt-2 inline-block text-blue-600 hover:underline"
              >
                Browse {category.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
      </div>
  

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-12">
        <p>© 2025 Leather Luxe. All rights reserved.</p>
      </footer>
    </div>
  );
};
   
    //   <div className="w-full max-w-5xl mx-auto mt-12">
    //     <h2 className="text-3xl font-semibold text-center mb-8">Featured Products</h2>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    //       {staticData.featuredProducts.map((product) => (
    //         <div key={product.id} className="border rounded-lg p-6 shadow-lg bg-white">
    //           <Image
    //             src={`/assets${product.image}`}
    //             alt={product.title}
    //             width={350}
    //             height={350}
    //             objectFit="cover"
    //             className="rounded-lg mb-4"
    //           />
    //           <h3 className="text-xl font-semibold">{product.title}</h3>
    //           <p className="text-sm text-gray-500">{product.description}</p>
    //           <Link
    //             href={`/product/${product.id}`}
    //             className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
    //           >
    //             View Details
    //           </Link>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
export default UserHome;

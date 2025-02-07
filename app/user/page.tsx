"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";

import { ChevronRightIcon,TagIcon,ChevronLeftIcon,ShoppingBagIcon } from '@heroicons/react/24/outline';

import Header from "@/component/header/page";
import Navbar from "@/component/navbar/page";


const UserHome = () => {
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
 const [categories, setCategories] = useState<{ id: number; name: string; image: string }[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bgColor, setBgColor] = useState<string>("bg-neutral-200"); // default background color

  const openModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };
  const handleSlideChange = (swiper: any) => {
    const activeIndex = swiper.activeIndex;

    // Change background color based on the active slide index
    if (activeIndex === 0) {
      setBgColor("bg-neutral-200"); // Background for Featured Products
    } else if (activeIndex === 1) {
      setBgColor("bg-blue-500"); // Background for Category Section
    } else if (activeIndex === 2) {
      setBgColor("bg-green-500"); // Background for New Arrival Section
    }
  };

    const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
   const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/featuredProduct`, {
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

  // Call fetchCategories on mount
  useEffect(() => {
     fetchFeaturedProducts();
    fetchCategories();
  }, []);

  return (
    <>
<div className={`min-h-screen ${bgColor}`}>
  <Header />
  <Navbar openModal={openModal}/>

   <Swiper
        className="h-[730px]"
        spaceBetween={0} // No space between slides
        slidesPerView={1} // Only one slide at a time
        loop={true} // Loop the slides
        pagination={{ clickable: true }} // Pagination dots
        modules={[Autoplay, Pagination]} // Enable autoplay and pagination modules
      >
        {/* Featured Products Section with specific background */}
        <SwiperSlide className="bg-neutral-200"> {/* Background for Featured Products Section */}
          <FeaturedProductsSection data={featuredProducts} />
        </SwiperSlide>

        {/* Category Section with specific background */}
        <SwiperSlide className="bg-neutral-200"> {/* Background for Category Section */}
          <BestSellerSection data={categories} />
        </SwiperSlide>

        {/* New Arrival Section with specific background */}
        <SwiperSlide className="bg-neutral-200"> {/* Background for New Arrival Section */}
          <NewArrival data={featuredProducts} />
        </SwiperSlide>
      </Swiper>

  {/* Custom Tailwind styling for pagination dots */}
  <div className="swiper-pagination absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"></div>
</div>


</>)
};
const NewArrival = ({ data }: { data: any[] }) => {
return(<>
  <div className="flex items-center justify-between mb-8 max-w-[60%] mx-auto">
    <div className="flex items-center space-x-2">
      <ShoppingBagIcon className="w-6 h-6 text-primary" />
      <h1 className="text-xl font-bold text-gray-800">New Arrival</h1>
    </div>
  </div>

  <h2 className="text-2xl font-semibold text-gray-900 mb-8 max-w-[60%] mx-auto -mt-5">
    Browse New Arrivals
  </h2>

  <div className="max-w-[60%] mx-auto">
    <Swiper
      spaceBetween={20} // Space between slides
      slidesPerView={4} // Show 4 items at a time
      loop={true} // Enable looping
      pagination={{ clickable: true }} // Pagination dots
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }} // Custom navigation buttons
      breakpoints={{
        320: {
          slidesPerView: 1, // 1 item for small screens
        },
        768: {
          slidesPerView: 2, // 2 items for medium screens
        },
        1024: {
          slidesPerView: 4, // 4 items for larger screens
        },
      }}
    >
      {data.slice(0, 8).map((category) => (
        <SwiperSlide key={category.id}>
          <div className="rounded-lg shadow-lg p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="bg-neutral-200 w-36 h-36 flex items-center justify-center rounded-full mb-6 shadow-md">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/${category.image}`}
                alt={category.name}
                className="w-16 h-16 object-cover rounded-full"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-center">{category.name}</h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div></>)

}
const BestSellerSection = ({ data }: { data: any[] }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-8 max-w-[80%] mx-auto mt-10 ">
        <div className="flex items-center space-x-2">
          <TagIcon className="w-8 h-8 text-[#C9A25D]" /> {/* Change icon color to #C9A25D */}
          <h1 className="text-xl font-bold text-gray-800">Best Seller</h1>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-12 max-w-[80%] mx-auto text-center">
        Browse Best Seller
      </h2>

      <div className="max-w-[80%] mx-auto">
        <Swiper
          spaceBetween={20} // Space between slides
          slidesPerView={4} // Show 4 items at a time
          loop={true} // Enable looping
          pagination={{ clickable: true }} // Pagination dots
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }} // Custom navigation buttons
          breakpoints={{
            320: {
              slidesPerView: 1, // 1 item for small screens
            },
            768: {
              slidesPerView: 2, // 2 items for medium screens
            },
            1024: {
              slidesPerView: 4, // 4 items for larger screens
            },
          }}
        >
          {data.slice(0, 8).map((category) => (
            <SwiperSlide key={category.id}>
              <div className="rounded-xl shadow-xl p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-2xl bg-gray-800"> {/* Dark background */}
                <div className="w-40 h-40 flex items-center justify-center  mb-6 shadow-lg">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${category.image}`}
                    alt={category.name}
                    className="w-40 h-40 object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white text-center">{category.name}</h3> {/* White text for category name */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};



const FeaturedProductsSection = ({ data }: { data: any[] }) => {

  
  const shippingBenefits = [
  {
    label: "Free Shipping",
    description: "For all orders $200",
    image_url: "/assets/Icons/icon-01.svg"
  },
  {
    label: "1 & 1 Returns",
    description: "Cancellation after 1 day",
     image_url: "/assets/Icons/icon-02.svg"
  },
  {
    label: "100% Secure Payments",
    description: "Gurantee secure payments",
    image_url: "/assets/Icons/icon-03.svg"
  },
    {
    label: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
    image_url: "/assets/Icons/icon-04.svg"
  }
];

 const newArrivalProducts = [
  {
    id: 1,
    name: "Product 1",
    discounted_price: "$50.00",
    current_price: "$100.00",
    image_url: "/assets/images/Item11.jpg",
  },

];

const bestSellerProducts = [
  {
    id: 3,
    name: "Product 3",
    discounted_price: "$70.00",
    current_price: "$140.00",
    image_url: "/assets/images/Item7.jpg",
  },
];

  const [isLoading, setIsLoading] = useState(true);



  return (
    <>
   <div className="max-w-[60%] mx-auto">
       <div className="grid grid-cols-3 gap-8 mt-10 ">
{data[0] && (
  <motion.div
    key={data[0].id}
    className="border rounded-lg p-8 shadow-lg bg-white  transform transition-all hover:scale-105 hover:shadow-2xl col-span-2 h-[530px] flex relative"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >

    {/* Left Section: Product Info and Discount */}
    <div className="flex flex-col justify-between w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl relative z-10 p-10">
      {/* Discount and Special Offer Section */}
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-6xl font-extrabold text-[#C9A25D]">
          {parseFloat(data[0].percent).toFixed(0)}%
        </span>
        <span className="text-xl font-semibold text-black">
          Special <br /> Offer
        </span>
      </div>

      {/* Product Name */}
      <h3 className="text-3xl font-semibold text-black hover:text-black transition-colors mb-3">
        {data[0].name}
      </h3>

      {/* Product Description */}
      <p className="text-sm text-black mb-6">{data[0].description}</p>

      {/* View Details Button */}
      <Link
        href={`/product/${data[0].id}`}
        className="inline-block bg-black text-[#C9A25D] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#B68A3B] transition-all ease-in-out duration-300 transform hover:scale-105 w-36"
      >
       Shop Now
      </Link>
    </div>

    {/* Right Section: Product Image */}
<div className="relative h-full w-full ml-8 overflow-hidden sm:w-[300px] sm:h-[400px] lg:w-[30  0px] lg:h-[350px] flex-shrink-0 my-auto flex items-center justify-center z-10">
  <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div> {/* Dark overlay */}
  <Image
    src={`http://localhost:8000/${data[0].image_url}`}
    alt={data[0].name}
    layout="fill"  // Ensures the image fills the container
    objectFit="cover"  // Ensures the image covers the container without distortion
    className="rounded-lg z-10"
  />
</div>

  </motion.div>
)}
<div className="flex flex-col gap-0">
<div className="mb-6 relative">
  {newArrivalProducts.slice(0, 1).map((product, index) => (
    <motion.div
      key={product.id}
      className="border rounded-lg p-3 shadow-lg bg-white transform transition-all hover:scale-105 hover:shadow-2xl h-[255px] overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.3 }}
    >
      {/* Title with background at the bottom */}
<div className="absolute bottom-0 left-0 w-full bg-black text-white text-center py-2 flex justify-center items-center space-x-2">
  <h2 className="text-lg font-semibold text-white">New Arrivals</h2>
  <ChevronRightIcon className="w-4 h-4 text-white" />
</div>

      <div className="flex flex-row justify-between h-full pb-12"> {/* Added padding-bottom to make space for the title */}
        {/* Left Column: Product Info */}
        <div className="flex flex-col justify-between w-[calc(100%-150px)] p-5">
          <h3 className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <div className="mt-2 flex flex-col items-start">
            <span className="text-xs text-red-600 font-medium mb-1">
              Limited Time Offer
            </span>
            <div className="flex">
              <span className="text-lg font-semibold text-red-600">
                {product.discounted_price}
              </span>

              <span className="text-xs text-gray-500 ml-2 mt-1 pt-1 line-through">
                {product.current_price}
              </span>
            </div>
          </div>

          <Link
            href={`/product/${product.id}`}
            className="inline-block bg-black text-[#C9A25D] px-4 mt-5 py-2 rounded-lg text-md font-semibold hover:bg-[#B68A3B] transition-all ease-in-out duration-300 transform hover:scale-105 w-28"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Column: Product Image */}
        <div className="relative w-[150px] mt-5 h-[150px] ml-4 flex justify-center items-center">
          <Image
            src={`${product.image_url}`}
            alt={product.name}
            width={150}
            height={150}
            objectFit="cover"
            className="rounded-lg z-10 h-full"
          />
        </div>
      </div>
    </motion.div>
  ))}
</div>

  {/* Best Seller Products - Only the first product */}
<div className="mb-6 relative">
  {bestSellerProducts.slice(0, 1).map((product, index) => (
    <motion.div
      key={product.id}
      className="border rounded-lg p-3 shadow-lg bg-white transform transition-all hover:scale-105 hover:shadow-2xl h-[250px] overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.3 }}
    > 
      {/* Title with background at the bottom */}
   <div className="absolute bottom-0 left-0 w-full bg-black text-white text-center py-2 flex justify-center items-center space-x-2">
  <h2 className="text-lg font-semibold text-white">Best Seller</h2>
  <ChevronRightIcon className="w-4 h-4 text-white" />
</div>

      <div className="flex flex-row justify-between h-full pb-12"> {/* Added padding-bottom to make space for the title */}
        {/* Left Column: Product Info */}
        <div className="flex flex-col justify-between w-[calc(100%-150px)] p-5">
          <h3 className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <div className="mt-2 flex flex-col items-start">
            <span className="text-xs text-red-600 font-medium mb-1">
              Limited Time Offer
            </span>
            <div className="flex">
              <span className="text-lg font-semibold text-red-600">
                {product.discounted_price}
              </span>

              <span className="text-xs text-gray-500 ml-2 mt-1 pt-1 line-through">
                {product.current_price}
              </span>
            </div>
          </div>

          <Link
            href={`/product/${product.id}`}
            className="inline-block bg-black mt-5 text-[#C9A25D] px-4 py-2 rounded-lg text-md font-semibold hover:bg-[#B68A3B] transition-all ease-in-out duration-300 transform hover:scale-105 w-28"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Column: Product Image */}
        <div className="relative w-[150px] mt-5 h-[150px] ml-4 flex justify-center items-center">
          <Image
            src={`${product.image_url}`}
            alt={product.name}
            width={150}
            height={150}
            objectFit="cover"
            className="rounded-lg z-10 h-full"
          />
        </div>
      </div>
    </motion.div>
  ))}
  
</div>

</div>




</div>
<div className="flex space-x-8 w-full mt-10">
  {shippingBenefits.map((benefit, index) => (
    <div key={index} className="flex items-center space-x-4 w-full">
      {/* First Column: Image */}
      <div className="w-[50px] h-[50px] flex-shrink-0">
        <img src={benefit.image_url} alt={benefit.label} className="w-full h-full object-contain" />
      </div>

      {/* Second Column: Label and Description */}
      <div className="flex flex-col w-full">
        {/* Label */}
        <span className="text-md font-semibold text-black">{benefit.label}</span>
        {/* Description */}
        <span className="text-sm text-gray-500">{benefit.description}</span>
      </div>
    </div>
  ))}
</div>
</div>
    </>
  )
};

 
export default UserHome;

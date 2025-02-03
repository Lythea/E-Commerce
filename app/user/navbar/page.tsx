"use client";
import React from "react";

const Navbar = ({ openModal }: { openModal: (content: string) => void }) => {
  return (
    <div className="bg-white shadow-md py-4">
      <div className="px-6">
        <div className="flex justify-between">
          {/* Left side of the navbar */}
          <div className="flex space-x-8">
            {/* Popular Section */}
            <div className="cursor-pointer">
              <h2
                className="text-sm font-semibold hover:text-blue-500"
                onClick={() => openModal("Popular Section Content")}
              >
                Popular
              </h2>
            </div>

            {/* Shop Section */}
            <div className="cursor-pointer">
              <h2
                className="text-sm font-semibold hover:text-blue-500"
                onClick={() => openModal("Shop Section Content")}
              >
                Shop
              </h2>
            </div>

            {/* Blog Section */}
            <div className="cursor-pointer">
              <h2
                className="text-sm font-semibold hover:text-blue-500"
                onClick={() => openModal("Blog Section Content")}
              >
                Blog
              </h2>
            </div>

            {/* Contact Section */}
            <div className="cursor-pointer">
              <h2
                className="text-sm font-semibold hover:text-blue-500"
                onClick={() => openModal("Contact Section Content")}
              >
                Contact
              </h2>
            </div>
          </div>

          {/* Right side of the navbar */}
          <div className="flex space-x-8">
            {/* Recently Viewed */}
            <div className="cursor-pointer">
              <h2
                className="text-sm font-semibold hover:text-blue-500"
                onClick={() => openModal("Recently Viewed Content")}
              >
                Recently Viewed
              </h2>
            </div>

            {/* Wishlist */}
            <div className="cursor-pointer">
              <h2
                className="text-sm font-semibold hover:text-blue-500"
                onClick={() => openModal("Wishlist Content")}
              >
                Wishlist
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

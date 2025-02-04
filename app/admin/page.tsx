"use client"
import { useEffect, useState } from 'react';
import AdminLayout from "./sidebar";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    products: 0,
    categories: 0,
    banners: 0,
    featured: 0,
    brands: 0,
  });

  // Function to fetch counts from the API
  const fetchCounts = async () => {
    try {
      // Making parallel requests to get all counts
      const [
        productsResponse,
        categoriesResponse,
        bannersResponse,
        featuredResponse,
        brandsResponse
      ] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/count`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/count`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saleBanner/count`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/featuredProduct/count`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brands/count`),
      ]);

      // Parsing the responses as JSON
      const [
        productsCount,
        categoriesCount,
        bannersCount,
        featuredCount,
        brandsCount
      ] = await Promise.all([
        productsResponse.json(),
        categoriesResponse.json(),
        bannersResponse.json(),
        featuredResponse.json(),
        brandsResponse.json()
      ]);

      // Updating the counts in state
      setCounts({
        products: productsCount.count,
        categories: categoriesCount.count,
        banners: bannersCount.count,
        featured: featuredCount.count,
        brands: brandsCount.count,
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  // Fetch counts when the component mounts
  useEffect(() => {
    fetchCounts();
  }, []);

return (
  <AdminLayout>
   <h2 className="text-3xl font-bold ">Leather Luxe</h2>
<p className=" text-gray-600 text-lg">Crafting timeless leather goods with elegance and superior craftsmanship. Discover luxury that lasts.</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-8">
      {/* Products Card */}
      <div style={{ backgroundColor: "#073036" }} className="p-8 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold mb-4">Products</h3>
        <p className="text-3xl font-bold">{counts.products}</p>
      </div>

      {/* Categories Card */}
      <div style={{ backgroundColor: "#073036" }} className="p-8 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold mb-4">Categories</h3>
        <p className="text-3xl font-bold">{counts.categories}</p>
      </div>

      {/* Sale Banners Card */}
      <div style={{ backgroundColor: "#073036" }} className="p-8 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold mb-4">Sale Banners</h3>
        <p className="text-3xl font-bold">{counts.banners}</p>
      </div>

      {/* Featured Card */}
      <div style={{ backgroundColor: "#073036" }} className="p-8 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold mb-4">Featured</h3>
        <p className="text-3xl font-bold">{counts.featured}</p>
      </div>

      {/* Brands Card */}
      <div style={{ backgroundColor: "#073036" }} className="p-8 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold mb-4">Brands</h3>
        <p className="text-3xl font-bold">{counts.brands}</p>
      </div>
    </div>
  </AdminLayout>
);


};

export default Dashboard;

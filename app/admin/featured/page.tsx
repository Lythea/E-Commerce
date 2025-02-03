"use client"
import { useState, useEffect } from "react";
import AdminLayout from "./../sidebar";
import AddItemModal from "./CRUD/addItem"; // Import the modal

// Define the type for the product data according to the backend response
interface Product {
  id: number;
  name: string;
  description: string;
  percent: string;
  image: File | null;
  currentPrice: string;
  discountedPrice: string;
  createdAt: string;
  updatedAt: string;
}

const FeaturedProduct = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/featuredProduct');
        const products = await response.json();

        // Map the data to match the Product interface
        const mappedData = products.map((product: any) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          percent: product.percent,
          image: product.image_url, // Mapping the image_url from backend to imageUrl
          currentPrice: product.current_price,
          discountedPrice: product.discounted_price,
          createdAt: product.created_at, // Mapping the created_at field
          updatedAt: product.updated_at, // Mapping the updated_at field
        }));

        setData(mappedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  // Fetch products on component mount
  useEffect(() => {


    fetchData();
  }, []);

  // Define the function to add a new item
  const handleAddItem = (newItem: Omit<Product, "id">) => {
    setData((prevData) => [
      ...prevData,
      { id: prevData.length + 1, ...newItem }, // Add a generated ID
    ]);
    fetchData()
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-left text-2xl font-semibold">Featured Content</h2>
          <p className="text-left">Manage your featured products.</p>
        </div>

        <div className="inline-flex space-x-2">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            Add
          </button>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Update
          </button>
          <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">ID</th>
            <th className="px-4 py-2 border-b text-left">Name</th>
            <th className="px-4 py-2 border-b text-left">Category</th>
            <th className="px-4 py-2 border-b text-left">Price</th>
            <th className="px-4 py-2 border-b text-left">Discounted Price</th>
            <th className="px-4 py-2 border-b text-left">Created At</th>
            <th className="px-4 py-2 border-b text-left">Updated At</th>
            <th className="px-4 py-2 border-b text-left">Image</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{product.id}</td>
              <td className="px-4 py-2 border-b">{product.name}</td>
              <td className="px-4 py-2 border-b">{product.description}</td>
              <td className="px-4 py-2 border-b">{product.currentPrice}</td>
              <td className="px-4 py-2 border-b">{product.discountedPrice}</td>
              <td className="px-4 py-2 border-b">{product.createdAt}</td>
              <td className="px-4 py-2 border-b">{product.updatedAt}</td>
              <td className="px-4 py-2 border-b">
                <img
                  src={`http://localhost:8000/${product.image}`}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding product */}
      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddItem}
      />
    </AdminLayout>
  );
};

export default FeaturedProduct;

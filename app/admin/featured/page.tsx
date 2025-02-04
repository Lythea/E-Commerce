"use client";
import { useState, useEffect } from "react";
import AdminLayout from "./../sidebar";
import AddItemModal from "./crud/addItem";
import EditItemModal from "./crud/updateItem"; // Import Edit Modal
import DeleteItem from "./crud/deleteItem";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

interface Product {
  category: string;
  id: number;
  name: string;
  description: string;
  percent: string;
  image: File | null;
  currentPrice: string;
  discountedPrice: string;
  expirationDate: string;
}

const FeaturedProduct = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/featuredProduct`);
      const products = await response.json();
      const mappedData = products.map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        percent: product.percent,
        image: product.image_url,
        currentPrice: product.current_price,
        discountedPrice: product.discounted_price,
        category: product.category,
        expirationDate: product.expiration_date,
      }));
      setData(mappedData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    setData((prevData) => prevData.filter((product) => product.id !== id));
    fetchData()
    alert("Deleted Successfully");
  };

  const handleAddItem = (newItem: Omit<Product, "id">) => {
    setData((prevData) => [...prevData, { id: prevData.length + 1, ...newItem }]);
    fetchData();
  };

  const handleEditItem = (updatedProduct: Product) => {
    setData((prevData) =>
      prevData.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
    setIsEditModalOpen(false);
    fetchData()
  };

  return (
    <AdminLayout>
            <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-left text-2xl font-semibold">Featured Content</h2>
          <p className="text-left">Manage your featured products.</p>
        </div>

        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          Add
        </button>
      </div>

      <div className="flex justify-center p-4">
  <table className="min-w-full table-auto border-collapse text-center">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-4 py-2 border-b text-sm font-medium text-gray-600 text-center">Name</th>
        <th className="px-4 py-2 border-b text-sm font-medium text-gray-600 text-center">Description</th>
        <th className="px-4 py-2 border-b text-sm font-medium text-gray-600 text-center">Category</th>
        <th className="px-4 py-2 border-b text-sm font-medium text-gray-600 text-center">Price</th>
        <th className="px-4 py-2 border-b text-sm font-medium text-gray-600 text-center">Percent</th>
        <th className="px-4 py-2 border-b text-sm font-medium text-gray-600 text-center">Discounted Price</th>
        <th className="px-4 py-2 border-b text-sm font-medium text-gray-600 text-center">Expiration Date</th>
        <th className="px-4 py-2 border-b text-sm font-medium text-gray-600 text-center">Image</th>
        <th className="px-4 py-2 border-b text-sm font-medium text-gray-600 text-center">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {data.map((product) => (
        <tr key={product.id} className="hover:bg-gray-50">
          <td className="px-4 py-2 border-b text-sm text-gray-700">{product.name}</td>
          <td className="px-4 py-2 border-b text-sm text-gray-700">{product.description}</td>
          <td className="px-4 py-2 border-b text-sm text-gray-700">{product.category}</td>
          <td className="px-4 py-2 border-b text-sm text-gray-700">{product.currentPrice}</td>
          <td className="px-4 py-2 border-b text-sm text-gray-700">{product.percent}</td>
          <td className="px-4 py-2 border-b text-sm text-gray-700">{product.discountedPrice}</td>
          <td className="px-4 py-2 border-b text-sm text-gray-700">{product.expirationDate}</td>
          <td className="px-4 py-2 border-b">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/${product.image}`}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md"
            />
          </td>
          <td className="px-4 py-2 border-b text-center relative">
            <button
              onClick={() =>
                setActionMenuOpen(actionMenuOpen === product.id ? null : product.id)
              }
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <EllipsisVerticalIcon className="w-5 h-5" />
            </button>

            {actionMenuOpen === product.id && (
              <div className="absolute bg-white shadow-md rounded-lg mt-2 w-32 right-0 z-10">
                <ul>
                  <li
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </li>
                  <li
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
      <AddItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddItem} />

  {isEditModalOpen && selectedProduct && (
  <EditItemModal
    isOpen={isEditModalOpen}
    onClose={() => setIsEditModalOpen(false)}
    product={selectedProduct}
    onEdit={handleEditItem}
  />
)}

      <DeleteItem
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        productId={selectedProductId ?? 0}
      />
    </AdminLayout>
  );
};

export default FeaturedProduct;

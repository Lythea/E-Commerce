"use client"
import AdminLayout from "../sidebar";
import { useState, useEffect } from "react";
import AddBrandModal from "./crud/addBrand";
import EditBrandModal from "./crud/updateBrand";
import DeleteBrandModal from "./crud/deleteBrand";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

const Brand = () => {
  const [brands, setBrands] = useState<{ id: number; name: string; image: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<{ id: number; name: string; image: string } | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);

  // Fetch brands from backend
  const fetchBrands = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brands`);
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  // Call fetchBrands on mount
  useEffect(() => {
    fetchBrands();
  }, []);

  // Handle brand addition
  const handleAddBrand = (name: string, image: string) => {
    setBrands((prevBrands) => [
      ...prevBrands,
      { id: Date.now(), name, image },
    ]);
    fetchBrands();
  };

  // Handle brand update
  const handleUpdateBrand = (id: number, name: string, image: string) => {
    setBrands((prevBrands) =>
      prevBrands.map((brand) =>
        brand.id === id ? { ...brand, name, image } : brand
      )
    );
    setIsEditModalOpen(false);
    fetchBrands();
  };

  // Handle brand deletion
  const handleDeleteBrand = () => {
    if (selectedBrandId) {
      setBrands((prevBrands) =>
        prevBrands.filter((brand) => brand.id !== selectedBrandId)
      );
      setIsDeleteModalOpen(false);
    }
    fetchBrands();
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-left text-2xl font-semibold">Brand Content</h2>
            <p className="text-left">Manage your brand content.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)} // Open the Add Brand Modal
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            Add Brand
          </button>
        </div>

        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b border-gray-300 text-left p-3 text-sm font-medium text-gray-600">Name</th>
              <th className="border-b border-gray-300 text-center p-3 text-sm font-medium text-gray-600">Image</th>
              <th className="border-b border-gray-300 text-center p-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {brands.map((brand) => (
              <tr key={brand.id} className="hover:bg-gray-50">
                <td className="border-b border-gray-300 p-3 text-sm text-gray-700">{brand.name}</td>
                <td className="border-b border-gray-300 p-3 text-sm text-gray-700 text-center">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${brand.image}`}
                    alt={brand.name}
                    className="w-16 h-16 object-cover rounded-full mx-auto"
                  />
                </td>
                <td className="px-4 py-2 border-b text-center relative">
                  <button
                    onClick={() =>
                      setActionMenuOpen(actionMenuOpen === brand.id ? null : brand.id)
                    }
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </button>

                  {actionMenuOpen === brand.id && (
                    <div className="absolute bg-white shadow-md rounded-lg mt-2 w-32 right-0 z-10">
                      <ul>
                        <li
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                          onClick={() => {
                            setSelectedBrand(brand);
                            setIsEditModalOpen(true);
                          }}
                        >
                          Edit
                        </li>
                        <li
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                          onClick={() => {
                            setSelectedBrandId(brand.id);
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

        {/* Add Brand Modal */}
        <AddBrandModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddBrand={handleAddBrand}
        />

        {/* Edit Brand Modal */}
        {isEditModalOpen && selectedBrand && (
          <EditBrandModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            brand={selectedBrand}  // Ensure you're passing the brand object
            onUpdateBrand={handleUpdateBrand}  // Ensure you're passing the correct handler
          />
        )}

        {/* Delete Brand Modal */}
        {isDeleteModalOpen && selectedBrandId !== null && (
          <DeleteBrandModal
            isOpen={isDeleteModalOpen}
            brandId={selectedBrandId}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteBrand={handleDeleteBrand}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Brand;

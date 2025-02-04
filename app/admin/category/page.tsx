"use client"
import AdminLayout from "../sidebar";
import { useState, useEffect } from "react";
import AddCategoryModal from "./crud/addCategory";
import EditCategoryModal from "./crud/updateCategory";
import DeleteCategoryModal from "./crud/deleteCategory";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

const Category = () => {
  const [categories, setCategories] = useState<{ id: number; name: string; image: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string; image: string } | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Call fetchCategories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle category addition
  const handleAddCategory = (name: string, image: string) => {
    setCategories((prevCategories) => [
      ...prevCategories,
      { id: Date.now(), name, image },
    ]);
    fetchCategories()
  };

const handleUpdateCategory = (id: number, name: string, image: string) => {
  setCategories((prevCategories) =>
    prevCategories.map((category) =>
      category.id === id ? { ...category, name, image } : category
    )
  );
  setIsEditModalOpen(false);
  fetchCategories()
};


  // Handle category deletion
  const handleDeleteCategory = () => {
    if (selectedCategoryId) {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== selectedCategoryId)
      );
      setIsDeleteModalOpen(false);
    }
    fetchCategories()
  };

  return (
        <AdminLayout>
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-left text-2xl font-semibold">Category Content</h2>
          <p className="text-left">Manage your category content.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)} // Open the Add Category Modal
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          Add Category
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
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50">
              <td className="border-b border-gray-300 p-3 text-sm text-gray-700">{category.name}</td>
              <td className="border-b border-gray-300 p-3 text-sm text-gray-700 text-center">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${category.image}`}
                  alt={category.name}
                  className="w-16 h-16 object-cover rounded-full mx-auto"
                />
              </td>
              <td className="px-4 py-2 border-b text-center relative">
                <button
                  onClick={() =>
                    setActionMenuOpen(actionMenuOpen === category.id ? null : category.id)
                  }
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </button>

                {actionMenuOpen === category.id && (
                  <div className="absolute bg-white shadow-md rounded-lg mt-2 w-32 right-0 z-10">
                    <ul>
                      <li
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsEditModalOpen(true);
                        }}
                      >
                        Edit
                      </li>
                      <li
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          setSelectedCategoryId(category.id);
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

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCategory={handleAddCategory}
      />

      {/* Edit Category Modal */}
      {isEditModalOpen && selectedCategory && (
  <EditCategoryModal
  isOpen={isEditModalOpen}
  onClose={() => setIsEditModalOpen(false)}
  category={selectedCategory}  // Ensure you're passing the category object
  onUpdateCategory={handleUpdateCategory}  // Ensure you're passing the correct handler
/>

      )}

      {/* Delete Category Modal */}
      {isDeleteModalOpen && selectedCategoryId !== null && (
        <DeleteCategoryModal
          isOpen={isDeleteModalOpen}
        categoryId={selectedCategoryId}
          onClose={() => setIsDeleteModalOpen(false)}
          onDeleteCategory={handleDeleteCategory}
        />
      )}
    </div>
    </AdminLayout>
  );
  
};

export default Category;


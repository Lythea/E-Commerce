import { useState } from "react";

const DeleteCategoryModal = ({
  isOpen,
  onClose,
  categoryId,
  onDeleteCategory,
}: {
  isOpen: boolean;
  onClose: () => void;
  categoryId: number;
  onDeleteCategory: () => void;
}) => {
  if (!isOpen) return null;
console.log(categoryId)
  const handleDeleteCategory = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      onDeleteCategory(); // Call parent handler to update the UI after deletion
      onClose(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Delete Category</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            X
          </button>
        </div>
        <div className="mt-4">
          <p className="mb-4">Are you sure you want to delete this category?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleDeleteCategory}
              className="px-6 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;

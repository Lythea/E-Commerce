"use client";

import { useState } from "react";

interface DeleteItemProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  productId: number;
}

const DeleteItem = ({ isOpen, onClose, onDelete, productId }: DeleteItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

const handleDelete = async () => {
  setIsDeleting(true);
  try {
    // Make API call to delete the product
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/featuredProduct/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Call the parent function to refresh data or handle other actions after deletion
      await onDelete(productId); // This triggers the parent component to update
      onClose(); // Close the modal after deletion
    } else {
      console.error('Error deleting product:', await response.text());
    }
  } catch (error) {
    console.error('Error deleting product:', error);
  } finally {
    setIsDeleting(false);
  }
};


  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h3 className="text-xl font-semibold">Delete Product</h3>
          <p className="mt-2 text-gray-700">Are you sure you want to delete this product?</p>

          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteItem;

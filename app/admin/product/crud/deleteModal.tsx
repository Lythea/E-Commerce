import React from "react";

interface DeleteButtonProps {
  productId: number;
  handleDelete: (id: number) => void; // Function to delete the product
  onClose: () => void; // Close the modal after deletion or cancel
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ productId, handleDelete, onClose }) => {
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        handleDelete(productId); // Trigger the delete function
        onClose(); // Close the modal after confirming deletion
      } 
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold">Are you sure?</h3>
        <p className="text-gray-600 my-4">Do you really want to delete this product?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose} // Close modal without doing anything
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleConfirmDelete} // Confirm and delete the product
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteButton;

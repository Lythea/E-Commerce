
import React from "react";

interface DeleteBannerProps {
  bannerId: number;
  onDeleteConfirmed: (id: number) => void;
  closeModal: () => void;
  isModalOpen: boolean; // Add this prop to handle modal visibility
}

const DeleteBanner: React.FC<DeleteBannerProps> = ({
  bannerId,
  onDeleteConfirmed,
  closeModal,
  isModalOpen,
}) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/saleBanner/${bannerId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        onDeleteConfirmed(bannerId); // Notify parent to remove the banner from state
        closeModal(); // Close the modal
      } else {
        console.error("Failed to delete banner");
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  if (!isModalOpen) return null; // Don't render anything if modal isn't open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold">Are you sure?</h3>
        <p className="text-gray-600 my-4">Do you really want to delete this banner?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBanner;

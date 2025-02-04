import { useState } from "react";

interface UpdateStatusProps {
  bannerId: number;
  currentStatus: number; // Expecting 0 or 1
  onStatusUpdated: (id: number, newStatus: number) => void;
  closeModal: () => void; // Add this to close the modal after action
}

const UpdateStatus = ({ bannerId, currentStatus, onStatusUpdated, closeModal }: UpdateStatusProps) => {
  const [newStatus, setNewStatus] = useState<number>(currentStatus);

  const handleStatusChange = async () => {
    try {
      // Toggle the status between 0 and 1
      const updatedStatus = newStatus === 1 ? 0 : 1;

      // Make the API call to update the status
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saleBanner/status/${bannerId}`, {
        method: "PUT",
        body: JSON.stringify({ is_active: updatedStatus }), // Pass 0 or 1
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        onStatusUpdated(bannerId, updatedStatus); // Update status in parent
        closeModal(); // Close the modal
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-xl font-semibold mb-4">{newStatus === 1 ? "Deactivate" : "Activate"} Banner</h3>
        <p className="mb-4">
          Are you sure you want to {newStatus === 1 ? "deactivate" : "activate"} this banner?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleStatusChange}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Yes, {newStatus === 1 ? "Deactivate" : "Activate"}
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatus;

import { useState } from "react";

interface ChangeBackgroundModalProps {
  bannerId: number;
  currentBackground: number; // 0 for color, 1 for image
  onBackgroundUpdated: (id: number, newBackground: number) => void;
  closeModal: () => void;
}

const ChangeBackgroundModal = ({
  bannerId,
  currentBackground,
  onBackgroundUpdated,
  closeModal,
}: ChangeBackgroundModalProps) => {
  const [backgroundType, setBackgroundType] = useState<number>(currentBackground); // 0: Color, 1: Image

  const handleBackgroundChange = async () => {
    try {
      const updatedBackground = backgroundType === 1 ? 0 : 1; // Toggle between color (0) and image (1)

      // Make the API call to update the background type (color or image)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/saleBanner/bg/${bannerId}`,
        {
          method: "PUT",
          body: JSON.stringify({ is_background: updatedBackground }), // 0 or 1
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        onBackgroundUpdated(bannerId, updatedBackground); // Update background in parent
        closeModal(); // Close the modal
      } else {
        console.error("Failed to update background");
      }
    } catch (error) {
      console.error("Error updating background:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-xl font-semibold mb-4">
          {backgroundType === 1 ? "Change Background to Color" : "Change Background to Image"}
        </h3>
        <p className="mb-4">
          Are you sure you want to{" "}
          {backgroundType === 1 ? "change the background to color?" : "change the background to image?"}
        </p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleBackgroundChange}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Yes, Change Background
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

export default ChangeBackgroundModal;

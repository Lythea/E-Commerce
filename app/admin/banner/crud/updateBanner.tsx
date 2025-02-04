import React, { useState, useEffect } from "react";

const UpdateBanner = ({
  closeModal,
  isOpen,
  initialFormData, // renamed to initialFormData for clarity
  handleUpdateBanner,
  modalSize = "small",
  labels = {
    updateButtonLabel: "Update",
    cancelButtonLabel: "Cancel",
    titleLabel: "Title",
    descriptionLabel: "Description",
    imageLabel: "Image URL",
    bgColorLabel: "Background Color",
    activeLabel: "Active",
  },
  textStyles = {
    title: "text-lg font-semibold mb-4",
    label: "block mb-2",
    input: "p-2 border rounded w-full",
    button: "px-6 py-2 text-white rounded",
    description: "p-2 border rounded w-full",
  },
  fontFamily = "Arial, sans-serif",
  fontSize = "1rem",
}: {
  isOpen: boolean;
  closeModal: () => void;
  handleUpdateBanner: (updatedFormData: any) => void;
  initialFormData: any;
  modalSize?: "small" | "medium" | "large";
  labels?: {
    updateButtonLabel: string;
    cancelButtonLabel: string;
    titleLabel?: string;
    descriptionLabel?: string;
    imageLabel?: string;
    bgColorLabel?: string;
    activeLabel?: string;
  };
  textStyles?: {
    title?: string;
    label?: string;
    input?: string;
    button?: string;
    description?: string;
  };
  fontFamily?: string;
  fontSize?: string;
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState(initialFormData);
  const [useImageBackground, setUseImageBackground] = useState(true);
  const [isActive, setIsActive] = useState(formData.is_active || false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      handleChange(e);
    }
  };

  const handleToggleBackground = () => {
    setUseImageBackground(!useImageBackground);
  };

  const modalWidthClass =
    modalSize === "small" ? "w-1/3" : modalSize === "large" ? "w-3/4" : "w-2/3";

  const bannerBackgroundStyle = useImageBackground
    ? formData.image_url
      ? { backgroundImage: `url(${formData.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
      : {}
    : formData.bg_color
    ? { backgroundColor: formData.bg_color }
    : {};
const handleSubmit = async () => {
  const updatedFormData = {
    ...formData,
    is_active: isActive,
  };

  // Determine is_background value based on the presence of imageFile and bg_color
  let isBackground = 0; // Default to 0 for no background image

  // If there's an image, set isBackground to 1
  if (imageFile) {
    isBackground = 1;
  } else if (!imageFile && updatedFormData.bg_color) {
    // If there's no image but bg_color is set, keep isBackground as 0
    isBackground = 0;
  }

  // Create a new FormData instance
  const formDataToSend = new FormData();

  // Always append basic fields
  formDataToSend.append("title", updatedFormData.title);
  formDataToSend.append("description", updatedFormData.description);
  formDataToSend.append("bg_color", updatedFormData.bg_color);
  formDataToSend.append("is_active", updatedFormData.is_active ? "1" : "0");

  // Append the is_background flag based on logic
  formDataToSend.append("is_background", isBackground.toString()); // Ensure it's sent as a string "0" or "1"

  // Conditionally handle the image field:
  if (imageFile) {
    // Append the new image file if it's present
    formDataToSend.append("image_url", imageFile);
  } else if (imageFile === null) {
    // If no image file is selected (i.e., it's null), we can pass a signal to remove the image
    // E.g., we can send a specific flag or an empty string to the backend.
    formDataToSend.append("image_url", ""); // This ensures the image is removed from the backend.
  }

  // Log the FormData contents for debugging (optional)
  for (let pair of formDataToSend.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  try {
    // Send the FormData to the backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saleBanner/${formData.id}`, {
      method: "POST",
      body: formDataToSend,
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update banner");
    }

    // Parse the response from the server
    const result = await response.json();
    console.log("Banner updated:", result);

    // Handle the response with a parent function or state update
    handleUpdateBanner(result);
    closeModal();
  } catch (error) {
    console.error("Error:", error);
  }
};


  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center px-4 py-6 z-50"
      style={{ fontFamily, fontSize }}
    >
      <div className={`bg-white p-6 rounded-lg shadow-lg ${modalWidthClass} max-w-full`}>
        <h3 className={textStyles.title || "text-lg font-semibold mb-4 text-center"}>
          {labels.titleLabel || "Update Banner"}
        </h3>

        <div className="mb-4">
          <label className={textStyles.label || "block text-sm font-semibold mb-2"}>
            {labels.titleLabel || "Title"}
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={textStyles.input || "p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"}
          />
        </div>

        <div className="mb-4">
          <label className={textStyles.label || "block text-sm font-semibold mb-2"}>
            {labels.descriptionLabel || "Description"}
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={textStyles.description || "p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"}
            rows={4}
          ></textarea>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <button
            type="button"
            onClick={handleToggleBackground}
            className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
          >
            {useImageBackground ? "Use Background Color" : "Use Background Image"}
          </button>
        </div>

        {useImageBackground ? (
          <div className="mt-4">
            <label className={textStyles.label || "block text-sm font-semibold mb-2"}>
              {labels.imageLabel || "Upload Image"}
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className={textStyles.input || "p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"}
            />
          </div>
        ) : (
          <div className="mt-4">
            <label className={textStyles.label || "block text-sm font-semibold mb-2"}>
              {labels.bgColorLabel || "Background Color"}
            </label>
            <input
              type="color"
              name="bg_color"
              value={formData.bg_color}
              onChange={handleChange}
              className={textStyles.input || "p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"}
            />
          </div>
        )}

        <div className="mt-4 flex items-center">
          <label className="mr-4 text-sm font-semibold">{labels.activeLabel || "Set as Active:"}</label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            className="mr-2 rounded"
          />
        </div>

        <div className="mt-6 flex justify-between space-x-4">
          <button
            onClick={handleSubmit}
            className={"px-6 py-2 bg-blue-600 text-black rounded hover:bg-blue-700 focus:outline-none"}
          >
            {labels.updateButtonLabel || "Update Banner"}
          </button>
          <button
            onClick={closeModal}
            className="px-6 py-2 bg-red-600 text-black rounded hover:bg-gray-700 focus:outline-none"
          >
            {labels.cancelButtonLabel || "Cancel"}
          </button>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold text-lg mb-2 text-center">Banner Preview</h4>
          <div
            className={`p-4 text-white ${textStyles.description || "p-4"} rounded-lg flex justify-center items-center text-center`}
            style={bannerBackgroundStyle}
          >
            <div className="font-bold text-xl text-black">
              {formData.title || "Title"} : {formData.description || "Description"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBanner;

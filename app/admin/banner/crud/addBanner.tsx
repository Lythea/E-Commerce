import { useState } from "react";

const AddBannerModal = ({
  closeModal,
  isOpen,
  formData,
  handleChange,
  handleAddBanner,
  modalSize = "small",
  labels = {
    addButtonLabel: "",
    cancelButtonLabel: "",
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
  handleAddBanner: (updatedFormData: any) => void;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  modalSize?: "small" | "medium" | "large";
  labels?: {
    cancelButtonLabel: string;
    addButtonLabel: string;
    titleLabel?: string;
    descriptionLabel?: string;
    imageLabel?: string;
    bgColorLabel?: string;
    textColorLabel?: string;
    activeLabel?: string;
  };
  optionalFields?: {
    bgColor?: boolean;
    textColor?: boolean;
  };
  imagePreviewClass?: string;
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

  const [useImageBackground, setUseImageBackground] = useState(true);
  const [isActive, setIsActive] = useState(formData.is_active || false);
  const [imageFile, setImageFile] = useState<File | null>(null);

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
  // Determine if it's a background (imageFile takes precedence over bg_color)
  const isBackground = imageFile ? "1" : formData.bg_color ? "0" : "0"; // If imageFile is present, set to "1", otherwise check bg_color

  const updatedFormData = {
    ...formData,
    is_active: isActive,  // Keep this as a boolean value
    is_background: isBackground, // Add is_background to form data
  };

  const formDataToSend = new FormData();
  formDataToSend.append("title", updatedFormData.title);
  formDataToSend.append("description", updatedFormData.description);
  formDataToSend.append("bg_color", updatedFormData.bg_color);
  formDataToSend.append("is_active", updatedFormData.is_active ? "1" : "0");  // Ensure sending as "1" or "0"
  formDataToSend.append("is_background", updatedFormData.is_background);  // Append is_background

  // Only append the image file if it's selected
  if (imageFile) {
    formDataToSend.append("image_url", imageFile);
  }

  // Debugging FormData contents
  formDataToSend.forEach((value, key) => {
    console.log(key, value); // Check the contents of the FormData
  });

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saleBanner`, {
      method: "POST",
      body: formDataToSend,
      headers: {
        "Accept": "application/json", // Ensure the backend accepts the response as JSON
      },
    });

    if (!response.ok) {
      throw new Error("Failed to add banner");
    }

    const result = await response.json();
    console.log("Banner added:", result);

    // Call the handler to update the UI and reset form state
    handleAddBanner(result);
    closeModal();
    resetForm();
  } catch (error) {
    console.error("Error:", error);
  }
};



  const resetForm = () => {
    setImageFile(null);
    setIsActive(false);
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center px-4 py-6  z-50"
      style={{ fontFamily, fontSize }}
    >
      <div className={`bg-white p-6 rounded-lg shadow-lg ${modalWidthClass} max-w-full`}>
        <h3 className={textStyles.title || "text-lg font-semibold mb-4 text-center"}>
          {labels.titleLabel || "Add New Banner"}
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
          <label className="mr-4 text-sm font-semibold">Set as Active:</label>
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
            Add Banner
          </button>
          <button
            onClick={closeModal}
            className="px-6 py-2 bg-red-600 text-black rounded hover:bg-gray-700 focus:outline-none"
          >
            Close
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

export default AddBannerModal;

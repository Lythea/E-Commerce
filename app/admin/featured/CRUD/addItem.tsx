import { useState } from "react";

// Define the type for the product data (excluding 'id')
interface AddItemProduct {
  name: string;
  category: string;
  description: string;
  percent: string;
  image: File | null;
  currentPrice: string;
  discountedPrice: string;
    createdAt: string;
  updatedAt: string;
}

// Define the modal props types
interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newItem: AddItemProduct) => void;
}

const AddItemModal = ({ isOpen, onClose, onAdd }: AddItemModalProps) => {
  const [inputData, setInputData] = useState<AddItemProduct>({
    name: "",
    category: "",
    description: "",
    percent: "",
    image: null,
    currentPrice: "",
    discountedPrice: "",
      createdAt: "",
  updatedAt: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInputData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("category", inputData.category);
    formData.append("description", inputData.description);
    formData.append("percent", inputData.percent);
    formData.append("image", inputData.image as Blob); // Cast to Blob for FormData
    formData.append("current_price", inputData.currentPrice);
    formData.append("discounted_price", inputData.discountedPrice);

    try {
      const response = await fetch("http://localhost:8000/api/featuredProduct", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Product added:", data);
        onAdd(data); // Add the product to the parent state
        onClose();
      } else {
        console.error("Error adding product:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Add New Product</h3>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={inputData.name}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={inputData.description}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {/* Category Field */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={inputData.category}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {/* Percent Field */}
          <div className="mb-4">
            <label htmlFor="percent" className="block text-sm font-medium text-gray-700">
              Percent
            </label>
            <input
              type="text"
              id="percent"
              name="percent"
              value={inputData.percent}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {/* Image Field */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {/* Current Price Field */}
          <div className="mb-4">
            <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-700">
              Current Price
            </label>
            <input
              type="text"
              id="currentPrice"
              name="currentPrice"
              value={inputData.currentPrice}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {/* Discounted Price Field */}
          <div className="mb-4">
            <label htmlFor="discountedPrice" className="block text-sm font-medium text-gray-700">
              Discounted Price
            </label>
            <input
              type="text"
              id="discountedPrice"
              name="discountedPrice"
              value={inputData.discountedPrice}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;

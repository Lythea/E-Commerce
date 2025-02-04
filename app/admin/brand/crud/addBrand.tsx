import { useState } from "react";

interface AddBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBrand: (name: string, image: string) => void;
}

const AddBrandModal: React.FC<AddBrandModalProps> = ({
  isOpen,
  onClose,
  onAddBrand,
}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (image) {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brands`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to add brand");
        }

        const newBrand = await response.json();
        // Pass the added brand back to the parent with the image URL
        onAddBrand(newBrand.name, newBrand.image);

        onClose(); // Close the modal after successful add
      } catch (error) {
        console.error("Error adding brand:", error);
      }
    } else {
      alert("Please select an image.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Add New Brand</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            X
          </button>
        </div>
        <div className="mt-4">
          <label className="block mb-2">Brand Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <label className="block mb-2">Brand Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded"
            >
              Add Brand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBrandModal;

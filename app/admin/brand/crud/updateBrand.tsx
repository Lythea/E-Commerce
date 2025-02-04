import { useState, useEffect } from "react";

interface UpdateBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: { id: number; name: string; image: string };
  onUpdateBrand: (id: number, name: string, image: string) => void;
}

const UpdateBrandModal: React.FC<UpdateBrandModalProps> = ({
  isOpen,
  onClose,
  brand,
  onUpdateBrand,
}) => {
  const [name, setName] = useState(brand.name);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(brand.image);

  // Update local state when the `brand` prop changes (e.g., when a new brand is selected for editing)
  useEffect(() => {
    setName(brand.name);
    setImagePreview(brand.image);
  }, [brand]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set image preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (name && image) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brands/update/${brand.id}`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to update brand");
        }

        const updatedBrand = await response.json();
        onUpdateBrand(brand.id, updatedBrand.name, updatedBrand.image);
        onClose(); // Close the modal after updating
      } catch (error) {
        console.error("Error updating brand:", error);
        alert("Error updating brand");
      }
    } else {
      alert("Both fields are required.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Update Brand</h3>
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
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded"
            >
              Update Brand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBrandModal;

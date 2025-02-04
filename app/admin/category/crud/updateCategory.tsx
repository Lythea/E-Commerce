import { useState, useEffect } from "react";

interface UpdateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: { id: number; name: string; image: string };
  onUpdateCategory: (id: number, name: string, image: string) => void;
}

const UpdateCategoryModal: React.FC<UpdateCategoryModalProps> = ({
  isOpen,
  onClose,
  category,
  onUpdateCategory,
}) => {
  const [name, setName] = useState(category.name);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(category.image);

  // Update local state when the `category` prop changes (e.g., when a new category is selected for editing)
  useEffect(() => {
    setName(category.name);
    setImagePreview(category.image);
  }, [category]);

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/update/${category.id}`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to update category");
        }

        const updatedCategory = await response.json();
        onUpdateCategory(category.id, updatedCategory.name, updatedCategory.image);
        onClose(); // Close the modal after updating
      } catch (error) {
        console.error("Error updating category:", error);
        alert("Error updating category");
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
          <h3 className="text-xl font-semibold">Update Category</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            X
          </button>
        </div>
        <div className="mt-4">
          <label className="block mb-2">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <label className="block mb-2">Category Image</label>
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
              Update Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;

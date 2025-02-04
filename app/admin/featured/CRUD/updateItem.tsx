import { useState, useEffect } from "react";

interface EditItemProduct {
  id: number;
  name: string;
  category: string;
  description: string;
  percent: string;
  image: File | null;
  currentPrice: string;
  discountedPrice: string;
  expirationDate: string;
}
interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: EditItemProduct | null;
  onEdit: (updatedProduct: EditItemProduct) => void;
}

const EditItemModal = ({ onEdit, onClose, product }: EditItemModalProps) => {
  const [inputData, setInputData] = useState<EditItemProduct>(
    product || {
      id: 0,
      name: "",
      category: "",
      description: "",
      percent: "",
      image: null,
      currentPrice: "",
      discountedPrice: "",
      expirationDate: "",
    }
  );

  useEffect(() => {
    console.log(onClose)
    if (product) {
      setInputData(product);
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percent = parseFloat(e.target.value);
    setInputData((prevData) => {
      const currentPrice = parseFloat(prevData.currentPrice);
      const discountedPrice = currentPrice - (currentPrice * (percent / 100));
      return {
        ...prevData,
        percent: e.target.value,
        discountedPrice: discountedPrice.toFixed(2),
      };
    });
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
    formData.append("id", inputData.id.toString());
    formData.append("name", inputData.name);
    formData.append("category", inputData.category);
    formData.append("description", inputData.description);
    formData.append("percent", inputData.percent);
    if (inputData.image) {
      formData.append("image", inputData.image as Blob);
    }
    formData.append("current_price", inputData.currentPrice);
    formData.append("discounted_price", inputData.discountedPrice);
    formData.append("expiration_date", inputData.expirationDate);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/featuredProduct/${inputData.id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Product updated:", data);
        onEdit(data);
        onClose();
      } else {
        console.error("Error updating product:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!onEdit) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={inputData.name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md" required readOnly />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input type="text" name="description" value={inputData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md" required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input type="text" name="category" value={inputData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md" required readOnly />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Percent</label>
            <input type="number" name="percent" value={inputData.percent} onChange={handlePercentChange} className="w-full px-4 py-2 border rounded-md" required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input type="file" name="image" onChange={handleFileChange} className="w-full px-4 py-2 border rounded-md" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Current Price</label>
            <input type="text" name="currentPrice" value={inputData.currentPrice} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md" required readOnly />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Discounted Price</label>
            <input type="text" name="discountedPrice" value={inputData.discountedPrice} className="w-full px-4 py-2 border rounded-md" required disabled />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
            <input type="date" name="expirationDate" value={inputData.expirationDate} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md" required />
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md">Update Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;
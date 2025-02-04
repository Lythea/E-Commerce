import { useState, useEffect } from "react";

interface AddItemProduct {
  name: string;
  category: string;
  description: string;
  percent: string;
  image: File | null;
  currentPrice: string;
  discountedPrice: string;
    expirationDate: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  image: string;
}

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
    expirationDate:"",
  });

  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
      const products = await response.json();
      setProducts(products); // Set products in state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = products.find(product => product.name === e.target.value);

    if (selectedProduct) {
      setInputData((prevData) => ({
        ...prevData,
        name: selectedProduct.name,
        category: selectedProduct.category,
        description: selectedProduct.description,
        currentPrice: selectedProduct.price, // Set the current price based on selected product
        discountedPrice: selectedProduct.price, // Initialize discountedPrice
      }));
    }
  };

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
        discountedPrice: discountedPrice.toFixed(2), // Set the discounted price
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
  formData.append("name", inputData.name);
  formData.append("category", inputData.category);
  formData.append("description", inputData.description);
  formData.append("percent", inputData.percent);
  formData.append("image", inputData.image as Blob); // Cast to Blob for FormData
  formData.append("current_price", inputData.currentPrice);
  formData.append("discounted_price", inputData.discountedPrice);
 formData.append("expiration_date", inputData.expirationDate); // Append expiration date

  // Log the formData content before sending it
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/featuredProduct`, {
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
          {/* Name Field (Dropdown) */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <select
              id="name"
              name="name"
              value={inputData.name}
              onChange={handleSelectChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            >
              <option value="" disabled>Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
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
              readOnly
            />
          </div>

          {/* Percent Field */}
          <div className="mb-4">
            <label htmlFor="percent" className="block text-sm font-medium text-gray-700">
              Percent
            </label>
            <input
              type="number"
              id="percent"
              name="percent"
              value={inputData.percent}
              onChange={handlePercentChange}
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
              readOnly
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
              disabled
            />
          </div>
 <div className="mb-4">
            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
              Expiration Date
            </label>
            <input
              type="date"
              id="expirationDate"
              name="expirationDate"
              value={inputData.expirationDate}
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

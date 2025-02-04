import React, { useState, useEffect } from "react";

interface FormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  image: File | null;
  ratings: string;
  ratingCount: string;
  brand: string;
  isActive: number;
  weight: string;
  specifications: string;
}

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleEdit: (product: any) => void; // Function to edit the product
  productId: number; // The ID of the product to edit
  productDetails: any; // The existing product details to pre-populate the form
}

const EditProductModal = ({
  isOpen,
  onClose,
  handleEdit,
  productId,
  productDetails,
}: EditProductModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null,
    ratings: "",
    ratingCount: "",
    brand: "",
    isActive: 1,
    weight: "",
    specifications: "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);

  // Pre-fill the form with existing product details when the modal is opened
  useEffect(() => {
    if (isOpen && productDetails) {
      setFormData({
        name: productDetails.name || "",
        description: productDetails.description || "",
        price: productDetails.price || "",
        stock: productDetails.stock || "",
        category: productDetails.category || "",
        image: null,
        ratings: productDetails.ratings || "",
        ratingCount: productDetails.ratingCount || "",
        brand: productDetails.brand || "",
        isActive: productDetails.isActive || 1,
        weight: productDetails.weight || "",
        specifications: productDetails.specifications || "",
      });
    }
    fetchCategories();
    fetchBrands();
  }, [isOpen, productDetails]);

  // Fetch categories and brands for the dropdowns
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brands`);
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key as keyof FormData];

        if (value !== null) {
          if (value instanceof File) {
            formDataToSend.append(key, value, value.name);
          } else {
            formDataToSend.append(key, value.toString());
          }
        }
      }
    }

    formDataToSend.append("id", productId.toString());

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/update/${productId}`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();
      handleEdit(updatedProduct);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Brand</label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Ratings</label>
              <input
                type="number"
                name="ratings"
                value={formData.ratings}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                min="0"
                max="5"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Weight</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium mb-2">Specifications</label>
              <textarea
                name="specifications"
                value={formData.specifications}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Save Changes
            </button>
          </div>
        </form>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditProductModal;

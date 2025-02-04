    "use client"
import AdminLayout from "./../sidebar";
import { useState, useEffect } from "react";
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import AddProductModal from "./crud/addModal";
import EditProductModal from "./crud/editModal";
import DeleteProductModal from "./crud/deleteModal";

// Define the Product type
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
  image: string;
  ratings: string;
  rating_count: number;
  description: string;
  specifications: string;
  weight: number;
  is_active: boolean;
}

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null); // State for active menu
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Separate state for edit modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Separate state for delete modal
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [modalAction, setModalAction] = useState<'edit' | 'delete' | null>(null); // Track action type (edit or delete)
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null); // Track product to delete

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id); // If the same product is clicked, close the menu, else open it
  };

  const fetchProducts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (id: number) => {
    fetchProducts();
       handleCloseModal()
  };

  const handleDelete = async (id: number) => {
    fetchProducts();
       handleCloseModal()
  };

  const handleEdit = async (id: number) => {
    console.log('Edited')
 
    fetchProducts();
       handleCloseModal()
  };

  const handleOpenModal = (productId: number, action: 'edit' | 'delete') => {
    setModalAction(action);
    setProductIdToDelete(productId);
    if (action === 'edit') {
      const productToEdit = products.find((product) => product.id === productId);
      setCurrentProduct(productToEdit || null);
      setIsEditModalOpen(true);
    } else {
      setIsDeleteModalOpen(true); // Open delete modal
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setProductIdToDelete(null); // Reset the product ID
    setCurrentProduct(null);
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Product Management</h2>
            <p className="text-gray-600 mb-6">Manage your products efficiently.</p>
          </div>
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setIsAddModalOpen(true)} // Open add product modal
            >
              Add Product
            </button>
          </div>
        </div>

        {/* Products Table */}
        <table className="min-w-full table-auto border-collapse border border-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th className="border-b border-gray-300 text-left p-3 text-sm font-medium text-gray-600">Name</th>
      <th className="border-b border-gray-300 text-left p-3 text-sm font-medium text-gray-600">Description</th>
      <th className="border-b border-gray-300 text-left p-3 text-sm font-medium text-gray-600">Specification</th>
      <th className="border-b border-gray-300 text-left p-3 text-sm font-medium text-gray-600">Image</th>
      <th className="border-b border-gray-300 text-left p-3 text-sm font-medium text-gray-600">Price</th>
      <th className="border-b border-gray-300 text-left p-3 text-sm font-medium text-gray-600">Stock</th>
      <th className="border-b border-gray-300 text-left p-3 text-sm font-medium text-gray-600">Category</th>
      <th className="border-b border-gray-300 text-left p-3 text-sm font-medium text-gray-600">Brand</th>
      <th className="border-b border-gray-300 text-left p-3 text-sm font-medium text-gray-600">Ratings</th>
      <th className="border-b border-gray-300 text-center p-3 text-sm font-medium text-gray-600">Actions</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200">
    {products.map((product) => (
      <tr key={product.id} className="hover:bg-gray-50">
        <td className="border-b border-gray-300 p-3 text-sm text-gray-700">{product.name}</td>
        <td className="border-b border-gray-300 p-3 text-sm text-gray-700">{product.description}</td>
        <td className="border-b border-gray-300 p-3 text-sm text-gray-700">{product.specifications}</td>
        <td className="border-b border-gray-300 p-3 text-sm">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/${product.image}`}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-md"
          />
        </td>
        <td className="border-b border-gray-300 p-3 text-sm text-gray-700">{product.price}</td>
        <td className="border-b border-gray-300 p-3 text-sm text-gray-700">{product.stock}</td>
        <td className="border-b border-gray-300 p-3 text-sm text-gray-700">{product.category}</td>
        <td className="border-b border-gray-300 p-3 text-sm text-gray-700">{product.brand}</td>
        <td className="border-b border-gray-300 p-3 text-sm text-gray-700">
          {product.ratings} ({product.rating_count} reviews)
        </td>
        <td className="relative text-center p-3">
          <button
            onClick={() => toggleMenu(product.id)} // Toggle menu for this specific product
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <EllipsisVerticalIcon className="w-5 h-5" />
          </button>

          {openMenuId === product.id && (
            <div className="absolute bg-white shadow-lg rounded-md mt-2 w-32 right-0 z-10">
              <ul>
                <li
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleOpenModal(product.id, 'edit')} // Open edit modal
                >
                  Edit
                </li>
                <li
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleOpenModal(product.id, 'delete')} // Open delete modal
                >
                  Delete
                </li>
              </ul>
            </div>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      {/* Edit Product Modal */}
      {isEditModalOpen && currentProduct && (
        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          handleEdit={handleEdit}
          productId={currentProduct.id}
          productDetails={currentProduct} // Passing current product details to the edit modal
        />
      )}

      {/* Delete Product Modal */}
      {isDeleteModalOpen && productIdToDelete !== null && (
        <DeleteProductModal
          productId={productIdToDelete}
          handleDelete={handleDelete}
          onClose={handleCloseModal}
        />
      )}
    </AdminLayout>
  );
};

export default Product;

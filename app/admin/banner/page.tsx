"use client";
import AdminLayout from "../sidebar";
import { useState, useEffect } from "react";
import AddBannerModal from "./addItem/page";
const SaleBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    bg_color: "",
    is_active: true,
  });
  const [banners, setBanners] = useState<any[]>([]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch banners data on component mount
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saleBanner`, {
          method: "GET", // Specify the HTTP method as GET
        });

        if (response.ok) {
          const data = await response.json();
          setBanners(data);
          console.log(data)
        } else {
          console.error("Failed to fetch banners");
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners(); // Call the fetch function
  }, []); // Empty dependency array means this runs once when the component mounts

  // Handle adding a new banner
  const handleAddBanner = () => {
    setBanners((prev) => [...prev, { ...formData, id: Date.now() }]);
    setFormData({
      title: "",
      description: "",
      image_url: "",
      bg_color: "",
      is_active: true,
    });
    setIsModalOpen(false); // Close modal after banner is added
  };
return (
  <AdminLayout>
    <div className="mb-6 flex justify-between items-center">
      <h2>Sale Banner Management</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        Add New Banner
      </button>
    </div>

    {/* Display list of banners */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Banner List</h3>
      {banners.length === 0 ? (
        <p>No banners available</p>
      ) : (
        <div className="space-y-4">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="p-4 border rounded-lg text-black relative"
              style={{
                backgroundImage: banner.image_url
                  ? `url(${process.env.NEXT_PUBLIC_API_URL}/${banner.image_url})`
                  : "none", // Use image if available
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Content */}
              <div className="flex justify-center items-center h-full relative z-10">
                <div className="text-center">
                  <h4 className="text-xl font-semibold">{banner.title}</h4>
                  <p>{banner.description}</p>
                </div>
              </div>

              {/* Buttons container */}
              <div className="absolute top-6 right-4 flex items-center space-x-4 z-10">
                <button
                  onClick={() => {}}
                  className={`px-4 py-2 rounded ${banner.is_active ? "bg-green-500" : "bg-red-500"} text-white`}
                >
                  {banner.is_active ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => {}}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Modal for adding banner */}
    <AddBannerModal
      isOpen={isModalOpen}
      closeModal={() => setIsModalOpen(false)}
      handleAddBanner={handleAddBanner}
      formData={formData}
      handleChange={handleChange}
    />
  </AdminLayout>
);



};

export default SaleBanner;

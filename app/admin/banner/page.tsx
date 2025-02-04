
"use client";
import AdminLayout from "../sidebar";
import { useState, useEffect } from "react";
import AddBannerModal from "./crud/addBanner";
import UpdateStatus from "./crud/updateStatus";
import DeleteBanner from "./crud/deleteBanner";
import UpdateBanner from "./crud/updateBanner";
import ChangeBackground from "./crud/changeBG"; // Import it once

import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

const SaleBanner = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
  const [isUpdateBannerModalOpen, setIsUpdateBannerModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    bg_color: "",
    is_active: true,
  });
  const [banners, setBanners] = useState<any[]>([]);
  const [selectedBanner, setSelectedBanner] = useState<any>(null);
  const [activePopup, setActivePopup] = useState<number | null>(null); // Track active popup by banner ID
  const [showBackgroundModal, setShowBackgroundModal] = useState(false);

  const fetchBanners = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saleBanner`, {
        method: "GET", // Specify the HTTP method as GET
      });

      if (response.ok) {
        const data = await response.json();
        setBanners(data);
        console.log(data);
      } else {
        console.error("Failed to fetch banners");
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Toggle popup visibility for a specific banner
  const togglePopup = (id: number) => {
    setActivePopup(activePopup === id ? null : id); // Close if the same banner is clicked again
  };

  // Handle status updated in parent
  const handleStatusUpdated = (id: number, newStatus: number) => {
    setBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner.id === id ? { ...banner, is_active: newStatus } : banner
      )
    );
    fetchBanners(); // Fetch banners again after update
  };

  const openUpdateBannerModal = (banner: any) => {
    setSelectedBanner(banner);
    setIsUpdateBannerModalOpen(true); // Open the Update Banner modal
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateConfirmed = (updatedBanner: any) => {
    setBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner.id === updatedBanner.id ? { ...banner, ...updatedBanner } : banner
      )
    );
    setIsUpdateBannerModalOpen(false); // Close the modal after update
  };

  const openChangeBackgroundModal = (banner: any) => {
    setSelectedBanner(banner); // Set the selected banner data
    setShowBackgroundModal(true); // Show the modal
  };

  const handleBackgroundUpdated = (id: any, newBackground: any) => {
    // Update the banner background status in the parent component
    setBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner.id === id ? { ...banner, is_background: newBackground } : banner
      )
    );
  };

  const closeBackgroundModal = () => {
    setShowBackgroundModal(false); // Close the modal
    setSelectedBanner(null); // Clear selected banner data
  };

  // Handle delete in parent
  const handleDeleteConfirmed = (id: number) => {
    setBanners((prevBanners) => prevBanners.filter((banner) => banner.id !== id));
  };

  const handleAddBanner = () => {
    setBanners((prev) => [...prev, { ...formData, id: Date.now() }]);
    setFormData({
      title: "",
      description: "",
      image_url: "",
      bg_color: "",
      is_active: true,
    });
    setIsAddModalOpen(false);
    fetchBanners();
  };

  // Open and close the modals
  const openUpdateStatusModal = (banner: any) => {
    setSelectedBanner(banner);
    setIsUpdateStatusModalOpen(true);
  };

  const openDeleteModal = (banner: any) => {
    setSelectedBanner(banner);
    setIsDeleteModalOpen(true);
  };

  return (
    <AdminLayout>
         <div className="p-6 bg-white rounded-lg shadow">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-left text-2xl font-semibold">Sale Banner Content</h2>
          <p className="text-left">Manage your event banners.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
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
                  backgroundImage: banner.is_background === 1 && banner.image_url
                    ? `url(${process.env.NEXT_PUBLIC_API_URL}/${banner.image_url})`
                    : "none", // Use image if is_background is 1
                  backgroundColor: banner.is_background === 0
                    ? banner.bg_color || "transparent" // Use bg_color if is_background is 0
                    : "transparent", // Ensure transparent background if is_background is 1
                  backgroundSize: "cover", // Ensure the image covers the container
                  backgroundPosition: "center", // Center the image
                  backgroundRepeat: "no-repeat", // Prevent repeating the image
                  minHeight: "80px", // Set a minimum height to ensure content is visible
                }}
              >
                {/* Content */}
                <div className="flex justify-center items-center h-full relative z-0">
                  <div className="text-center">
                    <h4 className="text-xl font-semibold">{banner.title} : {banner.description}</h4>
                  </div>
                </div>

                {/* Buttons container */}
     <div className="relative flex justify-end">
  {/* Ellipsis Icon to open the popup */}
  <button
    onClick={() => togglePopup(banner.id)}
    className="p-1 text-gray-500 hover:text-gray-700"
  >
    <EllipsisVerticalIcon className="w-7 h-7" />
  </button>

  {/* Popup with action buttons */}
  {activePopup === banner.id && (
    <div className="absolute bg-white shadow-md rounded-lg mt-7 w-32 right-0 z-10 border border-gray-200">
      <ul>
        {/* Update Status Button */}
        <li>
          <button
            onClick={() => {
              openUpdateStatusModal(banner);
              setActivePopup(null); // Close popup after action
            }}
            className="px-4 py-2 text-sm text-gray-700 rounded w-full hover:bg-gray-200 hover:text-gray-800"
          >
            {banner.is_active ? "Deactivate" : "Activate"}
          </button>
        </li>

        {/* Update Banner Button */}
        <li>
          <button
            onClick={() => {
              openUpdateBannerModal(banner);
              setActivePopup(null); // Close popup after action
            }}
            className="px-4 py-2 text-sm text-gray-700 rounded w-full hover:bg-gray-200 hover:text-gray-800"
          >
            Update
          </button>
        </li>

        {/* Delete Button */}
        <li>
          <button
            onClick={() => {
              openDeleteModal(banner);
              setActivePopup(null); // Close popup after action
            }}
            className="px-4 py-2 text-sm text-gray-700 rounded w-full hover:bg-gray-200 hover:text-gray-800"
          >
            Delete
          </button>
        </li>

        {/* Change Background Button */}
        <li>
          <button
            onClick={() => {
              openChangeBackgroundModal(banner); // Open the ChangeBackgroundModal
              setActivePopup(null); // Close popup after action
            }}
            className="px-4 py-2 text-sm text-gray-700 rounded w-full hover:bg-gray-200 hover:text-gray-800"
          >
            Change Background
          </button>
        </li>
      </ul>
    </div>
  )}
</div>



                
              </div>
            ))}
          </div>
        )}
      </div>
</div>
   {/* Modal for adding banner */}
      <AddBannerModal
        isOpen={isAddModalOpen}
        closeModal={() => setIsAddModalOpen(false)}
        handleAddBanner={handleAddBanner}
        formData={formData}
        handleChange={handleChange}
      />

      {/* Modal for updating banner status */}
      {isUpdateStatusModalOpen && selectedBanner && (
        <UpdateStatus
          bannerId={selectedBanner.id}
          currentStatus={selectedBanner.is_active}
          onStatusUpdated={handleStatusUpdated}
          closeModal={() => setIsUpdateStatusModalOpen(false)}
        />
      )}
{isUpdateBannerModalOpen && selectedBanner && (
  <UpdateBanner
    isOpen={isUpdateBannerModalOpen}
    closeModal={() => setIsUpdateBannerModalOpen(false)}
    handleUpdateBanner={handleUpdateConfirmed} // Ensure handleUpdateConfirmed is correctly defined in your parent
    initialFormData={selectedBanner} // Change formData to initialFormData here
  />
)}

{isDeleteModalOpen && selectedBanner && (
  <DeleteBanner
    bannerId={selectedBanner.id}
    onDeleteConfirmed={handleDeleteConfirmed}
    closeModal={() => setIsDeleteModalOpen(false)}
    isModalOpen={isDeleteModalOpen} // Pass the modal visibility state
  />
)}
{showBackgroundModal && selectedBanner && (
  <ChangeBackground
    bannerId={selectedBanner.id}
    currentBackground={selectedBanner.is_background}
    onBackgroundUpdated={handleBackgroundUpdated}
    closeModal={closeBackgroundModal}
  />
)}
    </AdminLayout>
  );
};

export default SaleBanner;

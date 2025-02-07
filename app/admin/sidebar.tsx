"use client"
import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircleIcon,ChevronDownIcon } from '@heroicons/react/24/outline';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const pathname = usePathname();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);  // State to control popup visibility

  const handleLogoutClick = () => {
    setShowLogoutPopup(!showLogoutPopup);  // Toggle popup visibility
  };

  const handleLogout = () => {
    // You can add your logout logic here, e.g., clearing session or token
    console.log("Logging out...");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside style={{backgroundColor:"#073036"}} className="w-64 text-white p-5 flex flex-col space-y-6 shadow-md">
        <img src="/assets/Logo_cropped.jpg" alt="Logo" />
        <h2 className="text-lg font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/admin"
                className={`block p-2 rounded-md hover:bg-blue-600 ${pathname === "/admin/dashboard" ? "bg-blue-800" : ""}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/product"
                className={`block p-2 rounded-md  hover:bg-blue-600 ${pathname === "/admin/product" ? "bg-blue-800" : ""}`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/admin/featured"
                className={`block p-2 rounded-md hover:bg-blue-600 ${pathname === "/admin/featured" ? "bg-blue-800" : ""}`}
              >
                Featured
              </Link>
            </li>
            <li>
              <Link
                href="/admin/banner"
                className={`block p-2 rounded-md hover:bg-blue-600 ${pathname === "/admin/banner" ? "bg-blue-800" : ""}`}
              >
                Sale Banners
              </Link>
            </li>
            <li>
              <Link
                href="/admin/category"
                className={`block p-2 rounded-md hover:bg-blue-600 ${pathname === "/admin/category" ? "bg-blue-800" : ""}`}
              >
                Category
              </Link>
            </li>
            <li>
              <Link
                href="/admin/brand"
                className={`block p-2 rounded-md hover:bg-blue-600 ${pathname === "/admin/brand" ? "bg-blue-800" : ""}`}
              >
                Brand
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 bg-white p-4 shadow-md flex justify-between items-center">
          <h1 className="text-lg font-semibold" style={{ color: "#073036" }}>Admin Dashboard</h1>
          <div className="relative flex">
            <UserCircleIcon className="w-7 h-7 ml-4 cursor-pointer" />
             <ChevronDownIcon className="w-4 h-4 mt-2 cursor-pointer" onClick={handleLogoutClick} />
            {/* Logout Popup */}
            {showLogoutPopup && (
              <div className="absolute top-8 right-0 bg-white text-black border border-gray-300 p-3 rounded shadow-lg">
           
                  <button
                    className="text-sm text-red-600 hover:text-red-800"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
       
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

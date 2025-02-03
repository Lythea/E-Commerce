"use client"
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const pathname = usePathname();  // This hook helps to get the current path

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 text-white p-5 flex flex-col bg-blue-700">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                href="/admin"
                className={`block p-2 rounded hover:bg-blue-600 ${
                  pathname === "/admin/dashboard" ? "bg-blue-600" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/banner"
                className={`block p-2 rounded hover:bg-blue-600 ${
                  pathname === "/admin/banner" ? "bg-gray-700" : ""
                }`}
              >
                Sale Banners
              </Link>
            </li>
             <li>
              <Link
                href="/admin/featured"
                className={`block p-2 rounded hover:bg-blue-600 ${
                  pathname === "/admin/featured" ? "bg-gray-700" : ""
                }`}
              >
                Featured
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className={`block p-2 rounded hover:bg-blue-600 ${
                  pathname === "/admin/settings" ? "bg-blue-600" : ""
                }`}
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className=" text-blue-500 p-4 shadow-md">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        </header>

        {/* Content Area */}
        <main className="p-6 bg-gray-100 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;

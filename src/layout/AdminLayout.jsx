import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function AdminLayout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* NAVBAR (fixed height = 64px / 4rem) */}
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={onLogout}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* PAGE BODY */}
      <div className="flex pt-14 overflow-x-hidden">
        {/* SIDEBAR (fixed position) */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* MAIN CONTENT + FOOTER */}
        <div
          className={`
            flex flex-col flex-1 transition-all duration-300 
            ${sidebarOpen ? "lg:ml-74" : "lg:ml-20"}
          `}
        >
          {/* MAIN CONTENT - Reduced and consistent padding */}
          <main className="flex-1 p-3 sm:p-4 lg:p-4 max-w-full">
            <div className="w-full">
              <Outlet />
            </div>
          </main>

          {/* FOOTER */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
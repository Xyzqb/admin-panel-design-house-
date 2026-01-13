import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useState } from "react";

export default function AdminLayout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ">
      {/* NAVBAR (fixed height = 64px / 4rem) */}
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={onLogout}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* PAGE BODY */}
      <div className="flex pt-16 min-h-[calc(100vh-4rem)]">
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
            ${sidebarOpen ? "lg:ml-80" : "lg:ml-20"}
          `}
        >
          {/* MAIN CONTENT */}
          <main className="flex-1 px-4 md:px-10 py-6">
            <Outlet />
          </main>

          {/* FOOTER */}
          <Footer darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

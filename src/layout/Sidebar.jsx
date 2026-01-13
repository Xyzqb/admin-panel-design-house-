import { ChevronDown, X, Menu } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { menuItems } from "../data/menuItems";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  const location = useLocation();
  const [openSection, setOpenSection] = useState("Dashboard");

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r-4 border-[#93C5FD]
        shadow-xl z-50 transition-all duration-300
        ${sidebarOpen ? "w-85" : "w-20 -translate-x-full lg:translate-x-0"}
        ${mobileMenuOpen ? "translate-x-0" : ""}`}
      >
        {/* HEADER */}
        {/* <div className="p-4 border-b border-[#93C5FD] bg-gradient-to-r from-white to-[#EFF6FF]">
          <div className="flex items-center justify-between">
            <div className="flex justify-center gap-3">
              <img src="/images/logo.png" className="h-14" />
            </div>

            {sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="hidden lg:flex p-1.5 rounded-lg hover:bg-[#EFF6FF]"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div> */}

        {/* HEADER */}
        <div className="relative p-4 border-b border-[#93C5FD] bg-gradient-to-r from-white to-[#EFF6FF]">

          {/* CENTER LOGO */}
          <div className="flex justify-center">
            <img src="/images/logo.png" className="h-14" />
          </div>

          {/* CLOSE BUTTON */}
          {sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex p-1.5 rounded-lg hover:bg-[#EFF6FF]"
            >
              <X size={20} />
            </button>
          )}
        </div>


        {/* OPEN BUTTON */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="hidden lg:flex mx-auto mt-4 p-2 rounded-lg bg-[#2563EB] text-white"
          >
            <Menu size={18} />
          </button>
        )}

        {/* MENU SCROLL */}
        <div className="h-[calc(100vh-140px)] overflow-y-auto sidebar-scroll p-3 space-y-3 text-[13px]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isOpen = openSection === item.section;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <div key={item.section}>
                {sidebarOpen && item.showHeading && (
                  <h4 className="px-2 mb-1 text-[11px] font-semibold uppercase text-gray-500">
                    {item.section}
                  </h4>
                )}

                <button
                  onClick={() =>
                    sidebarOpen && setOpenSection(isOpen ? null : item.section)
                  }
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl
                  ${isActive ? "bg-[#EFF6FF] border border-[#2563EB]" : "hover:bg-[#EFF6FF]"}
                  ${!sidebarOpen && "justify-center"}`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-[#2563EB]" />
                    {sidebarOpen && <span>{item.section}</span>}
                  </div>

                  {sidebarOpen && (
                    <ChevronDown
                      size={14}
                      className={`transition ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {sidebarOpen && isOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-[#93C5FD] pl-3">
                    {item.submenu.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `block px-3 py-1.5 rounded-lg ${isActive
                            ? "bg-[#DBEAFE] text-[#2563EB]"
                            : "hover:bg-[#EFF6FF]"
                          }`
                        }
                      >
                        {sub.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-0 w-full p-5 border-t border-[#93C5FD] text-center text-[10px] text-gray-500 bg-white">
          {sidebarOpen && "v1.0.0 • Design House"}
        </div>
      </aside>
    </>
  );
}
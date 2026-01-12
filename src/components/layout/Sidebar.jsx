import { ChevronDown, X, Menu } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  BookOpen,
  Image,
  Download,
  FileText,
} from "lucide-react";

const menuConfig = [
  {
    section: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    showHeading: true,
    submenu: [
      { name: "Overview", path: "/dashboard/overview" },
      { name: "Analytics", path: "/dashboard/analytics" },
    ],
  },
  {
    section: "Services",
    icon: Briefcase,
    path: "/services",
    showHeading:true,
    submenu: [
      { name: "Web Development", path: "/services/web" },
      { name: "Mobile Apps", path: "/services/mobile" },
      { name: "UI/UX Design", path: "/services/uiux" },
    ],
  },
  {
    section: "Clients",
    icon: Users,
    path: "/clients",
    showHeading:false,
    submenu: [
      { name: "All Clients", path: "/clients/all" },
      { name: "Testimonials", path: "/clients/testimonials" },
    ],
  },
  {
    section: "Career",
    icon: FileText,
    path: "/career",
    showHeading:false,
    submenu: [
      { name: "Open Positions", path: "/career/jobs" },
      { name: "Internships", path: "/career/internships" },
    ],
  },
  {
    section: "Blog",
    icon: BookOpen,
    path: "/blog",
    showHeading:false,
    submenu: [
      { name: "Latest Posts", path: "/blog/latest" },
      { name: "Categories", path: "/blog/categories" },
    ],
  },
  {
    section: "Portfolio",
    icon: Image,
    path: "/portfolio",
    showHeading:true,
    submenu: [
      { name: "Projects", path: "/portfolio/projects" },
      { name: "Case Studies", path: "/portfolio/case-studies" },
    ],
  },
  {
    section: "Downloads",
    icon: Download,
    path: "/downloads",
    showHeading:true,
    submenu: [
      { name: "Resources", path: "/downloads/resources" },
      { name: "Reports", path: "/downloads/reports" },
    ],
  },
];

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
        shadow-xl z-50 transition-all duration-300 overflow-y-auto
        ${sidebarOpen
            ? "w-75 translate-x-0"
            : "w-20 -translate-x-full lg:translate-x-0"
          }
        ${mobileMenuOpen ? "translate-x-0" : ""}`}
      >
        {/* HEADER */}
        <div className="p-4 border-b border-[#93C5FD] bg-gradient-to-r from-white to-[#EFF6FF]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <img src="/images/logo.png" alt="Design House" className="h-13" />
              {sidebarOpen && (
                <div>
                  <h1 className="text-[12px] font-bold text-gray-800">
                    Design House
                  </h1>
                  <p className="text-[10px] font-bold text-gray-500">Admin Panel</p>
                </div>
              )}
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

        {/* MENU */}
        <div className="p-3 space-y-3 text-[12px]">
          {menuConfig.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            const isOpen = openSection === item.section;

            return (
              <div key={item.section}>
                {/* {sidebarOpen &&  (
                  <h4 className="px-2 mb-1 text-[11px] font-semibold uppercase text-gray-500">
                    {item.section}
                  </h4>
                )} */}
                {sidebarOpen && item.showHeading && (
                  <h4 className="px-2 mb-1 text-[11px] font-semibold uppercase text-gray-500">
                    {item.section}
                  </h4>
                )}


                <button
                  onClick={() =>
                    sidebarOpen && setOpenSection(isOpen ? null : item.section)
                  }
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all
                  ${isActive
                      ? "bg-[#EFF6FF] border border-[#2563EB]"
                      : "hover:bg-[#EFF6FF]"
                    }
                  ${!sidebarOpen && "justify-center"}`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-[#2563EB]" />
                    {sidebarOpen && (
                      <span className="font-medium">{item.section}</span>
                    )}
                  </div>

                  {sidebarOpen && (
                    <ChevronDown
                      size={14}
                      className={`transition ${isOpen ? "rotate-180" : ""
                        }`}
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
        <div className="absolute bottom-0 w-full p-5 border-t border-[#93C5FD] text-center text-[10px] font-bold text-gray-500">
          {sidebarOpen && "v1.0.0 • Design House"}
        </div>
      </aside>
    </>
  );
}

import { ChevronDown, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { menuItems } from "../data/menuItems";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  /* AUTO OPEN DROPDOWN BASED ON ROUTE */
  useEffect(() => {
    menuItems.forEach((item) => {
      if (
        item.type === "dropdown" &&
        item.children?.some((c) => location.pathname.startsWith(c.path))
      ) {
        setOpenDropdown(item.label);
      }
    });
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

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
        ${sidebarOpen ? "w-75" : "w-20 -translate-x-full lg:translate-x-0"}
        ${mobileMenuOpen ? "translate-x-0" : ""}`}
      >
        {/* HEADER */}
        <div className="relative p-4 border-b border-[#93C5FD] bg-gradient-to-r from-white to-[#EFF6FF]">
          <div className="flex justify-center">
            <img src="/images/logo.png" className="h-14" alt="Logo" />
          </div>

          {sidebarOpen && (
            <button
              onClick={() => {
                setSidebarOpen(false);
                setMobileMenuOpen(false);
              }}
              className="absolute right-4 top-4 p-2 rounded-lg hover:bg-[#EFF6FF]"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* OPEN BUTTON */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="mx-4 mt-4 p-2 rounded-lg bg-[#2563EB] text-white"
          >
            <Menu size={18} />
          </button>
        )}

        {/* MENU */}
        <div className="h-[calc(100vh-140px)] overflow-y-auto sidebar-scroll p-3 space-y-2 text-[13px]">
          {menuItems.map((item, index) => {
            /* ===== HEADING ===== */
            if (item.type === "heading") {
              return (
                sidebarOpen && (
                  <p
                    key={index}
                    className="px-3 mt-5 mb-2 text-[11px] font-semibold uppercase text-gray-500"
                  >
                    {item.label}
                  </p>
                )
              );
            }

            /* ===== NORMAL ITEM ===== */
            if (item.type === "item") {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl
                    ${isActive
                      ? "bg-[#EFF6FF] border border-[#2563EB]"
                      : "hover:bg-[#EFF6FF]"
                    }
                    ${!sidebarOpen && "justify-center"}`
                  }
                >
                  <Icon size={16} className="text-[#2563EB]" />
                  {sidebarOpen && (
                    <span className="whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                  {/* {sidebarOpen && <span>{item.label}</span>} */}
                </NavLink>
              );
            }

            /* ===== DROPDOWN ===== */
            if (item.type === "dropdown") {
              const Icon = item.icon;
              const isOpen = openDropdown === item.label;

              return (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      sidebarOpen &&
                      setOpenDropdown(isOpen ? null : item.label)
                    }
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl
                    hover:bg-[#EFF6FF]
                    ${!sidebarOpen && "justify-center"}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className="text-[#2563EB]" />
                      {sidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
                    </div>

                    {sidebarOpen && (
                      <ChevronDown
                        size={14}
                        className={`transition ${isOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>

                  {sidebarOpen && isOpen && (
                    <div className="ml-5 mt-1 space-y-1 border-l border-[#93C5FD] pl-3">
                      {item.children.map((sub) => (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            `block px-3 py-1.5 rounded-lg
                            ${isActive
                              ? "bg-[#DBEAFE] text-[#2563EB]"
                              : "hover:bg-[#EFF6FF]"
                            }`
                          }
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-0 w-full p-2 border-t border-[#93C5FD] bg-white">
          {sidebarOpen && (
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={handleLogout}
                className="w-full px-3 py-3 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
              <span className="text-[10px] text-gray-500">
                v1.0.0 • Design House
              </span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

// import { ChevronDown, X, Menu } from "lucide-react";
// import { useState } from "react";
// import { menuItems } from "../data/menuItems";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";

// export default function Sidebar ({
//   sidebarOpen,
//   setSidebarOpen,
//   mobileMenuOpen,
//   setMobileMenuOpen,
// }) {
//   const location = useLocation();
//   const [openSection, setOpenSection] = useState("Dashboard");
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* MOBILE OVERLAY */}
//       {mobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//           onClick={() => setMobileMenuOpen(false)}
//         />
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`fixed top-0 left-0 h-screen bg-white border-r-4 border-[#93C5FD]
//         shadow-xl z-50 transition-all duration-300
//         ${sidebarOpen ? "w-74" : "w-20 -translate-x-full lg:translate-x-0"}
//         ${mobileMenuOpen ? "translate-x-0" : ""}`}
//       >
//         {/* HEADER */}
//         <div className="relative p-4 border-b border-[#93C5FD] bg-gradient-to-r from-white to-[#EFF6FF]">

//           {/* CENTER LOGO */}
//           <div className="flex justify-center">
//             <img src="/images/logo.png" className="h-14" alt="Logo" />
//           </div>

//           {/* CLOSE BUTTON */}
//           {sidebarOpen && (
//             <button
//               onClick={() => {
//                 setSidebarOpen(false);
//                 setMobileMenuOpen(false);
//               }}
//               className="absolute right-4 top-4 p-2 rounded-lg hover:bg-[#EFF6FF]"
//             >
//               <X size={20} />
//             </button>
//           )}
//         </div>

//         {/* OPEN BUTTON */}
//         {!sidebarOpen && (
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="mx-4 mt-4 p-2 rounded-lg bg-[#2563EB] text-white"
//           >
//             <Menu size={18} />
//           </button>
//         )}

//         {/* MENU SCROLL */}
//         <div className="h-[calc(100vh-140px)] overflow-y-auto sidebar-scroll p-3 space-y-3 text-[13px]">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const isOpen = openSection === item.section;
//             const isActive = location.pathname.startsWith(item.path);

//             return (
//               <div key={item.section}>
//                 {sidebarOpen && item.showHeading && (
//                   <h4 className="px-2 mb-1 text-[11px] font-semibold uppercase text-gray-500">
//                     {item.section}
//                   </h4>
//                 )}

//                 <button onClick={() => {
//                   if (item.hideDropdown) {
//                     navigate(item.path);
//                     setMobileMenuOpen(false);
//                     return;
//                   }

//                   sidebarOpen && setOpenSection(isOpen ? null : item.section);
//                 }}

//                   className={`w-full flex items-center justify-between px-3 py-2 rounded-xl
//                   ${isActive ? "bg-[#EFF6FF] border border-[#2563EB]" : "hover:bg-[#EFF6FF]"}
//                   ${!sidebarOpen && "justify-center"}`}
//                 >
//                   <div className="flex items-center gap-2">
//                     <Icon size={16} className="text-[#2563EB]" />
//                     {sidebarOpen && <span className="whitespace-nowrap">{item.section}</span>}
//                   </div>

//                   {sidebarOpen && !item.hideDropdown && item.submenu?.length > 0 && (
//                     <ChevronDown
//                       size={14}
//                       className={`transition ${isOpen ? "rotate-180" : ""}`}
//                     />
//                   )}

//                 </button>

//                 {sidebarOpen && isOpen && (
//                   <div className="ml-4 mt-1 space-y-1 border-l border-[#93C5FD] pl-3">
//                     {item.submenu.map((sub) => (
//                       <NavLink
//                         key={sub.path}
//                         to={sub.path}
//                         onClick={() => setMobileMenuOpen(false)}
//                         className={({ isActive }) =>
//                           `block px-3 py-1.5 rounded-lg ${isActive
//                             ? "bg-[#DBEAFE] text-[#2563EB]"
//                             : "hover:bg-[#EFF6FF]"
//                           }`
//                         }
//                       >
//                         {sub.name}
//                       </NavLink>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* FOOTER */}
//         <div className="absolute bottom-0 w-full p-2 border-t border-[#93C5FD] bg-white">
//           {sidebarOpen && (
//             <div className="flex flex-col items-center gap-2">
//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center justify-center gap-2 px-2 py-3 text-md font-medium text-white bg-red-500 border border-red-200 rounded-lg hover:bg-red-600 transition"
//               >
//                 Logout
//               </button>

//               <span className="text-[10px] text-gray-500">
//                 v1.0.0 • Design House
//               </span>
//             </div>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// }
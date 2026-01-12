
// import { ChevronDown, X } from "lucide-react";
// import { NavLink, useLocation } from "react-router-dom";
// import { useState } from "react";
// import {
//   LayoutDashboard,
//   Briefcase,
//   Users,
//   BookOpen,
//   Image,
//   Download,
//   FileText
// } from "lucide-react";

// const menuConfig = [
//   {
//     section: "Dashboard",
//     icon: LayoutDashboard,
//     submenu: [
//       { name: "Overview", path: "/dashboard/overview" },
//       { name: "Analytics", path: "/dashboard/analytics" }
//     ]
//   },
//   {
//     section: "Services",
//     icon: Briefcase,
//     submenu: [
//       { name: "Web Development", path: "/services/web" },
//       { name: "Mobile Apps", path: "/services/mobile" },
//       { name: "UI/UX Design", path: "/services/uiux" }
//     ]
//   },
//   {
//     section: "Clients",
//     icon: Users,
//     submenu: [
//       { name: "All Clients", path: "/clients/all" },
//       { name: "Testimonials", path: "/clients/testimonials" }
//     ]
//   },
//   {
//     section: "Career",
//     icon: FileText,
//     submenu: [
//       { name: "Open Positions", path: "/career/jobs" },
//       { name: "Internships", path: "/career/internships" }
//     ]
//   },
//   {
//     section: "Blog",
//     icon: BookOpen,
//     submenu: [
//       { name: "Latest Posts", path: "/blog/latest" },
//       { name: "Categories", path: "/blog/categories" }
//     ]
//   },
//   {
//     section: "Portfolio",
//     icon: Image,
//     submenu: [
//       { name: "Projects", path: "/portfolio/projects" },
//       { name: "Case Studies", path: "/portfolio/case-studies" }
//     ]
//   },
//   {
//     section: "Downloads",
//     icon: Download,
//     submenu: [
//       { name: "Resources", path: "/downloads/resources" },
//       { name: "Reports", path: "/downloads/reports" }
//     ]
//   }
// ];

// export default function Sidebar({
//   sidebarOpen,
//   setSidebarOpen,
//   mobileMenuOpen,
//   setMobileMenuOpen
// }) {
//   const location = useLocation();
//   const [openSection, setOpenSection] = useState(null);

//   const isVisible = sidebarOpen || mobileMenuOpen;

//   return (
//     <aside
//       className={`fixed left-0 top-0 h-screen bg-white border-r border-[#F27336]/40
//         shadow-lg z-40 transition-all duration-300
//         ${isVisible ? "w-64" : "w-0"}
//       `}
//     >
//       {/* SIDEBAR HEADER (LOGO + CLOSE) */}
//       <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
//         <div className="flex items-center gap-3">
//           {/* LOGO */}
//           <div className="w-9 h-9 rounded-lg bg-[#FFF4EE] flex items-center justify-center">
//             <img
//               src="/images/logo.png"
//               alt="Design House"
//               className="w-6 h-6 object-contain"
//             />
//           </div>

//           {/* TITLE */}
//           <div className="leading-tight">
//             <h2 className="text-sm font-semibold text-gray-800">
//               Design House
//             </h2>
//             <p className="text-[11px] text-gray-500">
//               Admin Panel
//             </p>
//           </div>
//         </div>

//         {/* CLOSE BUTTON */}
//         <button
//           onClick={() => {
//             setSidebarOpen(false);
//             setMobileMenuOpen(false);
//           }}
//           className="p-2 rounded-lg hover:bg-[#FFF4EE] transition-all"
//         >
//           <X size={18} className="text-gray-600" />
//         </button>
//       </div>

//       {/* MENU */}
//       <div className="p-3 space-y-4 text-[12px] overflow-y-auto h-[calc(100vh-4rem)]">
//         {menuConfig.map((item) => {
//           const Icon = item.icon;
//           const isOpen = openSection === item.section;

//           return (
//             <div key={item.section}>
//               {/* SECTION TITLE */}
//               <h4 className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
//                 {item.section}
//               </h4>

//               {/* MAIN ITEM */}
//               <button
//                 onClick={() => setOpenSection(isOpen ? null : item.section)}
//                 className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all
//                   ${
//                     isOpen
//                       ? "bg-[#FFF4EE] border-[#F27336]"
//                       : "border-transparent hover:bg-[#FFF4EE]"
//                   }
//                 `}
//               >
//                 <div className="flex items-center gap-2">
//                   <Icon size={16} className="text-[#F27336]" />
//                   <span className="font-medium text-gray-800">
//                     {item.section}
//                   </span>
//                 </div>

//                 <ChevronDown
//                   size={14}
//                   className={`transition-transform ${
//                     isOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {/* SUBMENU */}
//               {isOpen && (
//                 <div className="mt-2 ml-3 space-y-1 border-l border-[#F27336]/30 pl-3">
//                   {item.submenu.map((sub) => {
//                     const active = location.pathname === sub.path;

//                     return (
//                       <NavLink
//                         key={sub.path}
//                         to={sub.path}
//                         onClick={() => setMobileMenuOpen(false)}
//                         className={`block px-3 py-1.5 rounded-lg transition-all
//                           ${
//                             active
//                               ? "bg-[#FFE8DD] text-[#F27336] font-medium"
//                               : "text-gray-600 hover:bg-[#FFF4EE] hover:text-[#F27336]"
//                           }
//                         `}
//                       >
//                         {sub.name}
//                       </NavLink>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </aside>
//   );
// }



// import { Menu, X, Bell, Moon, Sun, LogOut, Search } from "lucide-react";

// export default function Navbar({
//   sidebarOpen,
//   setSidebarOpen,
//   darkMode,
//   setDarkMode,
//   handleLogout,
//   mobileMenuOpen,
//   setMobileMenuOpen
// }) {
//   return (
//     <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#F27336]/30 z-50 shadow-sm">
//       <div className="flex items-center justify-between h-full px-4 sm:px-6">

//         {/* LEFT SECTION */}
//         <div className="flex items-center gap-2 sm:gap-4">
//           {/* Desktop Sidebar Toggle */}
//           <button
//             onClick={() => {
//               setSidebarOpen(!sidebarOpen);
//               setMobileMenuOpen(false);
//             }}
//             className="hidden lg:flex items-center justify-center p-2 rounded-lg
//               border border-transparent
//               hover:border-[#F27336]/50 hover:bg-[#FFF4EE]
//               transition-all"
//           >
//             {sidebarOpen ? (
//               <X size={18} className="text-gray-700" />
//             ) : (
//               <Menu size={18} className="text-gray-700" />
//             )}
//           </button>

//           {/* Mobile Menu Toggle */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="lg:hidden flex items-center justify-center p-2 rounded-lg
//               border border-transparent
//               hover:border-[#F27336]/50 hover:bg-[#FFF4EE]
//               transition-all"
//           >
//             {mobileMenuOpen ? (
//               <X size={22} className="text-gray-700" />
//             ) : (
//               <Menu size={22} className="text-gray-700" />
//             )}
//           </button>

//           {/* BRAND */}
//           <h1 className="text-base sm:text-lg font-semibold text-[#F27336]">
//             Admin Panel
//           </h1>
//         </div>

//         {/* CENTER SEARCH (HIDDEN ON SMALL) */}
//         <div className="hidden md:flex flex-1 max-w-xl mx-6">
//           <div className="flex items-center w-full bg-[#FFF9F6] border border-[#F27336]/30 rounded-xl px-4 py-2
//             focus-within:ring-2 focus-within:ring-[#F27336]/20">
//             <Search size={18} className="text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search anything..."
//               className="ml-2 w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
//             />
//           </div>
//         </div>

//         {/* RIGHT SECTION */}
//         <div className="flex items-center gap-2 sm:gap-4">
//           {/* Notifications */}
//           <button className="relative hidden sm:flex items-center justify-center p-2 rounded-lg
//             hover:bg-[#FFF4EE] transition-all">
//             <Bell size={18} className="text-gray-700" />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>

//           {/* Dark Mode */}
//           {/* <button
//             onClick={() => setDarkMode(!darkMode)}
//             className="p-2 rounded-lg hover:bg-[#FFF4EE] transition-all"
//           >
//             {darkMode ? (
//               <Sun size={18} className="text-gray-700" />
//             ) : (
//               <Moon size={18} className="text-gray-700" />
//             )}
//           </button> */}

//           {/* Logout */}
          // <button
          //   onClick={handleLogout}
          //   className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-lg
          //     text-sm font-medium text-gray-700
          //     border border-transparent
          //     hover:border-[#F27336]/40 hover:bg-[#FFF4EE]
          //     transition-all"
          // >
          //   <LogOut size={16} />
          //   <span className="hidden sm:inline">Logout</span>
          // </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// import { Menu, X, Bell, LogOut, Search } from "lucide-react";

// export default function Navbar({
//   sidebarOpen,
//   setSidebarOpen,
//   handleLogout,
//   mobileMenuOpen,
//   setMobileMenuOpen
// }) {
//   return (
//     <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#F27336]/30 z-50 shadow-sm">
//       <div className="flex items-center justify-between h-full px-4 sm:px-6">

//         {/* LEFT SECTION */}
//         <div className="flex items-center gap-3 sm:gap-5">

          // {/* SIDEBAR TOGGLE */}
          // <button
          //   onClick={() => {
          //     setSidebarOpen(!sidebarOpen);
          //     setMobileMenuOpen(false);
          //   }}
          //   className="hidden lg:flex items-center justify-center p-2 rounded-lg
          //     hover:bg-[#FFF4EE] transition-all duration-200"
          // >
          //   {sidebarOpen ? (
          //     <X size={18} className="text-gray-700" />
          //   ) : (
          //     <Menu size={18} className="text-gray-700" />
          //   )}
          // </button>

//           {/* MOBILE MENU */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="lg:hidden flex items-center justify-center p-2 rounded-lg
//               hover:bg-[#FFF4EE] transition-all duration-200"
//           >
//             {mobileMenuOpen ? (
//               <X size={22} className="text-gray-700" />
//             ) : (
//               <Menu size={22} className="text-gray-700" />
//             )}
//           </button>

//           {/* LOGO + BRAND */}
//           <div className="flex items-center gap-3">
//             {/* LOGO */}
//             <div className="w-9 h-9 rounded-lg flex items-center justify-center">
//               <img
//                 src="/images/logo.png"
//                 alt="Design House Logo"
//                 className="w-10 h-10 object-contain"
//               />
//             </div>

//             {/* BRAND TEXT */}
//             <div className="leading-tight">
//               <h1 className="text-sm sm:text-base font-semibold text-gray-800 tracking-wide">
//                 Design House
//               </h1>
//               <p className="text-[11px] text-gray-500">
//                 Admin Panel
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* CENTER SEARCH */}
//         <div className="hidden md:flex flex-1 max-w-xl mx-6">
//           <div className="flex items-center w-full bg-[#FFF9F6]
//             border border-[#F27336]/30 rounded-xl px-4 py-2
//             focus-within:ring-2 focus-within:ring-[#F27336]/20
//             transition-all"
//           >
//             <Search size={18} className="text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search anything..."
//               className="ml-2 w-full bg-transparent outline-none
//                 text-sm text-gray-700 placeholder-gray-400"
//             />
//           </div>
//         </div>

//         {/* RIGHT SECTION */}
//         <div className="flex items-center gap-2 sm:gap-4">

//           {/* NOTIFICATIONS */}
//           <button className="relative hidden sm:flex items-center justify-center p-2 rounded-lg
//             hover:bg-[#FFF4EE] transition-all duration-200">
//             <Bell size={18} className="text-gray-700" />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>

//            <button
//             onClick={handleLogout}
//             className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-lg
//               text-sm font-medium text-gray-700
//               border border-transparent
//               hover:border-[#F27336]/40 hover:bg-[#FFF4EE]
//               transition-all"
//           >
//             <LogOut size={16} />
//             <span className="hidden sm:inline">Logout</span>
//           </button>
//         </div>

//       </div>
//     </nav>
//   );
// }


// import { Search, Bell, Menu, X, LogOut, User } from "lucide-react";
// import { useState } from "react";

// export default function Navbar({
//   sidebarOpen,
//   setSidebarOpen,
//   mobileMenuOpen,
//   setMobileMenuOpen,
//   handleLogout
// }) {
//   const [profileOpen, setProfileOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-[#F27336]/30 z-50">
//       <div className="flex items-center justify-between h-full px-4 sm:px-6">

//         {/* LEFT – SIDEBAR TOGGLE + LOGO */}
//         <div className="flex items-center gap-3">

//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
//           >
//             {mobileMenuOpen ? (
//               <X size={20} className="text-gray-700" />
//             ) : (
//               <Menu size={20} className="text-gray-700" />
//             )}
//           </button>

//           {/* Logo + Brand */}
//           {/* <div className="flex items-center gap-3">
//             <img
//               src="/images/logo.png"
//               alt="Design House"
//               className="h-12 w-auto"
//             />
//             <div className="leading-tight hidden sm:block">
//               <h1 className="text-sm font-bold text-gray-800">
//                 Design House
//               </h1>
//               <p className="text-md font-semibold text-gray-500">
//                 Admin Panel
//               </p>
//             </div>
//           </div> */}

//             {/* Sidebar Toggle */}
//           {/* <button
//             onClick={() => {
//               setSidebarOpen(!sidebarOpen);
//               setMobileMenuOpen(false);
//             }}
//             className="hidden lg:flex p-2 rounded-lg hover:bg-[#FFF4EE] transition " 
//           >
//             {sidebarOpen ? (
//               <X size={18} className="text-gray-700" />
//             ) : (
//               <Menu size={18} className="text-gray-700" />
//             )}
//           </button>  */}

//         </div>

//         {/* CENTER – SEARCH */}
//         <div className="hidden md:flex flex-1 max-w-xl mx-6">
//           <div className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-100">
//             <Search size={16} className="text-gray-400" />
//             <input
//               placeholder="Search anything..."
//               className="ml-2 w-full bg-transparent outline-none text-sm"
//             />
//           </div>
//         </div>

//         {/* RIGHT – NOTIFICATION + PROFILE */}
//         <div className="flex items-center gap-4 relative">

//           {/* Notifications */}
//           <button className="relative p-2 rounded-lg hover:bg-[#FFF4EE] transition">
//             <Bell size={18} className="text-gray-600" />
//             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
//               3
//             </span>
//           </button>

//           {/* Profile */}
//           <button
//             onClick={() => setProfileOpen(!profileOpen)}
//             className="flex items-center gap-2 p-1.5 rounded-full hover:bg-[#FFF4EE] transition"
//           >
//             <img
//               src="/images/avatar.png"
//               alt="user"
//               className="w-8 h-8 rounded-full border"
//             />
//           </button>

//           {/* PROFILE DROPDOWN */}
//           {profileOpen && (
//             <div className="absolute right-0 top-14 w-44 bg-white border border-gray-200 shadow-lg overflow-hidden">
//               <button
//                 className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               >
//                 <User size={16} />
//                 Profile
//               </button>

//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//               >
//                 <LogOut size={16} />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }


// import { ChevronDown, X, Menu } from "lucide-react";
// import { NavLink, useLocation } from "react-router-dom";
// import { useState } from "react";
// import {
//   LayoutDashboard,
//   Briefcase,
//   Users,
//   BookOpen,
//   Image,
//   Download,
//   FileText,
// } from "lucide-react";

// const menuConfig = [
//   {
//     section: "Dashboard",
//     icon: LayoutDashboard,
//     path: "/dashboard",
//     submenu: [
//       { name: "Overview", path: "/dashboard/overview" },
//       { name: "Analytics", path: "/dashboard/analytics" }
//     ]
//   },
//   {
//     section: "Services",
//     icon: Briefcase,
//     path: "/services",
//     submenu: [
//       { name: "Web Development", path: "/services/web" },
//       { name: "Mobile Apps", path: "/services/mobile" },
//       { name: "UI/UX Design", path: "/services/uiux" }
//     ]
//   },
//   {
//     section: "Clients",
//     icon: Users,
//     path: "/clients",
//     submenu: [
//       { name: "All Clients", path: "/clients/all" },
//       { name: "Testimonials", path: "/clients/testimonials" }
//     ]
//   },
//   {
//     section: "Career",
//     icon: FileText,
//     path: "/career",
//     submenu: [
//       { name: "Open Positions", path: "/career/jobs" },
//       { name: "Internships", path: "/career/internships" }
//     ]
//   },
//   {
//     section: "Blog",
//     icon: BookOpen,
//     path: "/blog",
//     submenu: [
//       { name: "Latest Posts", path: "/blog/latest" },
//       { name: "Categories", path: "/blog/categories" }
//     ]
//   },
//   {
//     section: "Portfolio",
//     icon: Image,
//     path: "/portfolio",
//     submenu: [
//       { name: "Projects", path: "/portfolio/projects" },
//       { name: "Case Studies", path: "/portfolio/case-studies" }
//     ]
//   },
//   {
//     section: "Downloads",
//     icon: Download,
//     path: "/downloads",
//     submenu: [
//       { name: "Resources", path: "/downloads/resources" },
//       { name: "Reports", path: "/downloads/reports" }
//     ]
//   }
// ];

// export default function Sidebar({
//   sidebarOpen,
//   setSidebarOpen,
//   mobileMenuOpen,
//   setMobileMenuOpen
// }) {
//   const location = useLocation();
//   const [openSection, setOpenSection] = useState("Dashboard");

//   const toggleSidebar = () => {
//     if (window.innerWidth >= 1024) {
//       // Desktop: toggle permanent sidebar
//       setSidebarOpen(!sidebarOpen);
//     } else {
//       // Mobile: close mobile menu
//       setMobileMenuOpen(false);
//     }
//   };

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setMobileMenuOpen(true)}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#F27336] text-white rounded-lg shadow-lg"
//       >
//         <Menu size={20} />
//       </button>

//       {/* Desktop Toggle Button when sidebar is closed */}
//       {!sidebarOpen && (
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="hidden lg:flex fixed top-20 left-0 z-30 p-2 bg-[#F27336] text-white rounded-r-lg shadow-lg"
//         >
//           <Menu size={20} />
//         </button>
//       )}

//       {/* Mobile Overlay */}
//       {mobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//           onClick={closeSidebar}
//         />
//       )}

//       {mobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setMobileMenuOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed left-0 top-0 h-screen bg-white border-r-3 border-[#F27336]/40 shadow-xl z-50 overflow-y-auto transition-all duration-300
//           ${sidebarOpen ? "w-68" : "w-0 lg:w-20"}
//           ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//         `}
//       >

//         {/* Header with Logo and Close Button */}
//         <div className={`p-4 border-b border-[#F27336]/20 bg-gradient-to-r from-white to-[#FFF4EE] ${!sidebarOpen && "lg:px-2"}`}>
//           <div className="flex items-center justify-between">
//             {/* Logo + Brand */}
//             <div className={`flex items-center gap-3 transition-all duration-300 ${!sidebarOpen && "lg:justify-center"}`}>
//               <img
//                 src="/images/logo.png"
//                 alt="Design House"
//                 className={`h-12 w-auto transition-all duration-300 ${!sidebarOpen && "lg:h-10"}`}
//               />
//               <div className={`leading-tight transition-all duration-300 overflow-hidden ${!sidebarOpen ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"}`}>
//                 <h1 className="text-sm font-bold text-gray-800">
//                   Design House
//                 </h1>
//                 <p className="text-xs font-semibold text-gray-500">
//                   Admin Panel
//                 </p>
//               </div>
//             </div>

//             {/* Close Button - Only visible when sidebar is open */}
//             <button
//               onClick={toggleSidebar}
//               className={`p-1.5 rounded-lg hover:bg-[#FFF4EE] text-gray-600 hover:text-[#F27336] transition-all duration-300 ${
//                 !sidebarOpen ? "lg:opacity-0 lg:invisible" : "opacity-100"
//               }`}
//             >
//               <X size={18} />
//             </button>

//           </div>
//         </div>

//         {/* Navigation Menu */}
//         <div className="p-3 space-y-4 text-[12px]">
//           {menuConfig.map((item) => {
//             const Icon = item.icon;
//             const isOpen = openSection === item.section;
//             const isActive = location.pathname.startsWith(item.path);

//             return (
//               <div key={item.section}>
//                 {/* SECTION HEADING - Hidden when sidebar collapsed */}
//                 {sidebarOpen && (
//                   <h4 className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
//                     {item.section}
//                   </h4>
//                 )}

//                 {/* MAIN ITEM */}
//                 <div className="relative">
//                   <button
//                     onClick={() => {
//                       if (sidebarOpen) {
//                         setOpenSection(isOpen ? null : item.section);
//                       } else {
//                         // If sidebar is collapsed, expand it first
//                         setSidebarOpen(true);
//                         setTimeout(() => setOpenSection(item.section), 300);
//                       }
//                     }}
//                     className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all duration-300 group
//                       ${!sidebarOpen && "lg:justify-center lg:px-2"}
//                       ${isActive
//                         ? "bg-[#FFF4EE] border-[#F27336]"
//                         : "border-transparent hover:border-[#F27336]/50 hover:bg-[#FFF4EE]"
//                       }
//                     `}
//                   >
//                     <div className={`flex items-center gap-2 ${!sidebarOpen && "lg:justify-center"}`}>
//                       <Icon size={16} className={`text-[#F27336] ${!sidebarOpen && "lg:mx-auto"}`} />
//                       <span className={`font-medium text-gray-800 transition-all duration-300 ${!sidebarOpen ? "lg:hidden" : ""}`}>
//                         {item.section}
//                       </span>
//                     </div>

//                     {/* Chevron - Only show when sidebar is open */}
//                     {sidebarOpen && (
//                       <ChevronDown
//                         size={14}
//                         className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
//                       />
//                     )}

//                     {/* Tooltip for collapsed state */}
//                     {!sidebarOpen && (
//                       <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
//                         {item.section}
//                         {item.submenu && (
//                           <div className="mt-1">
//                             {item.submenu.map(sub => (
//                               <div key={sub.path} className="py-1 px-2 hover:bg-gray-700 rounded">
//                                 {sub.name}
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </button>

//                   {/* SUBMENU - Only show when sidebar is open */}
//                   {sidebarOpen && isOpen && (
//                     <div className="mt-2 ml-3 space-y-1 border-l border-[#F27336]/30 pl-3">
//                       {item.submenu.map((sub) => {
//                         const active = location.pathname === sub.path;

//                         return (
//                           <NavLink
//                             key={sub.path}
//                             to={sub.path}
//                             onClick={() => {
//                               setMobileMenuOpen(false);
//                               if (window.innerWidth < 1024) setSidebarOpen(false);
//                             }}
//                             className={`block px-3 py-1.5 rounded-lg transition-all
//                               ${active
//                                 ? "bg-[#FFE8DD] text-[#F27336] font-medium"
//                                 : "text-gray-600 hover:bg-[#FFF4EE] hover:text-[#F27336]"
//                               }
//                             `}
//                           >
//                             {sub.name}
//                           </NavLink>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Footer */}
//         <div className={`absolute bottom-0 left-0 right-0 p-4 border-t-1 border-[#F27336]/20 ${!sidebarOpen && "lg:p-2"}`}>
//           <div className={`text-center transition-all duration-300 ${!sidebarOpen && "lg:opacity-0 lg:invisible"}`}>
//             <p className="text-[10px] text-gray-400">
//               v1.0.0 • Design House
//             </p>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

// import { ChevronDown, X, Menu } from "lucide-react";
// import { NavLink, useLocation } from "react-router-dom";
// import { useState } from "react";
// import {
//   LayoutDashboard,
//   Briefcase,
//   Users,
//   BookOpen,
//   Image,
//   Download,
//   FileText,
// } from "lucide-react";

// const menuConfig = [
//   {
//     section: "Dashboard",
//     icon: LayoutDashboard,
//     path: "/dashboard",
//     showHeading: true,
//     submenu: [
//       { name: "Analytics", path: "/dashboard/analytics" },
//       { name: "Projects", path: "/dashboard/overview" },
//     ],
//   },
//   {
//     section: "Services",
//     icon: Briefcase,
//     path: "/services",
//     showHeading: true,
//     submenu: [
//       { name: "Interior", path: "/services/web" },
//       { name: "Merchandising", path: "/services/mobile" },
//       { name: "Kiosk", path: "/services/uiux" },
//       { name: "Exhibition & Events", path: "/services/web" },
//       { name: "Office Interior", path: "/services/mobile" },
//       { name: "Furniture", path: "/services/uiux" },

//     ],
//   },
//   {
//     section: "Career",
//     icon: FileText,
//     path: "/career",
//     showHeading: false,
//     submenu: [
//       { name: "Open Positions", path: "/career/jobs" },
//     ],
//   },
//   {
//     section: "Our Clients",
//     icon: Users,
//     path: "/clients",
//     showHeading: false,
//     submenu: [
//       { name: "All Clients", path: "/clients/all" },
//       { name: "Testimonials", path: "/clients/testimonials" },
//     ],
//   },
//   {
//     section: "Blog",
//     icon: BookOpen,
//     path: "/blog",
//     showHeading: false,
//     submenu: [
//       { name: "Latest Posts", path: "/blog/latest" },
//       { name: "Categories", path: "/blog/categories" },
//     ],
//   },
//   {
//     section: "Portfolio",
//     icon: Image,
//     path: "/portfolio",
//     showHeading: true,
//     submenu: [
//       { name: "Interior Portfolio", path: "/services/web" },
//       { name: "Merchandising Portfolio", path: "/services/mobile" },
//       { name: "Kiosk Portfolio", path: "/services/uiux" },
//       { name: "Exhibition & Events Portfolio", path: "/services/web" },
//       { name: "Office Interior Portfolio", path: "/services/mobile" },
//       { name: "Furniture Portfolio", path: "/services/uiux" },
//       { name: "Videos", path: "/services/uiux" },
//     ],
//   },
//   {
//     section: "Downloads",
//     icon: Download,
//     path: "/downloads",
//     showHeading: true,
//     submenu: [
//       { name: "E Brochure", path: "/downloads/resources" },
//       { name: "Newsletter", path: "/downloads/reports" },
//       { name: "Company Profile ", path: "/downloads/reports" },
//     ],
//   },
// ];

// export default function Sidebar({
//   sidebarOpen,
//   setSidebarOpen,
//   mobileMenuOpen,
//   setMobileMenuOpen,
// }) {
//   const location = useLocation();
//   const [openSection, setOpenSection] = useState("Dashboard");

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
//         shadow-xl z-50 transition-all duration-300 overflow-y-auto
//         ${sidebarOpen
//             ? "w-82 translate-x-0"
//             : "w-20 -translate-x-full lg:translate-x-0"
//           }
//         ${mobileMenuOpen ? "translate-x-0" : ""}`}
//       >
//         {/* HEADER */}
//         <div className="p-4 border-b border-[#93C5FD] bg-gradient-to-r from-white to-[#EFF6FF]">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3 overflow-hidden">
//               <img src="/images/logo.png" alt="Design House" className="h-15" />
//               {sidebarOpen && (
//                 <div>
//                   <h1 className="text-[12px] font-bold text-gray-800">
//                     Design House
//                   </h1>
//                   <p className="text-[10px] font-bold text-gray-500">Admin Panel</p>
//                 </div>
//               )}
//             </div>

//             {sidebarOpen && (
//               <button
//                 onClick={() => setSidebarOpen(false)}
//                 className="hidden lg:flex p-1.5 rounded-lg hover:bg-[#EFF6FF]"
//               >
//                 <X size={18} />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* OPEN BUTTON */}
//         {!sidebarOpen && (
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="hidden lg:flex mx-auto mt-4 p-2 rounded-lg bg-[#2563EB] text-white"
//           >
//             <Menu size={18} />
//           </button>
//         )}

//         {/* MENU */}
//         <div className="p-3 space-y-3 text-[12px]">
//           {menuConfig.map((item) => {
//             const Icon = item.icon;
//             const isActive = location.pathname.startsWith(item.path);
//             const isOpen = openSection === item.section;

//             return (
//               <div key={item.section}>
//                 {/* {sidebarOpen &&  (
//                   <h4 className="px-2 mb-1 text-[11px] font-semibold uppercase text-gray-500">
//                     {item.section}
//                   </h4>
//                 )} */}
//                 {sidebarOpen && item.showHeading && (
//                   <h4 className="px-2 mb-1 text-[11px] font-semibold uppercase text-gray-500">
//                     {item.section}
//                   </h4>
//                 )}


//                 <button
//                   onClick={() =>
//                     sidebarOpen && setOpenSection(isOpen ? null : item.section)
//                   }
//                   className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all
//                   ${isActive
//                       ? "bg-[#EFF6FF] border border-[#2563EB]"
//                       : "hover:bg-[#EFF6FF]"
//                     }
//                   ${!sidebarOpen && "justify-center"}`}
//                 >
//                   <div className="flex items-center gap-2">
//                     <Icon size={16} className="text-[#2563EB]" />
//                     {sidebarOpen && (
//                       <span className="font-medium">{item.section}</span>
//                     )}
//                   </div>

//                   {sidebarOpen && (
//                     <ChevronDown
//                       size={14}
//                       className={`transition ${isOpen ? "rotate-180" : ""
//                         }`}
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
//         <div className="absolute bottom-0 w-full p-5 border-t border-[#93C5FD] text-center text-[10px] font-bold text-gray-500">
//           {sidebarOpen && "v1.0.0 • Design House"}
//         </div>
//       </aside>
//     </>
//   );
// }

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

// import { Star, Plus, Download, Filter, Eye, Trash2, Edit2, Search, Calendar, User, MessageSquare, ChevronDown, ChevronUp, Check, X, AlertCircle, ThumbsUp } from "lucide-react";
// import { useState, useEffect, useMemo } from "react";

// export default function Testimonials() {
//     const [selectedTestimonial, setSelectedTestimonial] = useState([]);
//     const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [showFilter, setShowFilter] = useState(false);
//     const [filters, setFilters] = useState({
//         status: "all",
//         rating: "all",
//         verified: "all"
//     });
//     const [currentPage, setCurrentPage] = useState(1);
//     const [testimonials, setTestimonials] = useState([
//         {
//             id: 1,
//             name: "Anjali Chaudhary",
//             role: "App Developer",
//             rating: 5.0,
//             feedback: "Using Vruum Cab for business travel has been a game-changer for our team. The reliability and professionalism are unmatched!",
//             date: "Nov 7, 2025",
//             status: "Excellent",
//             avatarColor: "bg-gradient-to-br from-blue-500 to-blue-600",
//             initials: "AC",
//             verified: true
//         },
//         {
//             id: 2,
//             name: "Rohit Kumar",
//             role: "Full Stack Developer",
//             rating: 5.0,
//             feedback: "Affordable and safe rides every time! Vruum Cab has made my daily commute stress-free and comfortable.",
//             date: "Nov 7, 2025",
//             status: "Excellent",
//             avatarColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
//             initials: "RK",
//             verified: true
//         },
//         {
//             id: 3,
//             name: "Priya Sharma",
//             role: "Product Manager",
//             rating: 4.8,
//             feedback: "The app interface is so user-friendly and booking takes seconds. Great service overall!",
//             date: "Nov 6, 2025",
//             status: "Very Good",
//             avatarColor: "bg-gradient-to-br from-violet-500 to-violet-600",
//             initials: "PS",
//             verified: false
//         },
//         {
//             id: 4,
//             name: "Arun Verma",
//             role: "Business Analyst",
//             rating: 4.5,
//             feedback: "Perfect for corporate travel. Always on time and drivers are very professional.",
//             date: "Nov 5, 2025",
//             status: "Very Good",
//             avatarColor: "bg-gradient-to-br from-amber-500 to-amber-600",
//             initials: "AV",
//             verified: true
//         },
//         {
//             id: 5,
//             name: "Sneha Patel",
//             role: "UX Designer",
//             rating: 4.9,
//             feedback: "Love the clean interface and easy booking process. Makes my travel planning so much easier.",
//             date: "Nov 4, 2025",
//             status: "Excellent",
//             avatarColor: "bg-gradient-to-br from-pink-500 to-pink-600",
//             initials: "SP",
//             verified: true
//         },
//         {
//             id: 6,
//             name: "Rajesh Mehta",
//             role: "Software Engineer",
//             rating: 4.7,
//             feedback: "Great service, reliable drivers, and reasonable pricing. Highly recommend!",
//             date: "Nov 3, 2025",
//             status: "Very Good",
//             avatarColor: "bg-gradient-to-br from-indigo-500 to-indigo-600",
//             initials: "RM",
//             verified: false
//         }
//     ]);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [showViewModal, setShowViewModal] = useState(null);
//     const [newTestimonial, setNewTestimonial] = useState({
//         name: "",
//         role: "",
//         rating: 5,
//         feedback: "",
//         verified: false
//     });
//     const itemsPerPage = 4;

//     useEffect(() => {
//         setIsLoaded(true);
//     }, []);

//     // Filter and sort testimonials
//     const filteredAndSortedTestimonials = useMemo(() => {
//         let filtered = testimonials.filter(testimonial => {
//             const matchesSearch = testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 testimonial.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 testimonial.feedback.toLowerCase().includes(searchQuery.toLowerCase());

//             const matchesStatus = filters.status === "all" || testimonial.status === filters.status;
//             const matchesRating = filters.rating === "all" ||
//                 (filters.rating === "5" && testimonial.rating >= 4.8) ||
//                 (filters.rating === "4.5+" && testimonial.rating >= 4.5) ||
//                 (filters.rating === "4+" && testimonial.rating >= 4.0);
//             const matchesVerified = filters.verified === "all" ||
//                 (filters.verified === "verified" && testimonial.verified) ||
//                 (filters.verified === "unverified" && !testimonial.verified);

//             return matchesSearch && matchesStatus && matchesRating && matchesVerified;
//         });

//         // Sort testimonials
//         filtered.sort((a, b) => {
//             if (sortConfig.key === 'date') {
//                 const dateA = new Date(a.date);
//                 const dateB = new Date(b.date);
//                 return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
//             }
//             if (sortConfig.key === 'rating') {
//                 return sortConfig.direction === 'asc' ? a.rating - b.rating : b.rating - a.rating;
//             }
//             return 0;
//         });

//         return filtered;
//     }, [testimonials, searchQuery, filters, sortConfig]);

//     // Pagination
//     const totalPages = Math.ceil(filteredAndSortedTestimonials.length / itemsPerPage);
//     const paginatedTestimonials = useMemo(() => {
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         return filteredAndSortedTestimonials.slice(startIndex, startIndex + itemsPerPage);
//     }, [filteredAndSortedTestimonials, currentPage]);

//     const stats = [
//         {
//             title: "TOTAL REVIEWS",
//             value: testimonials.length.toString(),
//             subtitle: "All customer reviews",
//             color: "blue",
//             icon: <MessageSquare size={20} />,
//             gradient: "from-blue-50 to-blue-100",
//             borderColor: "border-blue-200"
//         },
//         {
//             title: "AVERAGE RATING",
//             value: (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1),
//             subtitle: "Overall satisfaction",
//             color: "amber",
//             icon: <Star size={20} className="fill-yellow-400 text-yellow-400" />,
//             gradient: "from-amber-50 to-amber-100",
//             borderColor: "border-amber-200"
//         },
//         {
//             title: "5-STAR REVIEWS",
//             value: testimonials.filter(t => t.rating >= 4.8).length.toString(),
//             subtitle: "Perfect ratings",
//             color: "emerald",
//             icon: <div className="flex"><Star size={16} className="fill-yellow-400 text-yellow-400" /><Star size={16} className="fill-yellow-400 text-yellow-400" /><Star size={16} className="fill-yellow-400 text-yellow-400" /><Star size={16} className="fill-yellow-400 text-yellow-400" /><Star size={16} className="fill-yellow-400 text-yellow-400" /></div>,
//             gradient: "from-emerald-50 to-emerald-100",
//             borderColor: "border-emerald-200"
//         },
//         {
//             title: "EXCELLENT (4.5+)",
//             value: testimonials.filter(t => t.rating >= 4.5).length.toString(),
//             subtitle: "High satisfaction",
//             color: "violet",
//             icon: <Star size={20} className="fill-yellow-400 text-yellow-400" />,
//             gradient: "from-violet-50 to-violet-100",
//             borderColor: "border-violet-200"
//         }
//     ];

//     const toggleSelectAll = () => {
//         if (selectedTestimonial.length === paginatedTestimonials.length) {
//             setSelectedTestimonial([]);
//         } else {
//             setSelectedTestimonial(paginatedTestimonials.map(t => t.id));
//         }
//     };

//     const toggleSelectItem = (id) => {
//         if (selectedTestimonial.includes(id)) {
//             setSelectedTestimonial(selectedTestimonial.filter(item => item !== id));
//         } else {
//             setSelectedTestimonial([...selectedTestimonial, id]);
//         }
//     };

//     const handleSort = (key) => {
//         let direction = 'asc';
//         if (sortConfig.key === key && sortConfig.direction === 'asc') {
//             direction = 'desc';
//         }
//         setSortConfig({ key, direction });
//     };

//     const getSortIcon = (key) => {
//         if (sortConfig.key !== key) return <ChevronDown size={16} className="opacity-30" />;
//         return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
//     };

//     const handleExport = () => {
//         const data = JSON.stringify(testimonials, null, 2);
//         const blob = new Blob([data], { type: 'application/json' });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'testimonials.json';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);

//         // Show success notification
//         alert("Testimonials exported successfully!");
//     };

//     const handleDeleteSelected = () => {
//         if (selectedTestimonial.length === 0) return;
//         setShowDeleteModal(true);
//     };

//     const confirmDelete = () => {
//         setTestimonials(prev => prev.filter(t => !selectedTestimonial.includes(t.id)));
//         setSelectedTestimonial([]);
//         setShowDeleteModal(false);

//         // Reset to page 1 if current page becomes empty
//         if (paginatedTestimonials.length === 1 && currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const handleDeleteSingle = (id) => {
//         if (window.confirm("Are you sure you want to delete this testimonial?")) {
//             setTestimonials(prev => prev.filter(t => t.id !== id));
//         }
//     };

//     const handleApproveSelected = () => {
//         setTestimonials(prev => prev.map(t =>
//             selectedTestimonial.includes(t.id) ? { ...t, verified: true } : t
//         ));
//         setSelectedTestimonial([]);
//     };

//     const handleAddTestimonial = () => {
//         if (!newTestimonial.name || !newTestimonial.role || !newTestimonial.feedback) {
//             alert("Please fill in all required fields");
//             return;
//         }

//         const newId = Math.max(...testimonials.map(t => t.id)) + 1;
//         const status = newTestimonial.rating >= 4.8 ? "Excellent" :
//             newTestimonial.rating >= 4.5 ? "Very Good" : "Good";

//         const colors = [
//             "bg-gradient-to-br from-blue-500 to-blue-600",
//             "bg-gradient-to-br from-emerald-500 to-emerald-600",
//             "bg-gradient-to-br from-violet-500 to-violet-600",
//             "bg-gradient-to-br from-amber-500 to-amber-600",
//             "bg-gradient-to-br from-pink-500 to-pink-600",
//             "bg-gradient-to-br from-indigo-500 to-indigo-600"
//         ];
//         const randomColor = colors[Math.floor(Math.random() * colors.length)];

//         const newEntry = {
//             id: newId,
//             name: newTestimonial.name,
//             role: newTestimonial.role,
//             rating: newTestimonial.rating,
//             feedback: newTestimonial.feedback,
//             date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
//             status: status,
//             avatarColor: randomColor,
//             initials: newTestimonial.name.split(' ').map(n => n[0]).join('').toUpperCase(),
//             verified: newTestimonial.verified
//         };

//         setTestimonials(prev => [newEntry, ...prev]);
//         setNewTestimonial({
//             name: "",
//             role: "",
//             rating: 5,
//             feedback: "",
//             verified: false
//         });
//         setShowAddModal(false);
//     };

//     const handlePageChange = (page) => {
//         if (page < 1 || page > totalPages) return;
//         setCurrentPage(page);
//     };

//     const getPageNumbers = () => {
//         const pages = [];
//         if (totalPages <= 5) {
//             for (let i = 1; i <= totalPages; i++) pages.push(i);
//         } else {
//             pages.push(1);
//             if (currentPage > 3) pages.push('...');
//             if (currentPage > 2) pages.push(currentPage - 1);
//             if (currentPage !== 1 && currentPage !== totalPages) pages.push(currentPage);
//             if (currentPage < totalPages - 1) pages.push(currentPage + 1);
//             if (currentPage < totalPages - 2) pages.push('...');
//             pages.push(totalPages);
//         }
//         return pages;
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
//             {/* Delete Confirmation Modal */}
//             {showDeleteModal && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//                     <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 animate-fadeIn">
//                         <div className="p-6">
//                             <div className="flex items-center gap-3 mb-4">
//                                 <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
//                                     <AlertCircle className="text-red-600" size={24} />
//                                 </div>
//                                 <div>
//                                     <h3 className="font-bold text-gray-900">Delete Testimonials</h3>
//                                     <p className="text-gray-600 text-sm">This action cannot be undone</p>
//                                 </div>
//                             </div>
//                             <p className="text-gray-700 mb-6">
//                                 Are you sure you want to delete {selectedTestimonial.length} selected testimonial{selectedTestimonial.length > 1 ? 's' : ''}?
//                             </p>
//                             <div className="flex gap-3">
//                                 <button
//                                     onClick={() => setShowDeleteModal(false)}
//                                     className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={confirmDelete}
//                                     className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-300"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Add Testimonial Modal */}
//             {showAddModal && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//                     <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-fadeIn">
//                         <div className="p-6">
//                             <div className="flex items-center justify-between mb-6">
//                                 <h3 className="text-xl font-bold text-gray-900">Add New Testimonial</h3>
//                                 <button
//                                     onClick={() => setShowAddModal(false)}
//                                     className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
//                                 >
//                                     <X size={20} />
//                                 </button>
//                             </div>

//                             <div className="grid md:grid-cols-2 gap-4 mb-6">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
//                                     <input
//                                         type="text"
//                                         value={newTestimonial.name}
//                                         onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
//                                         className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
//                                         placeholder="Enter customer name"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">Role/Position *</label>
//                                     <input
//                                         type="text"
//                                         value={newTestimonial.role}
//                                         onChange={(e) => setNewTestimonial(prev => ({ ...prev, role: e.target.value }))}
//                                         className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
//                                         placeholder="Enter role/position"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
//                                     <div className="flex items-center gap-2">
//                                         {[1, 2, 3, 4, 5].map((star) => (
//                                             <button
//                                                 key={star}
//                                                 type="button"
//                                                 onClick={() => setNewTestimonial(prev => ({ ...prev, rating: star }))}
//                                                 className="p-1"
//                                             >
//                                                 <Star
//                                                     size={24}
//                                                     className={star <= newTestimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//                                                 />
//                                             </button>
//                                         ))}
//                                         <span className="ml-2 font-medium">{newTestimonial.rating}.0</span>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center mt-8">
//                                     <label className="flex items-center cursor-pointer">
//                                         <input
//                                             type="checkbox"
//                                             checked={newTestimonial.verified}
//                                             onChange={(e) => setNewTestimonial(prev => ({ ...prev, verified: e.target.checked }))}
//                                             className="sr-only"
//                                         />
//                                         <div className={`w-10 h-6 flex items-center rounded-full p-1 transition-all ${newTestimonial.verified ? 'bg-blue-600' : 'bg-gray-300'}`}>
//                                             <div className={`bg-white w-4 h-4 rounded-full transform transition-all ${newTestimonial.verified ? 'translate-x-4' : ''}`}></div>
//                                         </div>
//                                         <span className="ml-3 text-sm font-medium">Verified Customer</span>
//                                     </label>
//                                 </div>
//                             </div>

//                             <div className="mb-6">
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Feedback *</label>
//                                 <textarea
//                                     value={newTestimonial.feedback}
//                                     onChange={(e) => setNewTestimonial(prev => ({ ...prev, feedback: e.target.value }))}
//                                     className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all min-h-[120px] resize-none"
//                                     placeholder="Enter customer feedback..."
//                                     maxLength={500}
//                                 />
//                                 <div className="text-right text-sm text-gray-500 mt-1">
//                                     {newTestimonial.feedback.length}/500 characters
//                                 </div>
//                             </div>

//                             <div className="flex gap-3">
//                                 <button
//                                     onClick={() => setShowAddModal(false)}
//                                     className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleAddTestimonial}
//                                     className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
//                                 >
//                                     Add Testimonial
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* View Testimonial Modal */}
//             {showViewModal && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//                     <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full transform transition-all duration-300 animate-fadeIn">
//                         <div className="p-6">
//                             <div className="flex items-center justify-between mb-6">
//                                 <h3 className="text-xl font-bold text-gray-900">Testimonial Details</h3>
//                                 <button
//                                     onClick={() => setShowViewModal(null)}
//                                     className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
//                                 >
//                                     <X size={20} />
//                                 </button>
//                             </div>

//                             <div className="flex items-center gap-4 mb-6">
//                                 <div className={`w-16 h-16 rounded-full ${showViewModal.avatarColor} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
//                                     {showViewModal.initials}
//                                 </div>
//                                 <div>
//                                     <h4 className="text-lg font-bold text-gray-900">{showViewModal.name}</h4>
//                                     <p className="text-gray-600">{showViewModal.role}</p>
//                                     <div className="flex items-center gap-2 mt-1">
//                                         <div className="flex">
//                                             {[...Array(5)].map((_, i) => (
//                                                 <Star
//                                                     key={i}
//                                                     size={16}
//                                                     className={i < Math.floor(showViewModal.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//                                                 />
//                                             ))}
//                                         </div>
//                                         <span className="font-bold text-gray-900">({showViewModal.rating})</span>
//                                         {showViewModal.verified && (
//                                             <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
//                                                 <Check size={12} />
//                                                 Verified
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="bg-gray-50 rounded-xl p-4 mb-6">
//                                 <p className="text-gray-700 italic">"{showViewModal.feedback}"</p>
//                             </div>

//                             <div className="grid grid-cols-2 gap-4 text-sm">
//                                 <div className="flex items-center gap-2">
//                                     <Calendar size={16} className="text-gray-400" />
//                                     <span className="text-gray-600">Submitted:</span>
//                                     <span className="font-medium">{showViewModal.date}</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <ThumbsUp size={16} className="text-gray-400" />
//                                     <span className="text-gray-600">Status:</span>
//                                     <span className={`font-medium ${showViewModal.status === "Excellent" ? "text-emerald-600" : "text-amber-600"}`}>
//                                         {showViewModal.status}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <div className="max-w-7xl mx-auto w-full mx-10">
//                 {/* Main Container Box with Enhanced Colors & Animations */}
//                 <div className="bg-gradient-to-br from-white to-gray-50 rounded-md shadow-sm border border-gray-200/50 overflow-hidden transform transition-all duration-300">

//                     {/* Header Section */}
//                     <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50/50">
//                         <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                                     Testimonials Management
//                                 </h1>
//                                 <p className="text-gray-600 mt-1">Manage customer feedback and reviews</p>
//                             </div>
//                             <div className="flex flex-wrap gap-3">
//                                 <button
//                                     onClick={handleExport}
//                                     className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow"
//                                 >
//                                     <Download size={18} />
//                                     <span className="hidden sm:inline">Export</span>
//                                 </button>
//                                 <button
//                                     onClick={() => setShowAddModal(true)}
//                                     className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
//                                 >
//                                     <Plus size={18} />
//                                     <span>Add New</span>
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Stats Grid with Enhanced Colors */}
//                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                             {stats.map((stat, index) => (
//                                 <div
//                                     key={index}
//                                     className={`bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg p-4 border ${stat.borderColor} transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
//                                     style={{ transitionDelay: `${index * 100}ms` }}
//                                 >
//                                     <div className="flex justify-between items-start mb-2">
//                                         <div className={`text-xs font-semibold text-${stat.color}-700 uppercase tracking-wide`}>
//                                             {stat.title}
//                                         </div>
//                                         <div className={`text-${stat.color}-600 transform transition-transform duration-300 hover:scale-110`}>
//                                             {stat.icon}
//                                         </div>
//                                     </div>
//                                     <div className="flex items-baseline gap-2">
//                                         <span className={`text-3xl font-bold text-${stat.color}-900`}>{stat.value}</span>
//                                         {stat.title === "AVERAGE RATING" && (
//                                             <div className="flex ml-2">
//                                                 {[...Array(5)].map((_, i) => (
//                                                     <Star
//                                                         key={i}
//                                                         size={16}
//                                                         className={`text-yellow-400 fill-yellow-400 transition-transform duration-300 hover:scale-125`}
//                                                         style={{ transitionDelay: `${i * 50}ms` }}
//                                                     />
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </div>
//                                     <div className="text-sm text-gray-600 mt-1">
//                                         {stat.subtitle}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Search and Filter Section */}
//                     <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50/80 to-gray-100/50">
//                         <div className={`flex flex-col lg:flex-row gap-4 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
//                             {/* Search Bar */}
//                             <div className="flex-1">
//                                 <div className="relative group">
//                                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 group-focus-within:text-blue-500" size={20} />
//                                     <input
//                                         type="text"
//                                         value={searchQuery}
//                                         onChange={(e) => setSearchQuery(e.target.value)}
//                                         placeholder="Search by name, role, feedback..."
//                                         className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 shadow-sm group-hover:shadow"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Filter Buttons */}
//                             <div className="flex flex-wrap gap-3">
//                                 <div className="relative">
//                                     <button
//                                         onClick={() => setShowFilter(!showFilter)}
//                                         className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow"
//                                     >
//                                         <Filter size={18} />
//                                         <span>Filters</span>
//                                         <ChevronDown size={16} className={`transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`} />
//                                     </button>

//                                     {showFilter && (
//                                         <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-10 animate-fadeIn">
//                                             <div className="p-4">
//                                                 <div className="mb-4">
//                                                     <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                                                     <select
//                                                         value={filters.status}
//                                                         onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
//                                                         className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
//                                                     >
//                                                         <option value="all">All Status</option>
//                                                         <option value="Excellent">Excellent</option>
//                                                         <option value="Very Good">Very Good</option>
//                                                     </select>
//                                                 </div>
//                                                 <div className="mb-4">
//                                                     <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
//                                                     <select
//                                                         value={filters.rating}
//                                                         onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
//                                                         className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
//                                                     >
//                                                         <option value="all">All Ratings</option>
//                                                         <option value="5">5 Stars</option>
//                                                         <option value="4.5+">4.5+ Stars</option>
//                                                         <option value="4+">4+ Stars</option>
//                                                     </select>
//                                                 </div>
//                                                 <div className="mb-4">
//                                                     <label className="block text-sm font-medium text-gray-700 mb-2">Verification</label>
//                                                     <select
//                                                         value={filters.verified}
//                                                         onChange={(e) => setFilters(prev => ({ ...prev, verified: e.target.value }))}
//                                                         className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
//                                                     >
//                                                         <option value="all">All</option>
//                                                         <option value="verified">Verified Only</option>
//                                                         <option value="unverified">Unverified Only</option>
//                                                     </select>
//                                                 </div>
//                                                 <button
//                                                     onClick={() => {
//                                                         setFilters({ status: "all", rating: "all", verified: "all" });
//                                                         setShowFilter(false);
//                                                     }}
//                                                     className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
//                                                 >
//                                                     Clear Filters
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div className="flex gap-2">
//                                     <button
//                                         onClick={() => setFilters(prev => ({ ...prev, status: "all", rating: "all", verified: "all" }))}
//                                         className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium text-sm border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
//                                     >
//                                         Total: {testimonials.length}
//                                     </button>
//                                     <button
//                                         onClick={() => setFilters(prev => ({ ...prev, rating: "5" }))}
//                                         className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 font-medium text-sm border border-emerald-200 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
//                                     >
//                                         5★: {stats[2].value}
//                                     </button>
//                                     <button
//                                         onClick={() => setFilters(prev => ({ ...prev, rating: "4.5+" }))}
//                                         className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 font-medium text-sm border border-amber-200 hover:from-amber-100 hover:to-amber-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
//                                     >
//                                         4★+: {stats[3].value}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Selection Info */}
//                     {selectedTestimonial.length > 0 && (
//                         <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200 animate-fadeIn">
//                             <div className="flex items-center justify-between">
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center animate-pulse">
//                                         <Check size={18} className="text-white" />
//                                     </div>
//                                     <span className="text-sm font-semibold text-blue-800">
//                                         {selectedTestimonial.length} item{selectedTestimonial.length > 1 ? 's' : ''} selected
//                                     </span>
//                                 </div>
//                                 <div className="flex gap-2">
//                                     <button
//                                         onClick={handleApproveSelected}
//                                         className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 rounded-lg bg-white border border-blue-200 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
//                                     >
//                                         Approve Selected
//                                     </button>
//                                     <button
//                                         onClick={handleDeleteSelected}
//                                         className="text-sm text-red-600 hover:text-red-800 font-medium px-3 py-1.5 rounded-lg bg-white border border-red-200 hover:bg-red-50 transition-all duration-300 hover:scale-105"
//                                     >
//                                         Delete Selected
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Table Section */}
//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
//                                 <tr>
//                                     <th className="w-12 p-4">
//                                         <input
//                                             type="checkbox"
//                                             checked={selectedTestimonial.length === paginatedTestimonials.length && paginatedTestimonials.length > 0}
//                                             onChange={toggleSelectAll}
//                                             className="rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
//                                         />
//                                     </th>
//                                     <th className="p-4 text-left text-sm font-semibold text-gray-900">
//                                         Customer
//                                     </th>
//                                     <th
//                                         className="p-4 text-left text-sm font-semibold text-gray-900 cursor-pointer group"
//                                         onClick={() => handleSort('rating')}
//                                     >
//                                         <div className="flex items-center gap-1">
//                                             Rating & Status
//                                             {getSortIcon('rating')}
//                                         </div>
//                                     </th>
//                                     <th className="p-4 text-left text-sm font-semibold text-gray-900">
//                                         Feedback
//                                     </th>
//                                     <th
//                                         className="p-4 text-left text-sm font-semibold text-gray-900 cursor-pointer group"
//                                         onClick={() => handleSort('date')}
//                                     >
//                                         <div className="flex items-center gap-1">
//                                             Date
//                                             {getSortIcon('date')}
//                                         </div>
//                                     </th>
//                                     <th className="p-4 text-left text-sm font-semibold text-gray-900">
//                                         Actions
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200/50">
//                                 {paginatedTestimonials.length > 0 ? (
//                                     paginatedTestimonials.map((testimonial, index) => (
//                                         <tr
//                                             key={testimonial.id}
//                                             className={`transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-white ${selectedTestimonial.includes(testimonial.id) ? 'bg-gradient-to-r from-blue-50/50 to-blue-100/30' : ''} ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
//                                             style={{ transitionDelay: `${index * 50}ms` }}
//                                         >
//                                             <td className="p-4">
//                                                 <input
//                                                     type="checkbox"
//                                                     checked={selectedTestimonial.includes(testimonial.id)}
//                                                     onChange={() => toggleSelectItem(testimonial.id)}
//                                                     className="rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 hover:scale-110"
//                                                 />
//                                             </td>
//                                             <td className="p-4">
//                                                 <div className="flex items-center gap-3">
//                                                     <div className={`w-12 h-12 rounded-full ${testimonial.avatarColor} flex items-center justify-center text-white font-bold shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl`}>
//                                                         {testimonial.initials}
//                                                     </div>
//                                                     <div>
//                                                         <div className="font-semibold text-gray-900">{testimonial.name}</div>
//                                                         <div className="text-sm text-gray-600">{testimonial.role}</div>
//                                                         {testimonial.verified && (
//                                                             <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
//                                                                 <Check size={12} className="text-blue-600" />
//                                                                 <span className="text-xs font-medium text-blue-700">Verified</span>
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                             <td className="p-4">
//                                                 <div className="flex items-center gap-2">
//                                                     <div className="flex">
//                                                         {[...Array(5)].map((_, i) => (
//                                                             <Star
//                                                                 key={i}
//                                                                 size={18}
//                                                                 className={`transition-all duration-300 hover:scale-125 ${i < Math.floor(testimonial.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
//                                                                 style={{ transitionDelay: `${i * 50}ms` }}
//                                                             />
//                                                         ))}
//                                                     </div>
//                                                     <span className="font-bold text-gray-900 ml-1">({testimonial.rating})</span>
//                                                 </div>
//                                                 <span className={`inline-block mt-2 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transform transition-all duration-300 hover:scale-105
//                                                     ${testimonial.status === "Excellent"
//                                                         ? "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-900 border border-emerald-300"
//                                                         : "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-900 border border-amber-300"
//                                                     }`}
//                                                 >
//                                                     {testimonial.status}
//                                                 </span>
//                                             </td>
//                                             <td className="p-4">
//                                                 <div className="max-w-xs">
//                                                     <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed transition-all duration-300 hover:line-clamp-none hover:bg-gray-50 hover:p-2 hover:rounded-lg">
//                                                         "{testimonial.feedback}"
//                                                     </p>
//                                                 </div>
//                                             </td>
//                                             <td className="p-4">
//                                                 <div className="flex items-center gap-2 text-gray-600 group">
//                                                     <div className="p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 group-hover:from-blue-100 group-hover:to-blue-50 transition-all duration-300">
//                                                         <Calendar size={16} className="transition-all duration-300 group-hover:text-blue-600" />
//                                                     </div>
//                                                     <span className="text-sm font-medium group-hover:text-blue-700 transition-colors duration-300">
//                                                         {testimonial.date}
//                                                     </span>
//                                                 </div>
//                                             </td>
//                                             <td className="p-4">
//                                                 <div className="flex gap-2">
//                                                     <button
//                                                         onClick={() => setShowViewModal(testimonial)}
//                                                         className="p-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 hover:from-blue-100 hover:to-blue-200 hover:text-blue-700 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:shadow border border-blue-200"
//                                                         title="View Details"
//                                                     >
//                                                         <Eye size={18} />
//                                                     </button>
//                                                     <button
//                                                         onClick={() => handleDeleteSingle(testimonial.id)}
//                                                         className="p-2.5 rounded-xl bg-gradient-to-r from-red-50 to-red-100 text-red-600 hover:from-red-100 hover:to-red-200 hover:text-red-700 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:shadow border border-red-200"
//                                                         title="Delete"
//                                                     >
//                                                         <Trash2 size={18} />
//                                                     </button>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6" className="p-8 text-center">
//                                             <div className="text-gray-500">
//                                                 <Search size={48} className="mx-auto mb-4 text-gray-300" />
//                                                 <p className="font-medium">No testimonials found</p>
//                                                 <p className="text-sm mt-1">Try adjusting your search or filters</p>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Footer with Pagination */}
//                     <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50/50 to-white">
//                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                             <div className="text-sm text-gray-600">
//                                 Showing <span className="font-semibold text-gray-900">
//                                     {Math.min((currentPage - 1) * itemsPerPage + 1, filteredAndSortedTestimonials.length)}-
//                                     {Math.min(currentPage * itemsPerPage, filteredAndSortedTestimonials.length)}
//                                 </span> of <span className="font-semibold text-gray-900">{filteredAndSortedTestimonials.length}</span> testimonials
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <button
//                                     onClick={() => handlePageChange(currentPage - 1)}
//                                     disabled={currentPage === 1}
//                                     className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow"
//                                 >
//                                     Previous
//                                 </button>

//                                 {getPageNumbers().map((page, index) => (
//                                     page === '...' ? (
//                                         <span key={index} className="px-2 text-gray-400">...</span>
//                                     ) : (
//                                         <button
//                                             key={index}
//                                             onClick={() => handlePageChange(page)}
//                                             className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow ${currentPage === page
//                                                 ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
//                                                 : 'border border-gray-300 bg-white hover:bg-gray-50'
//                                                 }`}
//                                         >
//                                             {page}
//                                         </button>
//                                     )
//                                 ))}

//                                 <button
//                                     onClick={() => handlePageChange(currentPage + 1)}
//                                     disabled={currentPage === totalPages}
//                                     className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow"
//                                 >
//                                     Next
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

//  import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Search,
//   Plus,
//   Edit2,
//   Trash2,
//   ChevronDown,
//   X,
//   Eye,
//   Download,
//   Building,
//   Store,
//   Layers,
//   Calendar,
//   Folder,
//   Sofa,
//   DollarSign,
//   Clock,
//   Users,
//   TrendingUp,
//   Star,
//   AlertCircle,
//   Image,
//   CheckCircle
// } from 'lucide-react';

// const Interior = () => {
//   const services = {
//     "Interior": [
//       "Retail Interior",
//       "Corporate Interior",
//       "Restaurant Interior",
//       "Shops In Shops",
//     ],
//     "Merchandising": [
//       "Retail Display Merchandising",
//       "Acrylic Display",
//       "Gandolas",
//       "Window Displays",
//     ],
//     "Kiosk": [
//       "Retail Kiosks",
//       "Mobile Booth",
//     ],
//     "Exhibition & Events": [
//       "Exhibition & Events",
//     ],
//     "Office Interior": [
//       "Modular Work Station",
//       "MD Cabin",
//       "Chairs",
//     ],
//     "Furniture": [
//       "Wardrobe",
//       "Kitchen",
//       "LCD Unit",
//       "Dressing Table",
//       "Sofas"
//     ]
//   };

//   const [selectedService, setSelectedService] = useState("Interior");
//   const [selectedSubService, setSelectedSubService] = useState("Residential Interior");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const [projects, setProjects] = useState([
//     {
//       id: "INT-101",
//       title: "Luxury Villa Interior Design",
//       service: "Interior",
//       subService: "Residential Interior",
//       client: "Rajesh Patel",
//       budget: "$85,000",
//       status: "active",
//       priority: "high",
//       timeline: "12 weeks",
//       teamSize: 8,
//       progress: 65,
//       description: "Complete luxury interior design for a 5BHK villa with modern contemporary aesthetics and smart home integration",
//       location: "Mumbai, Maharashtra",
//       startDate: "2024-01-15",
//       endDate: "2024-04-15",
//       images: 24,
//       rating: 4.9
//     },
//     {
//       id: "MER-102",
//       title: "Premium Jewelry Showroom",
//       service: "Merchandising",
//       subService: "Retail Merchandising",
//       client: "Jewel Palace",
//       budget: "$120,000",
//       status: "active",
//       priority: "high",
//       timeline: "16 weeks",
//       teamSize: 12,
//       progress: 45,
//       description: "Luxury jewelry showroom with premium display systems, lighting design, and customer experience zones",
//       location: "Delhi, NCR",
//       startDate: "2024-02-01",
//       endDate: "2024-05-30",
//       images: 35,
//       rating: 4.8
//     },
//     {
//       id: "KIO-103",
//       title: "Interactive Mall Kiosk",
//       service: "Kiosk",
//       subService: "Information Kiosks",
//       client: "Select City Walk",
//       budget: "$28,000",
//       status: "completed",
//       priority: "medium",
//       timeline: "6 weeks",
//       teamSize: 5,
//       progress: 100,
//       description: "Interactive digital kiosk with touchscreen navigation, wayfinding system, and multilingual support",
//       location: "Bangalore, Karnataka",
//       startDate: "2024-01-10",
//       endDate: "2024-02-20",
//       images: 15,
//       rating: 4.7
//     },
//     {
//       id: "EXH-104",
//       title: "Auto Expo Exhibition Booth",
//       service: "Exhibition & Events",
//       subService: "Exhibition Stands",
//       client: "Tata Motors",
//       budget: "$250,000",
//       status: "pending",
//       priority: "high",
//       timeline: "8 weeks",
//       teamSize: 15,
//       progress: 20,
//       description: "Large-scale exhibition booth with immersive displays, product showcases, and interactive zones for auto expo",
//       location: "Noida, UP",
//       startDate: "2024-03-01",
//       endDate: "2024-04-25",
//       images: 42,
//       rating: 4.9
//     },
//     {
//       id: "OFF-105",
//       title: "Tech Startup Office Space",
//       service: "Office Interior",
//       subService: "Open Office Layout",
//       client: "Zomato",
//       budget: "$180,000",
//       status: "active",
//       priority: "high",
//       timeline: "20 weeks",
//       teamSize: 18,
//       progress: 75,
//       description: "Modern tech office with collaborative spaces, breakout zones, gaming area, and ergonomic workstations",
//       location: "Gurgaon, Haryana",
//       startDate: "2024-01-05",
//       endDate: "2024-05-25",
//       images: 48,
//       rating: 4.8
//     },
//     {
//       id: "FUR-106",
//       title: "Executive Office Furniture Suite",
//       service: "Furniture",
//       subService: "Office Furniture",
//       client: "Reliance Industries",
//       budget: "$95,000",
//       status: "completed",
//       priority: "medium",
//       timeline: "10 weeks",
//       teamSize: 6,
//       progress: 100,
//       description: "Premium custom-designed executive furniture including desks, seating, conference tables, and storage solutions",
//       location: "Mumbai, Maharashtra",
//       startDate: "2024-01-20",
//       endDate: "2024-03-30",
//       images: 28,
//       rating: 4.9
//     }
//   ]);

//   const [newProject, setNewProject] = useState({
//     title: "",
//     service: "Interior",
//     subService: "Residential Interior",
//     client: "",
//     budget: "",
//     status: "pending",
//     priority: "medium",
//     timeline: "",
//     teamSize: "",
//     description: "",
//     location: ""
//   });

//   const filteredProjects = useMemo(() => {
//     return projects.filter((project) => {
//       const matchesService = selectedService === "all" || project.service === selectedService;
//       const matchesSubService = selectedSubService === "all" || project.subService === selectedSubService;
//       const matchesSearch = 
//         project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         project.location.toLowerCase().includes(searchQuery.toLowerCase());
      
//       return matchesService && matchesSubService && matchesSearch;
//     });
//   }, [projects, selectedService, selectedSubService, searchQuery]);

//   const handleServiceSelect = (service) => {
//     setSelectedService(service);
//     if (service !== "all") {
//       setSelectedSubService(services[service][0]);
//     } else {
//       setSelectedSubService("all");
//     }
//   };

//   const getServiceIcon = (service) => {
//     const icons = {
//       'Interior': <Building size={20} />,
//       'Merchandising': <Store size={20} />,
//       'Kiosk': <Layers size={20} />,
//       'Exhibition & Events': <Calendar size={20} />,
//       'Office Interior': <Folder size={20} />,
//       'Furniture': <Sofa size={20} />
//     };
//     return icons[service] || <Folder size={20} />;
//   };

//   const getServiceGradient = (service) => {
//     const gradients = {
//       'Interior': 'from-purple-500 to-pink-500',
//       'Merchandising': 'from-blue-500 to-cyan-500',
//       'Kiosk': 'from-emerald-500 to-teal-500',
//       'Exhibition & Events': 'from-orange-500 to-red-500',
//       'Office Interior': 'from-indigo-500 to-purple-500',
//       'Furniture': 'from-amber-500 to-orange-500'
//     };
//     return gradients[service] || 'from-gray-500 to-gray-600';
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       'completed': 'bg-emerald-100 text-emerald-700 border-emerald-300',
//       'active': 'bg-blue-100 text-blue-700 border-blue-300',
//       'pending': 'bg-amber-100 text-amber-700 border-amber-300',
//       'on-hold': 'bg-red-100 text-red-700 border-red-300'
//     };
//     return colors[status] || 'bg-gray-100 text-gray-700 border-gray-300';
//   };

//   const getPriorityColor = (priority) => {
//     const colors = {
//       'high': 'bg-rose-100 text-rose-700 border-rose-300',
//       'medium': 'bg-orange-100 text-orange-700 border-orange-300',
//       'low': 'bg-sky-100 text-sky-700 border-sky-300'
//     };
//     return colors[priority] || 'bg-gray-100 text-gray-700 border-gray-300';
//   };

//   const getProgressColor = (progress) => {
//     if (progress >= 80) return 'from-emerald-500 to-emerald-600';
//     if (progress >= 50) return 'from-blue-500 to-blue-600';
//     if (progress >= 30) return 'from-amber-500 to-amber-600';
//     return 'from-red-500 to-red-600';
//   };

//   const handleAddProject = () => {
//     if (!newProject.title || !newProject.client) {
//       alert("Please fill in required fields");
//       return;
//     }

//     const projectId = `${newProject.service.substring(0, 3).toUpperCase()}-${projects.length + 101}`;
//     const projectToAdd = {
//       id: projectId,
//       ...newProject,
//       progress: newProject.status === 'completed' ? 100 : 0,
//       images: 0,
//       rating: 4.5,
//       startDate: new Date().toISOString().split('T')[0],
//       endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
//       teamSize: parseInt(newProject.teamSize) || 1
//     };

//     setProjects(prev => [projectToAdd, ...prev]);
//     setNewProject({
//       title: "",
//       service: "Interior",
//       subService: "Residential Interior",
//       client: "",
//       budget: "",
//       status: "pending",
//       priority: "medium",
//       timeline: "",
//       teamSize: "",
//       description: "",
//       location: ""
//     });
//     setShowAddModal(false);
//   };

//   const handleEditProject = () => {
//     if (!selectedItem?.title || !selectedItem?.client) {
//       alert("Please fill in required fields");
//       return;
//     }

//     setProjects(prev => 
//       prev.map(p => p.id === selectedItem.id ? selectedItem : p)
//     );
//     setShowEditModal(false);
//     setSelectedItem(null);
//   };

//   const confirmDelete = () => {
//     setProjects(prev => prev.filter(p => p.id !== selectedItem.id));
//     setShowDeleteModal(false);
//     setSelectedItem(null);
//   };

//   const handleExport = () => {
//     const data = JSON.stringify(projects, null, 2);
//     const blob = new Blob([data], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'interior_projects.json';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const stats = [
//     {
//       title: "TOTAL PROJECTS",
//       value: projects.length,
//       change: "+12% from last month",
//       icon: <Folder size={24} />,
//       gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
//       bgGradient: "from-violet-50 to-fuchsia-50"
//     },
//     {
//       title: "ACTIVE PROJECTS",
//       value: projects.filter(p => p.status === 'active').length,
//       change: "Currently in progress",
//       icon: <TrendingUp size={24} />,
//       gradient: "from-emerald-500 via-green-500 to-teal-500",
//       bgGradient: "from-emerald-50 to-teal-50"
//     },
//     {
//       title: "TOTAL BUDGET",
//       value: "$" + projects.reduce((acc, p) => {
//         const budget = parseFloat(p.budget.replace(/[^0-9.-]+/g,""));
//         return acc + (isNaN(budget) ? 0 : budget);
//       }, 0).toLocaleString(),
//       change: "Across all projects",
//       icon: <DollarSign size={24} />,
//       gradient: "from-blue-500 via-cyan-500 to-sky-500",
//       bgGradient: "from-blue-50 to-sky-50"
//     },
//     {
//       title: "CLIENTS",
//       value: new Set(projects.map(p => p.client)).size,
//       change: "Unique clients served",
//       icon: <Users size={24} />,
//       gradient: "from-orange-500 via-amber-500 to-yellow-500",
//       bgGradient: "from-orange-50 to-yellow-50"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      
//       {/* Modals */}
//       {showDeleteModal && selectedItem && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
//           <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform animate-scaleIn">
//             <div className="p-6 sm:p-8">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
//                   <AlertCircle className="text-white" size={28} />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-xl text-gray-900">Delete Project</h3>
//                   <p className="text-gray-600 text-sm">This action cannot be undone</p>
//                 </div>
//               </div>
//               <p className="text-gray-700 mb-6">
//                 Are you sure you want to delete <span className="font-semibold text-gray-900">{selectedItem.title}</span>?
//               </p>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={confirmDelete}
//                   className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showViewModal && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn overflow-y-auto">
//           <div className="bg-white shadow-2xl max-w-3xl w-full my-8 transform animate-scaleIn">
//             <div className="p-6 sm:p-8">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                   Project Details
//                 </h3>
//                 <button
//                   onClick={() => setShowViewModal(null)}
//                   className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-300"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               <div className="flex items-start gap-4 mb-6">
//                 <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getServiceGradient(showViewModal.service)} flex items-center justify-center text-white shadow-xl`}>
//                   <div className="text-2xl">{getServiceIcon(showViewModal.service)}</div>
//                 </div>
//                 <div className="flex-1">
//                   <h4 className="text-xl font-bold text-gray-900 mb-1">{showViewModal.title}</h4>
//                   <p className="text-gray-600 mb-2">{showViewModal.id}</p>
//                   <div className="flex flex-wrap gap-2">
//                     <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold border-2 ${getStatusColor(showViewModal.status)}`}>
//                       {showViewModal.status.toUpperCase()}
//                     </span>
//                     <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold border-2 ${getPriorityColor(showViewModal.priority)}`}>
//                       {showViewModal.priority.toUpperCase()} PRIORITY
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid sm:grid-cols-2 gap-6 mb-6">
//                 <div className="space-y-4">
//                   <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
//                     <h5 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Project Info</h5>
//                     <div className="space-y-3">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
//                           <Users size={16} className="text-blue-600" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-600">Client</p>
//                           <p className="font-semibold text-gray-900">{showViewModal.client}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
//                           <DollarSign size={16} className="text-emerald-600" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-600">Budget</p>
//                           <p className="font-semibold text-emerald-600">{showViewModal.budget}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
//                           <Clock size={16} className="text-amber-600" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-600">Timeline</p>
//                           <p className="font-semibold text-gray-900">{showViewModal.timeline}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
//                     <h5 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Progress</h5>
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <span className="text-2xl font-bold text-gray-900">{showViewModal.progress}%</span>
//                         <span className="text-sm text-gray-600">{showViewModal.teamSize} members</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//                         <div 
//                           className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(showViewModal.progress)} transition-all duration-500 shadow-sm`}
//                           style={{ width: `${showViewModal.progress}%` }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
//                     <h5 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Details</h5>
//                     <div className="space-y-3">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
//                           <Building size={16} className="text-teal-600" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-600">Location</p>
//                           <p className="font-semibold text-gray-900">{showViewModal.location}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
//                           <Image size={16} className="text-violet-600" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-600">Images</p>
//                           <p className="font-semibold text-gray-900">{showViewModal.images}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
//                           <Star size={16} className="text-amber-600" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-600">Rating</p>
//                           <p className="font-semibold text-gray-900">{showViewModal.rating}/5.0</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100">
//                     <h5 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Description</h5>
//                     <p className="text-sm text-gray-700 leading-relaxed">
//                       {showViewModal.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-3 pt-6 border-t-2 border-gray-100">
//                 <button
//                   onClick={() => {
//                     setSelectedItem({...showViewModal});
//                     setShowViewModal(null);
//                     setShowEditModal(true);
//                   }}
//                   className="flex-1 px-4 py-3 rounded-xl border-2 border-blue-300 text-blue-700 font-medium hover:bg-blue-50 transition-all duration-300"
//                 >
//                   Edit Project
//                 </button>
//                 <button
//                   onClick={() => {
//                     setSelectedItem(showViewModal);
//                     setShowViewModal(null);
//                     setShowDeleteModal(true);
//                   }}
//                   className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl"
//                 >
//                   Delete Project
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {(showEditModal || showAddModal) && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn overflow-y-auto">
//           <div className="bg-white shadow-2xl max-w-2xl w-full my-2 transform animate-scaleIn">
//             <div className="p-4 sm:p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                   {showEditModal ? 'Edit Project' : 'Add New Project'}
//                 </h3>
//                 <button
//                   onClick={() => {
//                     setShowEditModal(false);
//                     setShowAddModal(false);
//                     setSelectedItem(null);
//                   }}
//                   className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-300"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               <div className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-bold text-gray-900 mb-2">
//                     Project Title *
//                   </label>
//                   <input
//                     type="text"
//                     value={showEditModal ? selectedItem?.title : newProject.title}
//                     onChange={(e) => {
//                       if (showEditModal) {
//                         setSelectedItem(prev => ({ ...prev, title: e.target.value }));
//                       } else {
//                         setNewProject(prev => ({ ...prev, title: e.target.value }));
//                       }
//                     }}
//                     className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
//                     placeholder="Enter project title"
//                   />
//                 </div>

//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-bold text-gray-900 mb-2">
//                       Service *
//                     </label>
//                     <div className="relative">
//                       <select
//                         value={showEditModal ? selectedItem?.service : newProject.service}
//                         onChange={(e) => {
//                           const newService = e.target.value;
//                           if (showEditModal) {
//                             setSelectedItem(prev => ({ 
//                               ...prev, 
//                               service: newService,
//                               subService: services[newService][0]
//                             }));
//                           } else {
//                             setNewProject(prev => ({ 
//                               ...prev, 
//                               service: newService,
//                               subService: services[newService][0]
//                             }));
//                           }
//                         }}
//                         className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none bg-white"
//                       >
//                         {Object.keys(services).map(service => (
//                           <option key={service} value={service}>{service}</option>
//                         ))}
//                       </select>
//                       <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-bold text-gray-900 mb-2">
//                       Sub-Service *
//                     </label>
//                     <div className="relative">
//                       <select
//                         value={showEditModal ? selectedItem?.subService : newProject.subService}
//                         onChange={(e) => {
//                           if (showEditModal) {
//                             setSelectedItem(prev => ({ ...prev, subService: e.target.value }));
//                           } else {
//                             setNewProject(prev => ({ ...prev, subService: e.target.value }));
//                           }
//                         }}
//                         className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none bg-white"
//                       >
//                         {services[showEditModal ? selectedItem?.service : newProject.service]?.map(subService => (
//                           <option key={subService} value={subService}>{subService}</option>
//                         ))}
//                       </select>
//                       <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-bold text-gray-900 mb-2">
//                     Client Name *
//                   </label>
//                   <input
//                     type="text"
//                     value={showEditModal ? selectedItem?.client : newProject.client}
//                     onChange={(e) => {
//                       if (showEditModal) {
//                         setSelectedItem(prev => ({ ...prev, client: e.target.value }));
//                       } else {
//                         setNewProject(prev => ({ ...prev, client: e.target.value }));
//                       }
//                     }}
//                     className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
//                     placeholder="Enter client name"
//                   />
//                 </div>

//                 {/* <div className="grid sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-bold text-gray-900 mb-2">
//                       Budget
//                     </label>
//                     <input
//                       type="text"
//                       value={showEditModal ? selectedItem?.budget : newProject.budget}
//                       onChange={(e) => {
//                         if (showEditModal) {
//                           setSelectedItem(prev => ({ ...prev, budget: e.target.value }));
//                         } else {
//                           setNewProject(prev => ({ ...prev, budget: e.target.value }));
//                         }
//                       }}
//                       className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
//                       placeholder="$0"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-bold text-gray-900 mb-2">
//                       Timeline
//                     </label>
//                     <input
//                       type="text"
//                       value={showEditModal ? selectedItem?.timeline : newProject.timeline}
//                       onChange={(e) => {
//                         if (showEditModal) {
//                           setSelectedItem(prev => ({ ...prev, timeline: e.target.value }));
//                         } else {
//                           setNewProject(prev => ({ ...prev, timeline: e.target.value }));
//                         }
//                       }}
//                       className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
//                       placeholder="e.g., 8 weeks"
//                     />
//                   </div>
//                 </div> */}

//                 {/* <div className="grid sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-bold text-gray-900 mb-2">
//                       Status
//                     </label>
//                     <div className="relative">
//                       <select
//                         value={showEditModal ? selectedItem?.status : newProject.status}
//                         onChange={(e) => {
//                           if (showEditModal) {
//                             setSelectedItem(prev => ({ ...prev, status: e.target.value }));
//                           } else {
//                             setNewProject(prev => ({ ...prev, status: e.target.value }));
//                           }
//                         }}
//                         className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none bg-white"
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="active">Active</option>
//                         <option value="completed">Completed</option>
//                         <option value="on-hold">On Hold</option>
//                       </select>
//                       <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-bold text-gray-900 mb-2">
//                       Priority
//                     </label>
//                     <div className="relative">
//                       <select
//                         value={showEditModal ? selectedItem?.priority : newProject.priority}
//                         onChange={(e) => {
//                           if (showEditModal) {
//                             setSelectedItem(prev => ({ ...prev, priority: e.target.value }));
//                           } else {
//                             setNewProject(prev => ({ ...prev, priority: e.target.value }));
//                           }
//                         }}
//                         className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none bg-white"
//                       >
//                         <option value="low">Low</option>
//                         <option value="medium">Medium</option>
//                         <option value="high">High</option>
//                       </select>
//                       <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
//                     </div>
//                   </div>
//                 </div> */}

//                 <div>
//                   <label className="block text-sm font-bold text-gray-900 mb-2">
//                     Location
//                   </label>
//                   <input
//                     type="text"
//                     value={showEditModal ? selectedItem?.location : newProject.location}
//                     onChange={(e) => {
//                       if (showEditModal) {
//                         setSelectedItem(prev => ({ ...prev, location: e.target.value }));
//                       } else {
//                         setNewProject(prev => ({ ...prev, location: e.target.value }));
//                       }
//                     }}
//                     className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
//                     placeholder="City, State"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-bold text-gray-900 mb-2">
//                     Description
//                   </label>
//                   <textarea
//                     value={showEditModal ? selectedItem?.description : newProject.description}
//                     onChange={(e) => {
//                       if (showEditModal) {
//                         setSelectedItem(prev => ({ ...prev, description: e.target.value }));
//                       } else {
//                         setNewProject(prev => ({ ...prev, description: e.target.value }));
//                       }
//                     }}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all min-h-[120px] resize-none"
//                     placeholder="Describe the project..."
//                   />
//                 </div>
//               </div>

//               <div className="flex gap-3 pt-6 border-t-2 border-gray-100 mt-6">
//                 <button
//                   onClick={() => {
//                     setShowEditModal(false);
//                     setShowAddModal(false);
//                     setSelectedItem(null);
//                   }}
//                   className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={showEditModal ? handleEditProject : handleAddProject}
//                   className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
//                 >
//                   {showEditModal ? 'Update' : 'Add'} Project
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Container */}
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white/80 backdrop-blur-xl shadow-md border border-white/50 overflow-hidden">
          
//           {/* Header */}
//           <div className="p-6 sm:p-8 border-b border-gray-200/50 bg-gradient-to-r from-white via-blue-50/30 to-indigo-50/30">
//             <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
//               <div>
//                 <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
//                   Interior Services Management
//                 </h1>
//                 <p className="text-gray-600 text-lg">Manage your interior design projects with style</p>
//               </div>
//               <div className="flex flex-wrap gap-3">
//                 <button
//                   onClick={handleExport}
//                   className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-indigo-300 bg-white text-indigo-700 font-medium hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
//                 >
//                   <Download size={20} />
//                   <span>Export</span>
//                 </button>
//                 <button
//                   onClick={() => setShowAddModal(true)}
//                   className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
//                 >
//                   <Plus size={20} />
//                   <span>Add Project</span>
//                 </button>
//               </div>
//             </div>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//               {stats.map((stat, index) => (
//                 <div
//                   key={index}
//                   className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} rounded-2xl shadow-lg p-5 border-2 border-white/50 transform transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group`}
//                   style={{ animationDelay: `${index * 100}ms` }}
//                 >
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
//                   <div className="relative">
//                     <div className="flex justify-between items-start mb-3">
//                       <div className={`text-xs font-bold text-gray-700 uppercase tracking-wider`}>
//                         {stat.title}
//                       </div>
//                       <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
//                         {stat.icon}
//                       </div>
//                     </div>
//                     <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
//                     <div className="text-xs text-gray-600 font-medium">{stat.change}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Filters */}
//           <div className="p-6 sm:p-8 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 via-white to-gray-50/50">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div className="relative group">
//                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-500 z-10">
//                   <Folder size={20} />
//                 </div>
//                 <select
//                   value={selectedService}
//                   onChange={(e) => handleServiceSelect(e.target.value)}
//                   className="w-full pl-12 pr-10 py-3.5 rounded-xl border-2 border-gray-300 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 shadow-md group-hover:shadow-lg appearance-none cursor-pointer font-medium"
//                 >
//                   <option value="all">All Services</option>
//                   {Object.keys(services).map(service => (
//                     <option key={service} value={service}>{service}</option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
//               </div>

//               <div className="relative group">
//                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 z-10">
//                   <Layers size={20} />
//                 </div>
//                 <select
//                   value={selectedSubService}
//                   onChange={(e) => setSelectedSubService(e.target.value)}
//                   disabled={selectedService === "all"}
//                   className="w-full pl-12 pr-10 py-3.5 rounded-xl border-2 border-gray-300 bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 shadow-md group-hover:shadow-lg appearance-none cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <option value="all">All Sub-Services</option>
//                   {services[selectedService]?.map(subService => (
//                     <option key={subService} value={subService}>{subService}</option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
//               </div>

//               <div className="relative group">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 transition-all duration-300 z-10" size={20} />
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search projects..."
//                   className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-300 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 shadow-md group-hover:shadow-lg font-medium"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-3 mt-5">
//               <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-bold border-2 border-blue-200">
//                 {selectedService === "all" ? "All Services" : `${selectedService} → ${selectedSubService === "all" ? "All" : selectedSubService}`}
//               </div>
//               <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-sm font-bold border-2 border-emerald-200">
//                 {filteredProjects.length} Projects Found
//               </div>
//             </div>
//           </div>

//           {/* Projects Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[1000px]">
//               <thead className="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 border-b-2 border-gray-200">
//                 <tr>
//                   <th className="p-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Project</th>
//                   <th className="p-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Service</th>
//                   <th className="p-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Client</th>
//                   <th className="p-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Progress</th>
//                   <th className="p-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Actions</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">
//                 {filteredProjects.length > 0 ? (
//                   filteredProjects.map((project, index) => (
//                     <tr 
//                       key={project.id} 
//                       className="transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 group"
//                       style={{ animationDelay: `${index * 50}ms` }}
//                     >
//                       <td className="p-5">
//                         <div className="flex items-center gap-4">
//                           <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getServiceGradient(project.service)} flex items-center justify-center text-white shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
//                             {getServiceIcon(project.service)}
//                           </div>
//                           <div>
//                             <div className="font-bold text-gray-900 mb-1">{project.title}</div>
//                             <div className="text-xs text-gray-600 font-medium">{project.id}</div>
//                             <div className="flex gap-2 mt-2">
//                               <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 ${getStatusColor(project.status)}`}>
//                                 {project.status.toUpperCase()}
//                               </span>
//                               <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 ${getPriorityColor(project.priority)}`}>
//                                 {project.priority.toUpperCase()}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="p-5">
//                         <div>
//                           <div className="font-bold text-gray-900 mb-1">{project.service}</div>
//                           <div className="text-sm text-gray-600">{project.subService}</div>
//                           <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                             <Clock size={12} />
//                             {project.timeline}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="p-5">
//                         <div>
//                           <div className="font-bold text-gray-900 mb-1">{project.client}</div>
//                           <div className="text-sm font-bold text-emerald-600">{project.budget}</div>
//                           <div className="text-xs text-gray-500">{project.location}</div>
//                         </div>
//                       </td>
//                       <td className="p-5">
//                         <div className="space-y-2">
//                           <div className="flex items-center justify-between">
//                             <span className="text-sm font-bold text-gray-900">{project.progress}%</span>
//                             <span className="text-xs text-gray-600">{project.teamSize} team</span>
//                           </div>
//                           <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
//                             <div 
//                               className={`h-2.5 rounded-full bg-gradient-to-r ${getProgressColor(project.progress)} transition-all duration-500 shadow-sm`}
//                               style={{ width: `${project.progress}%` }}
//                             />
//                           </div>
//                         </div>
//                       </td>
//                       <td className="p-5">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => setShowViewModal(project)}
//                             className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
//                             title="View"
//                           >
//                             <Eye size={18} />
//                           </button>
//                           <button
//                             onClick={() => {
//                               setSelectedItem({...project});
//                               setShowEditModal(true);
//                             }}
//                             className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
//                             title="Edit"
//                           >
//                             <Edit2 size={18} />
//                           </button>
//                           <button
//                             onClick={() => {
//                               setSelectedItem(project);
//                               setShowDeleteModal(true);
//                             }}
//                             className="p-2.5 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
//                             title="Delete"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="p-12 text-center">
//                       <div className="text-gray-500">
//                         <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-4">
//                           <Search size={40} className="text-gray-400" />
//                         </div>
//                         <p className="font-bold text-xl mb-2">No Projects Found</p>
//                         <p className="text-sm mb-6">Try adjusting your filters or add a new project</p>
//                         <button
//                           onClick={() => setShowAddModal(true)}
//                           className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
//                         >
//                           Add New Project
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Footer */}
//           <div className="px-6 sm:px-8 py-5 border-t-2 border-gray-100 bg-gradient-to-r from-gray-50/50 via-white to-gray-50/50">
//             <div className="flex items-center justify-between">
//               <div className="text-sm font-medium text-gray-600">
//                 Showing <span className="font-bold text-gray-900">{filteredProjects.length}</span> of <span className="font-bold text-gray-900">{projects.length}</span> projects
//               </div>
//               <div className="text-xs text-gray-500">
//                 © 2026 Interior Services
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes scaleIn {
//           from { opacity: 0; transform: scale(0.9); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//         .animate-scaleIn {
//           animation: scaleIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Interior;


// import React, { useState, useEffect } from 'react';

// const Career = () => {
//     // Initial job data
//     const initialJobs = [
//         {
//             id: 1,
//             title: "Senior Sales Executive",
//             company: "SalesForce Inc.",
//             category: "sales",
//             type: "full-time",
//             location: "Chicago, IL",
//             salary: "$85,000 - $120,000",
//             description: "We are looking for an experienced Senior Sales Executive to join our team. You will be responsible for driving sales and building relationships with key clients.",
//             requirements: "Bachelor's degree, 5+ years sales experience, Excellent communication skills",
//             experience: "5+ years",
//             deadline: "2023-12-15",
//             posted: "2023-10-10",
//             status: "active"
//         },
//         {
//             id: 2,
//             title: "Full Stack Developer",
//             company: "TechSolutions LLC",
//             category: "software",
//             type: "remote",
//             location: "Remote",
//             salary: "$95,000 - $130,000",
//             description: "Join our engineering team as a Full Stack Developer. You'll be working on cutting-edge web applications using React and Node.js.",
//             requirements: "JavaScript, React, Node.js, MongoDB, 3+ years experience",
//             experience: "3+ years",
//             deadline: "2023-11-30",
//             posted: "2023-10-05",
//             status: "active"
//         },
//         {
//             id: 3,
//             title: "HR Manager",
//             company: "GlobalCorp",
//             category: "hr",
//             type: "full-time",
//             location: "New York, NY",
//             salary: "$75,000 - $100,000",
//             description: "We are seeking an experienced HR Manager to oversee all aspects of human resources practices and processes.",
//             requirements: "Bachelor's in HR, 5+ years HR experience, Knowledge of labor laws",
//             experience: "5+ years",
//             deadline: "2023-12-01",
//             posted: "2023-10-01",
//             status: "active"
//         },
//         {
//             id: 4,
//             title: "Digital Marketing Specialist",
//             company: "MarketingPro",
//             category: "digital",
//             type: "hybrid",
//             location: "Los Angeles, CA",
//             salary: "$65,000 - $85,000",
//             description: "Looking for a creative Digital Marketing Specialist to develop and implement effective marketing strategies.",
//             requirements: "SEO/SEM, Social Media Marketing, Google Analytics, 2+ years experience",
//             experience: "2+ years",
//             deadline: "2023-11-20",
//             posted: "2023-10-08",
//             status: "active"
//         },
//         {
//             id: 5,
//             title: "Sales Development Representative",
//             company: "CloudTech",
//             category: "sales",
//             type: "full-time",
//             location: "Austin, TX",
//             salary: "$55,000 - $70,000",
//             description: "Join our sales team as an SDR to generate leads and set up meetings for our account executives.",
//             requirements: "Excellent communication skills, Self-motivated, Tech-savvy",
//             experience: "1+ years",
//             deadline: "2023-11-15",
//             posted: "2023-10-03",
//             status: "active"
//         },
//     ];

//     // State management
//     const [jobs, setJobs] = useState(initialJobs);
//     const [filteredJobs, setFilteredJobs] = useState(initialJobs);
//     const [expandedJobId, setExpandedJobId] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedCategory, setSelectedCategory] = useState("all");
//     const [showModal, setShowModal] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [editingJob, setEditingJob] = useState(null);
//     const [jobToDelete, setJobToDelete] = useState(null);

//     // Form state
//     const [formData, setFormData] = useState({
//         title: "",
//         company: "",
//         category: "sales",
//         type: "full-time",
//         location: "",
//         salary: "",
//         description: "",
//         requirements: "",
//         experience: "",
//         deadline: ""
//     });

//     // Statistics
//     const [stats, setStats] = useState({
//         totalJobs: 0,
//         activeJobs: 0,
//         salesJobs: 0,
//         softwareJobs: 0,
//         hrJobs: 0,
//         digitalJobs: 0
//     });

//     // Update statistics
//     useEffect(() => {
//         const totalJobs = jobs.length;
//         const activeJobs = jobs.filter(job => job.status === "active").length;
//         const salesJobs = jobs.filter(job => job.category === "sales").length;
//         const softwareJobs = jobs.filter(job => job.category === "software").length;
//         const hrJobs = jobs.filter(job => job.category === "hr").length;
//         const digitalJobs = jobs.filter(job => job.category === "digital").length;

//         setStats({
//             totalJobs,
//             activeJobs,
//             salesJobs,
//             softwareJobs,
//             hrJobs,
//             digitalJobs
//         });
//     }, [jobs]);

//     // Filter jobs based on search term and category
//     useEffect(() => {
//         let filtered = jobs;

//         // Filter by search term
//         if (searchTerm) {
//             filtered = filtered.filter(job =>
//                 job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 job.description.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Filter by category
//         if (selectedCategory !== "all") {
//             filtered = filtered.filter(job => job.category === selectedCategory);
//         }

//         setFilteredJobs(filtered);
//     }, [jobs, searchTerm, selectedCategory]);

//     // Handle category selection
//     const handleCategorySelect = (category) => {
//         setSelectedCategory(category);
//         setExpandedJobId(null); // Collapse any expanded job when changing category
//     };

//     // Handle job card click to expand/collapse
//     const handleJobCardClick = (id) => {
//         if (expandedJobId === id) {
//             setExpandedJobId(null);
//         } else {
//             setExpandedJobId(id);
//         }
//     };

//     // Handle form input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     // Open modal for adding new job
//     const openAddJobModal = () => {
//         setEditingJob(null);
//         setFormData({
//             title: "",
//             company: "",
//             category: "sales",
//             type: "full-time",
//             location: "",
//             salary: "",
//             description: "",
//             requirements: "",
//             experience: "",
//             deadline: ""
//         });
//         setShowModal(true);
//     };

//     // Open modal for editing job
//     const openEditJobModal = (job) => {
//         setEditingJob(job);
//         setFormData({
//             title: job.title,
//             company: job.company,
//             category: job.category,
//             type: job.type,
//             location: job.location,
//             salary: job.salary,
//             description: job.description,
//             requirements: job.requirements,
//             experience: job.experience,
//             deadline: job.deadline
//         });
//         setShowModal(true);
//     };

//     // Handle form submission (add/edit job)
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (editingJob) {
//             // Update existing job
//             const updatedJobs = jobs.map(job =>
//                 job.id === editingJob.id
//                     ? { ...job, ...formData }
//                     : job
//             );
//             setJobs(updatedJobs);
//         } else {
//             // Add new job
//             const newJob = {
//                 id: jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1,
//                 ...formData,
//                 posted: new Date().toISOString().split('T')[0],
//                 status: "active"
//             };
//             setJobs([newJob, ...jobs]);
//         }

//         setShowModal(false);
//         setFormData({
//             title: "",
//             company: "",
//             category: "sales",
//             type: "full-time",
//             location: "",
//             salary: "",
//             description: "",
//             requirements: "",
//             experience: "",
//             deadline: ""
//         });
//     };

//     // Open delete confirmation modal
//     const openDeleteModal = (jobId) => {
//         setJobToDelete(jobId);
//         setShowDeleteModal(true);
//     };

//     // Handle job deletion
//     const handleDeleteJob = () => {
//         if (jobToDelete) {
//             const updatedJobs = jobs.filter(job => job.id !== jobToDelete);
//             setJobs(updatedJobs);
//             if (expandedJobId === jobToDelete) {
//                 setExpandedJobId(null);
//             }
//             setShowDeleteModal(false);
//             setJobToDelete(null);
//         }
//     };

//     // Format date for display
//     const formatDate = (dateString) => {
//         if (!dateString) return "Not specified";
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     // Get category name with proper formatting
//     const getCategoryName = (category) => {
//         switch (category) {
//             case 'sales': return 'Sales';
//             case 'software': return 'Software';
//             case 'hr': return 'HR';
//             case 'digital': return 'Digital Marketing';
//             default: return category;
//         }
//     };

//     // Get category color classes
//     const getCategoryColor = (category) => {
//         switch (category) {
//             case 'sales': return 'bg-red-100 text-red-800 border-red-200';
//             case 'software': return 'bg-blue-100 text-blue-800 border-blue-200';
//             case 'hr': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//             case 'digital': return 'bg-purple-100 text-purple-800 border-purple-200';
//             default: return 'bg-gray-100 text-gray-800 border-gray-200';
//         }
//     };

//     // Get job type color
//     const getJobTypeColor = (type) => {
//         switch (type) {
//             case 'full-time': return 'bg-green-100 text-green-800';
//             case 'part-time': return 'bg-orange-100 text-orange-800';
//             case 'contract': return 'bg-blue-100 text-blue-800';
//             case 'remote': return 'bg-indigo-100 text-indigo-800';
//             case 'hybrid': return 'bg-teal-100 text-teal-800';
//             default: return 'bg-gray-100 text-gray-800';
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">

//             {/* Main Content */}
//             <main className="container mx-auto">
//                 {/* Controls Section */}
//                 <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
//                     {/* Header */}
//                     <header className="mb-8">
//                         <div className="container mx-auto">
//                             <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//                                 <div className="flex items-center mb-6 md:mb-0">
//                                     <div>
//                                         <h1 className="text-3xl md:text-3xl font-bold text-gray-800">Career Page</h1>
//                                         <p className="text-gray-600 mt-1">Manage job postings across all departments</p>
//                                     </div>
//                                 </div>

//                                 {/* Stats */}
//                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
//                                     <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//                                         <div className="text-2xl font-bold text-gray-800">{stats.totalJobs}</div>
//                                         <div className="text-sm text-gray-500">Total Jobs</div>
//                                     </div>
//                                     <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//                                         <div className="text-2xl font-bold text-green-600">{stats.activeJobs}</div>
//                                         <div className="text-sm text-gray-500">Active Jobs</div>
//                                     </div>
//                                     <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 col-span-2 md:col-span-1">
//                                         <div className="text-2xl font-bold text-blue-600">4</div>
//                                         <div className="text-sm text-gray-500">Categories</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </header>

//                     <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

//                         {/* Search */}
//                         <div className="w-full lg:w-auto lg:flex-1 max-w-2xl">
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//                                     </svg>
//                                 </div>
//                                 <input
//                                     type="text"
//                                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     placeholder="Search jobs by title, company, location..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                             </div>
//                         </div>

//                         {/* Category Filters */}
//                         <div className="flex flex-wrap gap-2">
//                             <button
//                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                                 onClick={() => handleCategorySelect('all')}
//                             >
//                                 All Jobs
//                             </button>
//                             <button
//                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'sales' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                                 onClick={() => handleCategorySelect('sales')}
//                             >
//                                 Sales ({stats.salesJobs})
//                             </button>
//                             <button
//                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'software' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                                 onClick={() => handleCategorySelect('software')}
//                             >
//                                 Software ({stats.softwareJobs})
//                             </button>
//                             <button
//                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'hr' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                                 onClick={() => handleCategorySelect('hr')}
//                             >
//                                 HR ({stats.hrJobs})
//                             </button>
//                             <button
//                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'digital' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                                 onClick={() => handleCategorySelect('digital')}
//                             >
//                                 Digital ({stats.digitalJobs})
//                             </button>
//                         </div>

//                         {/* Add Job Button */}
//                         <button
//                             className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center"
//                             onClick={openAddJobModal}
//                         >
//                             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//                             </svg>
//                             Add Job
//                         </button>
//                     </div>
//                 </div>

//                 {/* Job Cards Grid */}
//                 {filteredJobs.length === 0 ? (
//                     <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
//                         <div className="text-gray-400 mb-4">
//                             <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                             </svg>
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
//                         <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
//                         <button
//                             className="px-5 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors"
//                             onClick={() => {
//                                 setSearchTerm("");
//                                 setSelectedCategory("all");
//                             }}
//                         >
//                             Clear Filters
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//                         {filteredJobs.map(job => (
//                             <div
//                                 key={job.id}
//                                 className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 ${expandedJobId === job.id ? 'lg:col-span-2 xl:col-span-3' : ''}`}
//                             >
//                                 {/* Job Card Header */}
//                                 <div
//                                     className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
//                                     onClick={() => handleJobCardClick(job.id)}
//                                 >
//                                     <div className="flex justify-between items-start mb-4">
//                                         <div className="flex-1">
//                                             <div className="flex items-center mb-2">
//                                                 <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getCategoryColor(job.category)}`}>
//                                                     {getCategoryName(job.category)}
//                                                 </span>
//                                                 <span className={`text-xs font-semibold px-3 py-1 rounded-full ml-2 ${getJobTypeColor(job.type)}`}>
//                                                     {job.type.replace('-', ' ')}
//                                                 </span>
//                                             </div>
//                                             <h3 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h3>
//                                             <p className="text-gray-600 font-medium">{job.company}</p>
//                                         </div>
//                                         <div className="text-right">
//                                             <div className="text-2xl font-bold text-gray-800 mb-1">{job.salary}</div>
//                                             <div className="text-sm text-gray-500">per year</div>
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-wrap gap-4 mt-6">
//                                         <div className="flex items-center text-gray-600">
//                                             <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                                             </svg>
//                                             <span>{job.location}</span>
//                                         </div>
//                                         <div className="flex items-center text-gray-600">
//                                             <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//                                             </svg>
//                                             <span>{job.experience} experience</span>
//                                         </div>
//                                         <div className="flex items-center text-gray-600">
//                                             <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                                             </svg>
//                                             <span>Apply by {formatDate(job.deadline)}</span>
//                                         </div>
//                                     </div>

//                                     <div className="mt-6 flex justify-between items-center">
//                                         <div className="text-sm text-gray-500">
//                                             Posted on {formatDate(job.posted)}
//                                         </div>
//                                         <div className="flex items-center">
//                                             <span className={`h-2 w-2 rounded-full mr-2 ${job.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//                                             <span className="text-sm text-gray-500 capitalize">{job.status}</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Expanded Details */}
//                                 {expandedJobId === job.id && (
//                                     <div className="border-t border-gray-200 p-6 bg-gray-50">
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                                             <div>
//                                                 <h4 className="text-lg font-semibold text-gray-800 mb-4">Job Description</h4>
//                                                 <p className="text-gray-700 mb-6">{job.description}</p>

//                                                 <h4 className="text-lg font-semibold text-gray-800 mb-4">Requirements</h4>
//                                                 <ul className="text-gray-700 list-disc pl-5 space-y-2">
//                                                     {job.requirements.split(',').map((req, idx) => (
//                                                         <li key={idx}>{req.trim()}</li>
//                                                     ))}
//                                                 </ul>
//                                             </div>

//                                             <div>
//                                                 <h4 className="text-lg font-semibold text-gray-800 mb-4">Job Details</h4>
//                                                 <div className="space-y-4">
//                                                     <div className="flex justify-between border-b border-gray-200 pb-2">
//                                                         <span className="text-gray-600">Job Type:</span>
//                                                         <span className="font-medium">{job.type.replace('-', ' ')}</span>
//                                                     </div>
//                                                     <div className="flex justify-between border-b border-gray-200 pb-2">
//                                                         <span className="text-gray-600">Experience:</span>
//                                                         <span className="font-medium">{job.experience}</span>
//                                                     </div>
//                                                     <div className="flex justify-between border-b border-gray-200 pb-2">
//                                                         <span className="text-gray-600">Location:</span>
//                                                         <span className="font-medium">{job.location}</span>
//                                                     </div>
//                                                     <div className="flex justify-between border-b border-gray-200 pb-2">
//                                                         <span className="text-gray-600">Salary:</span>
//                                                         <span className="font-medium">{job.salary}</span>
//                                                     </div>
//                                                     <div className="flex justify-between border-b border-gray-200 pb-2">
//                                                         <span className="text-gray-600">Deadline:</span>
//                                                         <span className="font-medium">{formatDate(job.deadline)}</span>
//                                                     </div>
//                                                     <div className="flex justify-between border-b border-gray-200 pb-2">
//                                                         <span className="text-gray-600">Posted:</span>
//                                                         <span className="font-medium">{formatDate(job.posted)}</span>
//                                                     </div>
//                                                 </div>

//                                                 <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
//                                                     <button
//                                                         className="px-5 py-2 bg-yellow-100 text-yellow-800 font-medium rounded-lg hover:bg-yellow-200 transition-colors flex items-center"
//                                                         onClick={(e) => {
//                                                             e.stopPropagation();
//                                                             openEditJobModal(job);
//                                                         }}
//                                                     >
//                                                         <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
//                                                         </svg>
//                                                         Edit Job
//                                                     </button>
//                                                     <button
//                                                         className="px-5 py-2 bg-red-100 text-red-800 font-medium rounded-lg hover:bg-red-200 transition-colors flex items-center"
//                                                         onClick={(e) => {
//                                                             e.stopPropagation();
//                                                             openDeleteModal(job.id);
//                                                         }}
//                                                     >
//                                                         <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
//                                                         </svg>
//                                                         Delete Job
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </main>

//             {/* Add/Edit Job Modal */}
//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                     <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//                         <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
//                             <h2 className="text-2xl font-bold text-gray-800">
//                                 {editingJob ? 'Edit Job Posting' : 'Add New Job Posting'}
//                             </h2>
//                             <button
//                                 className="text-gray-500 hover:text-gray-700 text-2xl"
//                                 onClick={() => setShowModal(false)}
//                             >
//                                 &times;
//                             </button>
//                         </div>

//                         <form onSubmit={handleSubmit} className="p-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="block text-gray-700 font-medium mb-2">Job Title *</label>
//                                     <input
//                                         type="text"
//                                         name="title"
//                                         value={formData.title}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="Senior Sales Executive"
//                                         required
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 font-medium mb-2">Company *</label>
//                                     <input
//                                         type="text"
//                                         name="company"
//                                         value={formData.company}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="SalesForce Inc."
//                                         required
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 font-medium mb-2">Category *</label>
//                                     <select
//                                         name="category"
//                                         value={formData.category}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         required
//                                     >
//                                         <option value="sales">Sales</option>
//                                         <option value="software">Software</option>
//                                         <option value="hr">HR</option>
//                                         <option value="digital">Digital Marketing</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 font-medium mb-2">Job Type *</label>
//                                     <select
//                                         name="type"
//                                         value={formData.type}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         required
//                                     >
//                                         <option value="full-time">Full-time</option>
//                                         <option value="part-time">Part-time</option>
//                                         <option value="contract">Contract</option>
//                                         <option value="remote">Remote</option>
//                                         <option value="hybrid">Hybrid</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 font-medium mb-2">Location *</label>
//                                     <input
//                                         type="text"
//                                         name="location"
//                                         value={formData.location}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="Chicago, IL"
//                                         required
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 font-medium mb-2">Salary *</label>
//                                     <input
//                                         type="text"
//                                         name="salary"
//                                         value={formData.salary}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="$85,000 - $120,000"
//                                         required
//                                     />
//                                 </div>

//                                 <div className="md:col-span-2">
//                                     <label className="block text-gray-700 font-medium mb-2">Job Description *</label>
//                                     <textarea
//                                         name="description"
//                                         value={formData.description}
//                                         onChange={handleInputChange}
//                                         rows="4"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="Enter job description and requirements..."
//                                         required
//                                     />
//                                 </div>

//                                 <div className="md:col-span-2">
//                                     <label className="block text-gray-700 font-medium mb-2">Requirements *</label>
//                                     <textarea
//                                         name="requirements"
//                                         value={formData.requirements}
//                                         onChange={handleInputChange}
//                                         rows="3"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="List key requirements separated by commas..."
//                                         required
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 font-medium mb-2">Experience Required</label>
//                                     <input
//                                         type="text"
//                                         name="experience"
//                                         value={formData.experience}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="5+ years"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 font-medium mb-2">Application Deadline</label>
//                                     <input
//                                         type="date"
//                                         name="deadline"
//                                         value={formData.deadline}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
//                                 <button
//                                     type="button"
//                                     className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
//                                     onClick={() => setShowModal(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
//                                 >
//                                     {editingJob ? 'Update Job' : 'Save Job'}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Delete Confirmation Modal */}
//             {showDeleteModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                     <div className="bg-white rounded-2xl w-full max-w-md">
//                         <div className="p-6 border-b border-gray-200">
//                             <h3 className="text-xl font-bold text-gray-800">Confirm Delete</h3>
//                         </div>

//                         <div className="p-6">
//                             <p className="text-gray-700 mb-6">
//                                 Are you sure you want to delete this job posting? This action cannot be undone.
//                             </p>

//                             <div className="flex justify-end space-x-4">
//                                 <button
//                                     className="px-5 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
//                                     onClick={() => setShowDeleteModal(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
//                                     onClick={handleDeleteJob}
//                                 >
//                                     Delete Job
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Career;

// import {
//   DollarSign,
//   Users,
//   Activity,
//   Star,
//   Home,
//   Sofa,
//   Paintbrush,
//   Layers,
//   Calendar,
//   ClipboardList,
// } from "lucide-react";

// const stats = [
//   {
//     title: "Total Projects",
//     value: "128",
//     desc: "Completed interiors",
//     icon: Home,
//     bg: "bg-blue-50",
//     iconBg: "bg-blue-500",
//     text: "text-blue-600",
//   },
//   {
//     title: "New Leads",
//     value: "23",
//     desc: "This month",
//     icon: Users,
//     bg: "bg-blue-50",
//     iconBg: "bg-blue-500",
//     text: "text-blue-600",
//   },

//   // PURPLE
//   {
//     title: "Active Clients",
//     value: "42",
//     desc: "Ongoing projects",
//     icon: Users,
//     bg: "bg-purple-50",
//     iconBg: "bg-purple-500",
//     text: "text-purple-600",
//   },
//   {
//     title: "Client Meetings",
//     value: "18",
//     desc: "Scheduled",
//     icon: Calendar,
//     bg: "bg-purple-50",
//     iconBg: "bg-purple-500",
//     text: "text-purple-600",
//   },

//   // GREEN
//   {
//     title: "Design Concepts",
//     value: "86",
//     desc: "Custom layouts",
//     icon: Layers,
//     bg: "bg-green-50",
//     iconBg: "bg-green-500",
//     text: "text-green-600",
//   },
//   {
//     title: "Approved Designs",
//     value: "61",
//     desc: "Client approved",
//     icon: Star,
//     bg: "bg-green-50",
//     iconBg: "bg-green-500",
//     text: "text-green-600",
//   },

//   // YELLOW
//   {
//     title: "Testimonials",
//     value: "64",
//     desc: "Happy customers",
//     icon: Star,
//     bg: "bg-yellow-50",
//     iconBg: "bg-yellow-500",
//     text: "text-yellow-600",
//   },
//   {
//     title: "Ratings",
//     value: "4.8",
//     desc: "Average score",
//     icon: Activity,
//     bg: "bg-yellow-50",
//     iconBg: "bg-yellow-500",
//     text: "text-yellow-600",
//   },

//   // PINK
//   {
//     title: "Furniture Orders",
//     value: "31",
//     desc: "Custom furniture",
//     icon: Sofa,
//     bg: "bg-pink-50",
//     iconBg: "bg-pink-500",
//     text: "text-pink-600",
//   },
//   {
//     title: "Installations",
//     value: "12",
//     desc: "This month",
//     icon: ClipboardList,
//     bg: "bg-pink-50",
//     iconBg: "bg-pink-500",
//     text: "text-pink-600",
//   },

//   // ORANGE
//   {
//     title: "Paint Themes",
//     value: "19",
//     desc: "Color palettes",
//     icon: Paintbrush,
//     bg: "bg-orange-50",
//     iconBg: "bg-orange-500",
//     text: "text-orange-600",
//   },
//   {
//     title: "Material Samples",
//     value: "47",
//     desc: "Available options",
//     icon: Layers,
//     bg: "bg-orange-50",
//     iconBg: "bg-orange-500",
//     text: "text-orange-600",
//   },

//   // INDIGO
//   {
//     title: "Site Visits",
//     value: "14",
//     desc: "This month",
//     icon: Calendar,
//     bg: "bg-indigo-50",
//     iconBg: "bg-indigo-500",
//     text: "text-indigo-600",
//   },
//   {
//     title: "Pending Tasks",
//     value: "9",
//     desc: "Design approvals",
//     icon: ClipboardList,
//     bg: "bg-indigo-50",
//     iconBg: "bg-indigo-500",
//     text: "text-indigo-600",
//   },

//   // RED
//   {
//     title: "Delayed Projects",
//     value: "3",
//     desc: "Need attention",
//     icon: Activity,
//     bg: "bg-red-50",
//     iconBg: "bg-red-500",
//     text: "text-red-600",
//   },
//   {
//     title: "Issues Raised",
//     value: "6",
//     desc: "Client concerns",
//     icon: Activity,
//     bg: "bg-red-50",
//     iconBg: "bg-red-500",
//     text: "text-red-600",
//   },
// ];

// export default function InteriorDashboard() {
//   return (
//     <div className="p-4 space-y-6">
//       {/* HEADER */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-800">
//           Interior Design Dashboard
//         </h1>
//         <p className="text-gray-500 mt-1 text-lg">
//           Overview of projects, clients & design activities
//         </p>
//       </div>

//       {/* STATS GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((item, index) => {
//           const Icon = item.icon;
//           return (
//             <div
//               key={index}
//               className={`rounded-2xl p-5 shadow-sm hover:shadow-lg transition ${item.bg}`}
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h4 className="text-sm font-semibold text-gray-600">
//                     {item.title}
//                   </h4>
//                   <p className={`text-3xl font-bold mt-1 ${item.text}`}>
//                     {item.value}
//                   </p>
//                 </div>

//                 <div
//                   className={`p-3 rounded-xl text-white ${item.iconBg}`}
//                 >
//                   <Icon size={24} />
//                 </div>
//               </div>

//               <p className="text-sm text-gray-500 mt-3">{item.desc}</p>
//             </div>
//           );
//         })}
//       </div>

//       {/* EXTRA SECTION */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* RECENT PROJECTS */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm">
//           <h3 className="font-semibold text-lg text-gray-800 mb-4">
//             Recent Interior Projects
//           </h3>

//           <ul className="space-y-3 text-sm">
//             <li className="flex justify-between">
//               <span>Luxury Villa – Noida</span>
//               <span className="text-green-600 font-medium">Completed</span>
//             </li>
//             <li className="flex justify-between">
//               <span>2BHK Apartment – Gurgaon</span>
//               <span className="text-blue-600 font-medium">In Progress</span>
//             </li>
//             <li className="flex justify-between">
//               <span>Office Workspace – Delhi</span>
//               <span className="text-yellow-600 font-medium">Review</span>
//             </li>
//           </ul>
//         </div>

//         {/* CLIENT FEEDBACK */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm">
//           <h3 className="font-semibold text-lg text-gray-800 mb-4">
//             Client Feedback
//           </h3>

//           <div className="space-y-3 text-sm text-gray-600">
//             <p>
//               ⭐⭐⭐⭐⭐ – “Amazing modern design and perfect execution.”
//             </p>
//             <p>
//               ⭐⭐⭐⭐ – “Great color selection and furniture planning.”
//             </p>
//             <p>
//               ⭐⭐⭐⭐⭐ – “Very professional interior team.”
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
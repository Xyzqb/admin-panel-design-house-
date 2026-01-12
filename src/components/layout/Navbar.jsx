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
//     <nav className="fixed top-0 left-0 right-0 h-18 bg-white border-b border-[#F27336]/30 z-50">
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

//         </div>

//         {/* CENTER – SEARCH */}
//         <div className="hidden md:flex flex-1 max-w-2xl mx-8">
//           <div className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-100">
//             <Search size={20} className="text-gray-400" />
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

import { Search, Bell, Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
  mobileMenuOpen,
  setMobileMenuOpen,
  handleLogout
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-22 bg-[#F8FAFC] border-b border-slate-200 z-50">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">

        {/* LEFT – MOBILE TOGGLE */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          >
            {mobileMenuOpen ? (
              <X size={20} className="text-slate-700" />
            ) : (
              <Menu size={20} className="text-slate-700" />
            )}
          </button>
        </div>

        {/* CENTER – SEARCH */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="flex items-center w-full bg-white border border-slate-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-200">
            <Search size={18} className="text-slate-400" />
            <input
              placeholder="Search anything..."
              className="ml-2 w-full bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400"
            />
          </div>
        </div>

        {/* RIGHT – ICONS */}
        <div className="flex items-center gap-4 relative">

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-slate-100 transition">
            <Bell size={18} className="text-slate-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition"
          >
            <img
              src="/images/avatar.png"
              alt="user"
              className="w-8 h-8 rounded-full border border-slate-300"
            />
          </button>

          {/* PROFILE DROPDOWN */}
          {profileOpen && (
            <div className="absolute right-0 top-14 w-44 bg-white border border-slate-200 shadow-xl rounded-lg overflow-hidden">
              <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                <User size={16} />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

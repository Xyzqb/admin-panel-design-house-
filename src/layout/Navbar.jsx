import { Bell, Menu, X, LogOut, User,Key } from "lucide-react";
import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";

export default function Navbar({
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
            <FaCircleUser size={20}/>
            {/* <img
              src="/images/avatar.png"
              alt="user"
              className="w-8 h-8 rounded-full border border-slate-300"
            /> */}
          </button>

          {/* PROFILE DROPDOWN */}
          {profileOpen && (
            <div className="absolute right-0 top-16 w-44 bg-white border border-slate-200 shadow-xl overflow-hidden">
              <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
               <Key size={16} />
               Change Password
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

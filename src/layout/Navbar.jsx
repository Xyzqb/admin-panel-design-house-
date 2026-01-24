import {
  Bell,
  Menu,
  X,
  LogOut,
  Key,
  BellRing,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaUserAstronaut } from "react-icons/fa";

export default function Navbar({
  mobileMenuOpen,
  setMobileMenuOpen,
  handleLogout,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeTitle, setActiveTitle] = useState(null);
  const navigate = useNavigate();

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

          {/* Help & Support */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveTitle(activeTitle === "help" ? null : "help")
              }
              className="p-2 rounded-lg hover:bg-slate-100 transition"
            >
              <HelpCircle size={18} className="text-slate-600" />
            </button>

            {activeTitle === "help" && (
              <div className="whitespace-nowrap absolute top-10 right-0 bg-black text-white text-xs px-1 py-1 rounded shadow">
                Help & Support
              </div>
            )}
          </div>

          {/* Reminder List */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveTitle(activeTitle === "reminder" ? null : "reminder")
              }
              className="p-2 rounded-lg hover:bg-slate-100 transition"
            >
              <BellRing size={18} className="text-slate-600" />
            </button>

            {activeTitle === "reminder" && (
              <div className="whitespace-nowrap absolute top-10 right-0 bg-black text-white text-xs px-1 py-1 rounded shadow">
                Reminder List
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveTitle(activeTitle === "notify" ? null : "notify")
              }
              className="relative p-2 rounded-lg hover:bg-slate-100 transition"
            >
              <Bell size={18} className="text-slate-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {activeTitle === "notify" && (
              <div className="whitespace-nowrap absolute top-10 right-0 bg-black text-white text-xs px-1 py-1 rounded shadow">
                Notifications
              </div>
            )}
          </div>

          {/* Profile */}
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setActiveTitle(null);
            }}
            className="relative flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-500 flex-shrink-0">
              <img
                src="/images/logoo.jpg"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
          
          {/* PROFILE DROPDOWN */}
          {profileOpen && (
            <div className="whitespace-nowrap absolute right-0 top-16 w-52 bg-white border border-slate-200 shadow-xl rounded-lg overflow-hidden">

              {/* Manage Admin Users */}
              <button
                onClick={() => {
                  navigate("/admin-users");
                  setProfileOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                <FaUserAstronaut size={16} />
                Manage Admin Users
              </button>

              {/* Change Password */}
              <button
                onClick={() => {
                  navigate("/change-password");
                  setProfileOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                <Key size={16} />
                Change Password
              </button>

              <div className="border-t border-slate-200" />

              {/* Logout */}
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
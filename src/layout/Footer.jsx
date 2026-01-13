const Footer = ({ darkMode }) => (
  <footer
    className={`w-full border-t transition-colors duration-300 ${
      darkMode
        ? "bg-white border-gray-800"
        : "bg-white border-[#E0D6C8]"
    }`}
  >
    <div className="px-6 md:px-20 py-5 flex flex-col md:flex-row items-center justify-between gap-3">

      {/* COPYRIGHT */}
      <p
        className={`text-sm md:text-base font-medium ${
          darkMode ? "text-gray-400" : "text-gray-700"
        }`}
      >
        © 2026 <span className="font-semibold">DesignHouse.co.in</span>
        <span className="ml-1 text-gray-500">
          · All rights reserved
        </span>
      </p>

      {/* LINKS */}
      <div className="flex items-center space-x-6">
        <a
          href="#"
          className={`text-sm md:text-base transition-colors duration-200 ${
            darkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-[#B45309]"
          }`}
        >
          Privacy Policy
        </a>

        <a
          href="#"
          className={`text-sm md:text-base transition-colors duration-200 ${
            darkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-[#B45309]"
          }`}
        >
          Terms of Service
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
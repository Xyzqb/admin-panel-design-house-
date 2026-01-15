import React from "react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  size = "md",        // sm | md | lg
  className = "",     // for layout control (grid, width, etc.)
}) {
  const sizeClasses = {
    sm: "pl-9 pr-3 py-2 text-sm",
    md: "pl-10 pr-4 py-2.5 text-sm sm:text-base",
    lg: "pl-12 pr-5 py-3 text-base",
  };

  return (
    <div className={`relative ${className}`}>
      {/* Icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white border border-gray-300 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400
          ${sizeClasses[size]}
        `}
      />
    </div>
  );
}


// import SearchBar from "@/components/common/SearchBar";

{/* <SearchBar
  value={search}
  onChange={setSearch}
  size="sm"
  className="w-64"
/>
 */}
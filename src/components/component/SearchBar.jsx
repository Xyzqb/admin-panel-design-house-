import { Search } from "lucide-react";

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = ""
}) {
  return (
    <div className={`relative group ${className}`}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 group-focus-within:text-blue-500"
        size={20}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-70 py-2.5 rounded-xl border border-gray-300 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 shadow-sm group-hover:shadow"
      />
    </div>
  );
}
export default SearchBar;
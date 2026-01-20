// import React from "react";

// export const SearchBar = ({
//   rowsPerPage,
//   onRowsPerPageChange,
//   searchValue,
//   onSearchChange,
//   searchPlaceholder = "Search...",
// }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

//         {/* Rows Selector */}
//         <div className="flex items-center space-x-3">
//           <span className="text-gray-700 font-medium">Show</span>

//           <div className="relative">
//             <select
//               value={rowsPerPage}
//               onChange={(e) =>
//                 onRowsPerPageChange(
//                   e.target.value === "All"
//                     ? "All"
//                     : parseInt(e.target.value)
//                 )
//               }
//               className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             >
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//               <option value={100}>100</option>
//               <option value="All">All</option>
//             </select>

//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
//               <svg
//                 className="w-4 h-4 text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </div>
//           </div>

//           <span className="text-gray-700 font-medium">entries</span>
//         </div>

//         {/* Search */}
//         <div className="flex-1 max-w-lg">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder={searchPlaceholder}
//               value={searchValue}
//               onChange={(e) => onSearchChange(e.target.value)}
//               className="w-full px-4 py-2.5 pl-11 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             />

//             <div className="absolute left-4 top-1/2 -translate-y-1/2">
//               <svg
//                 className="w-4 h-4 text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

import React from "react";
import { Search } from "lucide-react";

export const SearchBar = ({
  rowsPerPage,
  onRowsPerPageChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
}) => {
  return (
    <div className="bg-blue-50 rounded-lg border border-blue-100 p-4 mb-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">

        {/* Rows Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-blue-700">Show</span>

          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(parseInt(e.target.value))}
            className="px-3 py-2 border border-blue-200 rounded bg-white text-blue-700
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={50}>50</option>
             <option value={10}>75</option>
            <option value={25}>100</option>
            <option value={100}>150</option>
            <option value="all">All</option>
          </select>

          <span className="text-sm text-blue-700">Rows</span>
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-74">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5
              border border-blue-200 rounded-lg bg-white
              text-blue-900 placeholder-blue-400
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
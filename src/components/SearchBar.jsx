export const SearchBar = ({
  rowsPerPage,
  totalItems,
  onRowsPerPageChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
}) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

        {/* Rows Selector */}
        <div className="flex items-center space-x-3">
          <span className="text-gray-700 font-medium">Show</span>

          <div className="relative">
            <select
              value={rowsPerPage}
              onChange={(e) => {
                const value = e.target.value;
                onRowsPerPageChange(
                  value === "All" ? totalItems : Number(value)
                );
              }}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={150}>150</option>
              <option value="All">All</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <span className="text-gray-700 font-medium">entries</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2.5 pl-11 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />

            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg
                className="w-4 h-4 text-gray-400"
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
          </div>
        </div>

      </div>
    </div>
  );
};

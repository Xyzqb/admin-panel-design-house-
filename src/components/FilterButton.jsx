import { Filter, ChevronDown } from "lucide-react";

export function FilterButton({ showFilter, setShowFilter, filters, setFilters }) {
  return (
    <div
      className="relative"
      onClick={(e) => e.stopPropagation()} // ⭐ IMPORTANT FIX
    >
      <button
        onClick={() => setShowFilter((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl
        border border-gray-300 bg-white hover:bg-gray-50
        transition-all duration-300 shadow-sm"
      >
        <Filter size={18} />
        <span>Filters</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            showFilter ? "rotate-180" : ""
          }`}
        />
      </button>

      {showFilter && (
        <div
          className="absolute right-0 mt-2 w-64 bg-white rounded-xl
          shadow-xl border z-20"
        >
          <div className="p-4 space-y-4">

            {/* STATUS */}
            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, status: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg border"
              >
                <option value="all">All</option>
                <option value="Excellent">Excellent</option>
                <option value="Very Good">Very Good</option>
              </select>
            </div>

            {/* RATING */}
            <div>
              <label className="text-sm font-medium mb-1 block">Rating</label>
              <select
                value={filters.rating}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, rating: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg border"
              >
                <option value="all">All</option>
                <option value="5">5 Stars</option>
                <option value="4.5+">4.5+</option>
                <option value="4+">4+</option>
              </select>
            </div>

            {/* VERIFIED */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Verification
              </label>
              <select
                value={filters.verified}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, verified: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg border"
              >
                <option value="all">All</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
            </div>

            {/* CLEAR */}
            <button
              onClick={() => {
                setFilters({ status: "all", rating: "all", verified: "all" });
                setShowFilter(false);
              }}
              className="w-full px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              Clear Filters
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

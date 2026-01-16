import StatsGrid from "./StatsGrid";

export default function Dashboard() {
  return (
    <div
      className={`px-1 sm:px-1 lg:px-1 py-6 sm:py-6 transition-colors duration-300 
        
      `}
    >
      {/* STATS GRID */}
      <div className={`p-4 sm:p-6 shadow-sm bg-white`}>
        <StatsGrid />
      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
      </div>
    </div>
  );
}
import StatsGrid from "./StatsGrid";
// import RecentActivity from "./RecentActivity";

export default function Dashboard({ darkMode }) {
  return (
    <div
      className={`min-h-screen px-4 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-8 transition-colors duration-300 
        
      `}
    >
      {/* STATS GRID */}
      <div
        className={`p-4 sm:p-6 shadow-sm bg-white`}
      >
        <StatsGrid />
      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
      </div>
    </div>
  );
}
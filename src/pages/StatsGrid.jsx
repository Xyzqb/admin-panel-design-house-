import {
  DollarSign,
  Users,
  Activity,
  Star,
  Home,
  Sofa,
  Paintbrush,
  Layers,
  Calendar,
  ClipboardList,
} from "lucide-react";

const stats = [
  {
    title: "Total Projects",
    value: "128",
    desc: "Completed interiors",
    icon: Home,
    bg: "bg-blue-50",
    iconBg: "bg-blue-500",
    text: "text-blue-600",
  },
  {
    title: "Active Clients",
    value: "42",
    desc: "Ongoing projects",
    icon: Users,
    bg: "bg-purple-50",
    iconBg: "bg-purple-500",
    text: "text-purple-600",
  },
  {
    title: "Design Concepts",
    value: "86",
    desc: "Custom layouts",
    icon: Layers,
    bg: "bg-green-50",
    iconBg: "bg-green-500",
    text: "text-green-600",
  },
  {
    title: "Testimonials",
    value: "64",
    desc: "Happy customers",
    icon: Star,
    bg: "bg-yellow-50",
    iconBg: "bg-yellow-500",
    text: "text-yellow-600",
  },
  {
    title: "Furniture Orders",
    value: "31",
    desc: "Custom furniture",
    icon: Sofa,
    bg: "bg-pink-50",
    iconBg: "bg-pink-500",
    text: "text-pink-600",
  },
  {
    title: "Paint Themes",
    value: "19",
    desc: "Color palettes",
    icon: Paintbrush,
    bg: "bg-orange-50",
    iconBg: "bg-orange-500",
    text: "text-orange-600",
  },
  {
    title: "Site Visits",
    value: "14",
    desc: "This month",
    icon: Calendar,
    bg: "bg-indigo-50",
    iconBg: "bg-indigo-500",
    text: "text-indigo-600",
  },
  {
    title: "Pending Tasks",
    value: "9",
    desc: "Design approvals",
    icon: ClipboardList,
    bg: "bg-red-50",
    iconBg: "bg-red-500",
    text: "text-red-600",
  },
];

export default function InteriorDashboard() {
  return (
    <div className="p-4 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Interior Design Dashboard
        </h1>
        <p className="text-gray-500 mt-1 text-lg">
          Overview of projects, clients & design activities
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`rounded-2xl p-5 shadow-sm hover:shadow-lg transition ${item.bg}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-gray-600">
                    {item.title}
                  </h4>
                  <p className={`text-3xl font-bold mt-1 ${item.text}`}>
                    {item.value}
                  </p>
                </div>

                <div
                  className={`p-3 rounded-xl text-white ${item.iconBg}`}
                >
                  <Icon size={24} />
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-3">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* EXTRA SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RECENT PROJECTS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">
            Recent Interior Projects
          </h3>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span>Luxury Villa – Noida</span>
              <span className="text-green-600 font-medium">Completed</span>
            </li>
            <li className="flex justify-between">
              <span>2BHK Apartment – Gurgaon</span>
              <span className="text-blue-600 font-medium">In Progress</span>
            </li>
            <li className="flex justify-between">
              <span>Office Workspace – Delhi</span>
              <span className="text-yellow-600 font-medium">Review</span>
            </li>
          </ul>
        </div>

        {/* CLIENT FEEDBACK */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">
            Client Feedback
          </h3>

          <div className="space-y-3 text-sm text-gray-600">
            <p>
              ⭐⭐⭐⭐⭐ – “Amazing modern design and perfect execution.”
            </p>
            <p>
              ⭐⭐⭐⭐ – “Great color selection and furniture planning.”
            </p>
            <p>
              ⭐⭐⭐⭐⭐ – “Very professional interior team.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

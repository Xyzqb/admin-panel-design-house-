import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Users,
  Home,
  Star,
  MessageCircle,
  Calendar,
  Layers,
  Heart,
  Clock,
  Activity,
  Sofa,
  ClipboardList,
  Paintbrush,
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    title: "New Leads",
    value: "23",
    desc: "This month",
    icon: Users,
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
    title: "Client Meetings",
    value: "18",
    desc: "Scheduled",
    icon: Calendar,
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
    title: "Approved Designs",
    value: "61",
    desc: "Client approved",
    icon: Star,
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
    title: "Ratings",
    value: "4.8",
    desc: "Average score",
    icon: Activity,
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
    title: "Material Samples",
    value: "47",
    desc: "Available options",
    icon: Layers,
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
    bg: "bg-indigo-50",
    iconBg: "bg-indigo-500",
    text: "text-indigo-600",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [products, setProducts] = useState([]);

  const [blogPosts, setBlogPosts] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [projectTypes, setProjectTypes] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  const [dashboardStats, setDashboardStats] = useState({
    totalClients: 0,
    activeProjects: 0,
    completedProjects: 0,
    pendingConsultations: 0,
    totalProducts: 0,
    monthlyRevenue: 0,
    avgProjectValue: 0,
    clientSatisfaction: 0,
  });

  const MONTH_LABELS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        // Fallback to mock data
        setClients(Array(15).fill({}).map((_, i) => ({
          createdAt: new Date(2024, i % 12, 1)
        })));
        setProjects(Array(8).fill({}).map((_, i) => ({
          createdAt: new Date(2024, i % 12, 1),
          status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'completed' : 'pending'
        })));
        setConsultations(Array(12).fill({}).map(() => ({
          status: "pending"
        })));
        setProducts(Array(25).fill({}));

        setProjectTypes([
          { name: "Residential", value: 45, color: "#6366f1" },
          { name: "Commercial", value: 30, color: "#8b5cf6" },
          { name: "Office", value: 15, color: "#ec4899" },
          { name: "Hospitality", value: 10, color: "#f59e0b" },
        ]);

        setRevenueData([
          { month: "Jan", revenue: 125000 },
          { month: "Feb", revenue: 145000 },
          { month: "Mar", revenue: 180000 },
          { month: "Apr", revenue: 165000 },
          { month: "May", revenue: 220000 },
          { month: "Jun", revenue: 195000 },
        ]);

        setBlogPosts(Array(8).fill({}));
        setPortfolio(Array(15).fill({}));
        setTestimonials(Array(12).fill({}));
        setServices(Array(6).fill({}));

        setDashboardStats({
          totalClients: 15,
          activeProjects: 8,
          completedProjects: 32,
          pendingConsultations: 12,
          totalProducts: 25,
          monthlyRevenue: 195000,
          avgProjectValue: 24500,
          clientSatisfaction: 4.8,
        });

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        toast.error("Error fetching dashboard data!");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const getColorForProductType = (type) => {
    const colors = {
      residential: "#6366f1",
      commercial: "#8b5cf6",
      office: "#ec4899",
      hospitality: "#f59e0b",
      retail: "#10b981",
      furniture: "#f97316",
      lighting: "#ef4444",
      decor: "#6b7280",
      default: "#6b7280"
    };
    return colors[type.toLowerCase()] || colors.default;
  };

  const clientsMonthlyData = useMemo(() => {
    const map = {};
    clients.forEach((c) => {
      if (!c.createdAt) return;
      const d = new Date(c.createdAt);
      const m = MONTH_LABELS[d.getMonth()];
      map[m] = (map[m] || 0) + 1;
    });
    return MONTH_LABELS.filter((m) => map[m]).map((m) => ({
      month: m,
      registrations: map[m],
    }));
  }, [clients]);

  const projectsMonthlyData = useMemo(() => {
    const map = {};
    projects.forEach((p) => {
      if (!p.createdAt) return;
      const d = new Date(p.createdAt);
      const m = MONTH_LABELS[d.getMonth()];
      map[m] = (map[m] || 0) + 1;
    });
    return MONTH_LABELS.filter((m) => map[m]).map((m) => ({
      month: m,
      projects: map[m],
    }));
  }, [projects]);

  const consultationStatus = useMemo(() => {
    const statusCount = {
      pending: 0,
      scheduled: 0,
      completed: 0,
      cancelled: 0,
    };

    consultations.forEach((c) => {
      const status = c.status?.toLowerCase() || "pending";
      if (statusCount[status] !== undefined) {
        statusCount[status] += 1;
      }
    });

    return Object.entries(statusCount)
      .filter(([_, count]) => count > 0)
      .map(([status, count]) => ({
        status: status.charAt(0).toUpperCase() + status.slice(1),
        count,
      }));
  }, [consultations]);

  const {
    totalClients,
    activeProjects,
    completedProjects,
    pendingConsultations,
    totalProducts,
    monthlyRevenue,
    avgProjectValue,
    clientSatisfaction,
  } = dashboardStats;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-amber-600 font-medium">
            Loading dashboard data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full ">
      <ToastContainer />
      
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-600">
          Interior Design Dashboard
        </h1>
        <p className="text-gray-600 mt-1 text-lg">
          Insights & analytics for your interior design business
        </p>
      </div>

      <div className="space-y-4">
        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`rounded-2xl p-4 shadow-md hover:shadow-lg transition ${item.bg}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-600 uppercase">
                      {item.title}
                    </h4>
                    <p className={`text-2xl md:text-3xl font-bold mt-1 ${item.text}`}>
                      {item.value}
                    </p>
                  </div>

                  <div className={`p-3 rounded-xl text-white ${item.iconBg}`}>
                    <Icon size={22} />
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-2">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* CLIENT GROWTH CHART */}
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
            <h3 className="font-semibold mb-3 text-base">Client Growth Trend</h3>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={clientsMonthlyData}>
                <defs>
                  <linearGradient id="clientGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="registrations"
                  stroke="#d97706"
                  fill="url(#clientGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* PROJECT TREND CHART */}
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
            <h3 className="font-semibold mb-3 text-base">Project Acquisition Trend</h3>

            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={projectsMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="projects"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* PIE CHART */}
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
            <h3 className="font-semibold mb-3 text-base">Project Type Distribution</h3>

            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={projectTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={35}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {projectTypes.map((v, i) => (
                    <Cell key={i} fill={v.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* BAR CHART */}
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
            <h3 className="font-semibold mb-3 text-base">Monthly Revenue</h3>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CONSULTATION STATUS */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
          <h3 className="font-semibold mb-4 text-base">Consultation Status Breakdown</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {consultationStatus.map((s, i) => {
              const bgColors = [
                "from-amber-50 to-yellow-50 border-amber-200",
                "from-blue-50 to-cyan-50 border-blue-200",
                "from-emerald-50 to-green-50 border-emerald-200",
                "from-rose-50 to-pink-50 border-rose-200",
              ];
              const textColors = [
                "text-amber-600",
                "text-blue-600",
                "text-emerald-600",
                "text-rose-600",
              ];

              return (
                <div
                  key={i}
                  className={`p-3 rounded-lg bg-gradient-to-br border ${bgColors[i % bgColors.length]}`}
                >
                  <p className="text-xs text-gray-600">{s.status}</p>
                  <h4 className={`text-xl font-bold ${textColors[i % textColors.length]}`}>
                    {s.count}
                  </h4>
                </div>
              );
            })}
            {consultationStatus.length === 0 && (
              <div className="col-span-4 text-center py-6 text-gray-500 text-sm">
                No consultation data available
              </div>
            )}
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
          <h3 className="font-semibold mb-4 text-base">Recent Activity</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700 flex items-center gap-2 text-sm">
                <Clock size={16} />
                Recent Projects
              </h4>
              {projects.slice(0, 3).map((project, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Project #{i + 1}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                    {project.status || 'active'}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-700 flex items-center gap-2 text-sm">
                <MessageCircle size={16} />
                Recent Consultations
              </h4>
              {consultations.slice(0, 3).map((cons, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Consultation #{i + 1}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                    {cons.status || 'pending'}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-700 flex items-center gap-2 text-sm">
                <Heart size={16} />
                Top Services
              </h4>
              {services.slice(0, 3).map((service, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">{service.name || `Service ${i + 1}`}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    Popular
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
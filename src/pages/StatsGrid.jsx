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

  // PURPLE
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

  // GREEN
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

  // YELLOW
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

  // PINK
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

  // INDIGO
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

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  subtitle,
  tint,
  dark,
  iconLight,
  onClick,
}) => {
  return (
    <div
      className={`rounded-2xl px-6 py-5 transition-all duration-300 ${onClick ? "cursor-pointer hover:shadow-xl" : ""
        }`}
      onClick={onClick}
      style={{
        background: `linear-gradient(90deg, #ffffff 55%, ${tint} 100%)`,
        boxShadow: "0px 4px 18px rgba(0,0,0,0.07)",
        minHeight: "130px",
      }}
    >
      <div className="flex items-center justify-between">
        {/* LEFT TEXT */}
        <div>
          <p className="text-[11px] text-gray-600 font-semibold uppercase tracking-wide mb-1">
            {title}
          </p>

          <h3
            className="text-3xl font-extrabold leading-tight"
            style={{ color: dark }}
          >
            {value}
          </h3>

          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>

        {/* ICON BUBBLE */}
        <div
          className="p-4 rounded-2xl text-white shadow-md flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${dark}, ${iconLight})`,
          }}
        >
          <Icon size={26} />
        </div>
      </div>
    </div>
  );
};

// ===================== PLATFORM OVERVIEW MINI CARDS =====================

const MiniCard = ({ label, value, tint, dark }) => {
  return (
    <div
      className="rounded-xl px-6 py-4 flex items-center justify-between transition-all"
      style={{
        background: `linear-gradient(90deg, #ffffff 30%, ${tint} 100%)`,
        boxShadow: "0px 4px 14px rgba(0,0,0,0.05)",
      }}
    >
      <span className="text-sm text-gray-600 font-medium">{label}</span>

      <span className="text-xl font-extrabold" style={{ color: dark }}>
        {value}
      </span>
    </div>
  );
};

// ===================== MAIN DASHBOARD COMPONENT =====================

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

  // Dynamic data from API
  const [projectTypes, setProjectTypes] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  // Stats from API
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

        // 1️⃣ FETCH DASHBOARD STATS
        const statsResponse = await api.get("/api/admin/dashboard/stats");
        if (statsResponse.data?.success) {
          const stats = statsResponse.data.data;
          setDashboardStats({
            totalClients: stats.totalClients || 0,
            activeProjects: stats.activeProjects || 0,
            completedProjects: stats.completedProjects || 0,
            pendingConsultations: stats.pendingConsultations || 0,
            totalProducts: stats.totalProducts || 0,
            monthlyRevenue: stats.monthlyRevenue || 0,
            avgProjectValue: stats.avgProjectValue || 0,
            clientSatisfaction: stats.clientSatisfaction || 0,
          });
        }

        // 2️⃣ FETCH CLIENTS
        const clientsRes = await api.get("/api/admin/clients");
        if (clientsRes.data?.success) {
          setClients(clientsRes.data.data || []);
        }

        // 3️⃣ FETCH PROJECTS
        const projectsRes = await api.get("/api/admin/projects");
        if (projectsRes.data?.success) {
          setProjects(projectsRes.data.data || []);
        }

        // 4️⃣ FETCH CONSULTATIONS
        const consultationsRes = await api.get("/api/admin/consultations");
        if (consultationsRes.data?.success) {
          setConsultations(consultationsRes.data.data || []);
        }

        // 5️⃣ FETCH PRODUCT DISTRIBUTION
        const productsRes = await api.get("/api/admin/products/distribution");
        if (productsRes.data?.success) {
          const distribution = productsRes.data.data;
          const formatted = Object.keys(distribution).map(key => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value: distribution[key],
            color: getColorForProductType(key)
          }));
          setProjectTypes(formatted);
        }

        // 6️⃣ FETCH REVENUE DATA
        const revenueRes = await api.get("/api/admin/revenue/monthly");
        if (revenueRes.data?.success) {
          setRevenueData(revenueRes.data.data || []);
        }

        // 7️⃣ FETCH PLATFORM OVERVIEW
        const overviewRes = await api.get("/api/admin/platform/overview");
        if (overviewRes.data?.success) {
          const data = overviewRes.data.data;
          setBlogPosts(data.blogPosts || []);
          setPortfolio(data.portfolio || []);
          setTestimonials(data.testimonials || []);
          setServices(data.services || []);
        }

        // 8️⃣ FETCH PRODUCTS
        const allProductsRes = await api.get("/api/admin/products");
        if (allProductsRes.data?.success) {
          setProducts(allProductsRes.data.data || []);
        }

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        toast.error("Error fetching dashboard data!");

        // Fallback to mock data if API fails
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

      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Helper function for project type colors
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-amber-600 font-medium">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ToastContainer />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 lg:space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-600">
            Interior Design Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Insights & analytics for your interior design business
          </p>
        </div>

        {/* ===================== ORIGINAL STATS GRID ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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

                  <div className={`p-3 rounded-xl text-white ${item.iconBg}`}>
                    <Icon size={24} />
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-3">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* ===================== CHARTS ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* CLIENT GROWTH CHART */}
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Client Growth Trend</h3>

            <ResponsiveContainer width="100%" height={300}>
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
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Project Acquisition Trend</h3>

            <ResponsiveContainer width="100%" height={300}>
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

          {/* PIE CHART - Project Type Distribution */}
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Project Type Distribution</h3>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={40}
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

          {/* BAR CHART - Revenue */}
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Monthly Revenue</h3>

            <ResponsiveContainer width="100%" height={300}>
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

        {/* CONSULTATION STATUS BREAKDOWN */}
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm">
          <h3 className="font-semibold mb-5 sm:mb-6">Consultation Status Breakdown</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                  className={`p-4 rounded-lg bg-gradient-to-br ${bgColors[i % bgColors.length]}`}
                >
                  <p className="text-sm text-gray-600">{s.status}</p>
                  <h4 className={`text-2xl font-bold ${textColors[i % textColors.length]}`}>
                    {s.count}
                  </h4>
                </div>
              );
            })}
            {consultationStatus.length === 0 && (
              <div className="col-span-4 text-center py-6 text-gray-500">
                No consultation data available
              </div>
            )}
          </div>
        </div>

        {/* RECENT ACTIVITY SECTION */}
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm">
          <h3 className="font-semibold mb-5 sm:mb-6">Recent Activity</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 flex items-center gap-2">
                <Clock size={16} />
                Recent Projects
              </h4>
              {projects.slice(0, 3).map((project, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Project #{i + 1}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                    {project.status || 'active'}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 flex items-center gap-2">
                <MessageCircle size={16} />
                Recent Consultations
              </h4>
              {consultations.slice(0, 3).map((cons, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Consultation #{i + 1}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                    {cons.status || 'pending'}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 flex items-center gap-2">
                <Heart size={16} />
                Top Services
              </h4>
              {services.slice(0, 3).map((service, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
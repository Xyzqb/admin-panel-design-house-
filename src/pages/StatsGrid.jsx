import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Users,
  Home,
  Star,
  MessageCircle,
  Clock,
  Sofa,
  UserCheck,
  Heart,
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

const stats = [
  {
    title: "TOTAL PROJECTS",
    value: "128",
    desc: "Completed interiors",
    icon: Home,
    iconBg: "bg-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    title: "NEW LEADS",
    value: "23",
    desc: "This month",
    icon: Users,
    iconBg: "bg-indigo-500",
    bg: "bg-indigo-50",
    text: "text-indigo-600",
  },
  {
    title: "ACTIVE CLIENTS",
    value: "42",
    desc: "Ongoing projects",
    icon: UserCheck,
    iconBg: "bg-purple-500",
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  {
    title: "APPROVED DESIGNS",
    value: "61",
    desc: "Client approved",
    icon: Star,
    iconBg: "bg-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    title: "TESTIMONIALS",
    value: "64",
    desc: "Happy customers",
    icon: Heart,
    iconBg: "bg-rose-500",
    bg: "bg-rose-50",
    text: "text-rose-600",
  },
  {
    title: "RATINGS",
    value: "4.8",
    desc: "Average score",
    icon: Star,
    iconBg: "bg-amber-500",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  {
    title: "FURNITURE ORDERS",
    value: "31",
    desc: "Custom furniture",
    icon: Sofa,
    iconBg: "bg-pink-500",
    bg: "bg-pink-50",
    text: "text-pink-600",
  },
  {
    title: "PENDING TASKS",
    value: "9",
    desc: "Design approvals",
    icon: Clock,
    iconBg: "bg-cyan-500",
    bg: "bg-cyan-50",
    text: "text-cyan-600",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-6 border border-slate-200 transition-all duration-500 shadow-[0_6px_14px_rgba(0,0,0,0.12)] overflow-hidden"
              >
           
                <div className="absolute inset-0 pointer-events-none">
                
                  <div
                    className={`absolute top-0 right-0 w-60 h-60
                   ${item.iconBg} opacity-15 rounded-full -mr-20 -mt-20 transition-transform duration-700 group-hover:-mr-10 group-hover:-mt-10`}
                  />

         
                  <div
                    className={`absolute bottom-0 left-0 w-32 h-32 ${item.iconBg} opacity-15 rounded-full -ml-16 -mb-16 transition-transform duration-700 group-hover:-ml-8 group-hover:-mb-8`}
                  />
                </div>

                <div className="relative z-10">
                 
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-2xl bg-gradient-to-br ${item.iconBg} ${item.iconBg.replace("500", "600")} flex items-center justify-center shadow-md`}
                      >
                        <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                      </div>

                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                        {item.title}
                      </p>
                    </div>

                    <div
                      className={`px-3 py-1 rounded-full text-md font-bold ${item.bg} ${item.text} border-2 ${item.iconBg.replace("bg-", "border-")}`}
                    >
                      {index + 1}
                    </div>
                  </div>

           
                  <div>
                    <p className={`text-xl font-extrabold ${item.text} mb-2 leading-none`}>
                      {item.value}
                    </p>

                    <p className="text-sm text-slate-700 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
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
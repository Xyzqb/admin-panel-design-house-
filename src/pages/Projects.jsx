import { useState, useMemo, useEffect } from "react";
import {
  Plus,
  Trash2,
  Search,
  X,
  FolderKanban,
  Users,
  Calendar,
  TrendingUp,
  Edit2,
  Eye,
  Download,
  Filter,
  ChevronDown,
  AlertCircle,
  Clock,
  BarChart3,
  DollarSign,
  CheckCircle,
  PauseCircle,
  CalendarDays
} from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState([
    { 
      id: "P-101", 
      name: "E-Commerce Website", 
      owner: "Frontend Team", 
      status: "active", 
      progress: 85,
      budget: "$45,000",
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      teamSize: 8,
      priority: "high",
      tasks: 42,
      completedTasks: 36,
      color: "from-blue-500 to-blue-600"
    },
    { 
      id: "P-102", 
      name: "CRM Dashboard", 
      owner: "Backend Team", 
      status: "completed", 
      progress: 100,
      budget: "$32,500",
      startDate: "2023-11-20",
      endDate: "2024-02-28",
      teamSize: 6,
      priority: "medium",
      tasks: 28,
      completedTasks: 28,
      color: "from-emerald-500 to-emerald-600"
    },
    { 
      id: "P-103", 
      name: "Mobile Booking App", 
      owner: "App Team", 
      status: "active", 
      progress: 65,
      budget: "$58,000",
      startDate: "2024-02-10",
      endDate: "2024-08-15",
      teamSize: 12,
      priority: "high",
      tasks: 56,
      completedTasks: 36,
      color: "from-purple-500 to-purple-600"
    },
    { 
      id: "P-104", 
      name: "AI Analytics Platform", 
      owner: "Data Science Team", 
      status: "planning", 
      progress: 25,
      budget: "$75,000",
      startDate: "2024-03-01",
      endDate: "2024-11-30",
      teamSize: 10,
      priority: "high",
      tasks: 18,
      completedTasks: 4,
      color: "from-orange-500 to-orange-600"
    },
    { 
      id: "P-105", 
      name: "Internal HR Portal", 
      owner: "Full Stack Team", 
      status: "active", 
      progress: 45,
      budget: "$28,000",
      startDate: "2024-01-30",
      endDate: "2024-05-15",
      teamSize: 5,
      priority: "medium",
      tasks: 34,
      completedTasks: 15,
      color: "from-pink-500 to-pink-600"
    },
    { 
      id: "P-106", 
      name: "Payment Gateway", 
      owner: "Backend Team", 
      status: "on-hold", 
      progress: 10,
      budget: "$52,000",
      startDate: "2024-02-25",
      endDate: "2024-07-20",
      teamSize: 7,
      priority: "high",
      tasks: 22,
      completedTasks: 2,
      color: "from-amber-500 to-amber-600"
    }
  ]);

  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all"
  });
  const [newProject, setNewProject] = useState({ 
    id: "", 
    name: "", 
    owner: "", 
    status: "planning", 
    budget: "",
    teamSize: "",
    priority: "medium"
  });

  /* ================= FILTER LOGIC ================= */
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = 
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.owner.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = filters.status === "all" || p.status === filters.status;
      const matchesPriority = filters.priority === "all" || p.priority === filters.priority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [projects, search, filters]);

  /* ================= HANDLERS ================= */
  const handleAddProject = () => {
    if (!newProject.id.trim() || !newProject.name.trim()) {
      alert("Please fill in Project ID and Name");
      return;
    }

    const colors = [
      "from-blue-500 to-blue-600",
      "from-emerald-500 to-emerald-600",
      "from-purple-500 to-purple-600",
      "from-orange-500 to-orange-600",
      "from-pink-500 to-pink-600",
      "from-amber-500 to-amber-600",
      "from-indigo-500 to-indigo-600",
      "from-rose-500 to-rose-600"
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const projectToAdd = {
      ...newProject,
      progress: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: "2024-12-31",
      tasks: 0,
      completedTasks: 0,
      color: randomColor,
      budget: newProject.budget || "$0",
      teamSize: parseInt(newProject.teamSize) || 1
    };

    setProjects((prev) => [projectToAdd, ...prev]);
    setNewProject({ 
      id: "", 
      name: "", 
      owner: "", 
      status: "planning", 
      budget: "",
      teamSize: "",
      priority: "medium"
    });
    setShowAddModal(false);
  };

  const handleEditProject = () => {
    if (!selectedProject || !selectedProject.id.trim() || !selectedProject.name.trim()) {
      alert("Please fill in Project ID and Name");
      return;
    }

    setProjects((prev) => 
      prev.map((p) => 
        p.id === selectedProject.id ? { ...selectedProject } : p
      )
    );
    setShowEditModal(false);
    setSelectedProject(null);
  };

  const handleDeleteClick = (project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setProjects((prev) => prev.filter((p) => p.id !== selectedProject.id));
    setShowDeleteModal(false);
    setSelectedProject(null);
  };

  const handleViewClick = (project) => {
    setShowViewModal(project);
  };

  const handleEditClick = (project) => {
    setSelectedProject({...project});
    setShowEditModal(true);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'on-hold': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Calculate stats
  const stats = [
    {
      title: "TOTAL PROJECTS",
      value: projects.length,
      change: "+2 this month",
      icon: <FolderKanban size={24} />,
      color: "from-blue-50 to-blue-100",
      textColor: "text-blue-700",
      borderColor: "border-blue-200"
    },
    {
      title: "ACTIVE PROJECTS",
      value: projects.filter(p => p.status === 'active').length,
      change: `${projects.filter(p => p.status === 'active').length} in progress`,
      icon: <TrendingUp size={24} />,
      color: "from-emerald-50 to-emerald-100",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-200"
    },
    {
      title: "TOTAL BUDGET",
      value: "$" + projects.reduce((acc, p) => {
        const budget = parseFloat(p.budget.replace(/[^0-9.-]+/g,""));
        return acc + (isNaN(budget) ? 0 : budget);
      }, 0).toLocaleString(),
      change: "Across all projects",
      icon: <DollarSign size={24} />,
      color: "from-purple-50 to-purple-100",
      textColor: "text-purple-700",
      borderColor: "border-purple-200"
    },
    {
      title: "TOTAL TEAM SIZE",
      value: projects.reduce((acc, p) => acc + p.teamSize, 0),
      change: "Across all projects",
      icon: <Users size={24} />,
      color: "from-amber-50 to-amber-100",
      textColor: "text-amber-700",
      borderColor: "border-amber-200"
    }
  ];

  const handleExport = () => {
    const data = JSON.stringify(projects, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("Projects data exported successfully!");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fadeIn">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="text-red-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Delete Project</h3>
                  <p className="text-gray-600 text-sm">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete <span className="font-semibold">{selectedProject.name}</span>? All associated data will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-300"
                >
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Project Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Project Details</h3>
                <button
                  onClick={() => setShowViewModal(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${showViewModal.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {showViewModal.id.substring(0, 3)}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{showViewModal.name}</h4>
                  <p className="text-gray-600">{showViewModal.id}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(showViewModal.status)}`}>
                      {showViewModal.status.charAt(0).toUpperCase() + showViewModal.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(showViewModal.priority)}`}>
                      {showViewModal.priority} Priority
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Project Information</h5>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />
                        <span className="text-sm">Owner: <span className="font-medium">{showViewModal.owner}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />
                        <span className="text-sm">Team Size: <span className="font-medium">{showViewModal.teamSize} members</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-gray-400" />
                        <span className="text-sm">Budget: <span className="font-medium text-emerald-600">{showViewModal.budget}</span></span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Progress</h5>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{showViewModal.progress}% Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            showViewModal.progress >= 80 ? 'bg-emerald-500' :
                            showViewModal.progress >= 50 ? 'bg-blue-500' :
                            showViewModal.progress >= 30 ? 'bg-amber-500' : 'bg-red-500'
                          } transition-all duration-500`}
                          style={{ width: `${showViewModal.progress}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-500">
                        {showViewModal.completedTasks} of {showViewModal.tasks} tasks completed
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Timeline</h5>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-gray-400" />
                        <span className="text-sm">Start: <span className="font-medium">{formatDate(showViewModal.startDate)}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        <span className="text-sm">End: <span className="font-medium">{formatDate(showViewModal.endDate)}</span></span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Tasks</h5>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-900">
                        {showViewModal.completedTasks}/{showViewModal.tasks} tasks
                      </div>
                      <div className="text-sm text-gray-500">
                        {showViewModal.tasks > 0 ? Math.round((showViewModal.completedTasks / showViewModal.tasks) * 100) : 0}% completed
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSelectedProject({...showViewModal});
                    setShowViewModal(null);
                    setShowEditModal(true);
                  }}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
                >
                  Edit Project
                </button>
                <button
                  onClick={() => {
                    setSelectedProject(showViewModal);
                    setShowViewModal(null);
                    setShowDeleteModal(true);
                  }}
                  className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-300"
                >
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEditModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Edit Project</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project ID *
                  </label>
                  <input
                    type="text"
                    value={selectedProject.id}
                    onChange={(e) => setSelectedProject(prev => ({ ...prev, id: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={selectedProject.name}
                    onChange={(e) => setSelectedProject(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner / Team
                  </label>
                  <input
                    type="text"
                    value={selectedProject.owner}
                    onChange={(e) => setSelectedProject(prev => ({ ...prev, owner: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={selectedProject.status}
                      onChange={(e) => setSelectedProject(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    >
                      <option value="planning">Planning</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="on-hold">On Hold</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={selectedProject.priority}
                      onChange={(e) => setSelectedProject(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget
                    </label>
                    <input
                      type="text"
                      value={selectedProject.budget}
                      onChange={(e) => setSelectedProject(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Size
                    </label>
                    <input
                      type="number"
                      value={selectedProject.teamSize}
                      onChange={(e) => setSelectedProject(prev => ({ ...prev, teamSize: parseInt(e.target.value) || 1 }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Progress (%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={selectedProject.progress}
                    onChange={(e) => setSelectedProject(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>0%</span>
                    <span className="font-medium">{selectedProject.progress}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditProject}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                >
                  Update Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add New Project</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project ID *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., P-107"
                    value={newProject.id}
                    onChange={(e) => setNewProject(prev => ({ ...prev, id: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter project name"
                    value={newProject.name}
                    onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner / Team
                  </label>
                  <input
                    type="text"
                    placeholder="Enter owner or team name"
                    value={newProject.owner}
                    onChange={(e) => setNewProject(prev => ({ ...prev, owner: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={newProject.status}
                      onChange={(e) => setNewProject(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    >
                      <option value="planning">Planning</option>
                      <option value="active">Active</option>
                      <option value="on-hold">On Hold</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={newProject.priority}
                      onChange={(e) => setNewProject(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget
                    </label>
                    <input
                      type="text"
                      placeholder="$0"
                      value={newProject.budget}
                      onChange={(e) => setNewProject(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Size
                    </label>
                    <input
                      type="number"
                      placeholder="1"
                      value={newProject.teamSize}
                      onChange={(e) => setNewProject(prev => ({ ...prev, teamSize: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProject}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                >
                  Add Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Main Container */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">

          {/* Header Section */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50/50">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent flex items-center gap-3">
                  <FolderKanban className="text-blue-600" size={32} />
                  Project Management
                </h1>
                <p className="text-gray-600 mt-1">Track and manage all your projects in one place</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow"
                >
                  <Download size={18} />
                  <span className="hidden sm:inline">Export</span>
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <Plus size={18} />
                  <span>Add Project</span>
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${stat.color} rounded-xl shadow-md p-4 border ${stat.borderColor} transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className={`text-xs font-semibold ${stat.textColor} uppercase tracking-wide`}>
                      {stat.title}
                    </div>
                    <div className={`${stat.textColor} transform transition-transform duration-300 hover:scale-110`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50/80 to-gray-100/50">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 group-focus-within:text-blue-500" size={20} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search projects by ID, name, or owner..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 shadow-sm group-hover:shadow"
                  />
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-3">
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow"
                  >
                    <Filter size={18} />
                    <span>Filters</span>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                  </button>

                  {showFilters && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white shadow-2xl border border-gray-200 z-10 animate-fadeIn">
                      <div className="p-4">
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                          <select
                            value={filters.status}
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                          >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="planning">Planning</option>
                            <option value="on-hold">On Hold</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                          <select
                            value={filters.priority}
                            onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                          >
                            <option value="all">All Priorities</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        </div>
                        <button
                          onClick={() => {
                            setFilters({ status: "all", priority: "all" });
                            setShowFilters(false);
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Clear Filters
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilters({ status: "active", priority: "all" })}
                    className="px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 font-medium text-sm border border-emerald-200 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilters({ status: "all", priority: "high" })}
                    className="px-3 py-2 rounded-xl bg-gradient-to-r from-red-50 to-red-100 text-red-700 font-medium text-sm border border-red-200 hover:from-red-100 hover:to-red-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
                  >
                    High Priority
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] px-4">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2.5 text-left text-sm font-semibold text-gray-900 leading-tight">Project</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Team & Budget</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Timeline</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Tasks</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr 
                      key={project.id} 
                      className="transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-white group"
                    >
                      <td className="px-6 py-3 leading-tight">
                        <div className="flex items-center gap-3">
                          {/* <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-white font-bold shadow-lg transform transition-all duration-300 group-hover:scale-110`}>
                            {project.id.substring(0, 3)}
                          </div> */}
                          <div>
                            <div className="font-semibold text-gray-900">{project.name}</div>
                            <div className="text-sm text-gray-600 flex items-center gap-1">
                              <Users size={14} />
                              {project.owner}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{project.id}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(project.priority)}`}>
                                {project.priority} Priority
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                     <td className="px-4 py-3 leading-tight">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-gray-400" />
                            <span className="text-sm font-medium">{project.teamSize} members</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-gray-400" />
                            <span className="text-sm font-medium text-emerald-600">{project.budget}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Progress: {project.progress}%
                          </div>
                        </div>
                      </td>
                     <td className="px-4 py-3 leading-tight">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar size={15} className="text-gray-400" />
                            <span className="text-sm">
                              {formatDate(project.startDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={15} className="text-gray-400" />
                            <span className="text-sm">
                              {formatDate(project.endDate)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 leading-tight">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900">
                            {project.completedTasks}/{project.tasks}
                          </div>
                          <div className="text-xs text-gray-500">
                            {project.tasks > 0 ? Math.round((project.completedTasks / project.tasks) * 100) : 0}% completed
                          </div>
                        </div>
                      </td>
                     <td className="px-4 py-3 leading-tight">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewClick(project)}
                            className="p-2 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 hover:from-blue-100 hover:to-blue-200 hover:text-blue-700 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:shadow border border-blue-200"
                            title="View Details"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => handleEditClick(project)}
                            className="p-2 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 text-amber-600 hover:from-amber-100 hover:to-amber-200 hover:text-amber-700 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:shadow border border-amber-200"
                            title="Edit"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(project)}
                            className="p-2 rounded-xl bg-gradient-to-r from-red-50 to-red-100 text-red-600 hover:from-red-100 hover:to-red-200 hover:text-red-700 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:shadow border border-red-200"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center">
                      <div className="text-gray-500">
                        <Search size={48} className="mx-auto mb-4 text-gray-300" />
                        <p className="font-medium">No projects found</p>
                        <p className="text-sm mt-1">Try adding a new project or adjusting your filters</p>
                        <button
                          onClick={() => setShowAddModal(true)}
                          className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                        >
                          Add Your First Project
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50/50 to-white">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredProjects.length}</span> projects
            </div>
          </div>
        </div>
      </div>

      {/* Add custom styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
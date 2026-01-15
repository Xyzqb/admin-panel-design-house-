import {
  Search, Plus, Edit2, Trash2, Eye, Download, Filter, Upload,
  X, Check, ChevronDown, ChevronUp, Star, Calendar,
  Mail, Phone, Globe, Building, User
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import * as Icons from "lucide-react";
import SearchBar from "../components/SearchBar";


export default function ClientsPage() {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "TechVision Inc.",
      industry: "Software Development",
      contactPerson: "Sarah Johnson",
      email: "sarah@techvision.com",
      phone: "+1 (555) 123-4567",
      website: "www.techvision.com",
      status: "Active",
      joinDate: "2024-01-15",
      projects: 12,
      revenue: "$250,000",
      logo: "TV",
      logoColor: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "GreenLeaf Foods",
      industry: "Food & Beverage",
      contactPerson: "Michael Chen",
      email: "michael@greenleaf.com",
      phone: "+1 (555) 987-6543",
      website: "www.greenleaf.com",
      status: "Active",
      joinDate: "2023-11-20",
      projects: 8,
      revenue: "$180,000",
      logo: "GL",
      logoColor: "from-emerald-500 to-emerald-600"
    },
    {
      id: 3,
      name: "UrbanStyle Apparel",
      industry: "Fashion & Retail",
      contactPerson: "Jessica Williams",
      email: "jessica@urbanstyle.com",
      phone: "+1 (555) 456-7890",
      website: "www.urbanstyle.com",
      status: "Inactive",
      joinDate: "2023-08-05",
      projects: 5,
      revenue: "$95,000",
      logo: "US",
      logoColor: "from-pink-500 to-pink-600"
    },
    {
      id: 4,
      name: "BuildRight Constructions",
      industry: "Construction",
      contactPerson: "Robert Brown",
      email: "robert@buildright.com",
      phone: "+1 (555) 234-5678",
      website: "www.buildright.com",
      status: "Active",
      joinDate: "2024-02-28",
      projects: 15,
      revenue: "$320,000",
      logo: "BR",
      logoColor: "from-amber-500 to-amber-600"
    },
    {
      id: 5,
      name: "MediCare Solutions",
      industry: "Healthcare",
      contactPerson: "Dr. Amanda Lee",
      email: "amanda@medicare.com",
      phone: "+1 (555) 876-5432",
      website: "www.medicare.com",
      status: "Pending",
      joinDate: "2024-03-10",
      projects: 3,
      revenue: "$65,000",
      logo: "MC",
      logoColor: "from-red-500 to-red-600"
    },
    {
      id: 6,
      name: "EduTech Global",
      industry: "Education Technology",
      contactPerson: "David Wilson",
      email: "david@edutech.com",
      phone: "+1 (555) 345-6789",
      website: "www.edutech.com",
      status: "Active",
      joinDate: "2023-12-01",
      projects: 10,
      revenue: "$210,000",
      logo: "EG",
      logoColor: "from-purple-500 to-purple-600"
    },
    {
      id: 7,
      name: "AutoMotive Pro",
      industry: "Automotive",
      contactPerson: "James Miller",
      email: "james@automotive.com",
      phone: "+1 (555) 765-4321",
      website: "www.automotive.com",
      status: "Active",
      joinDate: "2023-10-15",
      projects: 7,
      revenue: "$150,000",
      logo: "AP",
      logoColor: "from-orange-500 to-orange-600"
    },
    {
      id: 8,
      name: "FinanceFirst Bank",
      industry: "Banking & Finance",
      contactPerson: "Jennifer Davis",
      email: "jennifer@financefirst.com",
      phone: "+1 (555) 987-1234",
      website: "www.financefirst.com",
      status: "Active",
      joinDate: "2024-01-30",
      projects: 20,
      revenue: "$450,000",
      logo: "FF",
      logoColor: "from-indigo-500 to-indigo-600"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedClients, setSelectedClients] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    industry: 'all',
    sortBy: 'name'
  });
  const [newClient, setNewClient] = useState({
    name: "",
    industry: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    status: "Active",
    about: "",
    logo: "",
    logoColor: "from-blue-500 to-blue-600"
  });
  const [isUploading, setIsUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Available industries and statuses
  const industries = ["All", "Software Development", "Food & Beverage", "Fashion & Retail", "Construction", "Healthcare", "Education Technology", "Automotive", "Banking & Finance"];
  const statuses = ["All", "Active", "Inactive", "Pending"];

  useEffect(() => {
    // Load clients from localStorage if available
    const savedClients = localStorage.getItem('clientsData');
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }
  }, []);

  useEffect(() => {
    // Save clients to localStorage
    localStorage.setItem('clientsData', JSON.stringify(clients));
  }, [clients]);

  // Filter and sort clients
  const filteredAndSortedClients = useMemo(() => {
    let filtered = clients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = filters.status === 'all' || client.status === filters.status;
      const matchesIndustry = filters.industry === 'all' || client.industry === filters.industry;

      return matchesSearch && matchesStatus && matchesIndustry;
    });

    // Sort clients
    filtered.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'joinDate') {
        aValue = new Date(a.joinDate);
        bValue = new Date(b.joinDate);
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [clients, searchQuery, filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedClients.length / itemsPerPage);
  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedClients.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedClients, currentPage]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ChevronDown size={16} className="opacity-30" />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const handleAddClient = () => {
    if (!newClient.name || !newClient.email || !newClient.industry) {
      alert("Please fill in all required fields");
      return;
    }

    const logoInitials = newClient.name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);

    const clientToAdd = {
      id: clients.length + 1,
      ...newClient,
      logo: logoInitials,
      joinDate: new Date().toISOString().split('T')[0],
      projects: 0,
      revenue: "$0"
    };

    setClients(prev => [clientToAdd, ...prev]);
    setNewClient({
      name: "",
      industry: "",
      contactPerson: "",
      email: "",
      phone: "",
      website: "",
      status: "Active",
      about: "",
      logo: "",
      logoColor: "from-blue-500 to-blue-600"
    });
    setShowAddModal(false);
    setCurrentPage(1); // Reset to first page
  };

  const handleEditClient = () => {
    if (!selectedClient || !selectedClient.name || !selectedClient.email) {
      alert("Please fill in all required fields");
      return;
    }

    setClients(prev => prev.map(client =>
      client.id === selectedClient.id ? selectedClient : client
    ));
    setShowEditModal(false);
    setSelectedClient(null);
  };

  const handleDeleteClient = (id) => {
    setSelectedClient(clients.find(c => c.id === id));
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setClients(prev => prev.filter(client => client.id !== selectedClient.id));
    setShowDeleteModal(false);
    setSelectedClient(null);
    setSelectedClients(prev => prev.filter(id => id !== selectedClient.id));

    // Adjust pagination if needed
    if (paginatedClients.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleBulkDelete = () => {
    if (selectedClients.length === 0) return;
    setClients(prev => prev.filter(client => !selectedClients.includes(client.id)));
    setSelectedClients([]);

    if (paginatedClients.length === selectedClients.length && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleSelectAll = () => {
    if (selectedClients.length === paginatedClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(paginatedClients.map(client => client.id));
    }
  };

  const toggleSelectClient = (id) => {
    if (selectedClients.includes(id)) {
      setSelectedClients(prev => prev.filter(clientId => clientId !== id));
    } else {
      setSelectedClients(prev => [...prev, id]);
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(clients, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clients_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert("Clients data exported successfully!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file");
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // In a real app, you would upload to server and get URL
        const logoInitials = file.name.substring(0, 2).toUpperCase();
        setNewClient(prev => ({ ...prev, logo: logoInitials }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }, 1500);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      if (currentPage > 2 && currentPage < totalPages - 1) pages.push(currentPage);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const statusColors = {
    Active: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Inactive: "bg-red-100 text-red-800 border-red-200",
    Pending: "bg-amber-100 text-amber-800 border-amber-200"
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6 ">
      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add New Client</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Logo Upload */}
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${newClient.logoColor} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {newClient.logo || "C"}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Logo
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all duration-300"
                      >
                        <Upload size={18} />
                        <span className="text-sm font-medium">
                          {isUploading ? "Uploading..." : "Choose logo image"}
                        </span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      PNG, JPG up to 2MB
                    </p>
                  </div>
                </div>

                {/* Client Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      value={newClient.name}
                      onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      placeholder="Enter client name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry *
                    </label>
                    <select
                      value={newClient.industry}
                      onChange={(e) => setNewClient(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    >
                      <option value="">Select industry</option>
                      {industries.slice(1).map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      value={newClient.contactPerson}
                      onChange={(e) => setNewClient(prev => ({ ...prev, contactPerson: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      placeholder="Enter contact person"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={newClient.status}
                      onChange={(e) => setNewClient(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    >
                      {statuses.slice(1).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      placeholder="client@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={newClient.phone}
                      onChange={(e) => setNewClient(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={newClient.website}
                    onChange={(e) => setNewClient(prev => ({ ...prev, website: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="https://www.example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About Client
                  </label>
                  <textarea
                    value={newClient.about}
                    onChange={(e) => setNewClient(prev => ({ ...prev, about: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all min-h-[100px] resize-none"
                    placeholder="Describe the client company, services, or partnership details..."
                    maxLength={1000}
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {newClient.about.length}/1000 characters
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddClient}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                  >
                    Add Client
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {showEditModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Edit Client</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedClient.logoColor} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {selectedClient.logo}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedClient.name}</h4>
                    <p className="text-sm text-gray-600">{selectedClient.industry}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      value={selectedClient.name}
                      onChange={(e) => setSelectedClient(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry *
                    </label>
                    <select
                      value={selectedClient.industry}
                      onChange={(e) => setSelectedClient(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    >
                      {industries.slice(1).map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      value={selectedClient.contactPerson}
                      onChange={(e) => setSelectedClient(prev => ({ ...prev, contactPerson: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={selectedClient.status}
                      onChange={(e) => setSelectedClient(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    >
                      {statuses.slice(1).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={selectedClient.email}
                      onChange={(e) => setSelectedClient(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={selectedClient.phone}
                      onChange={(e) => setSelectedClient(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={selectedClient.website}
                    onChange={(e) => setSelectedClient(prev => ({ ...prev, website: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditClient}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                  >
                    Update Client
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fadeIn">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 className="text-red-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Delete Client</h3>
                  <p className="text-gray-600 text-sm">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete <span className="font-semibold">{selectedClient.name}</span>? All associated data will be permanently removed.
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
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Main Container */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-md shadow-sm border border-gray-200/50 overflow-hidden">

          {/* Header Section */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50/50">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Clients Management
                </h1>
                <p className="text-gray-600 mt-1">Manage and track all your client relationships</p>
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
                  <span>Add Client</span>
                </button>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <div className="text-sm font-medium text-blue-700 uppercase tracking-wide mb-1">
                  Total Clients
                </div>
                <div className="text-2xl font-bold text-blue-900">{clients.length}</div>
                <div className="text-xs text-blue-600 mt-1">All active & inactive</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
                <div className="text-sm font-medium text-emerald-700 uppercase tracking-wide mb-1">
                  Active Clients
                </div>
                <div className="text-2xl font-bold text-emerald-900">
                  {clients.filter(c => c.status === 'Active').length}
                </div>
                <div className="text-xs text-emerald-600 mt-1">Currently active</div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
                <div className="text-sm font-medium text-amber-700 uppercase tracking-wide mb-1">
                  Total Revenue
                </div>
                <div className="text-2xl font-bold text-amber-900">
                  ${clients.reduce((sum, client) => {
                    const revenue = parseFloat(client.revenue.replace(/[^0-9.]/g, ''));
                    return sum + (isNaN(revenue) ? 0 : revenue);
                  }, 0).toLocaleString()}
                </div>
                <div className="text-xs text-amber-600 mt-1">From all clients</div>
              </div>
              <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl p-4 border border-violet-200">
                <div className="text-sm font-medium text-violet-700 uppercase tracking-wide mb-1">
                  Total Projects
                </div>
                <div className="text-2xl font-bold text-violet-900">
                  {clients.reduce((sum, client) => sum + (client.projects || 0), 0)}
                </div>
                <div className="text-xs text-violet-600 mt-1">Across all clients</div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50/80 to-gray-100/50">
            <div className="flex flex-col lg:flex-row gap-4">
             <SearchBar/>

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
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-10 animate-fadeIn">
                      <div className="p-4">
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                          <select
                            value={filters.status}
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                          >
                            {statuses.map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                          <select
                            value={filters.industry}
                            onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                          >
                            {industries.map(industry => (
                              <option key={industry} value={industry}>{industry}</option>
                            ))}
                          </select>
                        </div>
                        <button
                          onClick={() => {
                            setFilters({ status: 'all', industry: 'all', sortBy: 'name' });
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
              </div>
            </div>
          </div>

          {/* Selection Info */}
          {selectedClients.length > 0 && (
            <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200 animate-fadeIn">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center animate-pulse">
                    <Check size={18} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-blue-800">
                    {selectedClients.length} client{selectedClients.length > 1 ? 's' : ''} selected
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleBulkDelete}
                    className="text-sm text-red-600 hover:text-red-800 font-medium px-3 py-1.5 rounded-lg bg-white border border-red-200 hover:bg-red-50 transition-all duration-300 hover:scale-105"
                  >
                    Delete Selected
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Clients Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                <tr>
                  <th className="w-12 p-4">
                    <input
                      type="checkbox"
                      checked={selectedClients.length === paginatedClients.length && paginatedClients.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                    />
                  </th>
                  <th
                    className="p-4 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Client
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">
                    Contact Info
                  </th>
                  <th
                    className="p-4 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => handleSort('industry')}
                  >
                    <div className="flex items-center gap-1">
                      Industry
                      {getSortIcon('industry')}
                    </div>
                  </th>
                  <th
                    className="p-4 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </th>
                  <th
                    className="p-4 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => handleSort('joinDate')}
                  >
                    <div className="flex items-center gap-1">
                      Join Date
                      {getSortIcon('joinDate')}
                    </div>
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">
                    Performance
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50">
                {paginatedClients.length > 0 ? (
                  paginatedClients.map((client) => (
                    <tr
                      key={client.id}
                      className="transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-white"
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedClients.includes(client.id)}
                          onChange={() => toggleSelectClient(client.id)}
                          className="rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 hover:scale-110"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${client.logoColor} flex items-center justify-center text-white font-bold shadow-md`}>
                            {client.logo}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{client.name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Building size={12} />
                              {client.industry}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <User size={14} className="text-gray-400" />
                            <span className="font-medium">{client.contactPerson}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail size={14} />
                            <span className="truncate max-w-[180px]">{client.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone size={14} />
                            <span>{client.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {client.industry}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${statusColors[client.status]}`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={14} />
                          <span className="text-sm">{new Date(client.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-2">
                          <div>
                            <div className="text-xs text-gray-500">Projects</div>
                            <div className="text-sm font-semibold text-gray-900">{client.projects}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Revenue</div>
                            <div className="text-sm font-semibold text-emerald-600">{client.revenue}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedClient({ ...client });
                              setShowEditModal(true);
                            }}
                            className="p-2 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 hover:from-blue-100 hover:to-blue-200 hover:text-blue-700 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:shadow border border-blue-200"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClient(client.id)}
                            className="p-2 rounded-lg bg-gradient-to-r from-red-50 to-red-100 text-red-600 hover:from-red-100 hover:to-red-200 hover:text-red-700 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:shadow border border-red-200"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-8 text-center">
                      <div className="text-gray-500">
                        <Search size={48} className="mx-auto mb-4 text-gray-300" />
                        <p className="font-medium">No clients found</p>
                        <p className="text-sm mt-1">Try adding a new client or adjusting your filters</p>
                        <button
                          onClick={() => setShowAddModal(true)}
                          className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Add Your First Client
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer with Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50/50 to-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">
                  {Math.min((currentPage - 1) * itemsPerPage + 1, filteredAndSortedClients.length)}-
                  {Math.min(currentPage * itemsPerPage, filteredAndSortedClients.length)}
                </span> of <span className="font-semibold text-gray-900">{filteredAndSortedClients.length}</span> clients
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow"
                >
                  Previous
                </button>

                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={index} className="px-2 text-gray-400">...</span>
                  ) : (
                    <button
                      key={index}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow ${currentPage === page
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                        : 'border border-gray-300 bg-white hover:bg-gray-50'
                        }`}
                    >
                      {page}
                    </button>
                  )
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow"
                >
                  Next
                </button>
              </div>
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
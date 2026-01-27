import { useState } from 'react';
import Table from '../../components/Table';
import { User, Search } from 'lucide-react';
import Pagination from '../../components/Pagination';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteConfirmToast from "../../components/DeleteConfirmToast";

const ClientsTable = () => {
  const [clients, setClients] = useState([
    {
      id: "CLI001",
      companyName: "TechNova Solutions",
      contactName: "Rahul Mehta",
      contactPhone: "+91 98765 43210",
      contactEmail: "rahul@technova.com",
      category: "Technology",
      nature: "Software Development",
      state: "Delhi",
      city: "New Delhi",
      source: "Website",
      enquiryFor: "Office Interior",
      status: "active",
      updatedStatus: "Contacted",
      updatedDetails: "Initial discussion completed",
      createdAt: "2024-01-12",
      lastContact: "2024-03-10",
    },
    {
      id: "CLI002",
      companyName: "UrbanSpace Designs",
      contactName: "Ananya Sharma",
      contactPhone: "+91 91234 56789",
      contactEmail: "ananya@urbanspace.com",
      category: "Design",
      nature: "Interior Design",
      state: "Maharashtra",
      city: "Mumbai",
      source: "Referral",
      enquiryFor: "Workspace Design",
      status: "pending",
      updatedStatus: "Proposal Sent",
      updatedDetails: "Awaiting approval",
      createdAt: "2024-02-03",
      lastContact: "2024-03-14",
    },
    {
      id: "CLI003",
      companyName: "GreenGrid Energy",
      contactName: "Amit Verma",
      contactPhone: "+91 99887 66554",
      contactEmail: "amit@greengrid.com",
      category: "Energy",
      nature: "Renewable Energy",
      state: "Karnataka",
      city: "Bengaluru",
      source: "Trade Show",
      enquiryFor: "Office Renovation",
      status: "inactive",
      updatedStatus: "On Hold",
      updatedDetails: "Budget issue",
      createdAt: "2023-11-20",
      lastContact: "2024-02-25",
    },])

  const columns = [
    {
      label: "Company Name",
      key: "companyName",
      render: (row) => (
        <div>
          <div className="font-medium">{row.companyName}</div>
          <div className="text-xs text-gray-500">ID: {row.id}</div>
        </div>
      ),
    },
    {
      label: "Contact Details",
      key: "contactName",
      render: (row) => (
        <div>
          {/* <div className="font-medium">{row.contactName}</div> */}
          <div
            onClick={() => {
              localStorage.setItem("selectedClient", JSON.stringify(row));
              navigate(`/corporate-profile/${row.id}`);
            }}
            className="font-medium text-blue-600 cursor-pointer hover:underline"
          >
            {row.contactName}
          </div>
          <div className="text-sm text-gray-500">{row.contactPhone}</div>
        </div>
      ),
    },
    {
      label: "Category",
      key: "category",
      render: (row) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium text-gray-700">
          {row.category}
        </span>
      ),
    },
    {
      label: "nature",
      key: "nature",
      render: (row) => (
        <span className='px-3 py-1 rounded-full text-xs font-medium text-gray-700 '>
          {row.nature}
        </span>
      ),
    },
    {
      label: "state/City",
      key: "state",
      render: (row) => (
        <div>
          <div className="font-medium">{row.state}</div>
          <div className="text-xs text-gray-500">{row.city}</div>
        </div>
      ),
    },
    {
      label: "source/enqFor",
      key: "source",
      render: (row) => (
        <div>
          <div className="font-medium">{row.source}</div>
          <div className="text-xs text-gray-500">{row.enquiryFor}</div>
        </div>
      ),
    },
    {
      label: "status",
      key: "status",
      render: (row) => (
        <span className='px-3 py-1 rounded-full text-xs font-medium text-gray-700'>
          {row.status}
        </span>
      ),
    },
    {
      label: "Updated status",
      key: "status",
      render: (row) => (
        <span className='px-3 py-1 rounded-full text-xs font-medium text-gray-700'>
          {row.updatedStatus}
        </span>
      ),
    },
    {
      label: "Updated Details",
      key: "status",
      render: (row) => (
        <span className='px-3 py-1 rounded-full text-xs font-medium text-gray-700'>
          {row.updatedDetails}
        </span>
      ),
    },
  ];

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // or 10
  const [editingRow, setEditingRow] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedRow, setExpandedRow] = useState(null);

  // 1️⃣ Filter & sort FIRST
  const filteredAndSortedClients = clients
    .filter(client => {
      const matchesSearch =
        client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || client.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      return sortConfig.direction === 'asc'
        ? a[sortConfig.key]?.toString().localeCompare(b[sortConfig.key]?.toString())
        : b[sortConfig.key]?.toString().localeCompare(a[sortConfig.key]?.toString());
    });

  // 2️⃣ THEN paginate
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredAndSortedClients.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Categories and status options
  const categories = ['Technology', 'Design', 'Energy', 'Healthcare', 'Retail', 'Finance', 'Manufacturing', 'Education'];
  const statusOptions = ['active', 'pending', 'inactive'];
  const updatedStatusOptions = ['New Enquiry', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost', 'On Hold'];

  // Handle sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800 border border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      inactive: 'bg-red-100 text-red-800 border border-red-200',
    };
    return colors[status] || colors.pending;
  };

  const getUpdatedStatusColor = (status) => {
    const colors = {
      'New Enquiry': 'bg-blue-100 text-blue-800 border border-blue-200',
      'Contacted': 'bg-indigo-100 text-indigo-800 border border-indigo-200',
      'Meeting Scheduled': 'bg-purple-100 text-purple-800 border border-purple-200',
      'Proposal Sent': 'bg-amber-100 text-amber-800 border border-amber-200',
      'Negotiation': 'bg-orange-100 text-orange-800 border border-orange-200',
      'Closed Won': 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      'Closed Lost': 'bg-rose-100 text-rose-800 border border-rose-200',
      'On Hold': 'bg-gray-100 text-gray-800 border border-gray-200',
    };
    return colors[status] || colors['New Enquiry'];
  };

  // Edit functionality
  const startEditing = (client) => {
    localStorage.setItem("selectedClient", JSON.stringify(client));
    navigate(`/corporate-profile/${client.id}`);
  };

  const saveEdit = () => {
    const updatedClients = clients.map(client =>
      client.id === editData.id ? { ...editData, lastContact: new Date().toISOString().split('T')[0] } : client
    );
    setClients(updatedClients);
    setEditingRow(null);
    setEditData({});
  };

  const cancelEdit = () => {
    setEditingRow(null);
    setEditData({});
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  // Delete functionality
  const handleDelete = (client) => {
    toast(
      <DeleteConfirmToast
        onDelete={() => {
          setClients(prev => prev.filter(c => c.id !== client.id));
          toast.success("Client deleted successfully");
        }}
      />,
      {
        closeOnClick: false,
        closeButton: true,
        autoClose: false,
      }
    );
  }
  // Add new client
  const handleAddClient = () => {
    const newClient = {
      id: `CLI${String(clients.length + 1).padStart(3, '0')}`,
      companyName: 'New Client',
      contactName: 'Contact Person',
      contactPhone: '+1 (555) 000-0000',
      contactEmail: 'email@example.com',
      category: 'Technology',
      nature: 'Business',
      state: 'State',
      city: 'City',
      source: 'Website',
      enquiryFor: 'Office Interior',
      status: 'pending',
      updatedStatus: 'New Enquiry',
      updatedDetails: 'New client added',
      createdAt: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
    };
    setClients([newClient, ...clients]);
  };

  // Export data
  const handleExport = () => {
    const csvContent = [
      ['ID', 'Company Name', 'Contact Name', 'Phone', 'Email', 'Category', 'Nature', 'State', 'City', 'Source', 'Enquiry For', 'Status', 'Updated Status', 'Updated Details', 'Created', 'Last Contact'],
      ...clients.map(client => [
        client.id,
        client.companyName,
        client.contactName,
        client.contactPhone,
        client.contactEmail,
        client.category,
        client.nature,
        client.state,
        client.city,
        client.source,
        client.enquiryFor,
        client.status,
        client.updatedStatus,
        client.updatedDetails,
        client.createdAt,
        client.lastContact,
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clients_list.csv';
    a.click();
  };

  return (
    <div className="bg-white rounded-md shadow-lg border border-gray-200 mt-6">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-amber-600">Corporate Clients List</h1>
            <p className="text-gray-600 mt-1 text-lg">Manage all your corporate clients in one place</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAddClient}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Add New Client
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredAndSortedClients.length} of {clients.length} clients
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto ">
        <Table
          columns={columns}
          data={paginatedClients}
          onEdit={startEditing}
          onDelete={handleDelete}
        />

        {filteredAndSortedClients.length > 0 && (
          <div className="mt-4 mb-2 p-1">
            <Pagination
              currentPage={currentPage}
              totalItems={filteredAndSortedClients.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsTable;
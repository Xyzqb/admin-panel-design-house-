import React, { useState } from 'react';
import { 
  Edit2, 
  Trash2, 
  Eye, 
  Phone, 
  Mail, 
  Building2, 
  MapPin, 
  User, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Save,
  X,
  Download,
  Filter,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const ClientsTable = () => {
  const [clients, setClients] = useState([
    {
      id: 'CLI001',
      companyName: 'TechCorp Solutions',
      contactName: 'John Smith',
      contactPhone: '+1 (555) 123-4567',
      contactEmail: 'john@techcorp.com',
      category: 'Technology',
      nature: 'Software Development',
      state: 'California',
      city: 'San Francisco',
      source: 'Website',
      enquiryFor: 'Office Interior',
      status: 'active',
      updatedStatus: 'Contacted',
      updatedDetails: '2024-03-15 - Meeting scheduled',
      createdAt: '2024-01-10',
      lastContact: '2024-03-15',
    },
    {
      id: 'CLI002',
      companyName: 'Urban Design Studio',
      contactName: 'Sarah Johnson',
      contactPhone: '+1 (555) 987-6543',
      contactEmail: 'sarah@urbanstudio.com',
      category: 'Design',
      nature: 'Interior Design',
      state: 'New York',
      city: 'New York',
      source: 'Referral',
      enquiryFor: 'Complete Office Setup',
      status: 'pending',
      updatedStatus: 'Proposal Sent',
      updatedDetails: '2024-03-14 - Proposal delivered',
      createdAt: '2024-02-05',
      lastContact: '2024-03-14',
    },
    {
      id: 'CLI003',
      companyName: 'Green Energy Ltd',
      contactName: 'Michael Chen',
      contactPhone: '+1 (555) 456-7890',
      contactEmail: 'michael@greenenergy.com',
      category: 'Energy',
      nature: 'Renewable Energy',
      state: 'Texas',
      city: 'Austin',
      source: 'Trade Show',
      enquiryFor: 'Office Renovation',
      status: 'inactive',
      updatedStatus: 'On Hold',
      updatedDetails: '2024-03-10 - Budget constraints',
      createdAt: '2023-11-20',
      lastContact: '2024-03-10',
    },
    {
      id: 'CLI004',
      companyName: 'MediCare Hospital',
      contactName: 'Dr. Emily White',
      contactPhone: '+1 (555) 234-5678',
      contactEmail: 'emily@medicare.com',
      category: 'Healthcare',
      nature: 'Hospital Services',
      state: 'Florida',
      city: 'Miami',
      source: 'Email Campaign',
      enquiryFor: 'Hospital Interior',
      status: 'active',
      updatedStatus: 'Negotiation',
      updatedDetails: '2024-03-12 - Price discussion',
      createdAt: '2024-01-25',
      lastContact: '2024-03-12',
    },
    {
      id: 'CLI005',
      companyName: 'Retail Giants',
      contactName: 'Robert Brown',
      contactPhone: '+1 (555) 345-6789',
      contactEmail: 'robert@retailgiants.com',
      category: 'Retail',
      nature: 'Retail Chain',
      state: 'Illinois',
      city: 'Chicago',
      source: 'Cold Calling',
      enquiryFor: 'Store Design',
      status: 'pending',
      updatedStatus: 'New Enquiry',
      updatedDetails: '2024-03-16 - Initial contact',
      createdAt: '2024-03-16',
      lastContact: '2024-03-16',
    },
  ]);

  const [editingRow, setEditingRow] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedRow, setExpandedRow] = useState(null);

  // Categories and status options
  const categories = ['Technology', 'Design', 'Energy', 'Healthcare', 'Retail', 'Finance', 'Manufacturing', 'Education'];
  const statusOptions = ['active', 'pending', 'inactive'];
  const updatedStatusOptions = ['New Enquiry', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost', 'On Hold'];

  // Filter and sort data
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
      
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });

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
    setEditingRow(client.id);
    setEditData({ ...client });
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
  const handleDelete = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(client => client.id !== clientId));
    }
  };

  // View details
  const handleViewDetails = (client) => {
    setExpandedRow(expandedRow === client.id ? null : client.id);
  };

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
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Clients List</h1>
            <p className="text-gray-600 mt-1">Manage all your corporate clients in one place</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAddClient}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Add New Client
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
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
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('companyName')}>
                  Company Name
                  {sortConfig.key === 'companyName' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('category')}>
                  Category
                  {sortConfig.key === 'category' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nature
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('state')}>
                  State/City
                  {sortConfig.key === 'state' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Source/Enquiry
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('status')}>
                  Status
                  {sortConfig.key === 'status' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Updated Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredAndSortedClients.map((client) => (
              <React.Fragment key={client.id}>
                <tr className={`hover:bg-gray-50 transition-colors ${expandedRow === client.id ? 'bg-blue-50' : ''}`}>
                  {/* Company Name */}
                  <td className="px-6 py-4">
                    {editingRow === client.id ? (
                      <input
                        type="text"
                        value={editData.companyName}
                        onChange={(e) => handleEditChange('companyName', e.target.value)}
                        className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-medium text-gray-900">{client.companyName}</div>
                          <div className="text-xs text-gray-500">ID: {client.id}</div>
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Contact Details */}
                  <td className="px-6 py-4">
                    {editingRow === client.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editData.contactName}
                          onChange={(e) => handleEditChange('contactName', e.target.value)}
                          className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          value={editData.contactPhone}
                          onChange={(e) => handleEditChange('contactPhone', e.target.value)}
                          className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Phone"
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-1">
                          {client.contactName}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          {client.contactPhone}
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    {editingRow === client.id ? (
                      <select
                        value={editData.category}
                        onChange={(e) => handleEditChange('category', e.target.value)}
                        className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {client.category}
                      </span>
                    )}
                  </td>

                  {/* Nature */}
                  <td className="px-6 py-4">
                    {editingRow === client.id ? (
                      <input
                        type="text"
                        value={editData.nature}
                        onChange={(e) => handleEditChange('nature', e.target.value)}
                        className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    ) : (
                      <span className="text-gray-700">{client.nature}</span>
                    )}
                  </td>

                  {/* State/City */}
                  <td className="px-6 py-4">
                    {editingRow === client.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editData.state}
                          onChange={(e) => handleEditChange('state', e.target.value)}
                          className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="State"
                        />
                        <input
                          type="text"
                          value={editData.city}
                          onChange={(e) => handleEditChange('city', e.target.value)}
                          className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="City"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <div>
                          <div className="font-medium text-gray-900">{client.state}</div>
                          <div className="text-xs text-gray-600">{client.city}</div>
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Source/Enquiry */}
                  <td className="px-6 py-4">
                    {editingRow === client.id ? (
                      <div className="space-y-2">
                        <select
                          value={editData.source}
                          onChange={(e) => handleEditChange('source', e.target.value)}
                          className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="Website">Website</option>
                          <option value="Referral">Referral</option>
                          <option value="Trade Show">Trade Show</option>
                          <option value="Email Campaign">Email Campaign</option>
                          <option value="Cold Calling">Cold Calling</option>
                        </select>
                        <input
                          type="text"
                          value={editData.enquiryFor}
                          onChange={(e) => handleEditChange('enquiryFor', e.target.value)}
                          className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Enquiry For"
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="text-sm font-medium text-gray-900">{client.source}</div>
                        <div className="text-xs text-gray-600 mt-1">{client.enquiryFor}</div>
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {editingRow === client.id ? (
                      <select
                        value={editData.status}
                        onChange={(e) => handleEditChange('status', e.target.value)}
                        className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </span>
                    )}
                  </td>

                  {/* Updated Status */}
                  <td className="px-6 py-4">
                    {editingRow === client.id ? (
                      <select
                        value={editData.updatedStatus}
                        onChange={(e) => handleEditChange('updatedStatus', e.target.value)}
                        className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        {updatedStatusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    ) : (
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUpdatedStatusColor(client.updatedStatus)}`}>
                          {client.updatedStatus}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          <Calendar className="inline h-3 w-3 mr-1" />
                          {client.lastContact}
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {editingRow === client.id ? (
                        <>
                          <button
                            onClick={saveEdit}
                            className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
                            title="Save"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-1.5 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors"
                            title="Cancel"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleViewDetails(client)}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                            title={expandedRow === client.id ? "Hide Details" : "View Details"}
                          >
                            {expandedRow === client.id ? <ChevronUp className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => startEditing(client)}
                            className="p-1.5 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(client.id)}
                            className="p-1.5 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>

                {/* Expanded Details Row */}
                {expandedRow === client.id && (
                  <tr className="bg-blue-50">
                    <td colSpan="9" className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Client Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Email:</span>
                              <span className="text-gray-900">{client.contactEmail}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Created:</span>
                              <span className="text-gray-900">{client.createdAt}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Last Contact:</span>
                              <span className="text-gray-900">{client.lastContact}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Project Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Source:</span>
                              <span className="text-gray-900">{client.source}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Enquiry For:</span>
                              <span className="text-gray-900">{client.enquiryFor}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Updated Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${getUpdatedStatusColor(client.updatedStatus)}`}>
                                {client.updatedStatus}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Details:</span>
                              <span className="text-gray-900 text-right">{client.updatedDetails}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Quick Actions</h4>
                          <div className="flex flex-wrap gap-2">
                            <button className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors">
                              Send Email
                            </button>
                            <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors">
                              Schedule Call
                            </button>
                            <button className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded text-xs hover:bg-purple-200 transition-colors">
                              View History
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {filteredAndSortedClients.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No clients found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing {filteredAndSortedClients.length} of {clients.length} clients
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Status Legend:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Active</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Pending</span>
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Inactive</span>
            </div>
            
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsTable;
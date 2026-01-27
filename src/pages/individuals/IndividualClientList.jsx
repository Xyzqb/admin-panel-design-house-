import { useState, useEffect } from 'react';
import Table from "../../components/Table";
import Pagination from '../../components/Pagination';
import DeleteConfirmToast from "../../components/DeleteConfirmToast";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Download,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { toast } from 'react-toastify';

const IndividualClientList = () => {
  // Initial sample data

  const columns = [
    {
      label: "ID",
      key: "id",
      render: (row) => (
        <span className="font-semibold text-gray-900">{row.id}</span>
      ),
    },
    {
      label: "Contact",
      key: "name",
      render: (row) => (
        <div>
          <div
            onClick={() => {
              localStorage.setItem("selectedIndividual", JSON.stringify(row));
              navigate(`/individual-profile/${row.id}`);
            }}
            className="font-medium text-blue-600 cursor-pointer hover:underline"
          >
            {row.name}
          </div>

          <div className="text-sm text-gray-500 flex items-center">
            <Phone className="h-3 w-3 mr-1" />
            {row.phone}
          </div>
        </div>
      ),
    },

    {
      label: "City",
      key: "city",
    },
    {
      label: "Source",
      key: "source",
      render: (row) => (
        <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
          {row.source}
        </span>
      ),
    },
    {
      label: "Enquiry For",
      key: "enquiryFor",
    },
    {
      label: "Status",
      key: "status",
      render: (row) => (
        <span
          className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(row.status)}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      label: "Added Details",
      key: "addedDate",
      render: (row) => (
        <div className="text-sm text-gray-700">
          <Calendar className="h-3 w-3 inline mr-1" />
          {row.addedDate}
        </div>
      ),
    },
    {
      label: "Updated Details",
      key: "lastUpdated",
      render: (row) => (
        <div className={`text-xs px-2 py-1 rounded-full inline-flex items-center ${getStatusBadge(row.status)}`}>
          {getStatusIcon(row.status)}
          {row.lastUpdated}
        </div>
      ),
    },
  ];

  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Status options
  const statusOptions = ['All', 'Active', 'Pending', 'Completed', 'Inactive'];

  // Status badge styling
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // Status icon
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'pending':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 mr-1" />;
      default:
        return <Clock className="h-4 w-4 mr-1" />;
    }
  };

  // Load clients from localStorage on component mount
  useEffect(() => {
    const loadClients = () => {
      try {
        const savedClients = localStorage.getItem('clients');
        if (savedClients) {
          const parsedClients = JSON.parse(savedClients);
          // Add IDs to new clients if they don't have them
          const clientsWithIds = parsedClients.map((client, index) => ({
            ...client,
            id: client.id || 2000 + index + 1,
            status: client.status || 'Active',
            addedDate: client.addedDate || new Date().toISOString().split('T')[0],
            lastUpdated: client.lastUpdated || new Date().toISOString().split('T')[0]
          }));
          setClients(clientsWithIds);
          setFilteredClients(clientsWithIds);
        }
      } catch (error) {
        console.error('Error loading clients:', error);
      }
    };

    loadClients();
  }, []);

  // Filter clients based on search and filters
  useEffect(() => {
    let result = clients;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(client =>
        client.name.toLowerCase().includes(term) ||
        client.phone.includes(term) ||
        client.email.toLowerCase().includes(term) ||
        client.city.toLowerCase().includes(term) ||
        client.profession.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (selectedStatus !== 'All') {
      result = result.filter(client => client.status === selectedStatus);
    }

    // City filter
    if (selectedCity !== 'All') {
      result = result.filter(client => client.city === selectedCity);
    }

    setFilteredClients(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedStatus, selectedCity, clients]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  // View client details
  const handleView = (client) => {
    setSelectedClient(client);
    setShowViewModal(true);
  };

  // Edit client
  const handleEdit = (client) => {
    setSelectedClient(client);
    setEditFormData({ ...client });
    setShowEditModal(true);
  };

  // Delete client
  const handleDelete = (client) => {
    toast(
      <DeleteConfirmToast
        onDelete={() => confirmDelete(client.id)} />,
      { autoClose: false }
    );
  };

  const confirmDelete = (id) => {
    const updatedClients = clients.filter(client => client.id !== id);
    setClients(updatedClients);
    localStorage.setItem('clients', JSON.stringify(updatedClients));
    toast.success("Client deleted successfully");
  };

  // Update status
  const updateStatus = (clientId, newStatus) => {
    const updatedClients = clients.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return client;
    });

    setClients(updatedClients);
    localStorage.setItem('clients', JSON.stringify(updatedClients));
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  // Save edited client
  const saveEdit = () => {
    const updatedClients = clients.map(client => {
      if (client.id === editFormData.id) {
        return {
          ...editFormData,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return client;
    });

    setClients(updatedClients);
    localStorage.setItem('clients', JSON.stringify(updatedClients));
    setShowEditModal(false);
    setSelectedClient(null);
    setEditFormData({});
  };

  // Refresh data
  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const savedClients = localStorage.getItem('clients');
      if (savedClients) {
        const parsedClients = JSON.parse(savedClients);
        setClients(parsedClients);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-sm shadow-lg p-6 mt-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-amber-600">Individual Clients List</h1>
            <p className="text-gray-600 mt-1">
              Total: {filteredClients.length} clients
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              onClick={refreshData}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, phone, email, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border border-gray-200">
        <Table
          columns={columns}
          data={paginatedClients}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Pagination */}
      <div className='mt-4'>
        {filteredClients.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={filteredClients.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit Client</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={editFormData.city}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                  <input
                    type="text"
                    name="source"
                    value={editFormData.source}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={editFormData.notes}
                  onChange={handleEditChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualClientList;
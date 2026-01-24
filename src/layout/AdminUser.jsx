import React, { useState } from 'react';
import {
  Search,
  UserPlus,
  Filter,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Edit2,
  Trash2
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from "../components/Pagination";
import Table from '../components/table/Table';

const AdminUser = () => {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      username: "admin",
      email: "admin@example.com",
      status: "Active",
      role: "Super Admin",
      createdAt: "2024-01-15",
      lastLogin: "2024-03-20 14:30"
    },
    {
      id: 2,
      username: "manager",
      email: "manager@example.com",
      status: "Active",
      role: "Content Manager",
      createdAt: "2024-02-10",
      lastLogin: "2024-03-19 09:15"
    },
    {
      id: 3,
      username: "editor",
      email: "editor@example.com",
      status: "Inactive",
      role: "Editor",
      createdAt: "2024-03-01",
      lastLogin: "2024-03-18 16:45"
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const [newAdmin, setNewAdmin] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Editor",
    permissions: []
  });

  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({
      ...newAdmin,
      [name]: value
    });
  };

  const handleCreateAdmin = () => {
    // Validation
    if (!newAdmin.username.trim()) {
      toast.error("Please enter a username");
      return;
    }
    if (!newAdmin.password) {
      toast.error("Please enter a password");
      return;
    }

    const newAdminItem = {
      id: admins.length + 1,
      username: newAdmin.username,
      email: newAdmin.email || `${newAdmin.username}@example.com`,
      status: "Active",
      role: newAdmin.role,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: "Never"
    };

    setAdmins([...admins, newAdminItem]);

    // Show success toast
    toast.success("Admin created successfully!");

    // Reset form
    setNewAdmin({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Editor",
      permissions: []
    });
  };

  const handleDeleteAdmin = (admin) => {
    toast.info(
      <DeleteConfirmToast
        adminName={admin.username}
        onDelete={() => {
          setAdmins(admins.filter(a => a.id !== admin.id));
          toast.success("Admin deleted successfully!");
        }}
      />,
      {
        autoClose: false,
        closeButton: false,
      }
    );
  };

  const handleEditAdmin = (admin) => {
    toast.info(`Edit functionality coming soon for ${admin.username}`);
  };

  // Filter admins based on search
  const filteredAdmins = admins.filter(admin => {
    const matchesSearch =
      admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAdmins = filteredAdmins.slice(
    startIndex,
    startIndex + itemsPerPage
  );


  const columns = [
    {
      key: "id",
      label: "#",
      width: "80px",
      render: (row) => (
        <div className="font-mono text-gray-600">{row.id}</div>
      )
    },
    {
      key: "username",
      label: "USERNAME",
      render: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.username}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
        </div>
      )
    },
    {
      key: "status",
      label: "STATUS",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${row.status === "Active"
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-700 border border-red-200"
            }`}>
            {row.status === "Active" ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <XCircle className="w-3 h-3" />
            )}
            {row.status}
          </div>
        </div>
      )
    },
    {
      key: "createdAt",
      label: "CREATED AT",
      render: (row) => (
        <div className="text-gray-700">{row.createdAt}</div>
      )
    },
    {
      key: "lastLogin",
      label: "LAST LOGIN",
      render: (row) => (
        <div className="text-sm text-gray-600">{row.lastLogin}</div>
      )
    }
  ];

  return (
    <div className="bg-white shadow-md mt-6 p-6">
      <div className="w-full">
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />

        <div className="w-full">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-amber-600">Admin Users</h1>
            <p className="text-gray-600 mt-2 text-lg">Manage admin users and their permissions</p>
          </div>

          {/* Create Admin Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <UserPlus className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Create New Admin</h2>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-end">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={newAdmin.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={newAdmin.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Create Button */}
              <button
                onClick={handleCreateAdmin}
                className="w-full px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Create Admin
              </button>
            </div>
          </div>

          {/* Admin List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between gap-4">

                {/* LEFT: Title */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Admin List
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Showing {filteredAdmins.length} of {admins.length} admins
                  </p>
                </div>

                {/* RIGHT: Search */}
                <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search admins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 text-sm border border-gray-300
                   rounded-lg focus:ring-2 focus:ring-blue-500
                   focus:border-blue-500"
                  />
                </div>

              </div>
            </div>
            

            {/* Table */}
            <div className="">
              <Table
                columns={columns}
                data={paginatedAdmins}
                onEdit={handleEditAdmin}
                onDelete={handleDeleteAdmin}
              />
            </div>

            {/* Table Footer */}
            <div className="mt-4 px-4 pb-4">
              <Pagination
                currentPage={currentPage}
                totalItems={filteredAdmins.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                label="admins"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
import React from 'react'
import { useState, useEffect } from "react";
import {
  Search,
  Download,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  Filter,
  ChevronDown,
  User
} from "lucide-react";
import { toast } from "react-toastify";

import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";
import DeleteConfirmToast from "../components/DeleteConfirmToast";
import Table from '../components/Table';

const EnquiryList = () => {
  /* ---------------- STATE ---------------- */
  const [queries, setQueries] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);

  /* ---------------- INITIAL DATA ---------------- */
  const initialQueries = [
    {
      id: 1,
      userName: "asas",
      email: "kg@echallan.app",
      phone: "asasa",
      issueType: "App Problem",
      message: "asa",
      date: "Jan 8, 2026",
      status: "pending"
    },
    {
      id: 2,
      userName: "vansh chaudhary",
      email: "vansh2002@gmail.com",
      phone: "+919312207374",
      issueType: "Payment Problem",
      message: "12121212",
      date: "Jan 8, 2026",
      status: "pending"
    }
  ];

  const columns = [
    {
      label: "User",
      key: "userName",
      render: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.userName}</div>
          {row.status === "new" && (
            <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
              New
            </span>
          )}
        </div>
      ),
    },
    {
      label: "Contact",
      key: "email",
      render: (row) => (
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            {row.email}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            {row.phone}
          </div>
        </div>
      ),
    },
    {
      label: "Issue Type",
      key: "issueType",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${row.issueType === "Payment Problem"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {row.issueType}
        </span>
      ),
    },
    {
      label: "Message",
      key: "message",
      render: (row) => (
        <div className="max-w-xs">
          <p className="truncate text-sm">{row.message}</p>
          <button
            onClick={() => handleViewMessage(row)}
            className="text-blue-600 text-xs mt-1 hover:underline"
          >
            View full
          </button>
        </div>
      ),
    },
    {
      label: "Date",
      key: "date",
      render: (row) => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          {row.date}
        </div>
      ),
    },
  ];

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("supportQueries")) || initialQueries;
    setQueries(saved);
  }, []);

  /* ---------------- SAVE DATA ---------------- */
  const saveQueries = (updatedQueries) => {
    setQueries(updatedQueries);
    localStorage.setItem("supportQueries", JSON.stringify(updatedQueries));
  };

  /* ---------------- FILTER ---------------- */
  const filteredQueries = queries.filter((query) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      query.userName?.toLowerCase().includes(searchLower) ||
      query.email?.toLowerCase().includes(searchLower) ||
      query.phone?.toLowerCase().includes(searchLower) ||
      query.issueType?.toLowerCase().includes(searchLower) ||
      query.message?.toLowerCase().includes(searchLower)
    );
  });

  /* ---------------- STATS ---------------- */
  const totalQueries = filteredQueries.length;
  const newQueries = filteredQueries.filter(q => q.status === "new").length;

  /* ---------------- PAGINATION ---------------- */
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentQueries = filteredQueries.slice(startIndex, endIndex);

  /* ---------------- ACTIONS ---------------- */

  const handleDelete = (id) => {
    toast(
      <DeleteConfirmToast
        onDelete={() => {
          const updated = queries.filter((query) => query.id !== id);
          saveQueries(updated);
          toast.success("Query deleted successfully");
        }}
      />,
      { autoClose: false }
    );
  };

  const handleBulkDelete = () => {
    if (!selectedRows.length) {
      toast.warning("Please select queries to delete");
      return;
    }

    toast(
      <DeleteConfirmToast
        onDelete={() => {
          const updated = queries.filter(
            (query) => !selectedRows.includes(query.id)
          );
          saveQueries(updated);
          setSelectedRows([]);
          toast.success(`${selectedRows.length} query(s) deleted successfully`);
        }}
      />,
      { autoClose: false }
    );
  };

  const exportToExcel = (selectedOnly = false) => {
    const dataToExport = selectedOnly
      ? queries.filter(q => selectedRows.includes(q.id))
      : queries;

    if (selectedOnly && !selectedRows.length) {
      toast.warning("Please select queries to export");
      return;
    }

    if (!dataToExport.length) {
      toast.warning("No data to export");
      return;
    }

    // Prepare data for export
    const exportData = dataToExport.map(query => ({
      "User": query.userName,
      "Email": query.email,
      "Phone": query.phone,
      "Issue Type": query.issueType,
      "Message": query.message,
      "Date": query.date,
      "Status": query.status
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Support Queries");
    XLSX.writeFile(wb, `support-queries-${new Date().toISOString().split('T')[0]}.xlsx`);

    toast.success(`Exported ${exportData.length} query(s) successfully`);
  };

  const handleEditQuery = (query) => {
    setEditData({ ...query });
    setShowEditModal(true);
  };

  const handleMarkAsResolved = (id) => {
    const updated = queries.map(query =>
      query.id === id ? { ...query, status: "resolved" } : query
    );
    saveQueries(updated);
    toast.success("Query marked as resolved");
  };

  /* ---------------- RENDER ---------------- */
  return (
    <div className="bg-white rounded-xl shadow-md mt-6 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 uppercase">
          Support Queries
        </h1>
        <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-lg">
          Manage support queries submitted by users
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, phone, issue..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Filter Header - Mobile & Desktop */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          <div className="text-sm text-gray-600">
            <span className="font-medium">Total: {totalQueries}</span>
            <span className="mx-2">•</span>
            <span className="text-blue-600 font-medium">New: {newQueries}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => exportToExcel(false)}
            className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export All</span>
          </button>

          <button
            onClick={() => exportToExcel(true)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Selected</span>
          </button>
        </div>
      </div>

      {/* Filters Dropdown */}
      {showFilters && (
        <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Type
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option value="all">All Types</option>
                <option value="app">App Problem</option>
                <option value="payment">Payment Problem</option>
                <option value="technical">Technical Issue</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date From
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date To
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Button */}
      {selectedRows.length > 0 && (
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-red-50 p-3 rounded-lg">
          <div className="text-sm text-red-700 font-medium">
            {selectedRows.length} query(s) selected
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Delete Selected
            </button>
            <button
              onClick={() => handleMarkAsResolved(selectedRows[0])}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Mark as Resolved
            </button>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <Table
            columns={columns}
            data={currentQueries}
            onEdit={(row) => handleEditQuery(row)}
            onDelete={(row) => handleDelete(row.id)}
          />
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4 p-4">
          {currentQueries.map((query) => (
            <div
              key={query.id}
              className={`border border-gray-200 rounded-lg p-4 ${query.status === 'new' ? 'bg-blue-50 border-blue-200' : ''}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{query.userName}</h3>
                    {query.status === 'new' && (
                      <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(query.id)}
                  onChange={() =>
                    setSelectedRows((prev) =>
                      prev.includes(query.id)
                        ? prev.filter((id) => id !== query.id)
                        : [...prev, query.id]
                    )
                  }
                  className="rounded border-gray-300"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Mail className="w-4 h-4" />
                    <span>{query.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{query.phone}</span>
                  </div>
                </div>

                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${query.issueType === 'Payment Problem'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {query.issueType}
                  </span>
                </div>

                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">Message:</p>
                  <p className="line-clamp-2">{query.message}</p>
                  <button
                    onClick={() => handleViewMessage(query)}
                    className="text-blue-600 hover:text-blue-800 text-sm mt-1"
                  >
                    View full message
                  </button>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{query.date}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleViewMessage(query)}
                  className="p-2 hover:bg-blue-50 rounded-md text-blue-600"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleMarkAsResolved(query.id)}
                  className="p-2 hover:bg-green-50 rounded-md text-green-600"
                  title="Mark as Resolved"
                >
                  <span className="text-sm">✓</span>
                </button>

                <button
                  onClick={() => handleDelete(query.id)}
                  className="p-2 hover:bg-red-50 rounded-md text-red-600"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredQueries.length === 0 && (
          <div className="py-12">
            <EmptyState
              title="No support queries found"
              description={searchTerm
                ? "No queries match your search. Try a different search term."
                : "No support queries have been submitted yet."
              }
              actionLabel="Clear Search"
              onAction={() => setSearchTerm("")}
            />
          </div>
        )}
      </div>

      {/* Pagination & Footer */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalItems={filteredQueries.length}
          itemsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {showEditModal && editData && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white shadow-xl max-w-4xl w-full overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Update Enquiry
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-sm">

              {/* User Name */}
              <div>
                <label className="text-gray-500">User Name</label>
                <input
                  type="text"
                  value={editData.userName}
                  onChange={(e) =>
                    setEditData({ ...editData, userName: e.target.value })
                  }
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-500">Email</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-gray-500">Phone</label>
                <input
                  type="text"
                  value={editData.phone}
                  onChange={(e) =>
                    setEditData({ ...editData, phone: e.target.value })
                  }
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              {/* Issue Type */}
              <div>
                <label className="text-gray-500">Issue Type</label>
                <select
                  value={editData.issueType}
                  onChange={(e) =>
                    setEditData({ ...editData, issueType: e.target.value })
                  }
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                >
                  <option>App Problem</option>
                  <option>Payment Problem</option>
                  <option>Technical Issue</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-gray-500">Message</label>
                <textarea
                  rows={4}
                  value={editData.message}
                  onChange={(e) =>
                    setEditData({ ...editData, message: e.target.value })
                  }
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-gray-500">Status</label>
                <select
                  value={editData.status}
                  onChange={(e) =>
                    setEditData({ ...editData, status: e.target.value })
                  }
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                >
                  <option value="new">New</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  const updated = queries.map(q =>
                    q.id === editData.id ? editData : q
                  );
                  saveQueries(updated);
                  toast.success("Query updated successfully");
                  setShowEditModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
export default EnquiryList;
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import {
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
} from 'lucide-react';
import { showDeleted } from "../../data/toast";
import DeleteConfirmToast from "../../components/DeleteConfirmToast";
import { SearchBar } from "../../components/SearchBar";
import Table from '../../components/Table';

const ClientList = () => {

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("testimonials")) || [];
    setTestimonials(stored);
  }, []);

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "name",
      label: "Name",
      render: (row) => row.name || "No Name",
    },
    {
      key: "url",
      label: "URL",
      render: (row) => (
        <a
          href={row.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {row.url}
        </a>
      ),
    },
    {
      key: "image",
      label: "Photo",
      render: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt="client"
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${row.status === "Active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
            }`}
        >
          {row.status === "Active" ? (
            <CheckCircle className="h-3 w-3 mr-1" />
          ) : (
            <XCircle className="h-3 w-3 mr-1" />
          )}
          {row.status}
        </span>
      ),
    },
  ];

  // State for testimonials
  const [testimonials, setTestimonials] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRows, setSelectedRows] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  // Handle edit testimonial
  const handleEdit = (testimonial) => {
    setEditingTestimonial({ ...testimonial });
    setShowEditModal(true);
  };

  // Save edited testimonial
  const saveEditedTestimonial = () => {
    if (editingTestimonial) {
      const updatedTestimonials = testimonials.map(t =>
        t.id === editingTestimonial.id ? editingTestimonial : t
      );
      setTestimonials(updatedTestimonials);
      setShowEditModal(false);
      setEditingTestimonial(null);
    }
  };

  // Toggle row selection
  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Select all rows
  const toggleSelectAll = () => {
    if (selectedRows.length === testimonials.length) {
      setSelectedRows([]);
    } else {
      const allIds = testimonials.map(t => t.id);
      setSelectedRows(allIds);
    }
  };

  // Bulk delete selected rows
  const handleBulkDelete = () => {
    if (selectedRows.length > 0) {
      const updatedTestimonials = testimonials.filter(
        t => !selectedRows.includes(t.id)
      );

      setTestimonials(updatedTestimonials);
      localStorage.setItem("testimonials", JSON.stringify(updatedTestimonials));
      setSelectedRows([]);

      showDeleted(); // ✅ toast on bulk delete
    }
  };

  // Filter testimonials based on search and status filter
  const filteredTestimonials = testimonials.filter((testimonial) => {
    const name = testimonial.name || "";
    const status = testimonial.status || "";

    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setRowsPerPage(value);
  };

  return (
    <div className="bg-white shadow-sm mt-6 p-4 md:p-6">
      <div className="w-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-amber-600">Clients List</h1>
          <p className="text-gray-600 mt-2 text-lg">Manage and view all clients in your system</p>
        </div>

        <SearchBar
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(value) => {
            setRowsPerPage(value);
            setCurrentPage(1);
          }}
          searchValue={searchTerm}
          onSearchChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
          searchPlaceholder="Search by title, project or event..."
        />

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              data={filteredTestimonials.slice(0, rowsPerPage)}
              onEdit={(row) => {
                localStorage.setItem("editClient", JSON.stringify(row));
                window.location.href = "/add-clients";
              }}
              onDelete={(row) =>
                toast(
                  <DeleteConfirmToast
                    onDelete={() => {
                      const updated = testimonials.filter(
                        (t) => t.id !== row.id
                      );

                      setTestimonials(updated);
                      localStorage.setItem(
                        "testimonials",
                        JSON.stringify(updated)
                      );

                      showDeleted();
                    }}
                  />,
                  { autoClose: false }
                )
              }
            />

            {/* <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      checked={selectedRows.length === testimonials.length && testimonials.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Id
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Url
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Photo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTestimonials.slice(0, rowsPerPage).map((testimonial) => (
                  <tr
                    key={testimonial.id}
                    className={`hover:bg-gray-50 transition-colors ${selectedRows.includes(testimonial.id) ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        checked={selectedRows.includes(testimonial.id)}
                        onChange={() => toggleRowSelection(testimonial.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {testimonial.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {testimonial.name || "No Name"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <a
                        href={testimonial.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {testimonial.url}
                      </a>

                    </td>
                    <td className="px-6 py-4">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt="testimonial"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${testimonial.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {testimonial.status === 'Active' ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-1" />
                        )}
                        {testimonial.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            localStorage.setItem("editClient", JSON.stringify(testimonial));
                            window.location.href = "/add-clients";
                          }}
                          className="text-blue-600 hover:text-blue-900 p-1.5 rounded-lg hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            toast(
                              <DeleteConfirmToast
                                onDelete={() => {
                                  const updated = testimonials.filter(
                                    t => t.id !== testimonial.id
                                  );

                                  setTestimonials(updated);
                                  localStorage.setItem(
                                    "testimonials",
                                    JSON.stringify(updated)
                                  );

                                  showDeleted();
                                }}
                              />,
                              { autoClose: false }
                            )
                          }
                          className="text-red-600 hover:text-red-900 p-1.5 rounded-lg hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>

          {/* Empty state */}
          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">No testimonials found</div>
              <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(rowsPerPage, filteredTestimonials.length)}</span> of{' '}
                <span className="font-medium">{filteredTestimonials.length}</span> results
              </div>
              <div className="text-sm text-gray-700">
                {selectedRows.length > 0 && (
                  <span className="mr-4">
                    {selectedRows.length} row{selectedRows.length !== 1 ? 's' : ''} selected
                  </span>
                )}
                Total: {testimonials.length} testimonials
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientList
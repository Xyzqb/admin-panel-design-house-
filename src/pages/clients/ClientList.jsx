import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import {
  CheckCircle,
  XCircle,
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
          <h1 className="text-3xl font-bold text-amber-600 uppercase">Clients List</h1>
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
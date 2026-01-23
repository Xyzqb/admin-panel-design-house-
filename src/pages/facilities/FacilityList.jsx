import Table from "../../components/table/Table";
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import EmptyState from '../../components/EmptyState';
import { toast } from "react-toastify";

const FacilitiesList = () => {
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [facilities, setFacilities] = useState([]);

  // Load from localStorage on component mount
  useEffect(() => {
    const savedFacilities = localStorage.getItem('facilities');
    if (savedFacilities) {
      setFacilities(JSON.parse(savedFacilities));
    }
  }, []);

  // Save to localStorage whenever facilities change
  useEffect(() => {
    localStorage.setItem('facilities', JSON.stringify(facilities));
  }, [facilities]);

  // Status badge component
  const StatusBadge = ({ status }) => (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 'Active' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
      {status}
    </span>
  );

  const filteredFacilities = facilities.filter(facility =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFacilities.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedFacilities = filteredFacilities.slice(startIndex, startIndex + rowsPerPage);

  const handleEdit = (facility) => {
    localStorage.setItem("editFacility", JSON.stringify(facility));
    toast.info("Edit mode enabled");
    navigate("/add-facilities");
  };

  const handleDelete = (id) => {
    setFacilities(prev =>
      prev.filter(facility => facility.id !== id)
    );

    toast.success("Facility deleted successfully");
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  const columns = [
    {
      label: "ID",
      key: "id",
      render: (row) => (
        <span className="font-semibold text-gray-900">#{row.id}</span>
      ),
    },
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Status",
      key: "status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="bg-white shadow-md mt-6 p-4 md:p-6">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-amber-600 mb-2">Facilities List</h1>
              <p className="text-gray-600 text-lg">Manage and view all your facilities</p>
            </div>
            <button
              onClick={() => navigate("/add-facilities")}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors border border-blue-700"
            >
              <Plus className="w-5 h-5" />
              Add Facility
            </button>
          </div>
        </div>

        {/* Controls */}
        <SearchBar
          rowsPerPage={rowsPerPage}
          totalItems={filteredFacilities.length}
          onRowsPerPageChange={(value) => {
            setRowsPerPage(value);
            setCurrentPage(1);
          }}
          searchValue={searchTerm}
          onSearchChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
          searchPlaceholder="Search facilities..."
        />

        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <Table
            columns={columns}
            data={paginatedFacilities}
            onEdit={(row) => handleEdit(row)}
            onDelete={(row) => handleDelete(row.id)}
          />

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-blue-50">
            <Pagination
              currentPage={currentPage}
              totalItems={filteredFacilities.length}
              itemsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredFacilities.length === 0 && (
          <EmptyState
            title="No Facility found"
            description="You haven't added any Facility yet."
            actionLabel="Add Facility "
            onAction={() => navigate("/add-facilities")}
          />
        )}
      </div>
    </div>
  );
};

export default FacilitiesList;
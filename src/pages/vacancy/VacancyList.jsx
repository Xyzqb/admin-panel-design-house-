import { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Eye,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { SearchBar } from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import EmptyState from "../../components/EmptyState";
import DeleteConfirmToast from "../../components/DeleteConfirmToast";
import Table from "../../components/Table";

const VacancyList = () => {
  const navigate = useNavigate();

  /* ---------------- STATE ---------------- */
  const [vacancies, setVacancies] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("vacancies")) || [];
    setVacancies(saved);
  }, []);

  const handleEdit = (row) => {
    localStorage.setItem("editVacancy", JSON.stringify(row));
    navigate("/add-vacancy");
  };


  /* ---------------- FILTER ---------------- */
  const filteredVacancies = vacancies.filter((v) => {
    const matchesSearch = v.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || v.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* ---------------- PAGINATION ---------------- */
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentVacancies = filteredVacancies.slice(startIndex, endIndex);

  /* ---------------- ACTIONS ---------------- */

  const toggleStatus = (id) => {
    const updated = vacancies.map((v) =>
      v.id === id
        ? { ...v, status: v.status === "Active" ? "Inactive" : "Active" }
        : v
    );

    setVacancies(updated);
    localStorage.setItem("vacancies", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    toast(
      <DeleteConfirmToast
        onDelete={() => {
          const updated = vacancies.filter((v) => v.id !== id);
          setVacancies(updated);
          localStorage.setItem("vacancies", JSON.stringify(updated));
        }}
      />,
      { autoClose: false }
    );
  };

  const handleBulkDelete = () => {
    if (!selectedRows.length) return;

    toast(
      <DeleteConfirmToast
        onDelete={() => {
          const updated = vacancies.filter(
            (v) => !selectedRows.includes(v.id)
          );
          setVacancies(updated);
          localStorage.setItem("vacancies", JSON.stringify(updated));
          setSelectedRows([]);
        }}
      />,
      { autoClose: false }
    );
  };

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "vacancyCount",
      label: "No. of Vacancy",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-400" />
          {row.vacancyCount}
        </div>
      ),
    },
    {
      key: "responsibilities",
      label: "Responsibilities",
      render: (row) => (
        <div
          className="max-w-xs truncate"
          dangerouslySetInnerHTML={{ __html: row.responsibilities }}
        />
      ),
    },
    {
      key: "experience",
      label: "Experience",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <button
          onClick={() => toggleStatus(row.id)}
          className={`px-3 py-1 rounded-full text-xs font-medium ${row.status === "Active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
            }`}
        >
          {row.status}
        </button>
      ),
    },
  ];

  /* ---------------- RENDER ---------------- */
  return (
    <div className="bg-white shadow-md mt-6 p-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-amber-600">
          Vacancy List
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Manage and view all job vacancies
        </p>
      </div>

      {/* SearchBar */}
      <SearchBar
        rowsPerPage={rowsPerPage}
        totalItems={filteredVacancies.length}
        onRowsPerPageChange={(value) => {
          setRowsPerPage(value);
          setCurrentPage(1);
        }}
        searchValue={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
      />

      {/* Bulk Delete */}
      {selectedRows.length > 0 && (
        <button
          onClick={handleBulkDelete}
          className="mb-4 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Delete Selected ({selectedRows.length})
        </button>
      )}

      {/* Table */}
      <div className="border rounded-md overflow-hidden">
        <Table
          columns={columns}
          data={currentVacancies}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {filteredVacancies.length === 0 && (
          <EmptyState
            title="No vacancies found"
            description="You haven't added any vacancies yet."
            actionLabel="Add Vacancy"
            onAction={() => navigate("/add-vacancy")}
          />
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalItems={filteredVacancies.length}
          itemsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default VacancyList;
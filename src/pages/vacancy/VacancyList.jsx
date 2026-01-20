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
        <table className="w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3">Vacancies</th>
              <th className="px-4 py-3">Experience</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentVacancies.map((v) => (
              <tr key={v.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(v.id)}
                    onChange={() =>
                      setSelectedRows((prev) =>
                        prev.includes(v.id)
                          ? prev.filter((id) => id !== v.id)
                          : [...prev, v.id]
                      )
                    }
                  />
                </td>

                <td className="px-4 py-3">{v.id}</td>
                <td className="px-4 py-3 font-medium">{v.name}</td>

                <td className="px-4 py-3 text-center">
                  <Users className="inline w-4 h-4 mr-1" />
                  {v.vacancyCount}
                </td>

                <td className="px-4 py-3">{v.experience}</td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleStatus(v.id)}
                    className={`px-3 py-1 rounded-full text-xs ${
                      v.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {v.status === "Active" ? (
                      <CheckCircle className="inline w-3 h-3 mr-1" />
                    ) : (
                      <XCircle className="inline w-3 h-3 mr-1" />
                    )}
                    {v.status}
                  </button>
                </td>

                <td className="px-4 py-3 flex justify-end gap-2">
                  <button
                    onClick={() => navigate("/add-vacancy", { state: v })}
                    className="p-2 hover:bg-green-50 rounded"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(v.id)}
                    className="p-2 hover:bg-red-50 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
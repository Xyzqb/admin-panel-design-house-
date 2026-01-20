import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Pagination from "../components/Pagination";
import DeleteConfirmToast from "../components/DeleteConfirmToast";
import EmptyState from "../components/EmptyState";
import { showDeleted, showStatusUpdated } from "../data/toast";
import { SearchBar } from "../components/SearchBar";

const PageList = () => {
  const navigate = useNavigate();

  /* ---------------- STATE ---------------- */
  const [pages, setPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pages")) || [];
    setPages(stored);
  }, []);

  /* ---------------- FILTERING ---------------- */
  const filteredPages = pages.filter((page) => {
    const matchesSearch = page.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || page.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(filteredPages.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredPages.length);
  const currentPages = filteredPages.slice(startIndex, endIndex);

  /* ---------------- ACTIONS ---------------- */
  const togglePageStatus = (id) => {
    const updated = pages.map((p) =>
      p.id === id
        ? { ...p, status: p.status === "active" ? "inactive" : "active" }
        : p
    );

    setPages(updated);
    localStorage.setItem("pages", JSON.stringify(updated));
    showStatusUpdated();
  };

  const handleDeletePage = (id) => {
    toast(
      <DeleteConfirmToast
        onDelete={() => {
          const updated = pages.filter((p) => p.id !== id);
          setPages(updated);
          localStorage.setItem("pages", JSON.stringify(updated));
          showDeleted();
        }}
      />,
      { autoClose: false }
    );
  };

  const getStatusColor = (status) =>
    status === "active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";

  /* ---------------- RENDER ---------------- */
  return (
    <div className="bg-white shadow-md mt-6 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-amber-600">Page List</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Manage and monitor all your pages
        </p>
      </div>

      <SearchBar/>

      {/* Table */}
      <div className="border bg-white shadow-sm rounded-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentPages.map((page) => (
              <tr key={page.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{page.title}</td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {page.date}
                  </div>
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => togglePageStatus(page.id)}
                    className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(
                      page.status
                    )}`}
                  >
                    {page.status === "active" ? (
                      <>
                        <CheckCircle className="inline w-3 h-3 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <XCircle className="inline w-3 h-3 mr-1" />
                        Inactive
                      </>
                    )}
                  </button>
                </td>

                <td className="px-6 py-4 flex justify-end gap-2">
                  <button
                    onClick={() =>
                      navigate("/create-a-page", {
                        state: { pageId: page.id },
                      })
                    }
                    className="p-2 hover:bg-green-50 rounded-lg"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeletePage(page.id)}
                    className="p-2 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <MoreVertical className="w-4 h-4 text-gray-400 mt-2" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {currentPages.length === 0 && (
          <EmptyState
            title="No pages found"
            description="You haven't added any page yet."
            actionLabel="Add Page"
            onAction={() => navigate("/create-a-page")}
          />
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalItems={filteredPages.length}
          itemsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
export default PageList;
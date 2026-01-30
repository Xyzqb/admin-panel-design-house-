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


// import { useState, useEffect } from "react";
// import {
//   Edit,
//   Trash2,
//   Phone,
//   Users,
//   CheckCircle,
//   XCircle,
//   Plus,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { SearchBar } from "../../components/SearchBar";
// import Pagination from "../../components/Pagination";
// import EmptyState from "../../components/EmptyState";
// import PageHeader from "../../components/PageHeader";
// import api from "../../lib/api";

// const VacancyList = () => {
//   const navigate = useNavigate();

//   /* ---------------- STATE ---------------- */
//   const [vacancies, setVacancies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });

//   /* ---------------- LOAD DATA ---------------- */
//   useEffect(() => {
//     fetchVacancies();
//   }, [searchTerm, statusFilter, currentPage, rowsPerPage]);

//   const fetchVacancies = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get("/api/vacancies", {

//         params: {
//           page: currentPage,
//           limit: rowsPerPage,
//           search: searchTerm,
//           status: statusFilter,
//         },
//       });

//       if (response.data.success) {
//         setVacancies(response.data.data);
//         setStats(response.data.stats || { total: 0, active: 0, inactive: 0 });
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Failed to fetch vacancies",
//         confirmButtonColor: "#ef4444",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- FILTER ---------------- */
//   const filteredVacancies = vacancies;

//   /* ---------------- PAGINATION ---------------- */
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const currentVacancies = filteredVacancies;

//   /* ---------------- ACTIONS ---------------- */

//   // Toggle Status
//   const toggleStatus = async (id, currentStatus) => {
//     try {
//       const newStatus = currentStatus === "active" ? "inactive" : "active";
//       const response = await api.patch(`/api/vacancies/${id}/status`, {

//         status: newStatus,
//       });

//       if (response.data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Status Updated!",
//           text: `Vacancy ${newStatus === "active" ? "activated" : "deactivated"} successfully`,
//           confirmButtonColor: "#3b82f6",
//           timer: 1500,
//         });
//         fetchVacancies();
//       }
//     } catch (error) {
//       console.error("Toggle status error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Failed to update status",
//         confirmButtonColor: "#ef4444",
//       });
//     }
//   };

//   // Delete Single
//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         const response = await api.delete(`/api/vacancies/${id}`);


//         if (response.data.success) {
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: "Vacancy has been deleted.",
//             confirmButtonColor: "#3b82f6",
//             timer: 1500,
//           });
//           fetchVacancies();
//           setSelectedRows([]);
//         }
//       } catch (error) {
//         console.error("Delete error:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Error!",
//           text: "Failed to delete vacancy",
//           confirmButtonColor: "#ef4444",
//         });
//       }
//     }
//   };

//   // Bulk Delete
//   const handleBulkDelete = async () => {
//     if (selectedRows.length === 0) return;

//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: `Delete ${selectedRows.length} selected vacancies?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: "Yes, delete them!",
//     });

//     if (result.isConfirmed) {
//       try {
//         const response = await api.post("/api/vacancies/bulk-delete", {

//           ids: selectedRows,
//         });

//         if (response.data.success) {
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: `${response.data.deletedCount} vacancies deleted successfully`,
//             confirmButtonColor: "#3b82f6",
//             timer: 1500,
//           });
//           fetchVacancies();
//           setSelectedRows([]);
//         }
//       } catch (error) {
//         console.error("Bulk delete error:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Error!",
//           text: "Failed to delete vacancies",
//           confirmButtonColor: "#ef4444",
//         });
//       }
//     }
//   };

//   // Handle Edit
//   const handleEdit = (vacancy) => {
//     navigate("/add-vacancy", { state: vacancy });
//   };

//   /* ---------------- RENDER ---------------- */
//   return (
//     <div className="bg-white shadow-md mt-6 p-6">
//       {/* Header */}
//       <PageHeader
//         title="Vacancy List"
//         description="Manage and view all job vacancies"
//         buttonText="Add Vacancy"
//         buttonIcon={Plus}
//         buttonPath="/add-vacancy"
//       />

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Vacancies</p>
//               <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
//             </div>
//             <Users className="w-10 h-10 text-blue-600" />
//           </div>
//         </div>

//         <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Active</p>
//               <p className="text-2xl font-bold text-green-600">{stats.active}</p>
//             </div>
//             <CheckCircle className="w-10 h-10 text-green-600" />
//           </div>
//         </div>

//         <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Inactive</p>
//               <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
//             </div>
//             <XCircle className="w-10 h-10 text-red-600" />
//           </div>
//         </div>
//       </div>

//       {/* SearchBar */}
//       <div className="mb-4">
//         <SearchBar
//           rowsPerPage={rowsPerPage}
//           totalItems={stats.total}
//           onRowsPerPageChange={(value) => {
//             setRowsPerPage(value);
//             setCurrentPage(1);
//           }}
//           searchValue={searchTerm}
//           onSearchChange={(value) => {
//             setSearchTerm(value);
//             setCurrentPage(1);
//           }}
//         />

//         {/* Status Filter */}
//         <div className="mt-4 flex gap-2">
//           <button
//             onClick={() => setStatusFilter("all")}
//             className={`px-4 py-2 rounded-md ${
//               statusFilter === "all"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setStatusFilter("active")}
//             className={`px-4 py-2 rounded-md ${
//               statusFilter === "active"
//                 ? "bg-green-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Active
//           </button>
//           <button
//             onClick={() => setStatusFilter("inactive")}
//             className={`px-4 py-2 rounded-md ${
//               statusFilter === "inactive"
//                 ? "bg-red-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Inactive
//           </button>
//         </div>
//       </div>

//       {/* Bulk Delete */}
//       {selectedRows.length > 0 && (
//         <button
//           onClick={handleBulkDelete}
//           className="mb-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//         >
//           Delete Selected ({selectedRows.length})
//         </button>
//       )}

//       {/* Table */}
//       {loading ? (
//         <div className="text-center py-10">
//           <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
//           <p className="mt-2 text-gray-600">Loading...</p>
//         </div>
//       ) : (
//         <>
//           <div className="border rounded-md overflow-x-auto">
//             <table className="w-full min-w-[800px]">
//               <thead className="bg-blue-50">
//                 <tr>
//                   <th className="px-4 py-3">
//                     <input
//                       type="checkbox"
//                       checked={
//                         selectedRows.length === currentVacancies.length &&
//                         currentVacancies.length > 0
//                       }
//                       onChange={(e) => {
//                         if (e.target.checked) {
//                           setSelectedRows(currentVacancies.map((v) => v._id));
//                         } else {
//                           setSelectedRows([]);
//                         }
//                       }}
//                     />
//                   </th>
//                   <th className="px-4 py-3 text-left">Job Title</th>
//                   <th className="px-4 py-3 text-left">Experience</th>
//                   <th className="px-4 py-3 text-left">Location</th>
//                   <th className="px-4 py-3">Vacancies</th>
//                   <th className="px-4 py-3">Status</th>
//                   <th className="px-4 py-3">Created</th>
//                   <th className="px-4 py-3 text-right">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {currentVacancies.map((v) => (
//                   <tr key={v._id} className="border-t hover:bg-gray-50">
//                     <td className="px-4 py-3">
//                       <input
//                         type="checkbox"
//                         checked={selectedRows.includes(v._id)}
//                         onChange={() =>
//                           setSelectedRows((prev) =>
//                             prev.includes(v._id)
//                               ? prev.filter((id) => id !== v._id)
//                               : [...prev, v._id]
//                           )
//                         }
//                       />
//                     </td>

//                     <td className="px-4 py-3 font-medium">{v.title}</td>
//                     <td className="px-4 py-3">{v.experience}</td>
//                     <td className="px-4 py-3">{v.location}</td>

//                     <td className="px-4 py-3 text-center">
//                       <Users className="inline w-4 h-4 mr-1" />
//                       {v.vacancyCount || 1}
//                     </td>

//                     <td className="px-4 py-3">
//                       <button
//                         onClick={() => toggleStatus(v._id, v.status)}
//                         className={`px-3 py-1 rounded-full text-xs ${
//                           v.status === "active"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {v.status === "active" ? (
//                           <CheckCircle className="inline w-3 h-3 mr-1" />
//                         ) : (
//                           <XCircle className="inline w-3 h-3 mr-1" />
//                         )}
//                         {v.status}
//                       </button>
//                     </td>

//                     <td className="px-4 py-3 text-sm text-gray-600">
//                       {new Date(v.createdAt).toLocaleDateString("en-IN")}
//                     </td>

//                     <td className="px-4 py-3 flex justify-end gap-2">
//                       <button
//                         onClick={() => handleEdit(v)}
//                         className="p-2 hover:bg-green-50 rounded"
//                         title="Edit"
//                       >
//                         <Edit className="w-4 h-4 text-green-600" />
//                       </button>

//                       <button
//                         onClick={() => handleDelete(v._id)}
//                         className="p-2 hover:bg-red-50 rounded"
//                         title="Delete"
//                       >
//                         <Trash2 className="w-4 h-4 text-red-600" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {currentVacancies.length === 0 && (
//               <EmptyState
//                 title="No vacancies found"
//                 description="You haven't added any vacancies yet."
//                 actionLabel="Add Vacancy"
//                 onAction={() => navigate("/add-vacancy")}
//               />
//             )}
//           </div>

//           {/* Pagination */}
//           {currentVacancies.length > 0 && (
//             <div className="mt-6">
//               <Pagination
//                 currentPage={currentPage}
//                 totalItems={stats.total}
//                 itemsPerPage={rowsPerPage}
//                 onPageChange={setCurrentPage}
//               />
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default VacancyList;
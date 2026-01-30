import { useState, useEffect } from 'react';
import { Eye, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../../components/SearchBar';
import Pagination from "../../components/Pagination";
import EmptyState from '../../components/EmptyState';
import { toast } from "react-toastify";
import DeleteConfirmToast from '../../components/DeleteConfirmToast';
import Table from "../../components/Table";

const ProjectList = () => {
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data based on your table
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const storedProjects =
      JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);
  }, []);

  const handleDelete = (id) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== id
    );

    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    toast.success("Project deleted successfully");
  };

  const columns = [
    {
      key: "id",
      label: "ID",
      render: (row) => (
        <span className="font-semibold text-gray-900">#{row.id}</span>
      ),
    },
    {
      key: "client",
      label: "Client",
      render: (row) => (
        <span className="text-sm font-medium text-gray-900">
          {row.client}
        </span>
      ),
    },
    {
      key: "projectName",
      label: "Project Name",
      render: (row) => row.projectName || "-",
    },
    {
      key: "projectCategory",
      label: "Category",
      render: (row) => row.projectCategory,
    },
    {
      key: "photo",
      label: "Photo",
      render: (row) =>
        row.photo ? (
          <img
            src={row.photo}
            alt="Project"
            className="w-10 h-10 rounded-md object-cover border"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Photo</span>
        ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${row.status === "Active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
            }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  // Status badge component
  const StatusBadge = ({ status }) => (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {status}
    </span>
  );

  const filteredProjects = projects.filter(project =>
    project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.projectCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + rowsPerPage);

  const handleAddProject = () => {
    navigate('/add-project');
  };

  const handleEdit = (project) => {
    localStorage.setItem('editProject', JSON.stringify(project));
    navigate('/add-projects');
  };

  return (
    <div className="bg-white shadow-md mt-6 p-4 md:p-6">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-600 mb-2 uppercase">Project List</h1>
          <p className="text-gray-600 text-lg">Manage and view all your projects</p>
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
        />

        {/* Table Container */}
        <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-200">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <Table
              columns={columns}
              data={paginatedProjects}
              onEdit={(row) => handleEdit(row)}
              onDelete={(row) =>
                toast(
                  <DeleteConfirmToast
                    onDelete={() => handleDelete(row.id)}
                  />,
                  { autoClose: false }
                )
              }
            />
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4 p-4">
            {paginatedProjects.map((project) => (
              <div key={project.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-sm font-semibold text-gray-900">#{project.id}</span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-1">{project.client}</h3>
                  </div>
                  <StatusBadge status={project.status} />
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500">Project Name</span>
                    <p className="text-sm text-gray-900">{project.projectName || '-'}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">Project Category</span>
                    <p className="text-sm text-gray-900">{project.projectCategory}</p>
                  </div>
                  {project.photo && (
                    <div>
                      <span className="text-xs font-medium text-gray-500">Photo</span>
                      <div className="mt-1">
                        <button className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
                          <span className="text-lg">📷</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate("/add-projects")}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        toast(
                          <DeleteConfirmToast
                            onDelete={() => handleDelete(project.id)}
                          />,
                          { autoClose: false }
                        )
                      }
                      className="p-2 bg-red-50 text-red-600 rounded-lg border border-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalItems={filteredProjects.length}
              itemsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <EmptyState
            title="No Projects found"
            description="You haven't added any Projects yet."
            actionLabel="Add Projects "
            onAction={() => navigate("/add-Projects")}
          />
        )}
      </div>
    </div>
  );
};
export default ProjectList;
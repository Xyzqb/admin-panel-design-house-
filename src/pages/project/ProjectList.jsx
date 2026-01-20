import { useState, useEffect } from 'react';
import { Eye, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../../components/SearchBar';
import Pagination from "../../components/Pagination";
import EmptyState from '../../components/EmptyState';
import { toast } from "react-toastify";
import DeleteConfirmToast from '../../components/DeleteConfirmToast';

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
          <h1 className="text-3xl font-bold text-amber-600 mb-2">Project List</h1>
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
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50 border-b border-blue-100">
                  <th className="py-4 px-6 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider border-r border-blue-100">Id</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider border-r border-blue-100">Client</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider border-r border-blue-100">Project Name</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider border-r border-blue-100">Project Category</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider border-r border-blue-100">Photo</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider border-r border-blue-100">Status</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedProjects.map((project, index) => (
                  <tr
                    key={project.id}
                    className={`hover:bg-gray-50 transition-colors ${index !== paginatedProjects.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <td className="py-4 px-6 whitespace-nowrap border-r border-gray-100">
                      <span className="text-sm font-semibold text-gray-900">#{project.id}</span>
                    </td>
                    <td className="py-4 px-6 border-r border-gray-100">
                      <div className="text-sm font-medium text-gray-900">{project.client}</div>
                    </td>
                    <td className="py-4 px-6 border-r border-gray-100">
                      <div className="text-sm text-gray-900">{project.projectName || '-'}</div>
                    </td>
                    <td className="py-4 px-6 border-r border-gray-100">
                      <div className="text-sm text-gray-900">{project.projectCategory}</div>
                    </td>
                    <td className="py-4 px-6 border-r border-gray-100">
                      {project.photo && (
                        <div>
                          <span className="text-xs font-medium text-gray-500">Photo</span>
                          <img
                            src={project.photo}
                            alt="Project"
                            className="mt-1 w-10 h-10 object-cover rounded-md border"
                          />
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 border-r border-gray-100">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
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
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 border border-red-100"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
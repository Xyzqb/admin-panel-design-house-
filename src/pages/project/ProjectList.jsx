import React, { useState } from 'react';
import { Search, Filter, Eye, Edit2, Trash2, Plus, ChevronLeft, ChevronRight, Download, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../../components/SearchBar';
import Pagination from "../../components/Pagination";

const ProjectList = () => {
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data based on your table
  const projects = [
    { id: 164, client: 'Absolut', projectName: '', projectCategory: '123', photo: '123', status: 'Active' },
    { id: 163, client: '100 Pipers', projectName: 'Frosty', projectCategory: 'Shop In Shop', status: 'Inactive' },
    { id: 162, client: 'Tommy Hilfiger', projectName: 'Tommy Hilfiger', projectCategory: 'Window Display', status: 'Active' },
    { id: 161, client: 'Supreme Furniture', projectName: 'Supreme Furniture', projectCategory: 'Window Display', status: 'Active' },
    { id: 160, client: 'Design House India Pvt. Ltd.', projectName: 'Table And Chair', projectCategory: 'Office Chairs', status: 'Active' },
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
    navigate('/add-project');
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
                      {project.photo ? (
                        <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100">
                          <span className="text-lg">📷</span>
                        </button>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
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
                          className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors border border-green-100" 
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-100" 
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
                      onClick={() => handleEdit(project)}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-green-50 text-green-600 rounded-lg border border-green-100" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-red-50 text-red-600 rounded-lg border border-red-100" title="Delete">
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
          <div className="px-6 py-4 border-t border-gray-200 bg-blue-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-blue-700">
                Showing <span className="font-semibold">{startIndex + 1}</span> to{' '}
                <span className="font-semibold">
                  {Math.min(startIndex + rowsPerPage, filteredProjects.length)}
                </span>{' '}
                of <span className="font-semibold">{filteredProjects.length}</span> results
              </div>

              <Pagination
                currentPage={currentPage}
                totalItems={filteredProjects.length}
                itemsPerPage={rowsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No projects found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
            <button
              onClick={handleAddProject}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600"
            >
              <Plus className="w-5 h-5" />
              Add Your First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
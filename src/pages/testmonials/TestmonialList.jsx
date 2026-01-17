import React, { useState, useEffect } from 'react';
import {
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Search,
    Filter,
    Upload
} from 'lucide-react';
import { showDeleted } from "../../data/toast";

const TestimonialsList = () => {

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("testimonials")) || [];
        setTestimonials(stored);
    }, []);


    // State for testimonials
    const [testimonials, setTestimonials] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedRows, setSelectedRows] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [testimonialToDelete, setTestimonialToDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);

    // Handle edit testimonial
    const handleEdit = (testimonial) => {
        setEditingTestimonial({ ...testimonial });
        setShowEditModal(true);
    };

    // Handle delete testimonial
    const handleDeleteClick = (id) => {
        setTestimonialToDelete(id);
        setShowDeleteModal(true);
    };

    // Confirm delete testimonial
    const confirmDelete = () => {
        if (testimonialToDelete) {
            const updatedTestimonials = testimonials.filter(
                t => t.id !== testimonialToDelete
            );

            setTestimonials(updatedTestimonials);
            localStorage.setItem("testimonials", JSON.stringify(updatedTestimonials));

            setShowDeleteModal(false);
            setTestimonialToDelete(null);

            showDeleted(); // ✅ SWEET ALERT TOAST
        }
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
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-amber-600">Testimonials List</h1>
                    <p className="text-gray-600 mt-2 text-lg">Manage and view all testimonials in your system</p>
                </div>

                {/* Controls */}
                <div className="bg-white rounded-md shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            {/* Search */}
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search testimonials..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="relative">
                                <select
                                    className="border border-gray-300 rounded-lg py-2 pl-10 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="All">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Filter className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            {selectedRows.length > 0 && (
                                <button
                                    onClick={handleBulkDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete Selected ({selectedRows.length})
                                </button>
                            )}
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                                <Upload className="h-4 w-4" />
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Rows per page selector */}
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-gray-700">Show</span>
                        <select
                            className="border border-gray-300 rounded-lg py-1 px-3 focus:ring-2 focus:ring-blue-500"
                            value={rowsPerPage}
                            onChange={handleRowsPerPageChange}
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <span className="text-gray-700">Rows</span>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
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
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Position
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Organisation
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
                                            {testimonial.position}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {testimonial.organisation}
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
                                                    onClick={() => handleEdit(testimonial)}
                                                    className="text-blue-600 hover:text-blue-900 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(testimonial.id)}
                                                    className="text-red-600 hover:text-red-900 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                            <Trash2 className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Delete Testimonial</h3>
                        <p className="text-gray-600 text-center mb-6">
                            Are you sure you want to delete this testimonial? This action cannot be undone.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && editingTestimonial && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Testimonial</h3>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={editingTestimonial.name}
                                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Position
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={editingTestimonial.position}
                                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, position: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Organisation
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={editingTestimonial.organisation}
                                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, organisation: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={editingTestimonial.status}
                                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, status: e.target.value })}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveEditedTestimonial}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestimonialsList;
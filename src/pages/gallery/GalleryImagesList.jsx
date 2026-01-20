import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DeleteConfirmToast from "../../components/DeleteConfirmToast";
import Pagination from '../../components/Pagination';
import {SearchBar} from "../../components/SearchBar";

const GalleryImagesList = () => {
    // State for UI
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    // Mock data - Replace with API data
    const images = [
        { id: 1, title: 'kontol', project: '100 Pipers', event: 'Sofas', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&h=600&fit=crop', status: 'active' },
        { id: 2, title: 'Sennheiser shop', project: 'Sennheiser shop', event: 'Shop in Shop', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop', status: 'inactive' },
        { id: 3, title: 'Sennheiser shop', project: 'Sennheiser shop', event: 'Shop in Shop', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop', status: 'active' },
        { id: 4, title: 'Ponds', project: 'Ponds', event: 'Retail Merchandising', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', status: 'active' },
        { id: 5, title: 'Ponds', project: 'Ponds', event: 'Retail Merchandising', image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&h=600&fit=crop', status: 'inactive' },
        { id: 6, title: 'Nescafe', project: 'Nescafe', event: 'Retail Merchandising', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop', status: 'active' },
        { id: 7, title: 'Maybelline', project: 'Maybelline', event: 'Retail Merchandising', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=600&fit=crop', status: 'active' },
        { id: 8, title: 'Maybelline', project: 'Maybelline', event: 'Retail Merchandising', image: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=800&h=600&fit=crop', status: 'active' },
    ];

    // For API - Filter would be done on backend
    const filteredImages = images.filter(image =>
        image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.event.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate pagination
    const totalItems = filteredImages.length;
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedImages = rowsPerPage === 'All'
        ? filteredImages
        : filteredImages.slice(startIndex, startIndex + rowsPerPage);

    // Edit handler
    const handleEdit = (id) => {
        toast.success("Edit mode opened successfully", {
            position: "top-right",
            autoClose: 2000,
        });
        // Navigate to edit page or open modal
        // navigate(`/edit-gallery/${id}`);
    };

    // Delete handler - Ready for RTK Query
    const handleDelete = (id) => {
        toast(
            <DeleteConfirmToast
                onDelete={() => {
                    // For API later: call delete mutation here
                    // For now (mock):
                    toast.success("Image deleted successfully", {
                        position: "top-right",
                        autoClose: 2000,
                    });
                }}
            />,
            { autoClose: false }
        );
    };

    // Toggle status
    const handleToggleStatus = (id) => {
        toast.success("Status updated successfully", {
            position: "top-right",
            autoClose: 2000,
        });
        // API call would go here
    };

    // Pagination handlers
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    return (
        <div className="bg-white shadow-md py-8 px-4 sm:px-6 lg:px-8 mt-6">
            <div className="w-full">
                {/* Header Section */}
                <div className="mb-6">

                    {/* Title Row with Back Button */}
                    <div className="flex items-start gap-4 mb-6">

                        {/* Back Button */}
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="mt-1 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition shadow"
                            title="Go Back"
                        >
                            <ArrowLeft className="w-5 h-5 text-slate-700" />
                        </button>

                        {/* Title + Subtitle */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">
                                Gallery Images List
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Manage and browse all gallery images
                            </p>
                        </div>

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
                </div>

                {/* Main Table */}
                <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
                    {/* Desktop Table */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr className="border-b border-gray-200">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Project
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Event
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {paginatedImages.map((image) => (
                                    <tr key={image.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                                                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {image.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        ID: {image.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {image.project}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{image.event}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                <div className="h-16 w-16 rounded-lg overflow-hidden border border-gray-200">
                                                    <img
                                                        src={image.image}
                                                        alt={image.title}
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=600&fit=crop';
                                                        }}
                                                    />
                                                </div>
                                                <a
                                                    href={image.image}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline font-medium"
                                                >
                                                    View
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleToggleStatus(image.id)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${image.status === 'active'
                                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                    } transition-colors`}
                                            >
                                                {image.status === 'active' ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleEdit(image.id)}
                                                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(image.id)}
                                                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden p-6">
                        <div className="space-y-4">
                            {paginatedImages.map((image) => (
                                <div key={image.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">{image.title}</h3>
                                                <p className="text-sm text-gray-500">ID: {image.id}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleToggleStatus(image.id)}
                                            className={`px-3 py-1 rounded-full text-xs ${image.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {image.status === 'active' ? 'Active' : 'Inactive'}
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Project</p>
                                            <p className="text-sm font-medium text-gray-900">{image.project}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Event</p>
                                            <p className="text-sm font-medium text-gray-900">{image.event}</p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="h-40 w-full rounded-lg overflow-hidden mb-2">
                                            <img
                                                src={image.image}
                                                alt={image.title}
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=600&fit=crop';
                                                }}
                                            />
                                        </div>
                                        <a
                                            href={image.image}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
                                        >
                                            View Full Image
                                        </a>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(image.id)}
                                                className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(image.id)}
                                            className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer with Pagination */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <Pagination
                                currentPage={currentPage}
                                totalItems={totalItems}
                                itemsPerPage={rowsPerPage === "All" ? totalItems : rowsPerPage}
                                onPageChange={setCurrentPage}
                            />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryImagesList;
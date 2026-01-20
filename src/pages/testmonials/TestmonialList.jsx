import { useState, useEffect } from 'react';
import {
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
} from 'lucide-react';
import { showDeleted } from "../../data/toast";
import Pagination from '../../components/Pagination';
import EmptyState from '../../components/EmptyState';
import { toast } from "react-toastify";
import DeleteConfirmToast from "../../components/DeleteConfirmToast";
import { useNavigate } from "react-router-dom";
import { SearchBar } from '../../components/SearchBar';

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
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    // Handle edit testimonial
    const handleEdit = (testimonial) => {
        navigate("/add-testimonials", {
            state: { testimonial }
        });
    };

    // Handle delete testimonial
    const handleDeleteClick = (id) => {
        toast(
            <DeleteConfirmToast
                onDelete={() => {
                    const updated = testimonials.filter(t => t.id !== id);
                    setTestimonials(updated);
                    localStorage.setItem("testimonials", JSON.stringify(updated));
                    showDeleted(); // success toast
                }}
            />,
            { autoClose: false }
        );
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
        if (selectedRows.length === 0) return;
        toast(
            <DeleteConfirmToast
                onDelete={() => {
                    const updated = testimonials.filter(
                        t => !selectedRows.includes(t.id)
                    );
                    setTestimonials(updated);
                    localStorage.setItem("testimonials", JSON.stringify(updated));
                    setSelectedRows([]);
                    showDeleted();
                }}
            />,
            { autoClose: false }
        );
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

    // Calculate pagination
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredTestimonials.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTestimonials.length / rowsPerPage);

    return (
        <div className="bg-white shadow-sm mt-6 p-4 md:p-6">
            <div className="w-full">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-amber-600">Testimonials List</h1>
                    <p className="text-gray-600 mt-2 text-lg">Manage and view all testimonials in your system</p>
                </div>

                <SearchBar />

                {/* Table Container */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 border-b border-r border-gray-300">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            checked={selectedRows.length === testimonials.length && testimonials.length > 0}
                                            onChange={toggleSelectAll}
                                        />
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-r border-gray-300">
                                        Id
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-r border-gray-300">
                                        Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-r border-gray-300">
                                        Position
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-r border-gray-300">
                                        Organisation
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-r border-gray-300">
                                        Photo
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-r border-gray-300">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {currentItems.map((testimonial) => (
                                    <tr
                                        key={testimonial.id}
                                        className={`hover:bg-gray-50 transition-colors ${selectedRows.includes(testimonial.id) ? 'bg-blue-50' : ''} border-b border-gray-200`}
                                    >
                                        <td className="px-6 py-4 border-r border-gray-200">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                                checked={selectedRows.includes(testimonial.id)}
                                                onChange={() => toggleRowSelection(testimonial.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                                            #{testimonial.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                                            {testimonial.name || "No Name"}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">
                                            {testimonial.position || "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">
                                            {testimonial.organisation || "-"}
                                        </td>
                                        <td className="px-6 py-4 border-r border-gray-200">
                                            {testimonial.image ? (
                                                <img
                                                    src={testimonial.image}
                                                    alt="testimonial"
                                                    className="h-10 w-10 rounded-full object-cover border border-gray-200"
                                                />
                                            ) : (
                                                <span className="text-gray-400 text-sm">No Image</span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${testimonial.status === 'Active'
                                                ? 'bg-green-100 text-green-800 border border-green-200'
                                                : 'bg-red-100 text-red-800 border border-red-200'
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
                                                    className="text-blue-600 hover:text-blue-900 p-1.5 rounded-lg hover:bg-blue-50 transition-colors border border-blue-200"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(testimonial.id)}
                                                    className="text-red-600 hover:text-red-900 p-1.5 rounded-lg hover:bg-red-50 transition-colors border border-red-200"
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
                        <EmptyState
                            title="No testimonials found"
                            description="You haven't added any testimonial yet."
                            actionLabel="Add Testimonial"
                            onAction={() => navigate("/add-testimonials")}
                        />
                    )}

                    {/* Footer with Pagination */}
                    {filteredTestimonials.length > 0 && (
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-300">
                            <Pagination
                                currentPage={currentPage}
                                totalItems={filteredTestimonials.length}
                                itemsPerPage={rowsPerPage}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default TestimonialsList;
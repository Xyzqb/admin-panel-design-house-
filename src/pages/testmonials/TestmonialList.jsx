import { useState, useEffect } from 'react';
import {
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
import Table from "../../components/Table";

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

    const columns = [
        {
            key: "id",
            label: "ID",
            render: (row) => (
                <span className="font-semibold text-gray-900">#{row.id}</span>
            ),
        },
        {
            key: "name",
            label: "Name",
            render: (row) => row.name || "No Name",
        },
        {
            key: "position",
            label: "Position",
            render: (row) => row.position || "-",
        },
        {
            key: "organisation",
            label: "Organisation",
            render: (row) => row.organisation || "-",
        },
        {
            key: "image",
            label: "Photo",
            render: (row) =>
                row.image ? (
                    <img
                        src={row.image}
                        alt="testimonial"
                        className="h-10 w-10 rounded-full object-cover border"
                    />
                ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                ),
        },
        {
            key: "status",
            label: "Status",
            render: (row) => (
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${row.status === "Active"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                >
                    {row.status === "Active" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                    )}
                    {row.status}
                </span>
            ),
        },
    ];

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
                    {filteredTestimonials.length > 0 ? (
                        <Table
                            columns={columns}
                            data={currentItems}
                            onEdit={(row) => handleEdit(row)}
                            onDelete={(row) =>
                                toast(
                                    <DeleteConfirmToast
                                        onDelete={() => {
                                            const updated = testimonials.filter(t => t.id !== row.id);
                                            setTestimonials(updated);
                                            localStorage.setItem("testimonials", JSON.stringify(updated));
                                            showDeleted();
                                        }}
                                    />,
                                    { autoClose: false }
                                )
                            }
                        />
                    ) : (
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
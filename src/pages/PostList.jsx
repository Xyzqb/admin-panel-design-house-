import { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Calendar,
    Hash,
    CheckCircle,
    XCircle,
} from 'lucide-react';
import { showDeleted } from '../data/toast';
import { toast } from "react-toastify";
import DeleteConfirmToast from "../components/DeleteConfirmToast";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import Table from '../components/Table';

const PostList = () => {

    const getStoredPosts = () => {
        return JSON.parse(localStorage.getItem("posts")) || [];
    };
    useEffect(() => {
        setPosts(getStoredPosts());
    }, []);


    // State management
    const navigate = useNavigate();
    const [posts, setPosts] = useState(getStoredPosts());
    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [editId, setEditId] = useState(null);

    // Extract unique categories
    const categories = ['all', ...new Set(posts.map(post => post.category).filter(Boolean))];

    // Filter posts based on search term, status, and category
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    // Pagination calculations
    const startIndex = (currentPage - 1) * rowsPerPage;

    const endIndex = Math.min(
        startIndex + rowsPerPage,
        filteredPosts.length
    );
    const currentPosts = filteredPosts.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    // Handle status toggle
    const togglePostStatus = (id) => {
        setPosts(posts.map(post =>
            post.id === id
                ? { ...post, status: post.status === 'active' ? 'inactive' : 'active' }
                : post
        ));
        showStatusUpdated();
    };

    // Get status color
    const getStatusColor = (status) => {
        return status === 'active'
            ? 'bg-green-100 text-green-800 border-green-200'
            : 'bg-red-100 text-red-800 border-red-200';
    };

    // Get category color
    const getCategoryColor = (category) => {
        const colors = {
            'Design': 'bg-purple-100 text-purple-800',
            'Office': 'bg-blue-100 text-blue-800',
            'Showroom': 'bg-amber-100 text-amber-800',
            'Kitchen': 'bg-pink-100 text-pink-800',
            'Sustainable': 'bg-emerald-100 text-emerald-800',
            'Branding': 'bg-indigo-100 text-indigo-800',
            'Commercial': 'bg-cyan-100 text-cyan-800',
            'Residential': 'bg-orange-100 text-orange-800',
            'Budget': 'bg-gray-100 text-gray-800',
            'Luxury': 'bg-yellow-100 text-yellow-800',
            'Space': 'bg-teal-100 text-teal-800',
            'Corporate': 'bg-violet-100 text-violet-800',
            'Restaurant': 'bg-rose-100 text-rose-800',
        };
        return colors[category || ''] || 'bg-gray-100 text-gray-800';
    };

    const columns = [
        {
            label: "Post Title",
            key: "title",
            render: (row) => (
                <p className="font-medium text-gray-800 truncate">
                    {row.title}
                </p>
            ),
        },
        {
            label: "Post Date",
            key: "date",
            render: (row) => (
                <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {row.date}
                </div>
            ),
        },
        {
            label: "Status",
            key: "status",
            render: (row) => (
                <button
                    onClick={() => togglePostStatus(row.id)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(row.status)}`}
                >
                    {row.status === "active" ? (
                        <>
                            <CheckCircle className="w-3 h-3 mr-1" /> Active
                        </>
                    ) : (
                        <>
                            <XCircle className="w-3 h-3 mr-1" /> Inactive
                        </>
                    )}
                </button>
            ),
        },
    ];


    return (
        <div className="bg-white shadow-md mt-6 p-6">
            <div className="w-full">
                {/* Header */}
                <div className="mb-6 mx-2">
                    <h1 className="text-3xl md:text-3xl font-bold text-blue-600 uppercase">Blog Post List</h1>
                    <p className="text-gray-600 mt-2 text-lg">Manage and monitor all your blog posts</p>
                </div>

                {/* Controls Card */}
                <div className="rounded-md p-6 border border-gray-200 mb-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        {/* Left Side - Rows Per Page */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700">Show</span>
                            <div className="relative">
                                <select
                                    value={rowsPerPage}
                                    onChange={(e) => {
                                        setRowsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                                >
                                    {[50, 70, 100, 150].map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                    <option value={filteredPosts.length}>All</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">Rows</span>
                        </div>

                        {/* Right Side - Search & Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            {/* Status Filter */}
                            <div className="relative">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-8 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active Only</option>
                                    <option value="inactive">Inactive Only</option>
                                </select>
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <Filter className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="relative">
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => {
                                        setCategoryFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-8 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat === 'all' ? 'All Categories' : cat}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <Hash className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                            {/* Search */}
                            <div className="relative flex-1 sm:flex-none">
                                <input
                                    type="text"
                                    placeholder="Search posts..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
                    {/* Table Header - For Mobile */}
                    <div className="p-4 border-b border-gray-200 lg:hidden">
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-gray-800">Posts ({filteredPosts.length})</h2>
                            <div className="text-sm text-gray-500">
                                Showing {startIndex + 1}-{endIndex} of {filteredPosts.length}
                            </div>
                        </div>
                    </div>

                    {/* Table - Desktop */}
                    <div className="hidden lg:block overflow-x-auto">
                        <Table
                            columns={columns}
                            data={currentPosts}
                            onEdit={(row) =>
                                navigate("/create-a-post", { state: { editId: row.id } })
                            }
                            onDelete={(row) =>
                                toast(
                                    <DeleteConfirmToast
                                        onDelete={() => {
                                            setPosts((prev) => prev.filter((p) => p.id !== row.id));
                                            showDeleted();
                                        }}
                                    />,
                                    { autoClose: false }
                                )
                            }
                        />

                    </div>
                    {/* Mobile View */}
                    <div className="lg:hidden divide-y divide-gray-200">
                        {currentPosts.map((post) => (
                            <div key={post.id} className="p-4 hover:bg-gray-50">
                                <div className="space-y-3">
                                    {/* Title + Date */}
                                    <div>
                                        <h3 className="font-medium text-gray-800">{post.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <button
                                        onClick={() => togglePostStatus(post.id)}
                                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(post.status)}`}
                                    >
                                        {post.status === "active" ? (
                                            <>
                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                Active
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="w-3 h-3 mr-1" />
                                                Inactive
                                            </>
                                        )}
                                    </button>

                                    {/* Actions */}
                                    <div className="flex justify-between pt-2 border-t">
                                        <button
                                            onClick={() => togglePostStatus(post.id)}
                                            className="flex items-center gap-1 text-sm text-gray-600"
                                        >
                                            {post.status === "active" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            Toggle
                                        </button>

                                        <button
                                            onClick={() => navigate("/create-a-post")}
                                            className="flex items-center gap-1 text-sm text-gray-600"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {currentPosts.length === 0 && (
                        <EmptyState
                            title="No post found"
                            description="You haven't added any post yet."
                            actionLabel="Add Post"
                            onAction={() => navigate("/create-a-post")}
                        />
                    )}
                </div>

                {/* Pagination & Stats */}
                <div className="mt-6 gap-4">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={filteredPosts.length}
                        itemsPerPage={rowsPerPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
};
export default PostList;
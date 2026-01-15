import React, { useState } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Calendar,
    Hash,
    TrendingUp,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    CheckCircle,
    XCircle,
    Download,
    Share2,
    Copy
} from 'lucide-react';
import { showDeleted } from '../data/toast';


// Mock data - In real app, this will come from Redux Toolkit Query
const initialPosts = [
    { id: '1', title: 'Best Interior Designer in Noida', date: '05-Jan-2026', status: 'active', views: 1245, category: 'Design' },
    { id: '2', title: 'Best Interior Designer in Delhi', date: '13-Dec-2025', status: 'active', views: 982, category: 'Design' },
    { id: '3', title: 'Best Interior Designer in Ghaziabad', date: '07-Nov-2025', status: 'active', views: 876, category: 'Design' },
    { id: '4', title: 'Smart Office designs that work expert interior solutions for every space', date: '22-May-2025', status: 'active', views: 1543, category: 'Office' },
    { id: '5', title: 'Why Design House India Pvt. Showroom Interiors in Delhi — The Best One in Business', date: '19-May-2025', status: 'active', views: 2109, category: 'Showroom' },
    { id: '6', title: 'The Importance of Showroom Interior Design More Than You Think', date: '13-May-2025', status: 'active', views: 1890, category: 'Showroom' },
    { id: '7', title: 'Top Modular Kitchen Trends 2025 | Design House India Pvt. Ltd.', date: '08-May-2025', status: 'active', views: 3210, category: 'Kitchen' },
    { id: '8', title: 'How Design House India Pvt. Ltd. Makes Sustainable Showroom interior Design in Delhi', date: '05-May-2025', status: 'active', views: 1432, category: 'Sustainable' },
    { id: '9', title: 'Transform Your Brand with Stunning Showroom Interior Designs by Design House India Pvt Ltd', date: '28-Apr-2025', status: 'active', views: 1789, category: 'Branding' },
    { id: '10', title: 'Your Space with Design House India Pvt. Ltd.: Best Interior Designer in Ghaziabad', date: '26-Apr-2025', status: 'active', views: 1123, category: 'Design' },
    { id: '11', title: 'Modern Workspace Designs for Enhanced Productivity', date: '15-Apr-2025', status: 'active', views: 987, category: 'Office' },
    { id: '12', title: 'Innovative Kitchen Cabinet Designs 2025', date: '10-Apr-2025', status: 'inactive', views: 654, category: 'Kitchen' },
    { id: '13', title: 'Sustainable Materials in Interior Design', date: '05-Apr-2025', status: 'active', views: 2345, category: 'Sustainable' },
    { id: '14', title: 'Commercial Space Planning Strategies', date: '28-Mar-2025', status: 'active', views: 876, category: 'Commercial' },
    { id: '15', title: 'Residential Interior Design Trends', date: '20-Mar-2025', status: 'inactive', views: 543, category: 'Residential' },
    { id: '16', title: 'Budget-Friendly Interior Solutions', date: '15-Mar-2025', status: 'active', views: 1890, category: 'Budget' },
    { id: '17', title: 'Luxury Villa Interior Designs', date: '10-Mar-2025', status: 'active', views: 1234, category: 'Luxury' },
    { id: '18', title: 'Small Space Optimization Techniques', date: '05-Mar-2025', status: 'active', views: 765, category: 'Space' },
    { id: '19', title: 'Corporate Office Interior Guidelines', date: '28-Feb-2025', status: 'inactive', views: 432, category: 'Corporate' },
    { id: '20', title: 'Restaurant Interior Design Concepts', date: '20-Feb-2025', status: 'active', views: 987, category: 'Restaurant' },
];

const PostList = () => {
    // State management
    const [posts, setPosts] = useState(initialPosts);
    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    // Extract unique categories
    const categories = ['all', ...new Set(initialPosts.map(post => post.category).filter(Boolean))];

    // Filter posts based on search term, status, and category
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredPosts.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredPosts.length);
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

    // Handle delete post
    const handleDeletePost = (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setPosts(posts.filter(post => post.id !== id));
            showDeleted();
        }
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

    return (
        <div className="min-h-screen bg-white shadow-md mt-6 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 mx-2">
                    <h1 className="text-3xl md:text-3xl font-bold text-gray-800">Posts Management</h1>
                    <p className="text-gray-600 mt-2 text-lg">Manage and monitor all your blog posts</p>
                </div>

                {/* Controls Card */}
                <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200 mb-6">
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
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-blue-50 to-cyan-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                        Post Title
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            Post Date
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                        <div className="flex items-center gap-1">
                                            <TrendingUp className="w-4 h-4" />
                                            Views
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentPosts.map((post) => (
                                    <tr
                                        key={post.id}
                                        className="hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="max-w-md">
                                                <p className="text-gray-800 font-medium">{post.title}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-700">{post.date}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-blue-500" />
                                                <span className="text-gray-700 font-medium">{post.views?.toLocaleString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => togglePostStatus(post.id)}
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors ${getStatusColor(post.status)} hover:opacity-90`}
                                            >
                                                {post.status === 'active' ? (
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
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => togglePostStatus(post.id)}
                                                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title={post.status === 'active' ? 'Deactivate' : 'Activate'}
                                                >
                                                    {post.status === 'active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePost(post.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View */}
                    <div className="lg:hidden divide-y divide-gray-200">
                        {currentPosts.map((post) => (
                            <div key={post.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="space-y-3">
                                    {/* Header */}
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-800 mb-1">{post.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Calendar className="w-3 h-3" />
                                                {post.date}
                                            </div>
                                        </div>
                                        <button className="p-1 text-gray-400 hover:text-gray-600">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex flex-wrap gap-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                                            {post.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                            <TrendingUp className="w-3 h-3" />
                                            {post.views?.toLocaleString()} views
                                        </div>
                                        <button
                                            onClick={() => togglePostStatus(post.id)}
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors ${getStatusColor(post.status)} hover:opacity-90 ml-auto`}
                                        >
                                            {post.status === 'active' ? (
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
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-between pt-2 border-t border-gray-100">
                                        <button
                                            onClick={() => togglePostStatus(post.id)}
                                            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            {post.status === 'active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            {post.status === 'active' ? 'Deactivate' : 'Activate'}
                                        </button>
                                        <button
                                            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeletePost(post.id)}
                                            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {currentPosts.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                            <p className="text-gray-500">
                                Try adjusting your search or filter to find what you're looking for.
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination & Stats */}
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    {/* Stats */}
                    <div className="text-sm text-gray-600">
                        Showing <span className="font-semibold text-gray-800">{startIndex + 1}-{endIndex}</span> of{' '}
                        <span className="font-semibold text-gray-800">{filteredPosts.length}</span> posts
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center gap-2">
                        {/* First Page */}
                        <button
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                            <ChevronsLeft className="w-4 h-4" />
                        </button>

                        {/* Previous Page */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return pageNum <= totalPages ? (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`w-10 h-10 rounded-lg border transition-colors ${currentPage === pageNum
                                            ? 'bg-blue-500 text-white border-blue-500'
                                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                ) : null;
                            })}
                        </div>

                        {/* Next Page */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Last Page */}
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                            <ChevronsRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostList;
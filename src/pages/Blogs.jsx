import React, { useState, useEffect } from 'react';

const Blog = () => {
    // Initial blog data
    const initialBlogs = [
        {
            id: 1,
            title: "Getting Started with React",
            author: "John Doe",
            category: "Technology",
            date: "2023-10-15",
            views: 1250,
            likes: 89,
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h-200&fit=crop",
            description: "Learn the fundamentals of React and start building modern web applications today.",
            content: "React is a popular JavaScript library for building user interfaces...",
            status: "published"
        },
        {
            id: 2,
            title: "Mastering Tailwind CSS",
            author: "Jane Smith",
            category: "Web Development",
            date: "2023-10-10",
            views: 980,
            likes: 67,
            image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h-200&fit=crop",
            description: "A comprehensive guide to using Tailwind CSS for rapid UI development.",
            content: "Tailwind CSS is a utility-first CSS framework...",
            status: "published"
        },
        {
            id: 3,
            title: "JavaScript ES2023 Features",
            author: "Mike Johnson",
            category: "Programming",
            date: "2023-10-05",
            views: 1540,
            likes: 112,
            image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h-200&fit=crop",
            description: "Explore the latest JavaScript features introduced in ES2023.",
            content: "JavaScript continues to evolve with new features...",
            status: "draft"
        },
        {
            id: 4,
            title: "Web Design Trends 2023",
            author: "Sarah Wilson",
            category: "Design",
            date: "2023-10-01",
            views: 2100,
            likes: 156,
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h-200&fit=crop",
            description: "Discover the latest web design trends that are shaping 2023.",
            content: "Web design is constantly evolving...",
            status: "published"
        },
        {
            id: 5,
            title: "AI in Modern Applications",
            author: "Alex Chen",
            category: "Artificial Intelligence",
            date: "2023-09-28",
            views: 890,
            likes: 45,
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h-200&fit=crop",
            description: "How artificial intelligence is transforming modern web applications.",
            content: "AI integration is becoming essential...",
            status: "published"
        }
    ];

    // State management
    const [blogs, setBlogs] = useState(initialBlogs);
    const [filteredBlogs, setFilteredBlogs] = useState(initialBlogs);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [showAddBlog, setShowAddBlog] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "Technology",
        description: "",
        content: "",
        status: "draft"
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    // Categories
    const categories = ["Technology", "Web Development", "Programming", "Design", "Artificial Intelligence", "Business", "Marketing"];

    // Statistics
    const [stats, setStats] = useState({
        totalBlogs: 0,
        publishedBlogs: 0,
        draftBlogs: 0,
        totalViews: 0,
        totalLikes: 0
    });

    // Update statistics
    useEffect(() => {
        const totalBlogs = blogs.length;
        const publishedBlogs = blogs.filter(blog => blog.status === "published").length;
        const draftBlogs = blogs.filter(blog => blog.status === "draft").length;
        const totalViews = blogs.reduce((sum, blog) => sum + blog.views, 0);
        const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);

        setStats({
            totalBlogs,
            publishedBlogs,
            draftBlogs,
            totalViews,
            totalLikes
        });
    }, [blogs]);

    // Filter blogs
    useEffect(() => {
        let filtered = blogs;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.id.toString().includes(searchTerm)
            );
        }

        // Filter by category
        if (filterCategory !== "all") {
            filtered = filtered.filter(blog => blog.category === filterCategory);
        }

        // Filter by status
        if (filterStatus !== "all") {
            filtered = filtered.filter(blog => blog.status === filterStatus);
        }

        setFilteredBlogs(filtered);
    }, [blogs, searchTerm, filterCategory, filterStatus]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Open add blog form
    const openAddBlog = () => {
        setEditingBlog(null);
        setFormData({
            title: "",
            author: "",
            category: "Technology",
            description: "",
            content: "",
            status: "draft"
        });
        setImagePreview(null);
        setImageFile(null);
        setShowAddBlog(true);
    };

    // Open edit blog form
    const openEditBlog = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            author: blog.author,
            category: blog.category,
            description: blog.description,
            content: blog.content,
            status: blog.status
        });
        setImagePreview(blog.image);
        setImageFile(null);
        setShowAddBlog(true);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const newBlog = {
            ...formData,
            id: editingBlog ? editingBlog.id : blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1,
            date: editingBlog ? editingBlog.date : new Date().toISOString().split('T')[0],
            views: editingBlog ? editingBlog.views : 0,
            likes: editingBlog ? editingBlog.likes : 0,
            image: imagePreview || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop"
        };

        if (editingBlog) {
            // Update existing blog
            const updatedBlogs = blogs.map(blog =>
                blog.id === editingBlog.id ? newBlog : blog
            );
            setBlogs(updatedBlogs);
        } else {
            // Add new blog
            setBlogs([newBlog, ...blogs]);
        }

        setShowAddBlog(false);
        resetForm();
    };

    // Open delete confirmation modal
    const openDeleteModal = (blogId) => {
        setBlogToDelete(blogId);
        setShowDeleteModal(true);
    };

    // Handle blog deletion
    const handleDeleteBlog = () => {
        if (blogToDelete) {
            const updatedBlogs = blogs.filter(blog => blog.id !== blogToDelete);
            setBlogs(updatedBlogs);
            setShowDeleteModal(false);
            setBlogToDelete(null);
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            title: "",
            author: "",
            category: "Technology",
            description: "",
            content: "",
            status: "draft"
        });
        setImagePreview(null);
        setImageFile(null);
        setEditingBlog(null);
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Get status badge color
    const getStatusColor = (status) => {
        switch (status) {
            case 'published': return 'bg-green-100 text-green-800 border-green-200';
            case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Get category color
    const getCategoryColor = (category) => {
        const colors = {
            'Technology': 'bg-blue-100 text-blue-800 border-blue-200',
            'Web Development': 'bg-purple-100 text-purple-800 border-purple-200',
            'Programming': 'bg-indigo-100 text-indigo-800 border-indigo-200',
            'Design': 'bg-pink-100 text-pink-800 border-pink-200',
            'Artificial Intelligence': 'bg-red-100 text-red-800 border-red-200',
            'Business': 'bg-green-100 text-green-800 border-green-200',
            'Marketing': 'bg-orange-100 text-orange-800 border-orange-200'
        };
        return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    // Get stat card gradient
    const getStatGradient = (index) => {
        const gradients = [
            'from-blue-500 to-cyan-600',
            'from-purple-500 to-violet-600',
            'from-green-500 to-emerald-600',
        ];
        return gradients[index % gradients.length];
    };

    return (
        <div className="min-h-screen bg-white shadow-md mt-8 p-4 md:p-8">
            {/* Header Section */}
            <div className="container mx-auto mb-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-3xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                            Blog Management
                        </h1>
                        <p className="text-gray-600 text-lg">Manage your blog posts and content</p>
                    </div>
                    <button
                        onClick={openAddBlog}
                        className="px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-100 flex items-center whitespace-nowrap"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add New Blog
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                    {[
                        { label: "Total Blogs", value: stats.totalBlogs, icon: "📝" },
                        { label: "Published", value: stats.publishedBlogs, icon: "✅" },
                        { label: "Drafts", value: stats.draftBlogs, icon: "📄" },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className={`bg-gradient-to-br ${getStatGradient(index)} rounded-2xl shadow-lg p-5 sm:p-6 transform hover:scale-102 transition-transform duration-300`}
                        >
                            <div className="text-white">
                                <div className="text-2xl sm:text-3xl font-bold mb-2 flex items-center">
                                    <span className="text-xl sm:text-2xl mr-3">{stat.icon}</span>
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm opacity-90">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Search and Filter Section */}
                <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 mb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">

                        {/* Search Bar */}
                        <div className="lg:col-span-2">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                    <svg
                                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Search by title, author, or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-xl text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-xl text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                            >
                                <option value="all">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-xl text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                            >
                                <option value="all">All Status</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>

                    </div>
                </div>

            </div>

            {/* Blogs Table */}
            <div className="container mx-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                                    <th className="py-4 px-4 sm:px-6 text-left text-gray-700 font-bold text-sm sm:text-base">ID</th>
                                    <th className="py-4 px-4 sm:px-6 text-left text-gray-700 font-bold text-sm sm:text-base">Blog Details</th>
                                    <th className="py-4 px-4 sm:px-6 text-left text-gray-700 font-bold text-sm sm:text-base">Category & Status</th>
                                    <th className="py-4 px-4 sm:px-6 text-left text-gray-700 font-bold text-sm sm:text-base">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredBlogs.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="py-8 sm:py-12 text-center">
                                            <div className="text-gray-400 mb-4">
                                                <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">No blogs found</h3>
                                            <p className="text-gray-500 text-sm sm:text-base mb-6">Try adjusting your search or filter criteria</p>
                                            <button
                                                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all text-sm sm:text-base"
                                                onClick={() => {
                                                    setSearchTerm("");
                                                    setFilterCategory("all");
                                                    setFilterStatus("all");
                                                }}
                                            >
                                                Clear All Filters
                                            </button>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBlogs.map(blog => (
                                        <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-4 sm:px-6">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                                                        <span className="text-white font-bold text-sm sm:text-lg">#{blog.id}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 sm:px-6">
                                                <div className="flex items-center">
                                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden mr-3 sm:mr-4 flex-shrink-0">
                                                        <img
                                                            src={blog.image}
                                                            alt={blog.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-1 truncate">{blog.title}</h4>
                                                        <p className="text-gray-600 text-xs sm:text-sm mb-1 line-clamp-1">{blog.description}</p>
                                                        <div className="flex flex-wrap items-center text-gray-500 text-xs sm:text-sm gap-2">
                                                            <div className="flex items-center">
                                                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                                </svg>
                                                                <span className="truncate">{blog.author}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                                </svg>
                                                                <span>{formatDate(blog.date)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 sm:px-6">
                                                <div className="space-y-2">
                                                    {/* Category Badge */}
                                                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getCategoryColor(blog.category)} inline-block`}>
                                                        {blog.category}
                                                    </span>

                                                    {/* Status Badge */}
                                                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(blog.status)} inline-block ml-2`}>
                                                        {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                                                    </span>

                                                    {/* Stats Row */}
                                                    <div className="flex items-center space-x-4 mt-2">
                                                        <div className="flex items-center text-gray-700">
                                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                                            </svg>
                                                            <span className="text-xs sm:text-sm font-medium">{blog.views.toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex items-center text-gray-700">
                                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                            </svg>
                                                            <span className="text-xs sm:text-sm font-medium">{blog.likes}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 sm:px-6">
                                                <div className="flex space-x-1 sm:space-x-2">
                                                    <button
                                                        onClick={() => openEditBlog(blog)}
                                                        className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-110 active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center"
                                                        title="Edit"
                                                    >
                                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(blog.id)}
                                                        className="p-2 sm:p-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:from-red-600 hover:to-pink-700 transition-all transform hover:scale-110 active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center"
                                                        title="Delete"
                                                    >
                                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 011.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {filteredBlogs.length > 0 && (
                        <div className="px-4 sm:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                            <div className="text-gray-600 text-xs sm:text-sm">
                                Showing <span className="font-bold">{filteredBlogs.length}</span> of <span className="font-bold">{blogs.length}</span> blogs
                            </div>
                            <div className="flex items-center space-x-1 sm:space-x-2">
                                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center text-xs sm:text-sm">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                    </svg>
                                    Prev
                                </button>
                                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-xs sm:text-sm">
                                    1
                                </button>
                                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm">
                                    2
                                </button>
                                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm">
                                    3
                                </button>
                                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center text-xs sm:text-sm">
                                    Next
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Blog Modal */}
            {showAddBlog && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-4xl my-8">
                        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-6 text-white z-10">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl sm:text-2xl font-bold">
                                    {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
                                </h2>
                                <button
                                    className="text-white hover:text-gray-200 text-2xl"
                                    onClick={() => {
                                        setShowAddBlog(false);
                                        resetForm();
                                    }}
                                >
                                    &times;
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                                {/* Left Column - Image Upload */}
                                <div className="lg:col-span-1">
                                    <div className="bg-gray-50 p-4 sm:p-6 h-full">
                                        <div className="space-y-4">
                                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center hover:border-blue-500 transition-colors cursor-pointer relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                {imagePreview ? (
                                                    <div>
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
                                                        />
                                                        <p className="text-gray-600 text-sm sm:text-base">Click to change image</p>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                            </svg>
                                                        </div>
                                                        <p className="text-gray-600 font-medium mb-2 text-sm sm:text-base">Upload Image</p>
                                                        <p className="text-gray-500 text-xs sm:text-sm">Click to browse or drag and drop</p>
                                                        <p className="text-gray-400 text-xs mt-2">PNG, JPG, GIF up to 5MB</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setImagePreview(null)}
                                                    className="px-3 py-1.5 sm:px-4 sm:py-2 text-red-600 hover:text-red-700 text-sm font-medium"
                                                >
                                                    Remove Image
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Form Fields */}
                                <div className="lg:col-span-2">
                                    <div className="space-y-4 sm:space-y-6">
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2 text-sm sm:text-base">Blog Title *</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm sm:text-base"
                                                placeholder="Enter blog title"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                            <div>
                                                <label className="block text-gray-700 font-bold mb-2 text-sm sm:text-base">Author *</label>
                                                <input
                                                    type="text"
                                                    name="author"
                                                    value={formData.author}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm sm:text-base"
                                                    placeholder="Author name"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-gray-700 font-bold mb-2 text-sm sm:text-base">Category *</label>
                                                <select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm sm:text-base"
                                                    required
                                                >
                                                    {categories.map(category => (
                                                        <option key={category} value={category}>{category}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2 text-sm sm:text-base">Description *</label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                rows="3"
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm sm:text-base"
                                                placeholder="Brief description of the blog"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2 text-sm sm:text-base">Status *</label>
                                            <div className="flex space-x-4">
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value="draft"
                                                        checked={formData.status === "draft"}
                                                        onChange={handleInputChange}
                                                        className="mr-2"
                                                    />
                                                    <span className="text-gray-700 text-sm sm:text-base">Draft</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value="published"
                                                        checked={formData.status === "published"}
                                                        onChange={handleInputChange}
                                                        className="mr-2"
                                                    />
                                                    <span className="text-gray-700 text-sm sm:text-base">Published</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all text-sm sm:text-base"
                                    onClick={() => {
                                        setShowAddBlog(false);
                                        resetForm();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-md text-sm sm:text-base"
                                >
                                    {editingBlog ? 'Update Blog' : 'Publish Blog'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
                        <div className="bg-gradient-to-r from-red-500 to-pink-600 p-4 sm:p-6 text-white">
                            <h3 className="text-lg sm:text-xl font-bold">Confirm Delete</h3>
                        </div>

                        <div className="p-4 sm:p-6">
                            <div className="text-center mb-4 sm:mb-6">
                                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.954-.833-2.724 0L4.33 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                                <p className="text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                                    Are you sure you want to delete this blog post?
                                </p>
                                <p className="text-gray-500 text-xs sm:text-sm">
                                    This action cannot be undone and all associated data will be permanently removed.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                                <button
                                    className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all text-sm sm:text-base"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-pink-700 transition-all text-sm sm:text-base"
                                    onClick={handleDeleteBlog}
                                >
                                    Delete Blog
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blog;
import { Star, Plus, Download, Filter, Eye, Trash2, Edit2, Search, Calendar, User, MessageSquare, ChevronDown, ChevronUp, Check, X, AlertCircle, ThumbsUp } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

export default function Testimonials() {
    const [selectedTestimonial, setSelectedTestimonial] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({
        status: "all",
        rating: "all",
        verified: "all"
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [testimonials, setTestimonials] = useState([
        {
            id: 1,
            name: "Anjali Chaudhary",
            role: "App Developer",
            rating: 5.0,
            feedback: "Using Vruum Cab for business travel has been a game-changer for our team. The reliability and professionalism are unmatched!",
            date: "Nov 7, 2025",
            status: "Excellent",
            avatarColor: "bg-gradient-to-br from-blue-500 to-blue-600",
            initials: "AC",
            verified: true
        },
        {
            id: 2,
            name: "Rohit Kumar",
            role: "Full Stack Developer",
            rating: 5.0,
            feedback: "Affordable and safe rides every time! Vruum Cab has made my daily commute stress-free and comfortable.",
            date: "Nov 7, 2025",
            status: "Excellent",
            avatarColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
            initials: "RK",
            verified: true
        },
        {
            id: 3,
            name: "Priya Sharma",
            role: "Product Manager",
            rating: 4.8,
            feedback: "The app interface is so user-friendly and booking takes seconds. Great service overall!",
            date: "Nov 6, 2025",
            status: "Very Good",
            avatarColor: "bg-gradient-to-br from-violet-500 to-violet-600",
            initials: "PS",
            verified: false
        },
        {
            id: 4,
            name: "Arun Verma",
            role: "Business Analyst",
            rating: 4.5,
            feedback: "Perfect for corporate travel. Always on time and drivers are very professional.",
            date: "Nov 5, 2025",
            status: "Very Good",
            avatarColor: "bg-gradient-to-br from-amber-500 to-amber-600",
            initials: "AV",
            verified: true
        },
        {
            id: 5,
            name: "Sneha Patel",
            role: "UX Designer",
            rating: 4.9,
            feedback: "Love the clean interface and easy booking process. Makes my travel planning so much easier.",
            date: "Nov 4, 2025",
            status: "Excellent",
            avatarColor: "bg-gradient-to-br from-pink-500 to-pink-600",
            initials: "SP",
            verified: true
        },
        {
            id: 6,
            name: "Rajesh Mehta",
            role: "Software Engineer",
            rating: 4.7,
            feedback: "Great service, reliable drivers, and reasonable pricing. Highly recommend!",
            date: "Nov 3, 2025",
            status: "Very Good",
            avatarColor: "bg-gradient-to-br from-indigo-500 to-indigo-600",
            initials: "RM",
            verified: false
        }
    ]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(null);
    const [newTestimonial, setNewTestimonial] = useState({
        name: "",
        role: "",
        rating: 5,
        feedback: "",
        verified: false
    });
    const itemsPerPage = 4;

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Filter and sort testimonials
    const filteredAndSortedTestimonials = useMemo(() => {
        let filtered = testimonials.filter(testimonial => {
            const matchesSearch = testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                testimonial.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                testimonial.feedback.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = filters.status === "all" || testimonial.status === filters.status;
            const matchesRating = filters.rating === "all" ||
                (filters.rating === "5" && testimonial.rating >= 4.8) ||
                (filters.rating === "4.5+" && testimonial.rating >= 4.5) ||
                (filters.rating === "4+" && testimonial.rating >= 4.0);
            const matchesVerified = filters.verified === "all" ||
                (filters.verified === "verified" && testimonial.verified) ||
                (filters.verified === "unverified" && !testimonial.verified);

            return matchesSearch && matchesStatus && matchesRating && matchesVerified;
        });

        // Sort testimonials
        filtered.sort((a, b) => {
            if (sortConfig.key === 'date') {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
            }
            if (sortConfig.key === 'rating') {
                return sortConfig.direction === 'asc' ? a.rating - b.rating : b.rating - a.rating;
            }
            return 0;
        });

        return filtered;
    }, [testimonials, searchQuery, filters, sortConfig]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedTestimonials.length / itemsPerPage);
    const paginatedTestimonials = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredAndSortedTestimonials.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredAndSortedTestimonials, currentPage]);

    const stats = [
        {
            title: "TOTAL REVIEWS",
            value: testimonials.length.toString(),
            subtitle: "All customer reviews",
            color: "blue",
            icon: <MessageSquare size={20} />,
            gradient: "from-blue-50 to-blue-100",
            borderColor: "border-blue-200"
        },
        {
            title: "AVERAGE RATING",
            value: (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1),
            subtitle: "Overall satisfaction",
            color: "amber",
            icon: <Star size={20} className="fill-yellow-400 text-yellow-400" />,
            gradient: "from-amber-50 to-amber-100",
            borderColor: "border-amber-200"
        },
        {
            title: "5-STAR REVIEWS",
            value: testimonials.filter(t => t.rating >= 4.8).length.toString(),
            subtitle: "Perfect ratings",
            color: "emerald",
            icon: <div className="flex"><Star size={16} className="fill-yellow-400 text-yellow-400" /><Star size={16} className="fill-yellow-400 text-yellow-400" /><Star size={16} className="fill-yellow-400 text-yellow-400" /><Star size={16} className="fill-yellow-400 text-yellow-400" /><Star size={16} className="fill-yellow-400 text-yellow-400" /></div>,
            gradient: "from-emerald-50 to-emerald-100",
            borderColor: "border-emerald-200"
        },
        {
            title: "EXCELLENT (4.5+)",
            value: testimonials.filter(t => t.rating >= 4.5).length.toString(),
            subtitle: "High satisfaction",
            color: "violet",
            icon: <Star size={20} className="fill-yellow-400 text-yellow-400" />,
            gradient: "from-violet-50 to-violet-100",
            borderColor: "border-violet-200"
        }
    ];

    const toggleSelectAll = () => {
        if (selectedTestimonial.length === paginatedTestimonials.length) {
            setSelectedTestimonial([]);
        } else {
            setSelectedTestimonial(paginatedTestimonials.map(t => t.id));
        }
    };

    const toggleSelectItem = (id) => {
        if (selectedTestimonial.includes(id)) {
            setSelectedTestimonial(selectedTestimonial.filter(item => item !== id));
        } else {
            setSelectedTestimonial([...selectedTestimonial, id]);
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <ChevronDown size={16} className="opacity-30" />;
        return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
    };

    const handleExport = () => {
        const data = JSON.stringify(testimonials, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'testimonials.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Show success notification
        alert("Testimonials exported successfully!");
    };

    const handleDeleteSelected = () => {
        if (selectedTestimonial.length === 0) return;
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setTestimonials(prev => prev.filter(t => !selectedTestimonial.includes(t.id)));
        setSelectedTestimonial([]);
        setShowDeleteModal(false);

        // Reset to page 1 if current page becomes empty
        if (paginatedTestimonials.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleDeleteSingle = (id) => {
        if (window.confirm("Are you sure you want to delete this testimonial?")) {
            setTestimonials(prev => prev.filter(t => t.id !== id));
        }
    };

    const handleApproveSelected = () => {
        setTestimonials(prev => prev.map(t =>
            selectedTestimonial.includes(t.id) ? { ...t, verified: true } : t
        ));
        setSelectedTestimonial([]);
    };

    const handleAddTestimonial = () => {
        if (!newTestimonial.name || !newTestimonial.role || !newTestimonial.feedback) {
            alert("Please fill in all required fields");
            return;
        }

        const newId = Math.max(...testimonials.map(t => t.id)) + 1;
        const status = newTestimonial.rating >= 4.8 ? "Excellent" :
            newTestimonial.rating >= 4.5 ? "Very Good" : "Good";

        const colors = [
            "bg-gradient-to-br from-blue-500 to-blue-600",
            "bg-gradient-to-br from-emerald-500 to-emerald-600",
            "bg-gradient-to-br from-violet-500 to-violet-600",
            "bg-gradient-to-br from-amber-500 to-amber-600",
            "bg-gradient-to-br from-pink-500 to-pink-600",
            "bg-gradient-to-br from-indigo-500 to-indigo-600"
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newEntry = {
            id: newId,
            name: newTestimonial.name,
            role: newTestimonial.role,
            rating: newTestimonial.rating,
            feedback: newTestimonial.feedback,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: status,
            avatarColor: randomColor,
            initials: newTestimonial.name.split(' ').map(n => n[0]).join('').toUpperCase(),
            verified: newTestimonial.verified
        };

        setTestimonials(prev => [newEntry, ...prev]);
        setNewTestimonial({
            name: "",
            role: "",
            rating: 5,
            feedback: "",
            verified: false
        });
        setShowAddModal(false);
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            if (currentPage > 2) pages.push(currentPage - 1);
            if (currentPage !== 1 && currentPage !== totalPages) pages.push(currentPage);
            if (currentPage < totalPages - 1) pages.push(currentPage + 1);
            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 animate-fadeIn">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                    <AlertCircle className="text-red-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Delete Testimonials</h3>
                                    <p className="text-gray-600 text-sm">This action cannot be undone</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-6">
                                Are you sure you want to delete {selectedTestimonial.length} selected testimonial{selectedTestimonial.length > 1 ? 's' : ''}?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Testimonial Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-fadeIn">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Add New Testimonial</h3>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        value={newTestimonial.name}
                                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        placeholder="Enter customer name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Role/Position *</label>
                                    <input
                                        type="text"
                                        value={newTestimonial.role}
                                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, role: e.target.value }))}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        placeholder="Enter role/position"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setNewTestimonial(prev => ({ ...prev, rating: star }))}
                                                className="p-1"
                                            >
                                                <Star
                                                    size={24}
                                                    className={star <= newTestimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                                />
                                            </button>
                                        ))}
                                        <span className="ml-2 font-medium">{newTestimonial.rating}.0</span>
                                    </div>
                                </div>
                                <div className="flex items-center mt-8">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={newTestimonial.verified}
                                            onChange={(e) => setNewTestimonial(prev => ({ ...prev, verified: e.target.checked }))}
                                            className="sr-only"
                                        />
                                        <div className={`w-10 h-6 flex items-center rounded-full p-1 transition-all ${newTestimonial.verified ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                            <div className={`bg-white w-4 h-4 rounded-full transform transition-all ${newTestimonial.verified ? 'translate-x-4' : ''}`}></div>
                                        </div>
                                        <span className="ml-3 text-sm font-medium">Verified Customer</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Feedback *</label>
                                <textarea
                                    value={newTestimonial.feedback}
                                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, feedback: e.target.value }))}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all min-h-[120px] resize-none"
                                    placeholder="Enter customer feedback..."
                                    maxLength={500}
                                />
                                <div className="text-right text-sm text-gray-500 mt-1">
                                    {newTestimonial.feedback.length}/500 characters
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddTestimonial}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                                >
                                    Add Testimonial
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* View Testimonial Modal */}
            {showViewModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full transform transition-all duration-300 animate-fadeIn">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Testimonial Details</h3>
                                <button
                                    onClick={() => setShowViewModal(null)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-16 h-16 rounded-full ${showViewModal.avatarColor} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                                    {showViewModal.initials}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">{showViewModal.name}</h4>
                                    <p className="text-gray-600">{showViewModal.role}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className={i < Math.floor(showViewModal.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                                />
                                            ))}
                                        </div>
                                        <span className="font-bold text-gray-900">({showViewModal.rating})</span>
                                        {showViewModal.verified && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                                                <Check size={12} />
                                                Verified
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                <p className="text-gray-700 italic">"{showViewModal.feedback}"</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span className="text-gray-600">Submitted:</span>
                                    <span className="font-medium">{showViewModal.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ThumbsUp size={16} className="text-gray-400" />
                                    <span className="text-gray-600">Status:</span>
                                    <span className={`font-medium ${showViewModal.status === "Excellent" ? "text-emerald-600" : "text-amber-600"}`}>
                                        {showViewModal.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Main Container Box with Enhanced Colors & Animations */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-md shadow-sm border border-gray-200/50 overflow-hidden transform transition-all duration-300">

                    {/* Header Section */}
                    <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50/50">
                        <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                            <div>
                                <h1 className="text-2xl font-bold text-blue-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    Testimonials Management
                                </h1>
                                <p className="text-gray-600 mt-1 text-lg">Manage customer feedback and reviews</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={handleExport}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow"
                                >
                                    <Download size={18} />
                                    <span className="hidden sm:inline">Export</span>
                                </button>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                                >
                                    <Plus size={18} />
                                    <span>Add New</span>
                                </button>
                            </div>
                        </div>

                        {/* Stats Grid with Enhanced Colors */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className={`bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg p-3 md:p-4 border ${stat.borderColor} transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className={`text-xs font-semibold text-${stat.color}-700 uppercase tracking-wide`}>
                                            {stat.title}
                                        </div>
                                        <div className={`text-${stat.color}-600 transform transition-transform duration-300 hover:scale-110`}>
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className={`text-2xl md:text-3xl font-bold text-${stat.color}-900`}>{stat.value}</span>
                                        {stat.title === "AVERAGE RATING" && (
                                            <div className="flex ml-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        className={`text-yellow-400 fill-yellow-400 transition-transform duration-300 hover:scale-125`}
                                                        style={{ transitionDelay: `${i * 50}ms` }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-600 mt-1">
                                        {stat.subtitle}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50/80 to-gray-100/50">
                        <div className={`flex flex-col lg:flex-row gap-4 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                            {/* Search Bar */}
                            <div className="flex-1">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 group-focus-within:text-blue-500" size={20} />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by name, role, feedback..."
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 shadow-sm group-hover:shadow"
                                    />
                                </div>
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex flex-wrap gap-3">
                                <div className="relative">
                                    <button
                                        onClick={() => setShowFilter(!showFilter)}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow"
                                    >
                                        <Filter size={18} />
                                        <span>Filters</span>
                                        <ChevronDown size={16} className={`transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`} />
                                    </button>

                                    {showFilter && (
                                        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-10 animate-fadeIn">
                                            <div className="p-4">
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                                    <select
                                                        value={filters.status}
                                                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                                                    >
                                                        <option value="all">All Status</option>
                                                        <option value="Excellent">Excellent</option>
                                                        <option value="Very Good">Very Good</option>
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                                    <select
                                                        value={filters.rating}
                                                        onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
                                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                                                    >
                                                        <option value="all">All Ratings</option>
                                                        <option value="5">5 Stars</option>
                                                        <option value="4.5+">4.5+ Stars</option>
                                                        <option value="4+">4+ Stars</option>
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Verification</label>
                                                    <select
                                                        value={filters.verified}
                                                        onChange={(e) => setFilters(prev => ({ ...prev, verified: e.target.value }))}
                                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                                                    >
                                                        <option value="all">All</option>
                                                        <option value="verified">Verified Only</option>
                                                        <option value="unverified">Unverified Only</option>
                                                    </select>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setFilters({ status: "all", rating: "all", verified: "all" });
                                                        setShowFilter(false);
                                                    }}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    Clear Filters
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setFilters(prev => ({ ...prev, status: "all", rating: "all", verified: "all" }))}
                                        className="px-3 md:px-4 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium text-sm border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
                                    >
                                        Total: {testimonials.length}
                                    </button>
                                    <button
                                        onClick={() => setFilters(prev => ({ ...prev, rating: "5" }))}
                                        className="px-3 md:px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 font-medium text-sm border border-emerald-200 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
                                    >
                                        5★: {stats[2].value}
                                    </button>
                                    <button
                                        onClick={() => setFilters(prev => ({ ...prev, rating: "4.5+" }))}
                                        className="px-3 md:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 font-medium text-sm border border-amber-200 hover:from-amber-100 hover:to-amber-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
                                    >
                                        4★+: {stats[3].value}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selection Info */}
                    {selectedTestimonial.length > 0 && (
                        <div className="px-4 md:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200 animate-fadeIn">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center animate-pulse">
                                        <Check size={18} className="text-white" />
                                    </div>
                                    <span className="text-sm font-semibold text-blue-800">
                                        {selectedTestimonial.length} item{selectedTestimonial.length > 1 ? 's' : ''} selected
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleApproveSelected}
                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 rounded-lg bg-white border border-blue-200 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
                                    >
                                        Approve Selected
                                    </button>
                                    <button
                                        onClick={handleDeleteSelected}
                                        className="text-sm text-red-600 hover:text-red-800 font-medium px-3 py-1.5 rounded-lg bg-white border border-red-200 hover:bg-red-50 transition-all duration-300 hover:scale-105"
                                    >
                                        Delete Selected
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Table Section */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                                <tr>
                                    <th className="w-12 p-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedTestimonial.length === paginatedTestimonials.length && paginatedTestimonials.length > 0}
                                            onChange={toggleSelectAll}
                                            className="rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                                        />
                                    </th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-900">
                                        Customer
                                    </th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-900">
                                        <div className="flex items-center gap-1">
                                            Rating & Status
                                        </div>
                                    </th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-900">
                                        Feedback
                                    </th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-900">
                                        <div className="flex items-center gap-1">
                                            Date
                                            {getSortIcon('date')}
                                        </div>
                                    </th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-900">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/50">
                                {paginatedTestimonials.length > 0 ? (
                                    paginatedTestimonials.map((testimonial, index) => (
                                        <tr
                                            key={testimonial.id}
                                            className={`transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-white ${selectedTestimonial.includes(testimonial.id) ? 'bg-gradient-to-r from-blue-50/50 to-blue-100/30' : ''} ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                            style={{ transitionDelay: `${index * 50}ms` }}
                                        >
                                            <td className="p-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTestimonial.includes(testimonial.id)}
                                                    onChange={() => toggleSelectItem(testimonial.id)}
                                                    className="rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 hover:scale-110"
                                                />
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${testimonial.avatarColor} flex items-center justify-center text-white font-bold shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl`}>
                                                        {testimonial.initials}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</div>
                                                        <div className="text-xs md:text-sm text-gray-600">{testimonial.role}</div>
                                                        {testimonial.verified && (
                                                            <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                                                                <Check size={12} className="text-blue-600" />
                                                                <span className="text-xs font-medium text-blue-700">Verified</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={16}
                                                                className={`transition-all duration-300 hover:scale-125 ${i < Math.floor(testimonial.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                                                style={{ transitionDelay: `${i * 50}ms` }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="font-bold text-gray-900 ml-1 text-sm md:text-base">({testimonial.rating})</span>
                                                </div>
                                                <span className={`inline-block mt-2 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transform transition-all duration-300 hover:scale-105
                                                    ${testimonial.status === "Excellent"
                                                        ? "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-900 border border-emerald-300"
                                                        : "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-900 border border-amber-300"
                                                    }`}
                                                >
                                                    {testimonial.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="max-w-xs">
                                                    <p className="text-gray-700 text-xs md:text-sm line-clamp-2 leading-relaxed transition-all duration-300 hover:line-clamp-none hover:bg-gray-50 hover:p-2 hover:rounded-lg">
                                                        "{testimonial.feedback}"
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-gray-600 group cursor-pointer" onClick={() => handleSort('date')}>
                                                    <div className="p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 group-hover:from-blue-100 group-hover:to-blue-50 transition-all duration-300">
                                                        <Calendar size={16} className="transition-all duration-300 group-hover:text-blue-600" />
                                                    </div>
                                                    <span className="text-sm font-medium group-hover:text-blue-700 transition-colors duration-300">
                                                        {testimonial.date}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setShowViewModal(testimonial)}
                                                        className="p-2 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 hover:from-blue-100 hover:to-blue-200 hover:text-blue-700 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:shadow border border-blue-200"
                                                        title="View Details"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSingle(testimonial.id)}
                                                        className="p-2 rounded-xl bg-gradient-to-r from-red-50 to-red-100 text-red-600 hover:from-red-100 hover:to-red-200 hover:text-red-700 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:shadow border border-red-200"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center">
                                            <div className="text-gray-500">
                                                <Search size={48} className="mx-auto mb-4 text-gray-300" />
                                                <p className="font-medium">No testimonials found</p>
                                                <p className="text-sm mt-1">Try adjusting your search or filters</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer with Pagination */}
                    <div className="px-4 md:px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50/50 to-white">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="text-sm text-gray-600">
                                Showing <span className="font-semibold text-gray-900">
                                    {Math.min((currentPage - 1) * itemsPerPage + 1, filteredAndSortedTestimonials.length)}-
                                    {Math.min(currentPage * itemsPerPage, filteredAndSortedTestimonials.length)}
                                </span> of <span className="font-semibold text-gray-900">{filteredAndSortedTestimonials.length}</span> testimonials
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 md:px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow"
                                >
                                    Previous
                                </button>

                                {getPageNumbers().map((page, index) => (
                                    page === '...' ? (
                                        <span key={index} className="px-2 text-gray-400">...</span>
                                    ) : (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-8 h-8 md:w-10 md:h-10 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow ${currentPage === page
                                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                                                : 'border border-gray-300 bg-white hover:bg-gray-50'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    )
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-3 md:px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
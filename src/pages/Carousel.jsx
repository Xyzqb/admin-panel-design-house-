import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Pagination from '../components/Pagination';
import { toast } from "react-toastify";
import DeleteConfirmToast from "../components/DeleteConfirmToast";
import "react-toastify/dist/ReactToastify.css";

import {
    Plus, Trash2, Edit, Eye, Image, Calendar, Clock, Star, Settings,
    Search, Filter, Download, ChevronDown, ChevronUp,
    X, Check, ExternalLink, Copy, AlertCircle, Maximize2, Minimize2,
    Heart, MessageSquare, Share2, Tag, User, Eye as EyeIcon
} from 'lucide-react';

const Carousel = () => {
    const navigate = useNavigate();

    // State variables
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedCard, setExpandedCard] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const rowsPerPage = 12;

    const [carousels, setCarousels] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [festivalStatus, setFestivalStatus] = useState({
        activeFestivals: [],
        isDayTime: false,
        lastChecked: null,
    });

    // Load carousels from localStorage
    // useEffect(() => {
    //     const loadCarousels = () => {
    //         try {
    //             const saved = localStorage.getItem("carousels");
    //             if (saved) {
    //                 const parsed = JSON.parse(saved);
    //                 const validatedCarousels = parsed.map(carousel => ({
    //                     ...carousel,
    //                     id: carousel.id || Date.now() + Math.random(),
    //                     titles: carousel.titles || ['', '', ''],
    //                     images: carousel.images || [],
    //                     status: carousel.status || 'inactive',
    //                     festivalSchedule: carousel.festivalSchedule || null,
    //                     createdAt: carousel.createdAt || new Date().toISOString().split('T')[0],
    //                     description: carousel.description || '',
    //                     priority: carousel.priority || 1,
    //                     likes: carousel.likes || Math.floor(Math.random() * 100),
    //                     views: carousel.views || Math.floor(Math.random() * 500),
    //                     tags: carousel.tags || ['Design', 'Hero', 'Banner']
    //                 }));
    //                 setCarousels(validatedCarousels);
    //             } else {
    //                 // Default sample data
    //                 setCarousels([
    //                     {
    //                         id: 1,
    //                         title: "Summer Collection 2024",
    //                         subtitle: "Explore our exclusive summer offers",
    //                         description: "Beautiful summer-themed carousel with vibrant colors and engaging content for seasonal promotions.",
    //                         images: Array(3).fill().map((_, i) => ({ id: i, url: '', name: `summer-${i}.jpg` })),
    //                         status: 'active',
    //                         festivalSchedule: null,
    //                         createdAt: '2024-06-15',
    //                         priority: 1,
    //                         likes: 45,
    //                         views: 320,
    //                         tags: ['Summer', 'Promotion', 'Seasonal']
    //                     },
    //                     {
    //                         id: 2,
    //                         title: "Christmas Special",
    //                         subtitle: "Festive season discounts",
    //                         description: "Festive carousel for Christmas season with holiday-themed graphics and special offers.",
    //                         images: Array(4).fill().map((_, i) => ({ id: i, url: '', name: `christmas-${i}.jpg` })),
    //                         status: 'active',
    //                         festivalSchedule: { name: 'Christmas', color: 'from-red-500 to-green-500' },
    //                         createdAt: '2024-12-01',
    //                         priority: 2,
    //                         likes: 89,
    //                         views: 567,
    //                         tags: ['Christmas', 'Festival', 'Holiday']
    //                     }
    //                 ]);
    //             }
    //         } catch (error) {
    //             console.error("Error loading carousels:", error);
    //             setCarousels([]);
    //         }
    //     };

    //     loadCarousels();
    //     window.addEventListener("storage", loadCarousels);

    //     return () => window.removeEventListener("storage", loadCarousels);
    // }, []);

    // Festival schedules
    const festivalSchedules = [
        {
            name: 'Christmas',
            startDate: '2024-12-24',
            endDate: '2024-12-26',
            activeTime: { start: '12:00', end: '23:59' },
            color: 'from-red-500 to-green-500'
        },
        {
            name: 'New Year',
            startDate: '2024-12-31',
            endDate: '2025-01-02',
            activeTime: { start: '12:00', end: '23:59' },
            color: 'from-blue-500 to-purple-500'
        },
        {
            name: 'Diwali',
            startDate: '2024-11-12',
            endDate: '2024-11-15',
            activeTime: { start: '12:00', end: '23:59' },
            color: 'from-orange-500 to-yellow-500'
        }
    ];

    // Time and festival check
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            checkFestivalSchedule(now);
        }, 60000);

        const now = new Date();
        setCurrentTime(now);
        checkFestivalSchedule(now);

        return () => clearInterval(timer);
    }, []);

    const checkFestivalSchedule = (now) => {
        const currentDate = now.toISOString().split('T')[0];
        const currentHour = now.getHours();
        const isDayTime = currentHour >= 12;

        const activeFestivals = festivalSchedules.filter(festival => {
            const isDateInRange = currentDate >= festival.startDate && currentDate <= festival.endDate;
            return isDateInRange && isDayTime;
        });

        // setCarousels(prev => prev.map(carousel => {
        //     if (carousel.festivalSchedule) {
        //         const festivalActive = activeFestivals.some(f => f.name === carousel.festivalSchedule.name);
        //         return {
        //             ...carousel,
        //             status: festivalActive ? 'active' : 'inactive'
        //         };
        //     }
        //     return carousel;
        // }));

        setFestivalStatus({
            activeFestivals: activeFestivals.map(f => f.name),
            isDayTime,
            lastChecked: now.toLocaleTimeString()
        });
    };

    // Filter carousels
    const filteredCarousels = carousels.filter(carousel => {
        const matchesSearch = carousel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            carousel.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            carousel.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            carousel.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || carousel.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Pagination
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredCarousels.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCarousels.length / rowsPerPage);

    // Actions
    const handleDeleteCarousel = (id) => {
        toast(
            <DeleteConfirmToast
                onDelete={() => {
                    const updated = carousels.filter(c => c.id !== id);
                    setCarousels(updated);
                    localStorage.setItem("carousels", JSON.stringify(updated)); // ✅ FIX
                    toast.success("Carousel deleted successfully 🗑️");
                }}
            />,
            { autoClose: false }
        );
    };


    const handleEditCarousel = (id) => {
        navigate(`/edit-carousel/${id}`);
    };

    const handleDuplicateCarousel = (carousel) => {
        const newCarousel = {
            ...carousel,
            id: Date.now(),
            title: `${carousel.title} (Copy)`,
            status: 'inactive',
            createdAt: new Date().toISOString().split('T')[0]
        };

        const updatedCarousels = [...carousels, newCarousel];
        setCarousels(updatedCarousels);
        localStorage.setItem("carousels", JSON.stringify(updatedCarousels));
        toast.success("Carousel duplicated successfully 📋");
    };

    const handleToggleStatus = (id) => {
        const updated = carousels.map(c =>
            c.id === id
                ? { ...c, status: c.status === "active" ? "inactive" : "active" }
                : c
        );
        setCarousels(updated);
        localStorage.setItem("carousels", JSON.stringify(updated)); // ✅ FIX
        toast.success("Status updated successfully 🔄");
    };

    const handleToggleExpand = (id) => {
        if (expandedCard === id) {
            setExpandedCard(null);
        } else {
            setExpandedCard(id);
        }
    };

    const handleExport = () => {
        const exportData = filteredCarousels.map(c => ({
            ID: c.id,
            Title: c.title,
            Subtitle: c.subtitle,
            Status: c.status,
            Images: c.images?.length || 0,
            'Created Date': c.createdAt,
            'Festival Schedule': c.festivalSchedule?.name || 'None',
            Description: c.description || ''
        }));

        const csv = [
            Object.keys(exportData[0] || {}).join(','),
            ...exportData.map(row => Object.values(row).map(val =>
                `"${String(val).replace(/"/g, '""')}"`
            ).join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `carousels_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();

        toast.success("Data exported successfully 📥");
    };

    // Helper functions
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
            case 'inactive': return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
            case 'scheduled': return 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 1: return 'bg-red-100 text-red-800';
            case 2: return 'bg-yellow-100 text-yellow-800';
            case 3: return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch {
            return 'Invalid date';
        }
    };

    const getFestivalColor = (festivalName) => {
        const festival = festivalSchedules.find(f => f.name === festivalName);
        return festival?.color || 'from-gray-500 to-gray-600';
    };

    const CardView = ({ carousel }) => {
        const isExpanded = expandedCard === carousel.id;

        return (
            <div className={`relative border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${isExpanded ? 'col-span-2 row-span-2' : ''}`}>
                {/* Card Header */}
                <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                #{carousel.id}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{carousel.title}</h3>
                                <p className="text-sm text-gray-600">{carousel.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(carousel.status)}`}>
                                {carousel.status.charAt(0).toUpperCase() + carousel.status.slice(1)}
                            </span>
                            <button
                                onClick={() => handleToggleExpand(carousel.id)}
                                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card Body */}
                <div className={`${isExpanded ? 'grid grid-cols-1 lg:grid-cols-3 gap-6' : ''} p-4`}>
                    {/* Images Section */}
                    <div className={`${isExpanded ? 'lg:col-span-2' : ''}`}>
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                <Image className="w-4 h-4 text-blue-600" />
                                Images ({carousel.images?.length || 0})
                            </h4>
                            {!isExpanded && (
                                <button
                                    onClick={() => handleToggleExpand(carousel.id)}
                                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                >
                                    View Details
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <div className={`${isExpanded ? 'grid grid-cols-2 md:grid-cols-3 gap-3' : 'flex gap-2'}`}>
                            {carousel.images?.slice(0, isExpanded ? 6 : 3).map((img, idx) => (
                                <div
                                    key={img.id || idx}
                                    className={`${isExpanded ? 'h-32' : 'h-20'} rounded-lg overflow-hidden border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}
                                >
                                    {img.url ? (
                                        <img
                                            src={img.url}
                                            alt={`${carousel.title} - Image ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <Image className="w-6 h-6 mb-1" />
                                            <span className="text-xs">Image {idx + 1}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {!isExpanded && carousel.images?.length > 3 && (
                                <div className="h-20 rounded-lg overflow-hidden border border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-700">
                                    <div className="text-center">
                                        <div className="text-lg font-bold">+{carousel.images.length - 3}</div>
                                        <div className="text-xs">More</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                        <>
                            {/* Details Section */}
                            <div className="lg:col-span-1">
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 text-purple-600" />
                                        Details
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs font-medium text-gray-500">Description</label>
                                            <p className="text-sm text-gray-900">{carousel.description || 'No description available'}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-500">Created</label>
                                            <p className="text-sm text-gray-900">{formatDate(carousel.createdAt)}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-500">Priority</label>
                                            <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${getPriorityColor(carousel.priority)}`}>
                                                Priority {carousel.priority}
                                            </span>
                                        </div>
                                        {carousel.festivalSchedule && (
                                            <div>
                                                <label className="text-xs font-medium text-gray-500">Festival</label>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getFestivalColor(carousel.festivalSchedule.name)}`}></div>
                                                    <p className="text-sm text-gray-900 font-medium">{carousel.festivalSchedule.name}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Stats Section */}
                            <div className="lg:col-span-1">
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <Star className="w-4 h-4 text-amber-600" />
                                        Statistics
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-gray-900">{carousel.likes}</div>
                                            <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                                                <Heart className="w-3 h-3" />
                                                Likes
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-gray-900">{carousel.views}</div>
                                            <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                                                <EyeIcon className="w-3 h-3" />
                                                Views
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tags Section */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <Tag className="w-4 h-4 text-green-600" />
                                        Tags
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {carousel.tags?.map((tag, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Card Footer */}
                <div className="border-t border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handleToggleStatus(carousel.id)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${carousel.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                {carousel.status === 'active' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                {carousel.status === 'active' ? 'Active' : 'Inactive'}
                            </button>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <User className="w-4 h-4" />
                                <span>Admin</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => handleEditCarousel(carousel.id)}
                                className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                title="Edit"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDuplicateCarousel(carousel)}
                                className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
                                title="Duplicate"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => navigate(`/preview/${carousel.id}`)}
                                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                                title="Preview"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDeleteCarousel(carousel.id)}
                                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white shadow-md mt-6 p-4 md:p-6">
            <div className="w-full">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-amber-600">
                                Carousel Management
                            </h1>
                            <p className="text-gray-600 mt-2 text-lg">
                                Manage and organize your website hero section carousels
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                            <button
                                onClick={() => navigate("/add-carousels")}
                                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors shadow-md hover:shadow-lg"
                            >
                                <Plus className="w-5 h-5" />
                                Add Carousel
                            </button>
                            <button
                                onClick={() => navigate("/festival-carousels")}
                                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors shadow-md hover:shadow-lg"
                            >
                                <Star className="w-5 h-5" />
                                Festival Carousels
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        {
                            title: "Total Carousels",
                            value: carousels.length,
                            icon: Image,
                            color: "from-blue-500 to-cyan-500",
                            bg: "bg-blue-50",
                            border: "border-blue-200"
                        },
                        {
                            title: "Active Now",
                            value: carousels.filter(c => c.status === 'active').length,
                            icon: Star,
                            color: "from-green-500 to-emerald-500",
                            bg: "bg-green-50",
                            border: "border-green-200"
                        },
                        {
                            title: "Total Images",
                            value: carousels.reduce((acc, c) => acc + (c.images?.length || 0), 0),
                            icon: Settings,
                            color: "from-orange-500 to-amber-500",
                            bg: "bg-orange-50",
                            border: "border-orange-200"
                        }
                    ].map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className={`${stat.bg} border ${stat.border} rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                    </div>
                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                        <div className="flex-1 w-full">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search carousels by title, tags, or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 lg:flex-none">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 w-full"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="scheduled">Scheduled</option>
                                </select>
                                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            </div>
                            <button
                                onClick={handleExport}
                                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors whitespace-nowrap"
                            >
                                <Download className="w-5 h-5" />
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cards Grid Section */}
                <div className="mb-8">
                    {currentItems.length === 0 ? (
                        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-300">
                            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                                <Image className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Carousels Found</h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                {searchTerm || statusFilter !== 'all'
                                    ? "No carousels match your search criteria. Try different keywords or clear filters."
                                    : "You haven't created any carousels yet. Start by adding your first carousel!"}
                            </p>
                            <button
                                onClick={() => navigate("/add-carousels")}
                                className="bg-gradient-to-r from-gray-900 to-black text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto hover:shadow-lg transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                Create Your First Carousel
                            </button>
                        </div>
                    ) : (
                        <div className={`grid grid-cols-1 ${expandedCard ? 'lg:grid-cols-2' : 'lg:grid-cols-2 xl:grid-cols-3'} gap-6`}>
                            {currentItems.map((carousel) => (
                                <CardView key={carousel.id} carousel={carousel} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {filteredCarousels.length > 0 && (
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <Pagination
                            currentPage={currentPage}
                            totalItems={filteredCarousels.length}
                            itemsPerPage={rowsPerPage}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Carousel;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import Pagination from '../components/Pagination';
// import { toast } from "react-toastify";
// import DeleteConfirmToast from "../components/DeleteConfirmToast";

// import {
//     Plus, Trash2, Edit, Eye, Image, Calendar, Clock, Star, Settings,
//     Search, Filter, Download, MoreVertical, ChevronDown, ChevronUp,
//     X, Check, ExternalLink, Copy, AlertCircle
// } from 'lucide-react';

// const Carousel = () => {
//     const navigate = useNavigate();

//     // State variables
//     const [searchTerm, setSearchTerm] = useState("");
//     const [statusFilter, setStatusFilter] = useState("all");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [expandedRow, setExpandedRow] = useState(null);
//     const rowsPerPage = 8;

//     const [carousels, setCarousels] = useState([]);
//     const [currentTime, setCurrentTime] = useState(new Date());
//     const [festivalStatus, setFestivalStatus] = useState({
//         activeFestivals: [],
//         isDayTime: false,
//         lastChecked: null,
//     });

//     // Load carousels from localStorage
//     useEffect(() => {
//         const loadCarousels = () => {
//             try {
//                 const saved = localStorage.getItem("carousels");
//                 if (saved) {
//                     const parsed = JSON.parse(saved);
//                     // Ensure each carousel has required properties
//                     const validatedCarousels = parsed.map(carousel => ({
//                         ...carousel,
//                         titles: carousel.titles || ['', '', ''],
//                         images: carousel.images || [],
//                         status: carousel.status || 'inactive',
//                         festivalSchedule: carousel.festivalSchedule || null,
//                         createdAt: carousel.createdAt || new Date().toISOString().split('T')[0],
//                         description: carousel.description || '',
//                         priority: carousel.priority || 1
//                     }));
//                     setCarousels(validatedCarousels);
//                 } else {
//                     setCarousels([]);
//                 }
//             } catch (error) {
//                 console.error("Error loading carousels:", error);
//                 setCarousels([]);
//             }
//         };

//         loadCarousels();
//         window.addEventListener("storage", loadCarousels);

//         return () => window.removeEventListener("storage", loadCarousels);
//     }, []);

//     // Festival schedules
//     const festivalSchedules = [
//         {
//             name: 'Christmas',
//             startDate: '2024-12-24',
//             endDate: '2024-12-26',
//             activeTime: { start: '12:00', end: '23:59' },
//             color: 'from-red-500 to-green-500'
//         },
//         {
//             name: 'New Year',
//             startDate: '2024-12-31',
//             endDate: '2025-01-02',
//             activeTime: { start: '12:00', end: '23:59' },
//             color: 'from-blue-500 to-purple-500'
//         },
//         {
//             name: 'Diwali',
//             startDate: '2024-11-12',
//             endDate: '2024-11-15',
//             activeTime: { start: '12:00', end: '23:59' },
//             color: 'from-orange-500 to-yellow-500'
//         }
//     ];

//     // Time and festival check
//     useEffect(() => {
//         const timer = setInterval(() => {
//             const now = new Date();
//             setCurrentTime(now);
//             checkFestivalSchedule(now);
//         }, 60000);

//         const now = new Date();
//         setCurrentTime(now);
//         checkFestivalSchedule(now);

//         return () => clearInterval(timer);
//     }, []);

//     const checkFestivalSchedule = (now) => {
//         const currentDate = now.toISOString().split('T')[0];
//         const currentHour = now.getHours();
//         const isDayTime = currentHour >= 12;

//         const activeFestivals = festivalSchedules.filter(festival => {
//             const isDateInRange = currentDate >= festival.startDate && currentDate <= festival.endDate;
//             return isDateInRange && isDayTime;
//         });

//         setCarousels(prev => prev.map(carousel => {
//             if (carousel.festivalSchedule) {
//                 const festivalActive = activeFestivals.some(f => f.name === carousel.festivalSchedule.name);
//                 return {
//                     ...carousel,
//                     status: festivalActive ? 'active' : 'inactive'
//                 };
//             }
//             return carousel;
//         }));

//         setFestivalStatus({
//             activeFestivals: activeFestivals.map(f => f.name),
//             isDayTime,
//             lastChecked: now.toLocaleTimeString()
//         });
//     };

//     // Filter carousels
//     const filteredCarousels = carousels.filter(carousel => {
//         const matchesSearch = carousel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             carousel.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             carousel.description?.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesStatus = statusFilter === 'all' || carousel.status === statusFilter;
//         return matchesSearch && matchesStatus;
//     });

//     // Pagination
//     const indexOfLastItem = currentPage * rowsPerPage;
//     const indexOfFirstItem = indexOfLastItem - rowsPerPage;
//     const currentItems = filteredCarousels.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(filteredCarousels.length / rowsPerPage);

//     // Actions
//     const handleDeleteCarousel = (id) => {
//         toast(
//             <DeleteConfirmToast
//                 onDelete={() => {
//                     const updated = carousels.filter(c => c.id !== id);
//                     setCarousels(updated);
//                     localStorage.setItem("carousels", JSON.stringify(updated)); // 🔥 FIX
//                     toast.success("Carousel deleted successfully 🗑️");
//                 }}
//             />,
//             { autoClose: false }
//         );
//     };

//     const handleEditCarousel = (id) => {
//         navigate(`/edit-carousel/${id}`);
//     };

//     const handleDuplicateCarousel = (carousel) => {
//         const newCarousel = {
//             ...carousel,
//             id: Date.now(),
//             title: `${carousel.title} (Copy)`,
//             status: 'inactive',
//             createdAt: new Date().toISOString().split('T')[0]
//         };

//         const updatedCarousels = [...carousels, newCarousel];
//         setCarousels(updatedCarousels);
//         localStorage.setItem("carousels", JSON.stringify(updatedCarousels));
//         toast.success("Carousel duplicated successfully 📋");
//     };

//     const handleToggleStatus = (id) => {
//         const updated = carousels.map(c =>
//             c.id === id
//                 ? { ...c, status: c.status === "active" ? "inactive" : "active" }
//                 : c
//         );

//         setCarousels(updated);
//         localStorage.setItem("carousels", JSON.stringify(updated)); // 🔥 FIX
//         toast.success("Status updated successfully 🔄");
//     };

//     const handleViewDetails = (id) => {
//         if (expandedRow === id) {
//             setExpandedRow(null);
//         } else {
//             setExpandedRow(id);
//         }
//     };

//     const handleExport = () => {
//         const exportData = filteredCarousels.map(c => ({
//             ID: c.id,
//             Title: c.title,
//             Subtitle: c.subtitle,
//             Status: c.status,
//             Images: c.images?.length || 0,
//             'Created Date': c.createdAt,
//             'Festival Schedule': c.festivalSchedule?.name || 'None',
//             Description: c.description || ''
//         }));

//         const csv = [
//             Object.keys(exportData[0] || {}).join(','),
//             ...exportData.map(row => Object.values(row).map(val =>
//                 `"${String(val).replace(/"/g, '""')}"`
//             ).join(','))
//         ].join('\n');

//         const blob = new Blob([csv], { type: 'text/csv' });
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `carousels_${new Date().toISOString().split('T')[0]}.csv`;
//         a.click();

//         toast.success("Data exported successfully 📥");
//     };

//     // Helper functions
//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'active': return 'bg-green-100 text-green-800 border-green-200';
//             case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
//             case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
//             default: return 'bg-gray-100 text-gray-800';
//         }
//     };

//     const getPriorityColor = (priority) => {
//         switch (priority) {
//             case 1: return 'bg-red-100 text-red-800 border-red-200';
//             case 2: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//             case 3: return 'bg-blue-100 text-blue-800 border-blue-200';
//             default: return 'bg-gray-100 text-gray-800';
//         }
//     };

//     const formatDate = (dateString) => {
//         try {
//             return new Date(dateString).toLocaleDateString('en-US', {
//                 month: 'short',
//                 day: 'numeric',
//                 year: 'numeric'
//             });
//         } catch {
//             return 'Invalid date';
//         }
//     };

//     const getFestivalColor = (festivalName) => {
//         const festival = festivalSchedules.find(f => f.name === festivalName);
//         return festival?.color || 'from-gray-500 to-gray-600';
//     };

//     return (
//         <div className="bg-white shadow-md mt-6 p-4 md:p-6">
//             <div className="w-full">
//                 {/* Header Section */}
//                 <div className="mb-8">
//                     <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
//                         <div>
//                             <h1 className="text-2xl md:text-3xl font-bold text-amber-600">
//                                 Carousel Management
//                             </h1>
//                             <p className="text-gray-600 mt-2 text-sm md:text-base text-lg">
//                                 Manage and organize your website hero section carousels
//                             </p>
//                         </div>

//                         <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
//                             <button
//                                 onClick={() => navigate("/add-carousels")}
//                                 className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors shadow-md hover:shadow-lg"
//                             >
//                                 <Plus className="w-5 h-5" />
//                                 Add Carousel
//                             </button>
//                             <button
//                                 onClick={() => navigate("/festival-carousels")}
//                                 className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors shadow-md hover:shadow-lg"
//                             >
//                                 <Star className="w-5 h-5" />
//                                 Festival Carousels
//                             </button>
//                         </div>
//                     </div>

//                     {/* Festival Status Bar */}
//                     <div className="mt-6 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl border border-gray-700 shadow-lg">
//                         <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//                             <div className="flex items-center gap-4">
//                                 <div className="p-2 rounded-lg bg-gray-700">
//                                     <Calendar className="w-5 h-5 text-white" />
//                                 </div>
//                                 <div>
//                                     <h3 className="font-semibold text-white">Festival Schedule Monitor</h3>
//                                     <p className="text-sm text-gray-300">
//                                         Carousels automatically switch at 12:00 PM during festivals
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center gap-6">
//                                 <div className="flex items-center gap-2">
//                                     <Clock className="w-4 h-4 text-gray-300" />
//                                     <span className="text-sm font-medium text-white">
//                                         {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                     </span>
//                                 </div>
//                                 {festivalStatus.activeFestivals.length > 0 ? (
//                                     <div className="flex items-center gap-2">
//                                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
//                                         <span className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-sm font-medium shadow">
//                                             🎉 {festivalStatus.activeFestivals.join(', ')}
//                                         </span>
//                                     </div>
//                                 ) : (
//                                     <span className="px-3 py-1.5 bg-gray-700 text-gray-300 rounded-full text-sm font-medium">
//                                         No Active Festivals
//                                     </span>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                     {[
//                         {
//                             title: "Total Carousels",
//                             value: carousels.length,
//                             icon: Image,
//                             color: "from-blue-500 to-cyan-500",
//                             bg: "bg-blue-50",
//                             border: "border-blue-200"
//                         },
//                         {
//                             title: "Active Now",
//                             value: carousels.filter(c => c.status === 'active').length,
//                             icon: Star,
//                             color: "from-green-500 to-emerald-500",
//                             bg: "bg-green-50",
//                             border: "border-green-200"
//                         },
//                         {
//                             title: "Festival Carousels",
//                             value: carousels.filter(c => c.festivalSchedule).length,
//                             icon: Calendar,
//                             color: "from-purple-500 to-pink-500",
//                             bg: "bg-purple-50",
//                             border: "border-purple-200"
//                         },
//                         {
//                             title: "Total Images",
//                             value: carousels.reduce((acc, c) => acc + (c.images?.length || 0), 0),
//                             icon: Settings,
//                             color: "from-orange-500 to-amber-500",
//                             bg: "bg-orange-50",
//                             border: "border-orange-200"
//                         }
//                     ].map((stat, index) => {
//                         const Icon = stat.icon;
//                         return (
//                             <div key={index} className={`${stat.bg} border ${stat.border} rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow`}>
//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                                         <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
//                                     </div>
//                                     <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow`}>
//                                         <Icon className="w-6 h-6 text-white" />
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {/* Search and Filter Section */}
//                 <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
//                     <div className="flex flex-col lg:flex-row gap-4">
//                         <div className="flex-1">
//                             <div className="relative">
//                                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search carousels by title, subtitle, or description..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
//                                 />
//                             </div>
//                         </div>
//                         <div className="flex gap-3">
//                             <div className="relative">
//                                 <select
//                                     value={statusFilter}
//                                     onChange={(e) => setStatusFilter(e.target.value)}
//                                     className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
//                                 >
//                                     <option value="all">All Status</option>
//                                     <option value="active">Active</option>
//                                     <option value="inactive">Inactive</option>
//                                     <option value="scheduled">Scheduled</option>
//                                 </select>
//                                 <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//                             </div>
//                             <button
//                                 onClick={handleExport}
//                                 className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
//                             >
//                                 <Download className="w-5 h-5" />
//                                 Export
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Table Section */}
//                 <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
//                                 <tr>
//                                     <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
//                                         <div className="flex items-center gap-2">
//                                             ID
//                                             <ChevronDown className="w-4 h-4" />
//                                         </div>
//                                     </th>
//                                     <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
//                                         Title & Details
//                                     </th>
//                                     <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
//                                         Media
//                                     </th>
//                                     <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
//                                         Status
//                                     </th>
//                                     <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
//                                         Date
//                                     </th>
//                                     <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
//                                         Actions
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-100">
//                                 {currentItems.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="6" className="py-12 text-center">
//                                             <div className="flex flex-col items-center justify-center">
//                                                 <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
//                                                     <Image className="w-8 h-8 text-gray-400" />
//                                                 </div>
//                                                 <p className="text-gray-500 font-medium text-lg">No carousels found</p>
//                                                 <p className="text-gray-400 mt-1">Try adjusting your search or filters</p>
//                                                 <button
//                                                     onClick={() => navigate("/add-carousels")}
//                                                     className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
//                                                 >
//                                                     <Plus className="w-4 h-4" />
//                                                     Add Your First Carousel
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     currentItems.map((carousel) => (
//                                         <React.Fragment key={carousel.id}>
//                                             <tr className="hover:bg-gray-50 transition-colors">
//                                                 <td className="py-4 px-6">
//                                                     <div className="flex items-center">
//                                                         <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 flex items-center justify-center">
//                                                             <span className="font-bold text-blue-700">#{carousel.id}</span>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td className="py-4 px-6">
//                                                     <div>
//                                                         <div className="font-semibold text-gray-900">{carousel.title}</div>
//                                                         <div className="text-sm text-gray-500 mt-1 line-clamp-1">
//                                                             {carousel.subtitle || carousel.description || 'No description'}
//                                                         </div>
//                                                         {carousel.festivalSchedule && (
//                                                             <div className="mt-2">
//                                                                 <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getFestivalColor(carousel.festivalSchedule.name)} text-white`}>
//                                                                     <Star className="w-3 h-3 mr-1" />
//                                                                     {carousel.festivalSchedule.name}
//                                                                 </span>
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                 </td>
//                                                 <td className="py-4 px-6">
//                                                     <div className="flex items-center">
//                                                         <div className="flex -space-x-2 mr-3">
//                                                             {carousel.images?.slice(0, 2).map((img, idx) => (
//                                                                 <div
//                                                                     key={img.id || idx}
//                                                                     className="w-8 h-8 rounded-full border-2 border-white shadow overflow-hidden"
//                                                                 >
//                                                                     {img.url ? (
//                                                                         <img
//                                                                             src={img.url}
//                                                                             alt=""
//                                                                             className="w-full h-full object-cover"
//                                                                         />
//                                                                     ) : (
//                                                                         <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
//                                                                             <Image className="w-4 h-4 text-gray-500" />
//                                                                         </div>
//                                                                     )}
//                                                                 </div>
//                                                             ))}
//                                                         </div>
//                                                         <div className="text-sm text-gray-600">
//                                                             {carousel.images?.length || 0} image{carousel.images?.length !== 1 ? 's' : ''}
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td className="py-4 px-6">
//                                                     <div className="flex flex-col gap-2">
//                                                         <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(carousel.status)} max-w-[120px]`}>
//                                                             <div className={`w-2 h-2 rounded-full mr-2 ${carousel.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`} />
//                                                             {carousel.status.charAt(0).toUpperCase() + carousel.status.slice(1)}
//                                                         </span>
//                                                         {carousel.priority && (
//                                                             <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(carousel.priority)}`}>
//                                                                 Priority {carousel.priority}
//                                                             </span>
//                                                         )}
//                                                     </div>
//                                                 </td>
//                                                 <td className="py-4 px-6">
//                                                     <div className="text-sm text-gray-600">
//                                                         {formatDate(carousel.createdAt)}
//                                                     </div>
//                                                 </td>
//                                                 <td className="py-4 px-6">
//                                                     <div className="flex items-center gap-1">
//                                                         <button
//                                                             onClick={() => handleViewDetails(carousel.id)}
//                                                             className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
//                                                             title="View Details"
//                                                         >
//                                                             {expandedRow === carousel.id ? (
//                                                                 <ChevronUp className="w-4 h-4" />
//                                                             ) : (
//                                                                 <ChevronDown className="w-4 h-4" />
//                                                             )}
//                                                         </button>
//                                                         <button
//                                                             onClick={() => handleToggleStatus(carousel.id)}
//                                                             className={`p-2 rounded-lg ${carousel.status === 'active' ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}
//                                                             title={carousel.status === 'active' ? 'Deactivate' : 'Activate'}
//                                                         >
//                                                             {carousel.status === 'active' ? (
//                                                                 <Check className="w-4 h-4" />
//                                                             ) : (
//                                                                 <X className="w-4 h-4" />
//                                                             )}
//                                                         </button>
//                                                         <button
//                                                             onClick={() => handleEditCarousel(carousel.id)}
//                                                             className="p-2 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors"
//                                                             title="Edit"
//                                                         >
//                                                             <Edit className="w-4 h-4" />
//                                                         </button>
//                                                         <button
//                                                             onClick={() => handleDuplicateCarousel(carousel)}
//                                                             className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
//                                                             title="Duplicate"
//                                                         >
//                                                             <Copy className="w-4 h-4" />
//                                                         </button>
//                                                         <button
//                                                             onClick={() => handleDeleteCarousel(carousel.id)}
//                                                             className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
//                                                             title="Delete"
//                                                         >
//                                                             <Trash2 className="w-4 h-4" />
//                                                         </button>
//                                                         <button
//                                                             onClick={() => navigate(`/preview/${carousel.id}`)}
//                                                             className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
//                                                             title="Preview"
//                                                         >
//                                                             <ExternalLink className="w-4 h-4" />
//                                                         </button>
//                                                     </div>
//                                                 </td>
//                                             </tr>

//                                             {/* Expanded Details Row */}
//                                             {expandedRow === carousel.id && (
//                                                 <tr className="bg-blue-50">
//                                                     <td colSpan="6" className="px-6 py-4">
//                                                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                                                             <div className="lg:col-span-2">
//                                                                 <div className="bg-white rounded-lg p-4 border border-gray-200">
//                                                                     <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                                                                         <AlertCircle className="w-4 h-4 text-blue-600" />
//                                                                         Carousel Details
//                                                                     </h4>
//                                                                     <div className="space-y-3">
//                                                                         <div>
//                                                                             <label className="text-xs font-medium text-gray-500">Title</label>
//                                                                             <p className="text-sm text-gray-900">{carousel.title}</p>
//                                                                         </div>
//                                                                         <div>
//                                                                             <label className="text-xs font-medium text-gray-500">Subtitle</label>
//                                                                             <p className="text-sm text-gray-900">{carousel.subtitle || 'No subtitle'}</p>
//                                                                         </div>
//                                                                         <div>
//                                                                             <label className="text-xs font-medium text-gray-500">Description</label>
//                                                                             <p className="text-sm text-gray-900">{carousel.description || 'No description'}</p>
//                                                                         </div>
//                                                                         {carousel.festivalSchedule && (
//                                                                             <div>
//                                                                                 <label className="text-xs font-medium text-gray-500">Festival Schedule</label>
//                                                                                 <div className="flex items-center gap-2 mt-1">
//                                                                                     <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getFestivalColor(carousel.festivalSchedule.name)}`}></div>
//                                                                                     <p className="text-sm text-gray-900">{carousel.festivalSchedule.name}</p>
//                                                                                 </div>
//                                                                             </div>
//                                                                         )}
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                             <div>
//                                                                 <div className="bg-white rounded-lg p-4 border border-gray-200">
//                                                                     <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                                                                         <Image className="w-4 h-4 text-purple-600" />
//                                                                         Images ({carousel.images?.length || 0})
//                                                                     </h4>
//                                                                     <div className="flex flex-wrap gap-2">
//                                                                         {carousel.images?.length > 0 ? (
//                                                                             carousel.images.map((img, idx) => (
//                                                                                 <div key={img.id || idx} className="w-16 h-16 rounded overflow-hidden border border-gray-200">
//                                                                                     {img.url ? (
//                                                                                         <img
//                                                                                             src={img.url}
//                                                                                             alt={`Image ${idx + 1}`}
//                                                                                             className="w-full h-full object-cover"
//                                                                                         />
//                                                                                     ) : (
//                                                                                         <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//                                                                                             <Image className="w-6 h-6 text-gray-400" />
//                                                                                         </div>
//                                                                                     )}
//                                                                                 </div>
//                                                                             ))
//                                                                         ) : (
//                                                                             <p className="text-sm text-gray-500">No images uploaded</p>
//                                                                         )}
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </React.Fragment>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Pagination Footer */}
//                     {filteredCarousels.length > 0 && (
//                         <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
//                             <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//                                 <div className="text-sm text-gray-600">
//                                     Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to{" "}
//                                     <span className="font-semibold">
//                                         {Math.min(indexOfLastItem, filteredCarousels.length)}
//                                     </span>{" "}
//                                     of <span className="font-semibold">{filteredCarousels.length}</span> carousels
//                                 </div>
//                                 <Pagination
//                                     currentPage={currentPage}
//                                     totalItems={filteredCarousels.length}
//                                     itemsPerPage={rowsPerPage}
//                                     onPageChange={setCurrentPage}
//                                 />
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Carousel;
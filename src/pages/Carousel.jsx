import React, { useState, useEffect } from 'react';
import AddCarousel from "../pages/AddCarousel";
import { useNavigate } from "react-router-dom";


import {
    Plus, Trash2, Edit, Eye, Image, Calendar, Clock, Star, Settings, Search, Filter, Download
} from 'lucide-react';

const Carousel = () => {
    const [carousels, setCarousels] = useState([
        {
            id: 1,
            title: 'Summer Special',
            subtitle: 'Enjoy amazing summer discounts',
            images: [
                { id: 1, name: 'summer1.jpg', url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e' },
                { id: 2, name: 'summer2.jpg', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e' },
                { id: 3, name: 'summer3.jpg', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' }
            ],
            status: 'active',
            createdAt: '2024-01-15',
            festivalSchedule: null
        },
        {
            id: 2,
            title: 'Christmas Festival',
            subtitle: 'Merry Christmas special offers',
            images: [
                { id: 1, name: 'xmas1.jpg', url: 'https://images.unsplash.com/photo-1542362567-b07e54358753' },
                { id: 2, name: 'xmas2.jpg', url: 'https://images.unsplash.com/photo-1512389142860-9c449e38a2f0' }
            ],
            status: 'inactive',
            createdAt: '2024-01-10',
            festivalSchedule: {
                name: 'Christmas',
                startDate: '2024-12-24',
                endDate: '2024-12-26',
                activeTime: '12:00-00:00'
            }
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [festivalStatus, setFestivalStatus] = useState({});
    const [showAddCarousel, setShowAddCarousel] = useState(false);
    const navigate = useNavigate();


    // New carousel form
    const [newCarousel, setNewCarousel] = useState({
        title: '',
        subtitle: '',
        titles: ['', '', ''], // REQUIRED
        images: [],
        status: 'inactive',
        festivalSchedule: null
    });


    // Festival schedules for automatic switching
    const festivalSchedules = [
        {
            name: 'Christmas',
            startDate: '2024-12-24',
            endDate: '2024-12-26',
            activeTime: { start: '12:00', end: '23:59' }
        },
        {
            name: 'New Year',
            startDate: '2024-12-31',
            endDate: '2025-01-02',
            activeTime: { start: '12:00', end: '23:59' }
        },
        {
            name: 'Diwali',
            startDate: '2024-11-12',
            endDate: '2024-11-15',
            activeTime: { start: '12:00', end: '23:59' }
        }
    ];

    // Update time and check festival schedules
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            checkFestivalSchedule(now);
        }, 60000);

        checkFestivalSchedule(currentTime);
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

        // Update carousels based on festival schedule
        setCarousels(prev => prev.map(carousel => {
            if (carousel.festivalSchedule) {
                const festivalActive = activeFestivals.some(f => f.name === carousel.festivalSchedule.name);
                return {
                    ...carousel,
                    status: festivalActive ? 'active' : 'inactive'
                };
            }
            return carousel;
        }));

        setFestivalStatus({
            activeFestivals: activeFestivals.map(f => f.name),
            isDayTime,
            lastChecked: now.toLocaleTimeString()
        });
    };

    // Filter carousels based on search and status
    const filteredCarousels = carousels.filter(carousel => {
        const matchesSearch = carousel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            carousel.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || carousel.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Handle image upload
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file, index) => ({
            id: Date.now() + index,
            name: file.name,
            url: URL.createObjectURL(file)
        }));

        setNewCarousel(prev => ({
            ...prev,
            images: [...prev.images, ...newImages]
        }));
    };

    // Add new carousel
    const handleAddCarousel = () => {
        const newCarouselData = {
            ...newCarousel,
            id: carousels.length + 1,
            createdAt: new Date().toISOString().split('T')[0]
        };

        setCarousels([...carousels, newCarouselData]);
        setShowAddModal(false);
        resetForm();
    };

    // Delete carousel
    const handleDeleteCarousel = (id) => {
        if (window.confirm('Are you sure you want to delete this carousel?')) {
            setCarousels(carousels.filter(c => c.id !== id));
        }
    };

    // Edit carousel
    const handleEditCarousel = (id) => {
        const carousel = carousels.find(c => c.id === id);
        setNewCarousel(carousel);
        setShowAddModal(true);
    };

    // View carousel details
    const handleViewCarousel = (id) => {
        const carousel = carousels.find(c => c.id === id);
        alert(`Viewing: ${carousel.title}\nImages: ${carousel.images.length}\nStatus: ${carousel.status}`);
    };

    // Reset form
    const resetForm = () => {
        setNewCarousel({
            title: '',
            subtitle: '',
            images: [],
            status: 'inactive',
            festivalSchedule: null
        });
    };

    // Get status badge color
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800 border-green-200';
            case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-white shadow-md p-4 md:p-8 mt-6">
            <div className="w-full">
                {/* Header with Add Button */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Carousel Management
                            </h1>
                            <p className="text-gray-600 mt-2 text-lg">Manage your website hero section carousels</p>
                        </div>
                        <button
                            onClick={() => navigate("/add-carousels")}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add Carousel
                        </button>

                    </div>

                    {/* Festival Status Bar */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-orange-600" />
                                <div>
                                    <h3 className="font-semibold text-orange-800">Festival Schedule Active</h3>
                                    <p className="text-sm text-orange-600">
                                        Carousels automatically switch at 12:00 PM during festivals
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-medium">{currentTime.toLocaleTimeString()}</span>
                                </div>
                                {festivalStatus.activeFestivals && festivalStatus.activeFestivals.length > 0 && (
                                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                                        🎉 {festivalStatus.activeFestivals.join(', ')} Active
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-600 font-medium">Total Carousels</p>
                                <p className="text-3xl font-bold text-blue-700 mt-2">{carousels.length}</p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-blue-200 flex items-center justify-center">
                                <Image className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-600 font-medium">Active Now</p>
                                <p className="text-3xl font-bold text-green-700 mt-2">
                                    {carousels.filter(c => c.status === 'active').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-green-200 flex items-center justify-center">
                                <Star className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-purple-600 font-medium">Festival Carousels</p>
                                <p className="text-3xl font-bold text-purple-700 mt-2">
                                    {carousels.filter(c => c.festivalSchedule).length}
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-purple-200 flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-orange-600 font-medium">Images Total</p>
                                <p className="text-3xl font-bold text-orange-700 mt-2">
                                    {carousels.reduce((acc, c) => acc + c.images.length, 0)}
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-orange-200 flex items-center justify-center">
                                <Settings className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>


                {/* Search and Filter */}
                <div className="mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search carousels by title or subtitle..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 bg-white"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="relative">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-3 border-2 border-purple-100 rounded-xl focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 bg-white"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="scheduled">Scheduled</option>
                                </select>
                                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5 pointer-events-none" />
                            </div>
                            <button className="px-4 py-3 border-2 border-green-100 text-green-700 rounded-xl hover:bg-green-50 flex items-center gap-2">
                                <Download className="w-5 h-5" />
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Colorful Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-blue-50">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                <tr>
                                    <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">
                                        Images
                                    </th>
                                    <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">
                                        Subtitle
                                    </th>
                                    <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredCarousels.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <Image className="w-16 h-16 text-gray-300 mb-4" />
                                                <p className="text-gray-500 text-lg">No carousels found</p>
                                                <p className="text-gray-400">Try adjusting your search or filters</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCarousels.map((carousel) => (
                                        <tr
                                            key={carousel.id}
                                            className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200"
                                        >
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                                        <span className="font-bold text-blue-700">{carousel.id}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div>
                                                    <div className="font-semibold text-gray-900">{carousel.title}</div>
                                                    <div className="text-sm text-gray-500 mt-1">
                                                        {carousel.festivalSchedule ? (
                                                            <span className="flex items-center gap-1">
                                                                <Star className="w-3 h-3 text-yellow-500" />
                                                                {carousel.festivalSchedule.name} Festival
                                                            </span>
                                                        ) : (
                                                            formatDate(carousel.createdAt)
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex -space-x-2">
                                                    {carousel.images.slice(0, 3).map((img, idx) => (
                                                        <div
                                                            key={img.id}
                                                            className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden"
                                                        >
                                                            <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                                                                <Image className="w-5 h-5 text-blue-600" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {carousel.images.length > 3 && (
                                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-bold text-gray-700 shadow-md">
                                                            +{carousel.images.length - 3}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-2">
                                                    {carousel.images.length} images
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <p className="text-gray-700 line-clamp-2">{carousel.subtitle}</p>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(carousel.status)}`}>
                                                    <div className={`w-2 h-2 rounded-full mr-2 ${carousel.status === 'active' ? 'bg-green-500' :
                                                        carousel.status === 'inactive' ? 'bg-gray-500' : 'bg-blue-500'
                                                        }`} />
                                                    {carousel.status.charAt(0).toUpperCase() + carousel.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleViewCarousel(carousel.id)}
                                                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                                        title="View"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditCarousel(carousel.id)}
                                                        className="p-2 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCarousel(carousel.id)}
                                                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-t border-gray-100">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="text-sm text-gray-600 mb-2 md:mb-0">
                                Showing <span className="font-semibold">{filteredCarousels.length}</span> of{' '}
                                <span className="font-semibold">{carousels.length}</span> carousels
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                                    Previous
                                </button>
                                <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
                                    1
                                </span>
                                <button className="px-3 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
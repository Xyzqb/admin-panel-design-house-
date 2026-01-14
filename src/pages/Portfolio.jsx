import React, { useState, useEffect, useMemo } from 'react';
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    ChevronDown,
    X,
    Eye,
    Download,
    Building,
    Store,
    Layers,
    Calendar,
    Folder,
    Sofa,
    DollarSign,
    Clock,
    Users,
    TrendingUp,
    Star,
    AlertCircle,
    Image,
    Upload
} from 'lucide-react';

const Portfolio = () => {
    const services = {
        "Interior Portfolio": [
            "Retail Interior Images",
            "Corporate Interior Images",
            "Restaurant Interior Images",
            "Shops In Shops Images",
        ],
        "Merchandising Portfolio": [
            "Retail Display Merchandising Images",
            "Acrylic Display Images",
            "Gandolas Images",
            "Window Displays Images",
        ],
        "Kiosk Portfolio": [
            "Retail Kiosks Images",
            "Mobile Booth Images",
        ],
        "Exhibition & Events Portfolio": [
            "Exhibition & Event Images",
        ],
        "Signage Portfolio": [
            "Signage Portfolio Images"
        ],
        "Office Interior Portfolio": [
            "Modular Work Station Images",
            "MD Cabin Images",
            "Chairs Images",
        ],
        "Furniture Portfolio": [
            "Wardrobe Images",
            "Kitchen Images",
            "LCD Unit Images",
            "Dressing Table Images",
            "Sofas Images"
        ],
        "video": [
            "videos"
        ]
    };

    const [selectedService, setSelectedService] = useState("Interior");
    const [selectedSubService, setSelectedSubService] = useState("Retail Interior");
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);

    const [projects, setProjects] = useState([
        {
            id: "INT-101",
            title: "Luxury Villa Interior Design",
            service: "Interior",
            subService: "Retail Interior",
            images: null,
            status: "active",
            priority: "high",
            timeline: "12 weeks",
            description: "Complete luxury interior design for a 5BHK villa with modern contemporary aesthetics and smart home integration",
        },
        {
            id: "MER-102",
            title: "Premium Jewelry Showroom",
            service: "Merchandising",
            subService: "Retail Display Merchandising",
            images: null,
            status: "active",
            priority: "high",
            teamSize: 12,
            description: "Luxury jewelry showroom with premium display systems, lighting design, and customer experience zones",

        },
        {
            id: "KIO-103",
            title: "Interactive Mall Kiosk",
            service: "Kiosk",
            subService: "Retail Kiosks",
            images: null,
            status: "completed",
            priority: "medium",
            timeline: "6 weeks",
            description: "Interactive digital kiosk with touchscreen navigation, wayfinding system, and multilingual support",
        }
    ]);

    const [newProject, setNewProject] = useState({
        title: "",
        service: "Interior",
        subService: "Retail Interior",
        images: [],
        budget: "",
        status: "pending",
        priority: "medium",
        timeline: "",
        teamSize: "",
        description: "",
        location: ""
    });

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesService = selectedService === "all" || project.service === selectedService;
            const matchesSubService = selectedSubService === "all" || project.subService === selectedSubService;
            const matchesSearch =
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.location.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesService && matchesSubService && matchesSearch;
        });
    }, [projects, selectedService, selectedSubService, searchQuery]);

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        if (service !== "all") {
            setSelectedSubService(services[service][0]);
        } else {
            setSelectedSubService("all");
        }
    };

    const getServiceIcon = (service) => {
        const icons = {
            'Interior': <Building size={20} />,
            'Merchandising': <Store size={20} />,
            'Kiosk': <Layers size={20} />,
            'Exhibition & Events': <Calendar size={20} />,
            'Office Interior': <Folder size={20} />,
            'Furniture': <Sofa size={20} />
        };
        return icons[service] || <Folder size={20} />;
    };

    const getServiceGradient = (service) => {
        const gradients = {
            'Interior': 'from-purple-500 to-pink-500',
            'Merchandising': 'from-blue-500 to-cyan-500',
            'Kiosk': 'from-emerald-500 to-teal-500',
            'Exhibition & Events': 'from-orange-500 to-red-500',
            'Office Interior': 'from-indigo-500 to-purple-500',
            'Furniture': 'from-amber-500 to-orange-500'
        };
        return gradients[service] || 'from-gray-500 to-gray-600';
    };

    const getStatusColor = (status) => {
        const colors = {
            'completed': 'bg-emerald-100 text-emerald-700 border-emerald-300',
            'active': 'bg-blue-100 text-blue-700 border-blue-300',
            'pending': 'bg-amber-100 text-amber-700 border-amber-300',
            'on-hold': 'bg-red-100 text-red-700 border-red-300'
        };
        return colors[status] || 'bg-gray-100 text-gray-700 border-gray-300';
    };

    const getPriorityColor = (priority) => {
        const colors = {
            'high': 'bg-rose-100 text-rose-700 border-rose-300',
            'medium': 'bg-orange-100 text-orange-700 border-orange-300',
            'low': 'bg-sky-100 text-sky-700 border-sky-300'
        };
        return colors[priority] || 'bg-gray-100 text-gray-700 border-gray-300';
    };

    const handleImageUpload = (e, isEditMode = false) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageName = file.name;

        if (isEditMode && selectedItem) {
            setSelectedItem(prev => ({
                ...prev,
                images: [imageName], // ✅ overwrite, not append
            }));
        } else {
            setNewProject(prev => ({
                ...prev,
                images: [imageName], // ✅ only one image
            }));
        }

        setUploadedImages([file]); // ✅ reset to one image
    };


    const removeImage = (index, isEditMode = false) => {
        if (isEditMode && selectedItem) {
            setSelectedItem(prev => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index)
            }));
        } else {
            setNewProject(prev => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index)
            }));
        }
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddProject = () => {
        if (!newProject.title || !newProject.images.length) {
            alert("Please fill in title and upload at least one image");
            return;
        }

        const projectId = `${newProject.service.substring(0, 3).toUpperCase()}-${projects.length + 101}`;
        const projectToAdd = {
            id: projectId,
            ...newProject,
            rating: 4.5,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
            teamSize: parseInt(newProject.teamSize) || 1
        };

        setProjects(prev => [projectToAdd, ...prev]);
        setNewProject({
            title: "",
            service: "Interior",
            subService: "Retail Interior",
            images: [],
            budget: "",
            status: "pending",
            priority: "medium",
            description: "",
        });
        setUploadedImages([]);
        setShowAddModal(false);
    };

    const handleEditProject = () => {
        if (!selectedItem?.title || !selectedItem?.images?.length) {
            alert("Please fill in title and upload at least one image");
            return;
        }

        setProjects(prev =>
            prev.map(p => p.id === selectedItem.id ? selectedItem : p)
        );
        setShowEditModal(false);
        setSelectedItem(null);
        setUploadedImages([]);
    };

    const confirmDelete = () => {
        setProjects(prev => prev.filter(p => p.id !== selectedItem.id));
        setShowDeleteModal(false);
        setSelectedItem(null);
    };

    const handleExport = () => {
        const data = JSON.stringify(projects, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'interior_projects.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const stats = [
        {
            title: "TOTAL Portfolio",
            value: projects.length,
            change: "+12% from last month",
            icon: <Folder size={24} />,
            gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
            bgGradient: "from-violet-50 to-fuchsia-50"
        },
        {
            title: "ACTIVE Portfolio",
            value: projects.filter(p => p.status === 'active').length,
            change: "Currently in progress",
            icon: <TrendingUp size={24} />,
            gradient: "from-emerald-500 via-green-500 to-teal-500",
            bgGradient: "from-emerald-50 to-teal-50"
        },
        {
            title: "TOTAL Portfolio IMAGES",
            value: projects.reduce((acc, p) => acc + (p.images?.length || 0), 0),
            change: "Portfolio images",
            icon: <Image size={24} />,
            gradient: "from-orange-500 via-amber-500 to-yellow-500",
            bgGradient: "from-orange-50 to-yellow-50"
        }
    ];

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">

            {/* Modals */}
            {showDeleteModal && selectedItem && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform animate-scaleIn">
                        <div className="p-6 sm:p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
                                    <AlertCircle className="text-white" size={28} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900">Delete Portfolio</h3>
                                    <p className="text-gray-600 text-sm">This action cannot be undone</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-6">
                                Are you sure you want to delete <span className="font-semibold text-gray-900">{selectedItem.title}</span>?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showViewModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn overflow-y-auto">
                    <div className="bg-white shadow-2xl max-w-3xl w-full my-8 transform animate-scaleIn">
                        <div className="p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    Portfolio Details
                                </h3>
                                <button
                                    onClick={() => setShowViewModal(null)}
                                    className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-300"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex items-start gap-4 mb-6">
                                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getServiceGradient(showViewModal.service)} flex items-center justify-center text-white shadow-xl`}>
                                    <div className="text-2xl">{getServiceIcon(showViewModal.service)}</div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-gray-900 mb-1">{showViewModal.title}</h4>
                                    <p className="text-gray-600 mb-2">{showViewModal.id}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold border-2 ${getStatusColor(showViewModal.status)}`}>
                                            {showViewModal.status.toUpperCase()}
                                        </span>
                                        <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold border-2 ${getPriorityColor(showViewModal.priority)}`}>
                                            {showViewModal.priority.toUpperCase()} PRIORITY
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Images Section in View Modal */}
                            <div className="mb-6">
                                <h5 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Project Images</h5>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {showViewModal.images?.map((image, index) => (
                                        <div key={index} className="relative group">
                                            <div className="aspect-square rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                                                <Image size={32} className="text-gray-400" />
                                            </div>
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                                                <span className="text-white text-sm font-medium">{image}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                    {showViewModal.images?.length || 0} images uploaded
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-4">
                                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                                        <h5 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Project Info</h5>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                                                    <DollarSign size={16} className="text-emerald-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-600">Budget</p>
                                                    <p className="font-semibold text-emerald-600">{showViewModal.budget}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                                                    <Clock size={16} className="text-amber-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-600">Timeline</p>
                                                    <p className="font-semibold text-gray-900">{showViewModal.timeline}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                                                    <Users size={16} className="text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-600">Team Size</p>
                                                    <p className="font-semibold text-gray-900">{showViewModal.teamSize} members</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                                        <h5 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Details</h5>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                                                    <Building size={16} className="text-teal-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-600">Location</p>
                                                    <p className="font-semibold text-gray-900">{showViewModal.location}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                                                    <Star size={16} className="text-amber-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-600">Rating</p>
                                                    <p className="font-semibold text-gray-900">{showViewModal.rating}/5.0</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                                                    <Folder size={16} className="text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-600">Service</p>
                                                    <p className="font-semibold text-gray-900">{showViewModal.service} - {showViewModal.subService}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h5 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Description</h5>
                                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">
                                    {showViewModal.description}
                                </p>
                            </div>

                            <div className="flex gap-3 pt-6 border-t-2 border-gray-100">
                                <button
                                    onClick={() => {
                                        setSelectedItem({ ...showViewModal });
                                        setShowViewModal(null);
                                        setShowEditModal(true);
                                    }}
                                    className="flex-1 px-4 py-3 rounded-xl border-2 border-blue-300 text-blue-700 font-medium hover:bg-blue-50 transition-all duration-300"
                                >
                                    Edit Project
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedItem(showViewModal);
                                        setShowViewModal(null);
                                        setShowDeleteModal(true);
                                    }}
                                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Delete Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {(showEditModal || showAddModal) && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn overflow-y-auto">
                    <div className="bg-white shadow-2xl max-w-2xl w-full my-2 transform animate-scaleIn">
                        <div className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    {showEditModal ? 'Edit Project' : 'Add New Protfolio'}
                                </h3>
                                <button
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setShowAddModal(false);
                                        setSelectedItem(null);
                                        setUploadedImages([]);
                                    }}
                                    className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-300"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">
                                        Portfolio Images Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={showEditModal ? selectedItem?.title : newProject.title}
                                        onChange={(e) => {
                                            if (showEditModal) {
                                                setSelectedItem(prev => ({ ...prev, title: e.target.value }));
                                            } else {
                                                setNewProject(prev => ({ ...prev, title: e.target.value }));
                                            }
                                        }}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                                        placeholder="Enter project title"
                                    />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            All Portfolio  *
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={showEditModal ? selectedItem?.service : newProject.service}
                                                onChange={(e) => {
                                                    const newService = e.target.value;
                                                    if (showEditModal) {
                                                        setSelectedItem(prev => ({
                                                            ...prev,
                                                            service: newService,
                                                            subService: services[newService][0]
                                                        }));
                                                    } else {
                                                        setNewProject(prev => ({
                                                            ...prev,
                                                            service: newService,
                                                            subService: services[newService][0]
                                                        }));
                                                    }
                                                }}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none bg-white"
                                            >
                                                {Object.keys(services).map(service => (
                                                    <option key={service} value={service}>{service}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            Sub-Portfolio *
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={showEditModal ? selectedItem?.subService : newProject.subService}
                                                onChange={(e) => {
                                                    if (showEditModal) {
                                                        setSelectedItem(prev => ({ ...prev, subService: e.target.value }));
                                                    } else {
                                                        setNewProject(prev => ({ ...prev, subService: e.target.value }));
                                                    }
                                                }}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none bg-white"
                                            >
                                                {services[showEditModal ? selectedItem?.service : newProject.service]?.map(subService => (
                                                    <option key={subService} value={subService}>{subService}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                    </div>
                                </div>

                                {/* Image Upload Section - Replaced Client Field */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">
                                        Upload Images *
                                    </label>
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, showEditModal)}
                                                className="hidden"
                                                id="image-upload"
                                            />

                                            <label
                                                htmlFor="image-upload"
                                                className="flex flex-col items-center justify-center w-full px-4 py-8 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
                                            >
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3">
                                                    <Upload size={24} className="text-white" />
                                                </div>
                                                <span className="text-gray-700 font-medium mb-1">Click to upload images</span>
                                                <span className="text-sm text-gray-500">PNG, JPG, JPEG up to 10MB</span>
                                            </label>
                                        </div>

                                        {/* Uploaded Images Preview */}
                                        {(showEditModal ? selectedItem?.images?.length : newProject.images?.length) > 0 && (
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900 mb-2">Uploaded Images:</h4>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                    {(showEditModal ? selectedItem?.images : newProject.images)?.map((image, index) => (
                                                        <div key={index} className="relative group">
                                                            <div className="aspect-square rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                                                                <Image size={20} className="text-gray-400" />
                                                            </div>
                                                            <div className="absolute top-1 right-1">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeImage(index, showEditModal)}
                                                                    className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                                                >
                                                                    <X size={12} />
                                                                </button>
                                                            </div>
                                                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 truncate">
                                                                {image}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-6 border-t-2 border-gray-100 mt-6">
                                <button
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setShowAddModal(false);
                                        setSelectedItem(null);
                                        setUploadedImages([]);
                                    }}
                                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={showEditModal ? handleEditProject : handleAddProject}
                                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    {showEditModal ? 'Update' : 'Add'} Protfolio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Container */}
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/80 backdrop-blur-xl shadow-md border border-white/50 overflow-hidden">

                    {/* Header */}
                    <div className="p-6 sm:p-8 border-b border-gray-200/50 bg-gradient-to-r from-white via-blue-50/30 to-indigo-50/30">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                            <div>
                                <h1 className="text-3xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-black mb-2">
                                    Portfolio Management
                                </h1>
                                <p className="text-gray-600 text-lg">Manage your interior design projects with style</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={handleExport}
                                    className="flex items-center gap-2 px-6 py-2 rounded-xl border-2 border-indigo-300 bg-white text-indigo-700 font-medium hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                                >
                                    <Download size={20} />
                                    <span>Export</span>
                                </button>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                                >
                                    <Plus size={20} />
                                    <span>Add Protfolio</span>
                                </button>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} rounded-2xl shadow-sm p-5 border-2 border-white/50 transform transition-all duration-500 hover:scale-100 hover:shadow-md cursor-pointer group`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                                    <div className="relative">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className={`text-xs font-bold text-gray-700 uppercase tracking-wider`}>
                                                {stat.title}
                                            </div>
                                            <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md transform transition-transform duration-300 group-hover:scale-110 `}>
                                                {stat.icon}
                                            </div>
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                        <div className="text-xs text-gray-600 font-medium">{stat.change}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="p-5 sm:p-6 border-b border-gray-200 bg-white">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                            {/* Service */}
                            <select
                                value={selectedService}
                                onChange={(e) => handleServiceSelect(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-indigo-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition text-sm font-medium"
                            >
                                <option value="all">All Services</option>
                                {Object.keys(services).map(service => (
                                    <option key={service} value={service}>{service}</option>
                                ))}
                            </select>

                            {/* Sub Service */}
                            <select
                                value={selectedSubService}
                                onChange={(e) => setSelectedSubService(e.target.value)}
                                disabled={selectedService === "all"}
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-purple-300 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition text-sm font-medium disabled:bg-gray-100 disabled:text-gray-400"
                            >
                                <option value="all">All Sub-Services</option>
                                {services[selectedService]?.map(subService => (
                                    <option key={subService} value={subService}>{subService}</option>
                                ))}
                            </select>

                            {/* Search */}
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search projects..."
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-blue-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-sm font-medium"
                            />
                        </div>

                        {/* Status pills */}
                        <div className="flex flex-wrap gap-3 mt-5">
                            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-bold border-2 border-blue-200">
                                {selectedService === "all"
                                    ? "All Services"
                                    : `${selectedService} → ${selectedSubService === "all" ? "All" : selectedSubService}`}
                            </div>

                            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-sm font-bold border-2 border-emerald-200">
                                {filteredProjects.length} Projects Found
                            </div>
                        </div>

                    </div>


                    {/* Projects Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px]">
                            <thead className="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 border-b-2 border-gray-200">
                                <tr>
                                    <th className="p-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Portfolio Title</th>
                                    <th className="p-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Portfolio Category</th>
                                    <th className="p-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Images</th>
                                    <th className="p-5 text-center text-sm font-bold text-gray-900 uppercase tracking-wide ">Description</th>
                                    <th className="p-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {filteredProjects.length > 0 ? (
                                    filteredProjects.map((project, index) => (
                                        <tr
                                            key={project.id}
                                            className="transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 group"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <td className="p-5">
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <div className="font-bold text-gray-900 mb-1">{project.title}</div>
                                                        <div className="text-xs text-gray-600 font-medium">{project.id}</div>
                                                        <div className="flex gap-2 mt-2">
                                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 ${getStatusColor(project.status)}`}>
                                                                {project.status.toUpperCase()}
                                                            </span>
                                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 ${getPriorityColor(project.priority)}`}>
                                                                {project.priority.toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div>
                                                    <div className="font-bold text-gray-900 mb-1">{project.service}</div>
                                                    <div className="text-sm text-gray-600">{project.subService}</div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                        <Clock size={12} />
                                                        {project.timeline}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex flex-wrap gap-2">
                                                    {project.images?.slice(0, 3).map((image, imgIndex) => (
                                                        <div key={imgIndex} className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                                            <Image size={16} className="text-gray-400" />
                                                            {imgIndex === 2 && project.images.length > 3 && (
                                                                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                                                    <span className="text-white text-xs font-bold">+{project.images.length - 3}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {project.images?.length || 0} images
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <td className="p-5 max-w-md">
                                                    <p className="text-sm text-emerald-600 font-medium leading-relaxed break-words">
                                                        {project.description}
                                                    </p>
                                                </td>

                                            </td>
                                            <td className="p-5">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setShowViewModal(project)}
                                                        className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
                                                        title="View"
                                                    >
                                                        <Eye size={15} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedItem({ ...project });
                                                            setShowEditModal(true);
                                                        }}
                                                        className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={15} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedItem(project);
                                                            setShowDeleteModal(true);
                                                        }}
                                                        className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-12 text-center">
                                            <div className="text-gray-500">
                                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-4">
                                                    <Search size={40} className="text-gray-400" />
                                                </div>
                                                <p className="font-bold text-xl mb-2">No Projects Found</p>
                                                <p className="text-sm mb-6">Try adjusting your filters or add a new project</p>
                                                <button
                                                    onClick={() => setShowAddModal(true)}
                                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                                >
                                                    Add New Protfolio
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default Portfolio;
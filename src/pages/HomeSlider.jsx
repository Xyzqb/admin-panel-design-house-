import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Image, Search, Download, X, Check, AlertCircle, Calendar, Tag, Eye, Heart, ArrowLeft, Upload, Star, Settings, Maximize2, Minimize2, ChevronDown, Copy, ExternalLink, User } from 'lucide-react';

// Mock toast notifications
const toast = {
  success: (msg) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  },
  error: (msg) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
};

// Main App Component
const CarouselManagement = () => {
  const [view, setView] = useState('list');
  const [editingId, setEditingId] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const navigate = (path) => {
    if (path === '/add-carousels') {
      setView('add');
    } else if (path === '/carousel') {
      setView('list');
      setReloadKey(prev => prev + 1); // 👈 force remount
    } else if (path.startsWith('/edit-carousel/')) {
      const id = parseInt(path.split('/')[2]);
      setEditingId(id);
      setView('edit');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {view === 'list' && <CarouselList navigate={navigate} />}
      {view === 'add' && <AddCarousel navigate={navigate} />}
      {view === 'edit' && <EditCarousel navigate={navigate} editingId={editingId} />}
    </div>
  );
};

// Carousel List Component
const CarouselList = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCard, setExpandedCard] = useState(null);
  const [carousels, setCarousels] = useState([]);
  const rowsPerPage = 12;

  useEffect(() => {
    loadCarousels();
  }, []);

  const loadCarousels = () => {
    const stored = localStorage.getItem("carousels");
    if (stored) {
      try {
        setCarousels(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading carousels:", e);
        setCarousels([]);
      }
    }
  };

  const filteredCarousels = carousels.filter(carousel => {
    const matchesSearch = carousel.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carousel.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carousel.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || carousel.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredCarousels.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCarousels.length / rowsPerPage);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this carousel?')) {
      const updated = carousels.filter(c => c.id !== id);
      setCarousels(updated);
      localStorage.setItem("carousels", JSON.stringify(updated));
      toast.success("Carousel deleted successfully 🗑️");
    }
  };

  const handleToggleStatus = (id) => {
    const updated = carousels.map(c =>
      c.id === id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c
    );
    setCarousels(updated);
    localStorage.setItem("carousels", JSON.stringify(updated));
    toast.success("Status updated successfully 🔄");
  };

  const handleDuplicate = (carousel) => {
    const newCarousel = {
      ...carousel,
      id: Date.now(),
      title: `${carousel.title} (Copy)`,
      status: 'inactive',
      createdAt: new Date().toISOString()
    };
    const updated = [newCarousel, ...carousels];
    setCarousels(updated);
    localStorage.setItem("carousels", JSON.stringify(updated));
    toast.success("Carousel duplicated successfully 📋");
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

  const CardView = ({ carousel }) => {
    const isExpanded = expandedCard === carousel.id;

    return (
      <div className={`relative border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 bg-white hover:shadow-xl ${isExpanded ? 'col-span-2 row-span-2' : ''}`}>
        {/* Card Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-white font-semibold text-sm">
                ID #{carousel.id}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${carousel.status === 'active' ? 'bg-green-400 text-green-900' : 'bg-gray-300 text-gray-700'}`}>
                {carousel.status === 'active' ? '● Active' : '○ Inactive'}
              </span>
              <button
                onClick={() => setExpandedCard(isExpanded ? null : carousel.id)}
                className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
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
                <Image className="w-4 h-4 text-indigo-600" />
                Images ({carousel.images?.length || 0})
              </h4>
              {!isExpanded && (
                <button
                  onClick={() => setExpandedCard(carousel.id)}
                  className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  View Details
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className={`${isExpanded ? 'grid grid-cols-2 md:grid-cols-3 gap-3' : 'grid grid-cols-4 gap-2'}`}>
              {carousel.images?.slice(0, isExpanded ? undefined : 4).map((img, idx) => (
                <div
                  key={img.id || idx}
                  className={`${isExpanded ? 'h-32' : 'aspect-square'} rounded-lg overflow-hidden border-2 border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200`}
                >
                  {img.url ? (
                    <img src={img.url} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Image className="w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}
              {!isExpanded && carousel.images?.length > 4 && (
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-indigo-700">
                  <div className="text-center">
                    <div className="text-lg font-bold">+{carousel.images.length - 4}</div>
                    <div className="text-xs">More</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Expanded Details */}
          {isExpanded && (
            <>
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-purple-600" />
                    Details
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500">Description</label>
                      <p className="text-sm text-gray-900">{carousel.description || 'No description'}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">Created</label>
                      <p className="text-sm text-gray-900">{formatDate(carousel.createdAt)}</p>
                    </div>
                    {carousel.titles && carousel.titles.length > 0 && (
                      <div>
                        <label className="text-xs font-medium text-gray-500">Phrases ({carousel.titles.length})</label>
                        <div className="mt-1 space-y-1">
                          {carousel.titles.map((title, i) => (
                            <div key={i} className="text-xs bg-white px-2 py-1 rounded border border-gray-200">
                              {i + 1}. {title}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Card Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleToggleStatus(carousel.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${carousel.status === 'active'
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {carousel.status === 'active' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              {carousel.status === 'active' ? 'Active' : 'Inactive'}
            </button>
            <div className="flex items-center gap-1">
              <button
                onClick={() => navigate(`/edit-carousel/${carousel.id}`)}
                className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDuplicate(carousel)}
                className="p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                title="Duplicate"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(carousel.id)}
                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
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
    <div className="p-6 bg-white shadow-md mt-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-amber-600">
              Home Slider
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Manage and organize your website hero section carousels
            </p>
          </div>

          <div className='flex gap-4'>
            <button
              onClick={() => navigate("/add-carousels")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              Add New Carousel
            </button>

            <button
              onClick={() => routerNavigate("/festival-carousels")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Festivals Carousel
            </button>
          </div>

        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, subtitle, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Carousel Cards */}
      {currentItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-300">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <Image className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Carousels Found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {searchTerm || statusFilter !== 'all'
              ? "No carousels match your filters."
              : "Start by adding your first carousel!"}
          </p>
          <button
            onClick={() => navigate("/add-carousels")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create First Carousel
          </button>
        </div>
      ) : (
        <>
          <div className={`grid grid-cols-1 ${expandedCard ? 'lg:grid-cols-2' : 'lg:grid-cols-2 xl:grid-cols-3'} gap-6 mb-8`}>
            {currentItems.map((carousel) => (
              <CardView key={carousel.id} carousel={carousel} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Add Carousel Component
const AddCarousel = ({ navigate }) => {
  const [titles, setTitles] = useState(['', '', '']);
  const [subtitle, setSubtitle] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState(Array(4).fill(null));
  const [imagePreviews, setImagePreviews] = useState(Array(4).fill(''));

  const addTitleSlot = () => {
    if (titles.length < 5) {
      setTitles([...titles, '']);
    }
  };

  const updateTitle = (index, value) => {
    const newTitles = [...titles];
    newTitles[index] = value;
    setTitles(newTitles);
  };

  const removeTitle = (index) => {
    if (titles.length > 3) {
      setTitles(titles.filter((_, i) => i !== index));
    }
  };

  const addImageSlot = () => {
    if (images.length < 12) {
      setImages([...images, null]);
      setImagePreviews([...imagePreviews, '']);
    }
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;

      const newImages = [...images];
      newImages[index] = {
        name: file.name,
        url: base64,
      };
      setImages(newImages);

      const newPreviews = [...imagePreviews];
      newPreviews[index] = base64;
      setImagePreviews(newPreviews);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    newPreviews[index] = '';
    setImagePreviews(newPreviews);
  };

  const handleSave = () => {
    const uploadedImages = images.filter(Boolean);

    if (uploadedImages.length < 4) {
      toast.error("Minimum 4 images required");
      return;
    }

    const filledTitles = titles.filter(t => t.trim());
    if (filledTitles.length === 0) {
      toast.error("At least one title is required");
      return;
    }

    const newCarousel = {
      id: Date.now(),
      title: filledTitles[0] || "Untitled Carousel",
      titles: filledTitles,
      subtitle: subtitle || '',
      description: subtitle || '',
      priority: 1,
      images: images
        .map((img, i) => img ? {
          id: Date.now() + i,
          name: img.name,
          url: img.url,
        } : null)
        .filter(Boolean),
      status: isActive ? "active" : "inactive",
      createdAt: new Date().toISOString(),
      festivalSchedule: null,
    };

    const existing = JSON.parse(localStorage.getItem("carousels") || "[]");
    localStorage.setItem("carousels", JSON.stringify([newCarousel, ...existing]));

    toast.success("Carousel added successfully 🚀");
    navigate("/carousel");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate("/carousel")}
            className="p-3 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Add New Carousel
            </h1>
            <p className="text-gray-600 mt-1">Create a new hero carousel for your website</p>
          </div>
        </div>

        {/* Images Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Carousel Images ({images.filter(Boolean).length}/{images.length})
              </h2>
              <p className="text-gray-600 text-sm mt-1">Minimum 4, maximum 12 images (16:9 recommended, max 5MB each)</p>
            </div>
            <button
              onClick={addImageSlot}
              disabled={images.length >= 12}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Slot
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden">
                  {imagePreviews[index] ? (
                    <>
                      <img
                        src={imagePreviews[index]}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">
                        Image {index + 1}
                      </div>
                    </>
                  ) : (
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-gray-600 text-sm font-medium">Upload</span>
                      <span className="text-gray-400 text-xs mt-1">Image {index + 1}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(index, e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Titles Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Hero Titles (Typewriter Phrases)</h2>
              <p className="text-gray-600 text-sm mt-1">Minimum 3, maximum 5 phrases</p>
            </div>
            <button
              onClick={addTitleSlot}
              disabled={titles.length >= 5}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 transition-all font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Phrase
            </button>
          </div>

          <div className="space-y-3">
            {titles.map((title, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-indigo-600 font-semibold min-w-8">{index + 1}.</span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => updateTitle(index, e.target.value)}
                  placeholder={index === 0 ? "e.g., Your Journey, Our Priority" : `Phrase ${index + 1}...`}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
                {titles.length > 3 && (
                  <button
                    onClick={() => removeTitle(index)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Subtitle / Description</h3>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter a short description shown below heading..."
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
          />
        </div>

        {/* Status Toggle */}
        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200 mb-8">
          <div>
            <p className="font-semibold text-gray-900">Set as Active Configuration</p>
            <p className="text-sm text-gray-600">This carousel will be live on your website</p>
          </div>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors ${isActive ? 'bg-green-500' : 'bg-gray-300'
              }`}
          >
            <span
              className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform shadow-lg ${isActive ? 'translate-x-7' : 'translate-x-1'
                }`}
            />
          </button>
        </div>

        {/* Save Button */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/carousel")}
            className="flex-1 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            Save Carousel
          </button>
        </div>
      </div>
    </div>
  );
};

// Edit Carousel Component
const EditCarousel = ({ navigate, editingId }) => {
  const [carousel, setCarousel] = useState(null);
  const [titles, setTitles] = useState(['', '', '']);
  const [subtitle, setSubtitle] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const carousels = JSON.parse(localStorage.getItem("carousels") || "[]");
    const found = carousels.find(c => c.id === editingId);
    if (found) {
      setCarousel(found);
      setTitles(found.titles || ['', '', '']);
      setSubtitle(found.subtitle || '');
      setIsActive(found.status === 'active');

      const existingImages = found.images || [];
      const totalSlots = Math.max(4, existingImages.length);
      const newImages = Array(totalSlots).fill(null);
      const newPreviews = Array(totalSlots).fill('');

      existingImages.forEach((img, i) => {
        newImages[i] = img;
        newPreviews[i] = img.url;
      });

      setImages(newImages);
      setImagePreviews(newPreviews);
    } else {
      toast.error("Carousel not found");
      navigate("/carousel");
    }
  }, [editingId]);

  const addTitleSlot = () => {
    if (titles.length < 5) {
      setTitles([...titles, '']);
    }
  };

  const updateTitle = (index, value) => {
    const newTitles = [...titles];
    newTitles[index] = value;
    setTitles(newTitles);
  };

  const removeTitle = (index) => {
    if (titles.length > 3) {
      setTitles(titles.filter((_, i) => i !== index));
    }
  };

  const addImageSlot = () => {
    if (images.length < 12) {
      setImages([...images, null]);
      setImagePreviews([...imagePreviews, '']);
    }
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    const newImages = [...images];
    newImages[index] = {
      name: file.name,
      url: imageUrl, // ✅ REAL IMAGE URL
    };
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    newPreviews[index] = imageUrl;
    setImagePreviews(newPreviews);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    newPreviews[index] = '';
    setImagePreviews(newPreviews);
  };

  const handleUpdate = () => {
    const uploadedImages = images.filter(Boolean);

    if (uploadedImages.length < 4) {
      toast.error("Minimum 4 images required");
      return;
    }

    const filledTitles = titles.filter(t => t.trim());
    if (filledTitles.length === 0) {
      toast.error("At least one title is required");
      return;
    }

    const updatedCarousel = {
      ...carousel,
      title: filledTitles[0] || "Untitled Carousel",
      titles: filledTitles,
      subtitle: subtitle || '',
      description: subtitle || '',
      images: uploadedImages,
      status: isActive ? "active" : "inactive",
    };

    const carousels = JSON.parse(localStorage.getItem("carousels") || "[]");
    const updated = carousels.map(c => c.id === editingId ? updatedCarousel : c);
    localStorage.setItem("carousels", JSON.stringify(updated));

    toast.success("Carousel updated successfully 🎉");
    navigate("/carousel");
  };

  if (!carousel) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate("/carousel")}
            className="p-3 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Edit Carousel
            </h1>
            <p className="text-gray-600 mt-1">Editing: {carousel.title}</p>
          </div>
        </div>

        {/* Images Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Carousel Images ({images.filter(Boolean).length}/{images.length})
              </h2>
              <p className="text-gray-600 text-sm mt-1">Minimum 4, maximum 12 images</p>
            </div>
            <button
              onClick={addImageSlot}
              disabled={images.length >= 12}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Slot
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden">
                  {imagePreviews[index] ? (
                    <>
                      <img
                        src={imagePreviews[index]}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">
                        Image {index + 1}
                      </div>
                    </>
                  ) : (
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-gray-600 text-sm font-medium">Upload</span>
                      <span className="text-gray-400 text-xs mt-1">Image {index + 1}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(index, e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Titles Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Hero Titles</h2>
              <p className="text-gray-600 text-sm mt-1">Minimum 3, maximum 5 phrases</p>
            </div>
            <button
              onClick={addTitleSlot}
              disabled={titles.length >= 5}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 transition-all font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Phrase
            </button>
          </div>

          <div className="space-y-3">
            {titles.map((title, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-indigo-600 font-semibold min-w-8">{index + 1}.</span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => updateTitle(index, e.target.value)}
                  placeholder={`Phrase ${index + 1}...`}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
                {titles.length > 3 && (
                  <button
                    onClick={() => removeTitle(index)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Subtitle / Description</h3>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter a short description..."
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
          />
        </div>

        {/* Status Toggle */}
        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200 mb-8">
          <div>
            <p className="font-semibold text-gray-900">Set as Active</p>
            <p className="text-sm text-gray-600">This carousel will be live on your site</p>
          </div>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors ${isActive ? 'bg-green-500' : 'bg-gray-300'
              }`}
          >
            <span
              className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform shadow-lg ${isActive ? 'translate-x-7' : 'translate-x-1'
                }`}
            />
          </button>
        </div>

        {/* Update Button */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/carousel")}
            className="flex-1 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            Update Carousel
          </button>
        </div>
      </div>
    </div>
  );
};
export default CarouselManagement;
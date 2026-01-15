import React, { useState } from 'react';
import { 
  Upload, 
  Globe,
  Hash,
  MapPin,
  Ruler,
  Type,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Tag,
  FileText,
  Save,
  X,
  Layout,
  Users,
  Store,
  Home,
  Building,
  Utensils,
  Calendar,
  Award,
  Trello
} from 'lucide-react';

const Post = () => {
  // Form state
  const [formData, setFormData] = useState({
    postTitle: '',
    permalink: '',
    categories: [],
    clients: '',
    location: '',
    height: '',
    width: '',
    depth: '',
    postDescription: '',
    postImage: null,
    imagePreview: null,
    postStatus: 'inactive',
    metaKeyword: '',
    metaDescription: ''
  });

  // Categories data
  const categories = [
    { id: 'merchandising', name: 'Merchandising', icon: Store },
    { id: 'retail_merchandising', name: 'Retail Merchandising Units', icon: Store },
    { id: 'hip_abs_tray', name: 'HIP & ABS Tray', icon: Layout },
    { id: 'mobile_booth', name: 'Mobile Booth', icon: Layout },
    { id: 'acrylic_tops', name: 'Acrylic Table Tops', icon: Layout },
    { id: 'wheel_barrow', name: 'Wheel Barrow Kiosk', icon: Layout },
    { id: 'signage', name: 'SIGNAGE', icon: Trello },
    { id: 'led_signboard', name: 'LED Signboard', icon: Trello },
    { id: 'acp_signboard', name: 'ACP Signboard', icon: Trello },
    { id: '3d_letters', name: '3-D Letters', icon: Type },
    { id: 'backlit_signage', name: 'Backlit Signage', icon: Trello },
    { id: 'totem_poles', name: 'Totem Poles', icon: Trello },
    { id: 'printing', name: 'Printing', icon: Type },
    { id: 'interior', name: 'Interior', icon: Home },
    { id: 'retail_store', name: 'Retail Store', icon: Store },
    { id: 'shop_in_shop', name: "Shop 'in' Shop", icon: Store },
    { id: 'kiosk', name: 'Kiosk', icon: Layout },
    { id: 'corporate_offices', name: 'Corporate Offices', icon: Building },
    { id: 'restaurants', name: 'Restaurants', icon: Utensils },
    { id: 'office_furniture', name: 'Office Furniture', icon: Home },
    { id: 'exhibition_events', name: 'Exhibition & Events', icon: Calendar },
    { id: 'national_exhibition', name: 'National Level Exhibition', icon: Award },
    { id: 'corporate_events', name: 'Corporate Events', icon: Calendar },
    { id: 'product_launch', name: 'Event & Product Launch', icon: Award }
  ];

  // Handle category selection
  const handleCategoryToggle = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        postImage: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Post added successfully!');
  };

  // Format permalink
  const formatPermalink = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <div className="min-h-screen bg-white shadow-md mt-6 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 mx-2">
          <h1 className="text-3xl md:text-3xl font-bold text-gray-800">Create New Post</h1>
          <p className="text-gray-600 mt-2 text-lg">Add a new project to your portfolio</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Post Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Post Title & Permalink Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="space-y-6">
                  {/* Post Title */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Type className="w-4 h-4 text-blue-600" />
                      Post Title *
                    </label>
                    <input
                      type="text"
                      value={formData.postTitle}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          postTitle: newTitle,
                          permalink: formatPermalink(newTitle)
                        }));
                      }}
                      placeholder="Enter Post Title"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
                      required
                    />
                  </div>

                  {/* Permalink */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Globe className="w-4 h-4 text-green-600" />
                      Permalink (SEO Friendly URI) *
                    </label>
                    <div className="flex items-center">
                      <span className="px-4 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">
                        https://yourdomain.com/
                      </span>
                      <input
                        type="text"
                        value={formData.permalink}
                        onChange={(e) => setFormData(prev => ({ ...prev, permalink: e.target.value }))}
                        placeholder="Must be unique..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Must be unique. Use lowercase letters, numbers, and hyphens only.</p>
                  </div>
                </div>
              </div>

              {/* Post Category Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Hash className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Post Category *</h2>
                </div>
                <p className="text-sm text-gray-600 mb-6">Select one or more categories for your post</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = formData.categories.includes(category.id);
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategoryToggle(category.id)}
                        className={`p-3 border rounded-lg transition-all duration-200 flex items-center gap-2 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm text-left">{category.name}</span>
                        {isSelected && (
                          <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Client & Location Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Client */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Users className="w-4 h-4 text-indigo-600" />
                      Clients *
                    </label>
                    <input
                      type="text"
                      value={formData.clients}
                      onChange={(e) => setFormData(prev => ({ ...prev, clients: e.target.value }))}
                      placeholder="Enter client name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Enter location"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Dimensions Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Ruler className="w-5 h-5 text-amber-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Dimensions</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Height */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Height *</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.height}
                        onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                        placeholder="Enter height"
                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">cm</span>
                    </div>
                  </div>

                  {/* Width */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Width *</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.width}
                        onChange={(e) => setFormData(prev => ({ ...prev, width: e.target.value }))}
                        placeholder="Enter width"
                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">cm</span>
                    </div>
                  </div>

                  {/* Depth */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Depth</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.depth}
                        onChange={(e) => setFormData(prev => ({ ...prev, depth: e.target.value }))}
                        placeholder="Enter depth"
                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">cm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Description Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-semibold text-gray-800">Post Description *</h2>
                  </div>
                </div>

                {/* Rich Text Editor Toolbar */}
                <div className="border border-gray-300 rounded-t-lg bg-gray-100 p-2 flex flex-wrap gap-1">
                  {['B', 'I', 'S', 'I_x', ':', '=', '+', '-', '/', '^', '%', '&', '|', '<', '>', '?'].map((btn, index) => (
                    <button
                      key={index}
                      type="button"
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      {btn}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="ml-auto px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 transition-colors"
                  >
                    Source
                  </button>
                </div>

                {/* Text Area */}
                <textarea
                  value={formData.postDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, postDescription: e.target.value }))}
                  placeholder="Write your post description here..."
                  rows={8}
                  className="w-full px-4 py-3 border border-t-0 border-gray-300 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  required
                />
              </div>
            </div>

            {/* Right Column - Media & SEO */}
            <div className="space-y-6">
              {/* Post Image Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Post Image *</h2>
                </div>

                {/* Image Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-300 ${
                    formData.imagePreview 
                      ? 'border-green-400 bg-green-50' 
                      : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  {formData.imagePreview ? (
                    <div className="relative">
                      <img 
                        src={formData.imagePreview} 
                        alt="Preview" 
                        className="w-48 h-48 mx-auto object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, postImage: null, imagePreview: null }))}
                        className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-purple-500" />
                      </div>
                      <p className="text-gray-600 mb-4">Select image</p>
                      <label className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
                        <Upload className="w-4 h-4" />
                        Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          required={!formData.imagePreview}
                        />
                      </label>
                    </>
                  )}
                </div>

                {/* Image Not Available */}
                {!formData.imagePreview && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-amber-800 text-sm font-medium">Image Not Available</p>
                  </div>
                )}

                {/* Image Requirements */}
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm font-semibold mb-2">NOTE!</p>
                  <ul className="text-blue-700 text-xs space-y-1">
                    <li>• Images Width 400, Height 400</li>
                    <li>• JPEG, JPG, PNG, GIF Only</li>
                    <li>• Maximum file size: 5MB</li>
                  </ul>
                </div>
              </div>

              {/* Post Status Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Post Status *</h2>
                </div>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.postStatus === 'active'}
                      onChange={() => setFormData(prev => ({ ...prev, postStatus: 'active' }))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Active</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formData.postStatus === 'inactive'}
                      onChange={() => setFormData(prev => ({ ...prev, postStatus: 'inactive' }))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex items-center gap-2">
                      <EyeOff className="w-4 h-4 text-red-600" />
                      <span className="text-gray-700">Inactive</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* SEO Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-800">SEO</h2>
                </div>

                {/* Meta Keywords */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Tag className="w-4 h-4 text-amber-600" />
                    Meta Keyword *
                    <span className="text-xs font-normal text-red-500">*Required Fields</span>
                  </label>
                  <input
                    type="text"
                    value={formData.metaKeyword}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaKeyword: e.target.value }))}
                    placeholder="Enter meta keywords (comma separated)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Meta Description
                  </label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                    placeholder="Enter meta description for SEO..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Add Post Now
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
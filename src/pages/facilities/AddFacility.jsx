import React, { useState } from 'react';
import { Save, Upload, X, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddFacility = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    clientName: '',
    client: '',
    projectName: '',
    projectCategory: '',
    description: '',
    image: null,
    status: 'Inactive'
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload only JPEG, JPG, PNG, or GIF images');
        return;
      }
      
      const img = new Image();
      img.src = URL.createObjectURL(file);
      
      img.onload = () => {
        if (img.width !== 800 || img.height !== 600) {
          alert(`Image dimensions must be 800x600px. Your image is ${img.width}x${img.height}px`);
          return;
        }
        
        setFormData(prev => ({ ...prev, image: file }));
        setPreviewImage(URL.createObjectURL(file));
      };
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setPreviewImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Facility added successfully!');
    // Reset form
    setFormData({
      clientName: '',
      client: '',
      projectName: '',
      projectCategory: '',
      description: '',
      image: null,
      status: 'Inactive'
    });
    setPreviewImage(null);
  };

  // Mock data for dropdowns
  const clients = ['Client A', 'Client B', 'Client C', 'Client D'];
  const projectCategories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Add New Facility
              </h1>
              <p className="text-gray-600">
                Add a new facility to your portfolio with detailed information
              </p>
            </div>
            
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg">
              <Save className="w-5 h-5" />
              Save Facility
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Client Information Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                  Client Information
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Select Client Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Client Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none"
                      required
                    >
                      <option value="">Select Client Name</option>
                      {clients.map((client, index) => (
                        <option key={index} value={client}>{client}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Select Client */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Client <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="client"
                      value={formData.client}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none"
                      required
                    >
                      <option value="">Select Client</option>
                      {clients.map((client, index) => (
                        <option key={index} value={client}>{client}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Information Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-6 bg-green-600 rounded-full"></div>
                  Project Information
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Project Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    placeholder="Enter project name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>

                {/* Select Project Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Project Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="projectCategory"
                      value={formData.projectCategory}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none"
                      required
                    >
                      <option value="">Select Project Category</option>
                      {projectCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Short Description About this Project <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a brief description about the project..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                  required
                />
                <p className="text-sm text-gray-500">
                  Maximum 500 characters: {formData.description.length}/500
                </p>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-6 bg-purple-600 rounded-full"></div>
                  Project Image
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Image Requirements:</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    • Width: 800px<br />
                    • Height: 600px<br />
                    • Supported formats: JPEG, JPG, PNG, GIF
                  </p>
                </div>
                
                {/* Image Upload Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Image <span className="text-red-500">*</span>
                  </label>
                  
                  {previewImage ? (
                    <div className="relative group">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full max-w-md h-64 object-cover rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                        800 × 600
                      </div>
                    </div>
                  ) : (
                    <label className="block cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-xl p-8 text-center transition-all hover:bg-blue-50">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Upload className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-700 mb-1">
                              Click to upload image
                            </p>
                            <p className="text-sm text-gray-500">
                              PNG, JPG, GIF up to 5MB
                            </p>
                          </div>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/gif"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-6 bg-amber-600 rounded-full"></div>
                  Status
                </h2>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Status <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formData.status === 'Active'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className={`px-4 py-2 rounded-lg ${formData.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      Active
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formData.status === 'Inactive'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className={`px-4 py-2 rounded-lg ${formData.status === 'Inactive' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}>
                      Inactive
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Add Facility
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFacility;
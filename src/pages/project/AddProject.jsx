import React, { useState } from "react";
import { List } from "lucide-react";

const AddProject = () => {
    const [formData, setFormData] = useState({
        clientName: "",
        projectName: "",
        category: "",
        description: "",
        image: null,
        status: "Inactive",
    });

    const clientOptions = [
        "100 Pipers",
        "Sennheiser",
        "Ponds",
        "Nescafe",
        "Maybelline",
        "IKEA",
        "Godrej",
        "Home Centre",
    ];

    const categoryOptions = [
        "Sofas",
        "Shop in Shop",
        "Retail Merchandising",
        "Interior Design",
        "Architecture",
        "Furniture",
        "Kitchen Design",
        "Wardrobe Design",
    ];

    const [previewImage, setPreviewImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setFormData({ ...formData, image: null });
        setPreviewImage(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            console.log(formData);
            setIsSubmitting(false);
            alert("Project Added Successfully");
        }, 1200);
    };

    const handleProjectList = () => {
        console.log("Navigate to project list");
    };

    return (
        <div className="bg-white shadow-md mt-6">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Add Project
                    </h1>
                    <button
                        onClick={handleProjectList}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition"
                    >
                        <List className="w-4 h-4" />
                        Project List
                    </button>
                </div>
            </div>

            {/* Form Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <div className="space-y-6">
                        {/* Row 1: Client, Project Name, Category */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Client Name */}
                            <div>
                                <label className="block text-base font-semibold text-gray-900 mb-2">
                                    Select Client Name <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="clientName"
                                    value={formData.clientName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select Client</option>
                                    {clientOptions.map((client) => (
                                        <option key={client} value={client}>{client}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Project Name */}
                            <div>
                                <label className="block text-base font-semibold text-gray-900 mb-2">
                                    Project Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="projectName"
                                    value={formData.projectName}
                                    onChange={handleInputChange}
                                    placeholder="Project Name"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-base font-semibold text-gray-900 mb-2">
                                    Select Project Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select Project Category</option>
                                    {categoryOptions.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-base font-semibold text-gray-900 mb-2">
                                Short Description About this Project
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="5"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Image Upload & Status Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-base font-semibold text-gray-900 mb-2">
                                    Add Image <span className="text-red-500">*</span>
                                </label>
                                
                                <div className="border border-gray-300 rounded p-4 bg-white">
                                    {previewImage ? (
                                        <div className="flex flex-col items-center">
                                            <div className="relative mb-3">
                                                <img
                                                    src={previewImage}
                                                    alt="preview"
                                                    className="w-32 h-32 object-cover border border-gray-300"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveImage}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600 text-xs"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            <label className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer text-sm transition">
                                                Change Image
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center py-6">
                                            <div className="text-center mb-3">
                                                <p className="text-gray-900 font-medium">Image</p>
                                                <p className="text-gray-900 font-medium">Not</p>
                                                <p className="text-gray-900 font-medium">Available</p>
                                            </div>
                                            <label className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer text-sm transition">
                                                Select image
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>

                                {/* Note */}
                                <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded px-3 py-2">
                                    <p className="text-xs text-yellow-800">
                                        <span className="font-bold">📋 NOTE!</span> Width - 800, Height - 600.(JPEG, JPG, PNG, GIF Only)
                                    </p>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-base font-semibold text-gray-900 mb-2">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Required Fields Note */}
                        <div className="pt-4">
                            <p className="text-sm text-gray-600">
                                <span className="text-red-500">*</span>Required Fields
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-2">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`px-8 py-3 rounded font-semibold text-base transition ${
                                    isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-700'
                                } text-white`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Saving...
                                    </span>
                                ) : (
                                    'Add Now'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProject;
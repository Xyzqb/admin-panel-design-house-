import React, { useState } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";

const AddGalleryImages = () => {
    const [formData, setFormData] = useState({
        title: "",
        projectName: "",
        category: "",
        description: "",
        image: null,
        status: "Inactive",
    });

    const projectOptions = [
        "100 Pipers",
        "Sennheiser Shop",
        "Ponds",
        "Nescafe",
        "Maybelline",
        "Luxury Sofas Collection",
        "Modular Kitchens",
        "Space Saving Furniture",
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
            alert("Image Added Successfully");
        }, 1200);
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="bg-white shadow-md mt-6 p-6">
            <div className="w-full">
                {/* Header */}
                <div className="mb-6">
                    {/* <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button> */}
                    
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Add Gallery Image
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Upload and manage images for your gallery portfolio
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <form onSubmit={handleSubmit} className="p-6">
                        {/* Row 1: Title, Project, Category */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter image title"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    required
                                />
                            </div>

                            {/* Project Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Project Name <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="projectName"
                                    value={formData.projectName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    required
                                >
                                    <option value="">Select Project</option>
                                    {projectOptions.map((p) => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categoryOptions.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Write a short description..."
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                            />
                        </div>

                        {/* Image Upload & Status Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
                            {/* Image Upload */}
                            <div className="lg:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Image <span className="text-red-500">*</span>
                                </label>
                                
                                {previewImage ? (
                                    <div className="relative border border-gray-300 rounded-md p-4 bg-gray-50">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={previewImage}
                                                alt="preview"
                                                className="w-20 h-20 object-cover rounded border border-gray-200"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-700">Image selected</p>
                                                <p className="text-xs text-gray-500 mt-0.5">Ready to upload</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="p-1.5 hover:bg-gray-200 rounded transition"
                                                title="Remove image"
                                            >
                                                <X className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer hover:border-gray-400 transition">
                                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                        <span className="text-sm text-gray-600 mb-1">Click to upload image</span>
                                        <span className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-2 rounded-md font-medium text-sm transition ${
                                    isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                } text-white`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddGalleryImages;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";


// const AddGalleryImages = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         title: "",
//         projectName: "",
//         category: "",
//         description: "",
//         image: null,
//         status: "Inactive",
//     });

//     const projectOptions = [
//         "100 Pipers",
//         "Sennheiser Shop",
//         "Ponds",
//         "Nescafe",
//         "Maybelline",
//         "Luxury Sofas Collection",
//         "Modular Kitchens",
//         "Space Saving Furniture",
//     ];

//     const categoryOptions = [
//         "Sofas",
//         "Shop in Shop",
//         "Retail Merchandising",
//         "Interior Design",
//         "Architecture",
//         "Furniture",
//         "Kitchen Design",
//         "Wardrobe Design",
//     ];

//     const [previewImage, setPreviewImage] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFormData({ ...formData, image: file });
//             setPreviewImage(URL.createObjectURL(file));
//         }
//     };

//     const handleRemoveImage = () => {
//         setFormData({ ...formData, image: null });
//         setPreviewImage(null);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         setTimeout(() => {
//             console.log(formData);
//             setIsSubmitting(false);
//             alert("Image Added Successfully");
//         }, 1200);
//     };

//     return (
//         <div className="bg-white shadow-md mt-6 p-6">
//             <div className="w-full">
//                 {/* Header with gradient background */}
//                 <div className="mb-8">

//                     {/* Title Row with Back Button */}
//                     <div className="flex items-start gap-4 mb-6">

//                         {/* Back Button */}
//                         <button
//                             type="button"
//                             onClick={() => navigate(-1)}
//                             className="mt-1 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition shadow"
//                             title="Go Back"
//                         >
//                             <ArrowLeft className="w-5 h-5 text-slate-700" />
//                         </button>

//                         {/* Title + Subtitle */}
//                         <div>
//                             <h1 className="text-3xl font-bold text-slate-800">
//                                 Add Gallery Images
//                             </h1>
//                             <p className="text-slate-600 mt-1 text-lg">
//                                 Upload and manage images for your gallery portfolio
//                             </p>
//                         </div>

//                     </div>

//                 </div>


//                 {/* Main Form Card */}
//                 <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200">
//                     <div className="p-8">
//                         <form onSubmit={handleSubmit} className="space-y-8">
//                             {/* Title, Project, Category in one row */}
//                             <div className="grid md:grid-cols-3 gap-6">
//                                 {/* Title Field */}
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-bold text-slate-700">
//                                         <span className="text-red-500">*</span> Images Title
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="title"
//                                         value={formData.title}
//                                         onChange={handleInputChange}
//                                         placeholder="Enter image title"
//                                         className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-3 focus:ring-blue-200 focus:outline-none transition-all duration-200 text-slate-700 placeholder-slate-400"
//                                         required
//                                     />
//                                 </div>

//                                 {/* Project Name Field */}
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-bold text-slate-700">
//                                         <span className="text-red-500">*</span> Project Name
//                                     </label>
//                                     <div className="relative">
//                                         <select
//                                             name="projectName"
//                                             value={formData.projectName}
//                                             onChange={handleInputChange}
//                                             className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-3 focus:ring-blue-200 focus:outline-none transition-all duration-200 appearance-none text-slate-700"
//                                             required
//                                         >
//                                             <option value="" className="text-slate-400">Select Project</option>
//                                             {projectOptions.map((p) => (
//                                                 <option key={p} value={p} className="text-slate-700">{p}</option>
//                                             ))}
//                                         </select>
//                                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
//                                             <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                                             </svg>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Category Field */}
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-bold text-slate-700">
//                                         <span className="text-red-500">*</span> Images Category
//                                     </label>
//                                     <div className="relative">
//                                         <select
//                                             name="category"
//                                             value={formData.category}
//                                             onChange={handleInputChange}
//                                             className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-3 focus:ring-blue-200 focus:outline-none transition-all duration-200 appearance-none text-slate-700"
//                                             required
//                                         >
//                                             <option value="" className="text-slate-400">Select Category</option>
//                                             {categoryOptions.map((c) => (
//                                                 <option key={c} value={c} className="text-slate-700">{c}</option>
//                                             ))}
//                                         </select>
//                                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
//                                             <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                                             </svg>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Description Field */}
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-bold text-slate-700">
//                                     Short Description About this images
//                                 </label>
//                                 <textarea
//                                     name="description"
//                                     value={formData.description}
//                                     onChange={handleInputChange}
//                                     placeholder="Write a short description about this image..."
//                                     rows="3"
//                                     className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-3 focus:ring-blue-200 focus:outline-none transition-all duration-200 text-slate-700 placeholder-slate-400 resize-none"
//                                 />
//                             </div>

//                             {/* Divider */}
//                             <div className="border-t border-slate-200 my-6"></div>

//                             {/* Image Upload + Status + Submit (SAME ROW) */}
//                             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

//                                 {/* Image Upload Section (2 columns) */}
//                                 <div className="lg:col-span-2 space-y-4">
//                                     <label className="block text-sm font-bold text-slate-700">
//                                         <span className="text-red-500">*</span> Add Image
//                                     </label>

//                                     <div
//                                         className={`border-3 border-dashed rounded-2xl p-6 text-center transition-all duration-300 ${previewImage
//                                             ? "border-green-400 bg-gradient-to-br from-green-50 to-emerald-50"
//                                             : "border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50 hover:border-blue-400"
//                                             }`}
//                                     >
//                                         {previewImage ? (
//                                             <div className="space-y-4">
//                                                 <div className="relative mx-auto max-w-xs">
//                                                     <img
//                                                         src={previewImage}
//                                                         alt="preview"
//                                                         className="w-full max-h-20 object-cover rounded-xl shadow-md border-4 border-white"
//                                                     />
//                                                     <button
//                                                         type="button"
//                                                         onClick={handleRemoveImage}
//                                                         className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow"
//                                                         title="Remove image"
//                                                     >
//                                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                                                         </svg>
//                                                     </button>
//                                                 </div>
//                                                 <p className="text-green-600 font-medium text-sm">
//                                                     Image selected successfully
//                                                 </p>
//                                             </div>
//                                         ) : (
//                                             <div className="py-6">
//                                                 <p className="text-slate-600 mb-3 text-sm font-medium">
//                                                     Image Not Available
//                                                 </p>
//                                                 <label className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
//                                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//                                                     </svg>
//                                                     Select image
//                                                     <input
//                                                         type="file"
//                                                         accept="image/*"
//                                                         onChange={handleImageChange}
//                                                         className="hidden"
//                                                     />
//                                                 </label>
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* Note */}
//                                     <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
//                                         <p className="text-xs text-amber-800 font-medium">
//                                             <strong>NOTE:</strong> Recommended 800×600px | JPG, PNG, GIF | Max 5MB
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {/* Status + Submit Button (1 column, SAME BOX) */}
//                                 <div className="space-y-4 p-5">

//                                     {/* Status */}
//                                     <div className="space-y-2">
//                                         <label className="block text-sm font-bold text-slate-700">
//                                             <span className="text-red-500">*</span> Status
//                                         </label>

//                                         <div className="relative">
//                                             <select
//                                                 name="status"
//                                                 value={formData.status}
//                                                 onChange={handleInputChange}
//                                                 className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-3 focus:ring-blue-200 appearance-none text-sm"
//                                             >
//                                                 <option value="Active">Active</option>
//                                                 <option value="Inactive">Inactive</option>
//                                             </select>

//                                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
//                                                 <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                                                 </svg>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Submit Button (BELOW Status, INSIDE SAME BOX) */}
//                                     <div className="pt-2">
//                                         <button
//                                             type="submit"
//                                             disabled={isSubmitting}
//                                             className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${isSubmitting
//                                                 ? 'bg-gradient-to-r from-slate-600 to-slate-700 cursor-not-allowed'
//                                                 : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
//                                                 } text-white flex items-center justify-center`}
//                                         >
//                                             {isSubmitting ? (
//                                                 <>
//                                                     <svg className="animate-spin h-6 w-6 mr-3 text-white" fill="none" viewBox="0 0 24 24">
//                                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                                                     </svg>
//                                                     Saving...
//                                                 </>
//                                             ) : (
//                                                 <>Add Now</>
//                                             )}
//                                         </button>
//                                     </div>

//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default AddGalleryImages;
import { useState, useEffect } from "react";
import { Pencil, Trash2, ToggleLeft, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { addSuccessfully } from "../data/toast";
import DeleteConfirmToast from "../components/DeleteConfirmToast";
import Table from "../components/Table";

const BgImages = () => {
  // ================= IMAGE CATEGORIES =================
  const imageCategories = [
    { value: "about", label: "About" },
    { value: "clients", label: "Our Clients" },
    { value: "career", label: "Career" },
    { value: "blogs", label: "Blogs" },
    { value: "contact", label: "Contact Us" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(imageCategories[0]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [viewData, setViewData] = useState(null);

  const [imageData, setImageData] = useState({
    category: selectedCategory.value,
    title: "",
    paragraph: "",
    image: null,
    status: "Inactive",
  });

  const [editId, setEditId] = useState(null);

  // ================= LOAD IMAGES FROM LOCALSTORAGE =================
  const loadImages = () => {
    return JSON.parse(localStorage.getItem("bgImages")) || [];
  };

  const [images, setImages] = useState(loadImages);

  // ================= TABLE COLUMNS =================
  const columns = [
    {
      key: "category",
      label: "Category",
      render: (row) => (
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 capitalize">
          {imageCategories.find(c => c.value === row.category)?.label || row.category}
        </span>
      ),
    },
    {
      key: "title",
      label: "Title",
      render: (row) => (
        <div className="max-w-xs truncate">
          {row.title || "—"}
        </div>
      ),
    },
    {
      key: "image",
      label: "Image",
      render: (row) => (
        <div className="w-12 h-12 rounded-lg overflow-hidden border">
          {row.image ? (
            <img
              src={row.image}
              alt={row.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800";
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-400">
              No img
            </div>
          )}
        </div>
      ),
    },
    {
      key: "paragraph",
      label: "Paragraph",
      render: (row) => (
        <div className="max-w-xs text-xs text-gray-600 line-clamp-2">
          {row.paragraph || "— "}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${row.status === "Active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
            }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  // ================= INPUT HANDLER =================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setImageData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= IMAGE HANDLER =================
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageData((prev) => ({
        ...prev,
        image: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  // ================= CATEGORY CHANGE =================
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setImageData({
      category: category.value,
      title: "",
      paragraph: "",
      image: null,
      status: "Inactive",
    });
    setShowCategoryDropdown(false);
    setShowDetailForm(false);
    setEditId(null);
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem("bgImages")) || [];

    const dataToSave = {
      id: editId || Date.now(),
      category: selectedCategory.value,
      title: imageData.title,
      paragraph: imageData.paragraph,
      image: imageData.image,
      status: imageData.status,
    };

    if (editId) {
      const updated = existing.map((item) =>
        item.id === editId ? dataToSave : item
      );
      localStorage.setItem("bgImages", JSON.stringify(updated));
      setImages(updated);
      toast.success("Image updated successfully!");
    } else {
      const updated = [dataToSave, ...existing];
      localStorage.setItem("bgImages", JSON.stringify(updated));
      setImages(updated);
      addSuccessfully();
    }

    // Reset form
    setImageData({
      category: selectedCategory.value,
      title: "",
      paragraph: "",
      image: null,
      status: "Inactive",
    });

    setEditId(null);
    setShowDetailForm(false);
  };

  // ================= EDIT =================
  const editImage = (img) => {
    const category = imageCategories.find((c) => c.value === img.category);
    if (category) {
      setSelectedCategory(category);
      setImageData({
        category: img.category,
        title: img.title || "",
        paragraph: img.paragraph || "",
        image: img.image || null,
        status: img.status || "Inactive",
      });
      setEditId(img.id);
      setShowDetailForm(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ================= TOGGLE STATUS =================
  const toggleStatus = (id) => {
    const updated = images.map((item) =>
      item.id === id
        ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" }
        : item
    );
    localStorage.setItem("bgImages", JSON.stringify(updated));
    setImages(updated);
  };

  // ================= DELETE =================
  const deleteImage = (id) => {
    toast(
      <DeleteConfirmToast
        onDelete={() => {
          const updated = images.filter((item) => item.id !== id);
          localStorage.setItem("bgImages", JSON.stringify(updated));
          setImages(updated);
        }}
      />,
      { autoClose: false }
    );
  };

  const ViewImageModal = ({ data, onClose }) => {
    if (!data) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-5 relative animate-fadeIn">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          >
            ✕
          </button>

          {/* Image */}
          {data.image && (
            <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 capitalize">
              {data.category}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded ${data.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
                }`}
            >
              {data.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {data.title || "Untitled"}
          </h3>

          {/* Paragraph */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {data.paragraph || "No description available."}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white shadow-md p-4 md:p-8 mt-6">
        <div className="w-full">
          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-amber-600 mb-1 uppercase">
              {editId ? "Update Image" : "Add Image"}
            </h1>
            <p className="text-gray-500 text-lg">Manage your background images</p>
          </div>

          {/* FORM */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 md:p-6 mb-6">
            {/* ROW 1: Image | Status | Category Dropdown | Add Button — all same size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
              {/* IMAGE UPLOAD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                {imageData.image ? (
                  <div className="relative w-full h-[42px] rounded-md overflow-hidden border border-gray-300">
                    <img
                      src={imageData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImageData((prev) => ({ ...prev, image: null }))
                      }
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <span className="text-white text-xs font-bold">✕ Remove</span>
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center h-[42px] bg-blue-600 text-white text-sm px-4 rounded-md cursor-pointer hover:bg-blue-700 transition">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* STATUS DROPDOWN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={imageData.status}
                  onChange={handleInputChange}
                  className="w-full h-[42px] px-3 rounded-md border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                >
                  <option value="Inactive">Inactive</option>
                  <option value="Active">Active</option>
                </select>
              </div>

              {/* CATEGORY SELECTOR */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full h-[42px] px-3 rounded-md border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="truncate">{selectedCategory.label}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </button>

                {/* Dropdown Menu */}
                {showCategoryDropdown && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {imageCategories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => handleCategoryChange(cat)}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 transition ${selectedCategory.value === cat.value
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "text-gray-700"
                          }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ADD/UPDATE BUTTON */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 opacity-0 pointer-events-none">
                  Action
                </label>
                <button
                  type="button"
                  onClick={() => setShowDetailForm(!showDetailForm)}
                  className="w-full h-[42px] bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold px-4 rounded-md hover:from-amber-600 hover:to-amber-700 transition shadow-sm text-sm"
                >
                  {showDetailForm
                    ? "Hide Details"
                    : editId
                      ? `Update ${selectedCategory.label}`
                      : `Add ${selectedCategory.label}`}
                </button>
              </div>
            </div>

            {/* DETAIL FORM (toggleable) */}
            {showDetailForm && (
              <form onSubmit={handleSubmit} className="border-t border-gray-200 pt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  {/* TITLE */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={imageData.title}
                      onChange={handleInputChange}
                      placeholder="Enter title"
                      className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm"
                    />
                  </div>

                  {/* PARAGRAPH - Full width on second row */}
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">
                      Paragraph
                    </label>
                    <textarea
                      name="paragraph"
                      value={imageData.paragraph}
                      onChange={handleInputChange}
                      placeholder="Enter paragraph or description....."
                      rows={4}
                      className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white font-semibold py-2.5 rounded-md hover:bg-blue-700 transition shadow-sm text-sm"
                  >
                    {editId ? "Update Image" : "Add Image"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDetailForm(false);
                      setEditId(null);
                      setImageData({
                        category: selectedCategory.value,
                        title: "",
                        paragraph: "",
                        image: null,
                        status: "Inactive",
                      });
                    }}
                    className="px-6 bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-md hover:bg-gray-300 transition text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ================= TABLE ================= */}
          <div className="bg-gradient-to-br from-white to-indigo-50 rounded-lg shadow-sm overflow-hidden border border-indigo-100">
            {/* Desktop Table */}

            <div className="hidden lg:block overflow-x-auto">
              <Table
                columns={columns}
                data={images}
                onEdit={(row) => editImage(row)}
                onDelete={(row) => deleteImage(row.id)}
                onView={(row) => setViewData(row)}
              />
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden p-4">
              <div className="space-y-4">
                {images.length === 0 && (
                  <p className="text-center text-gray-400 text-sm py-6">
                    No images added yet.
                  </p>
                )}

                {images.map((img) => (
                  <div
                    key={img.id}
                    className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-4 border-2 border-purple-100 shadow-md"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-purple-200 flex-shrink-0">
                          {img.image ? (
                            <img
                              src={img.image}
                              alt={img.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src =
                                  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-400">
                              No img
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="inline-block px-2 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800 capitalize mb-1">
                            {imageCategories.find(c => c.value === img.category)?.label || img.category}
                          </span>
                          <h4 className="font-bold text-gray-800 text-sm">
                            {img.title || "Untitled"}
                          </h4>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${img.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}
                      >
                        {img.status}
                      </span>
                    </div>

                    {img.paragraph && (
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {img.paragraph}
                      </p>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleStatus(img.id)}
                        className="flex-1 py-2 bg-purple-100 text-purple-600 rounded-lg font-semibold text-sm hover:bg-purple-200 transition-all flex items-center justify-center"
                      >
                        <ToggleLeft className="w-4 h-4 mr-1" />
                        Toggle
                      </button>
                      <button
                        onClick={() => editImage(img)}
                        className="flex-1 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-200 transition-all flex items-center justify-center"
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteImage(img.id)}
                        className="flex-1 py-2 bg-red-100 text-red-600 rounded-lg font-semibold text-sm hover:bg-red-200 transition-all flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewData && (
        <ViewImageModal
          data={viewData}
          onClose={() => setViewData(null)}
        />
      )}

    </>
  );
};

export default BgImages;

// import { useState, useEffect } from "react";
// import { Pencil, Trash2, ToggleLeft, ChevronDown } from "lucide-react";
// import { toast } from "react-toastify";
// import { addSuccessfully } from "../data/toast";
// import DeleteConfirmToast from "../components/DeleteConfirmToast";
// import Table from "../components/Table";

// const BgImages = () => {
//   // ================= IMAGE CATEGORIES =================
//   const imageCategories = [
//     { value: "home", label: "Home Page", fields: ["title", "subtitle", "image"] },
//     { value: "about", label: "About Us", fields: ["title", "subtitle", "description", "image"] },
//     { value: "career", label: "Career Section", fields: ["title", "position", "department", "image"] },
//     { value: "services", label: "Services", fields: ["title", "serviceName", "description", "image"] },
//     { value: "contact", label: "Contact Page", fields: ["title", "location", "email", "image"] },
//     { value: "testimonials", label: "Testimonials", fields: ["title", "clientName", "designation", "image"] },
//     { value: "portfolio", label: "Portfolio Gallery", fields: ["title", "projectName", "category", "image"] },
//     { value: "team", label: "Team Members", fields: ["title", "memberName", "role", "image"] },
//   ];

//   const [selectedCategory, setSelectedCategory] = useState(imageCategories[0]);
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//   const [showDetailForm, setShowDetailForm] = useState(false);

//   const [imageData, setImageData] = useState({
//     category: selectedCategory.value,
//     title: "",
//     subtitle: "",
//     description: "",
//     position: "",
//     department: "",
//     serviceName: "",
//     location: "",
//     email: "",
//     clientName: "",
//     designation: "",
//     projectName: "",
//     categoryField: "",
//     memberName: "",
//     role: "",
//     image: null,
//     status: "Inactive",
//   });

//   const [editId, setEditId] = useState(null);

//   // ================= LOAD IMAGES FROM LOCALSTORAGE =================
//   const loadImages = () => {
//     return JSON.parse(localStorage.getItem("bgImages")) || [];
//   };

//   const [images, setImages] = useState(loadImages);

//   // ================= TABLE COLUMNS =================
//   const columns = [
//     {
//       key: "category",
//       label: "Category",
//       render: (row) => (
//         <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 capitalize">
//           {row.category}
//         </span>
//       ),
//     },
//     {
//       key: "title",
//       label: "Title",
//     },
//     {
//       key: "image",
//       label: "Image",
//       render: (row) => (
//         <div className="w-12 h-12 rounded-lg overflow-hidden border">
//           <img
//             src={row.image}
//             alt={row.title}
//             className="w-full h-full object-cover"
//             onError={(e) => {
//               e.target.src =
//                 "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800";
//             }}
//           />
//         </div>
//       ),
//     },
//     {
//       key: "details",
//       label: "Details",
//       render: (row) => {
//         const cat = imageCategories.find((c) => c.value === row.category);
//         const extraFields = cat?.fields.filter((f) => f !== "title" && f !== "image") || [];
//         return (
//           <div className="text-xs text-gray-600">
//             {extraFields.map((field) => row[field]).filter(Boolean).join(" • ") || "—"}
//           </div>
//         );
//       },
//     },
//     {
//       key: "status",
//       label: "Status",
//       render: (row) => (
//         <span
//           className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//             row.status === "Active"
//               ? "bg-green-100 text-green-800"
//               : "bg-red-100 text-red-800"
//           }`}
//         >
//           {row.status}
//         </span>
//       ),
//     },
//   ];

//   // ================= INPUT HANDLER =================
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setImageData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // ================= IMAGE HANDLER =================
//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageData((prev) => ({
//         ...prev,
//         image: URL.createObjectURL(e.target.files[0]),
//       }));
//     }
//   };

//   // ================= CATEGORY CHANGE =================
//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     setImageData({
//       category: category.value,
//       title: "",
//       subtitle: "",
//       description: "",
//       position: "",
//       department: "",
//       serviceName: "",
//       location: "",
//       email: "",
//       clientName: "",
//       designation: "",
//       projectName: "",
//       categoryField: "",
//       memberName: "",
//       role: "",
//       image: null,
//       status: "Inactive",
//     });
//     setShowCategoryDropdown(false);
//     setShowDetailForm(false);
//     setEditId(null);
//   };

//   // ================= SUBMIT =================
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const existing = JSON.parse(localStorage.getItem("bgImages")) || [];

//     // Only save fields relevant to selected category
//     const relevantData = {
//       id: editId || Date.now(),
//       category: selectedCategory.value,
//       status: imageData.status,
//     };

//     selectedCategory.fields.forEach((field) => {
//       if (field === "category") {
//         relevantData["categoryField"] = imageData.categoryField;
//       } else {
//         relevantData[field] = imageData[field];
//       }
//     });

//     if (editId) {
//       const updated = existing.map((item) =>
//         item.id === editId ? relevantData : item
//       );
//       localStorage.setItem("bgImages", JSON.stringify(updated));
//       setImages(updated);
//       toast.success("Image updated successfully!");
//     } else {
//       const updated = [relevantData, ...existing];
//       localStorage.setItem("bgImages", JSON.stringify(updated));
//       setImages(updated);
//       addSuccessfully();
//     }

//     // Reset form
//     setImageData({
//       category: selectedCategory.value,
//       title: "",
//       subtitle: "",
//       description: "",
//       position: "",
//       department: "",
//       serviceName: "",
//       location: "",
//       email: "",
//       clientName: "",
//       designation: "",
//       projectName: "",
//       categoryField: "",
//       memberName: "",
//       role: "",
//       image: null,
//       status: "Inactive",
//     });

//     setEditId(null);
//     setShowDetailForm(false);
//   };

//   // ================= EDIT =================
//   const editImage = (img) => {
//     const category = imageCategories.find((c) => c.value === img.category);
//     if (category) {
//       setSelectedCategory(category);
//       setImageData({ ...imageData, ...img });
//       setEditId(img.id);
//       setShowDetailForm(true);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   // ================= TOGGLE STATUS =================
//   const toggleStatus = (id) => {
//     const updated = images.map((item) =>
//       item.id === id
//         ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" }
//         : item
//     );
//     localStorage.setItem("bgImages", JSON.stringify(updated));
//     setImages(updated);
//   };

//   // ================= DELETE =================
//   const deleteImage = (id) => {
//     toast(
//       <DeleteConfirmToast
//         onDelete={() => {
//           const updated = images.filter((item) => item.id !== id);
//           localStorage.setItem("bgImages", JSON.stringify(updated));
//           setImages(updated);
//         }}
//       />,
//       { autoClose: false }
//     );
//   };

//   // ================= RENDER DYNAMIC FIELDS =================
//   const renderDynamicFields = () => {
//     const fields = selectedCategory.fields.filter((f) => f !== "image");

//     return fields.map((field) => {
//       const labels = {
//         title: "Title",
//         subtitle: "Sub Title",
//         description: "Description",
//         position: "Position",
//         department: "Department",
//         serviceName: "Service Name",
//         location: "Location",
//         email: "Email",
//         clientName: "Client Name",
//         designation: "Designation",
//         projectName: "Project Name",
//         category: "Category",
//         memberName: "Member Name",
//         role: "Role",
//       };

//       const placeholders = {
//         title: "Enter title",
//         subtitle: "Enter sub title",
//         description: "Enter description",
//         position: "e.g. Senior Developer",
//         department: "e.g. Engineering",
//         serviceName: "e.g. Web Development",
//         location: "e.g. New York, USA",
//         email: "contact@example.com",
//         clientName: "Enter client name",
//         designation: "e.g. CEO",
//         projectName: "Enter project name",
//         category: "e.g. Residential",
//         memberName: "Enter member name",
//         role: "e.g. Team Lead",
//       };

//       const fieldName = field === "category" ? "categoryField" : field;

//       return (
//         <div key={field}>
//           <label className="text-sm font-medium text-gray-700">
//             {labels[field]} <span className="text-red-500">*</span>
//           </label>
//           {field === "description" ? (
//             <textarea
//               name={fieldName}
//               value={imageData[fieldName] || ""}
//               onChange={handleInputChange}
//               placeholder={placeholders[field]}
//               rows={3}
//               className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm resize-none"
//               required
//             />
//           ) : (
//             <input
//               type={field === "email" ? "email" : "text"}
//               name={fieldName}
//               value={imageData[fieldName] || ""}
//               onChange={handleInputChange}
//               placeholder={placeholders[field]}
//               className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm"
//               required
//             />
//           )}
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="bg-white shadow-md p-4 md:p-8 mt-6">
//       <div className="w-full">
//         {/* HEADER */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-amber-600 mb-1 uppercase">
//             {editId ? "Update Image" : "Add Image"}
//           </h1>
//           <p className="text-gray-500 text-sm">Manage your background images</p>
//         </div>

//         {/* FORM */}
//         <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 md:p-6 mb-6">
//           {/* ROW 1: Image | Status | Category Dropdown | Add Button — all same size */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
//             {/* IMAGE UPLOAD */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Image <span className="text-red-500">*</span>
//               </label>
//               {imageData.image ? (
//                 <div className="relative w-full h-[42px] rounded-md overflow-hidden border border-gray-300">
//                   <img
//                     src={imageData.image}
//                     alt="Preview"
//                     className="w-full h-full object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setImageData((prev) => ({ ...prev, image: null }))
//                     }
//                     className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
//                   >
//                     <span className="text-white text-xs font-bold">✕ Remove</span>
//                   </button>
//                 </div>
//               ) : (
//                 <label className="flex items-center justify-center h-[42px] bg-blue-600 text-white text-sm px-4 rounded-md cursor-pointer hover:bg-blue-700 transition">
//                   Upload Image
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="hidden"
//                   />
//                 </label>
//               )}
//             </div>

//             {/* STATUS DROPDOWN */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Status
//               </label>
//               <select
//                 name="status"
//                 value={imageData.status}
//                 onChange={handleInputChange}
//                 className="w-full h-[42px] px-3 rounded-md border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
//               >
//                 <option value="Inactive">Inactive</option>
//                 <option value="Active">Active</option>
//               </select>
//             </div>

//             {/* CATEGORY SELECTOR */}
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Category
//               </label>
//               <button
//                 type="button"
//                 onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
//                 className="w-full h-[42px] px-3 rounded-md border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 flex items-center justify-between hover:bg-gray-50 transition"
//               >
//                 <span className="truncate">{selectedCategory.label}</span>
//                 <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
//               </button>

//               {/* Dropdown Menu */}
//               {showCategoryDropdown && (
//                 <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
//                   {imageCategories.map((cat) => (
//                     <button
//                       key={cat.value}
//                       type="button"
//                       onClick={() => handleCategoryChange(cat)}
//                       className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 transition ${
//                         selectedCategory.value === cat.value
//                           ? "bg-blue-100 text-blue-700 font-medium"
//                           : "text-gray-700"
//                       }`}
//                     >
//                       {cat.label}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* ADD/UPDATE BUTTON */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1 opacity-0 pointer-events-none">
//                 Action
//               </label>
//               <button
//                 type="button"
//                 onClick={() => setShowDetailForm(!showDetailForm)}
//                 className="w-full h-[42px] bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold px-4 rounded-md hover:from-amber-600 hover:to-amber-700 transition shadow-sm text-sm"
//               >
//                 {showDetailForm
//                   ? "Hide Details"
//                   : editId
//                   ? `Update ${selectedCategory.label}`
//                   : `Add ${selectedCategory.label}`}
//               </button>
//             </div>
//           </div>

//           {/* DETAIL FORM (toggleable) */}
//           {showDetailForm && (
//             <form onSubmit={handleSubmit} className="border-t border-gray-200 pt-5">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
//                 {renderDynamicFields()}
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   type="submit"
//                   className="flex-1 bg-blue-600 text-white font-semibold py-2.5 rounded-md hover:bg-blue-700 transition shadow-sm text-sm"
//                 >
//                   {editId ? "Update Image" : "Add Image"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowDetailForm(false);
//                     setEditId(null);
//                     setImageData({
//                       category: selectedCategory.value,
//                       title: "",
//                       subtitle: "",
//                       description: "",
//                       position: "",
//                       department: "",
//                       serviceName: "",
//                       location: "",
//                       email: "",
//                       clientName: "",
//                       designation: "",
//                       projectName: "",
//                       categoryField: "",
//                       memberName: "",
//                       role: "",
//                       image: null,
//                       status: "Inactive",
//                     });
//                   }}
//                   className="px-6 bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-md hover:bg-gray-300 transition text-sm"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>

//         {/* ================= TABLE ================= */}
//         <div className="bg-gradient-to-br from-white to-indigo-50 rounded-lg shadow-sm overflow-hidden border border-indigo-100">
//           {/* Desktop Table */}
//           <div className="hidden lg:block overflow-x-auto">
//             <Table
//               columns={columns}
//               data={images}
//               onEdit={(row) => editImage(row)}
//               onDelete={(row) => deleteImage(row.id)}
//             />
//           </div>

//           {/* Mobile Cards */}
//           <div className="lg:hidden p-4">
//             <div className="space-y-4">
//               {images.length === 0 && (
//                 <p className="text-center text-gray-400 text-sm py-6">
//                   No images added yet.
//                 </p>
//               )}

//               {images.map((img) => (
//                 <div
//                   key={img.id}
//                   className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-4 border-2 border-purple-100 shadow-md"
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex items-center gap-3">
//                       <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-purple-200 flex-shrink-0">
//                         <img
//                           src={img.image}
//                           alt={img.title}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.src =
//                               "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800";
//                           }}
//                         />
//                       </div>
//                       <div>
//                         <span className="inline-block px-2 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800 capitalize mb-1">
//                           {img.category}
//                         </span>
//                         <h4 className="font-bold text-gray-800 text-sm">
//                           {img.title}
//                         </h4>
//                       </div>
//                     </div>
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         img.status === "Active"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {img.status}
//                     </span>
//                   </div>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => toggleStatus(img.id)}
//                       className="flex-1 py-2 bg-purple-100 text-purple-600 rounded-lg font-semibold text-sm hover:bg-purple-200 transition-all flex items-center justify-center"
//                     >
//                       <ToggleLeft className="w-4 h-4 mr-1" />
//                       Toggle
//                     </button>
//                     <button
//                       onClick={() => editImage(img)}
//                       className="flex-1 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-200 transition-all flex items-center justify-center"
//                     >
//                       <Pencil className="w-4 h-4 mr-1" />
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => deleteImage(img.id)}
//                       className="flex-1 py-2 bg-red-100 text-red-600 rounded-lg font-semibold text-sm hover:bg-red-200 transition-all flex items-center justify-center"
//                     >
//                       <Trash2 className="w-4 h-4 mr-1" />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BgImages;
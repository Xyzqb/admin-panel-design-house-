import { useState, useEffect } from "react";
import { List } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddBlogs = () => {
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    image: null,
    status: "Inactive",
  });

  const [editId, setEditId] = useState(null);

  // ================= INPUT HANDLER =================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= IMAGE HANDLER =================
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBlogData((prev) => ({
        ...prev,
        image: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem("blogs")) || [];

    if (editId) {
      const updated = existing.map((item) =>
        item.id === editId ? { ...blogData, id: editId } : item
      );
      localStorage.setItem("blogs", JSON.stringify(updated));
    } else {
      const newBlog = {
        ...blogData,
        id: Date.now(),
      };
      localStorage.setItem(
        "blogs",
        JSON.stringify([newBlog, ...existing])
      );
    }

    setBlogData({
      title: "",
      slug: "",
      subtitle: "",
      image: null,
      status: "Inactive",
    });

    setEditId(null);
    alert(editId ? "Blog updated successfully!" : "Blog added successfully!");
    navigate("/blogs-list");
  };

  // ================= EDIT MODE =================
  useEffect(() => {
    const editBlog = JSON.parse(localStorage.getItem("editBlog"));

    if (editBlog) {
      setBlogData(editBlog);
      setEditId(editBlog.id);
      localStorage.removeItem("editBlog");
    }
  }, []);

  return (
    <div className="bg-white shadow-md p-4 md:p-8 mt-6">
      <div className="w-full">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-amber-600 mb-2">
              {editId ? "Update Blog" : "Add Blog"}
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your blog details
            </p>
          </div>

          <button
            onClick={() => navigate("/blogs-list")}
            className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-sm hover:bg-gray-900"
          >
            <List className="w-5 h-5" />
            Blogs List
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-sm shadow-sm border border-gray-200 p-6 md:p-8 space-y-6"
        >
          {/* ROW 1 */}
          <div className="grid md:grid-cols-3 gap-5">
            {/* BLOG TITLE */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleInputChange}
                placeholder="Enter blog title"
                className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300"
                required
              />
            </div>

            {/* SLUG */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="slug"
                value={blogData.slug}
                onChange={handleInputChange}
                placeholder="blog-title-slug"
                className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300"
                required
              />
            </div>

            {/* SUBTITLE */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Blog Subtitle
              </label>
              <input
                type="text"
                name="subtitle"
                value={blogData.subtitle}
                onChange={handleInputChange}
                placeholder="Short description"
                className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300"
              />
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Blog Image <span className="text-red-500">*</span>
            </label>

            <div className="mt-2 border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              {blogData.image ? (
                <div className="relative">
                  <img
                    src={blogData.image}
                    alt="preview"
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setBlogData((prev) => ({ ...prev, image: null }))
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer text-blue-600 font-semibold">
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
          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={blogData.status}
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300"
            >
              <option value="Inactive">Inactive</option>
              <option value="Active">Active</option>
            </select>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700"
          >
            {editId ? "Update Blog" : "Add Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;

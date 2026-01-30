import { useState, useEffect, useRef } from "react";
import { List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addSuccessfully } from "../../data/toast";

const AddBlogs = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [blogData, setBlogData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    image: null,
    status: "Inactive",
    content: "",
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

  // ================= TEXT EDITOR COMMANDS =================
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleEditorInput = () => {
    setBlogData((prev) => ({
      ...prev,
      content: editorRef.current?.innerHTML || "",
    }));
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

      showSuccess("Blog updated successfully ✨");
    } else {
      const newBlog = {
        ...blogData,
        id: Date.now(),
      };
      localStorage.setItem("blogs", JSON.stringify([newBlog, ...existing]));

      addSuccessfully(); // ✅ using your custom toast
    }

    setBlogData({
      title: "",
      slug: "",
      subtitle: "",
      image: null,
      status: "Inactive",
      content: "",
    });

    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }

    setEditId(null);

    navigate("/blogs-list");
  };

  // ================= EDIT MODE =================
  useEffect(() => {
    const editBlog = JSON.parse(localStorage.getItem("editBlog"));

    if (editBlog) {
      setBlogData(editBlog);
      setEditId(editBlog.id);
      if (editorRef.current && editBlog.content) {
        editorRef.current.innerHTML = editBlog.content;
      }
      localStorage.removeItem("editBlog");
    }
  }, []);

  return (
    <div className="bg-white shadow-md p-4 md:p-8 mt-6">
      <div className="w-full">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-amber-600 mb-2 uppercase">
              {editId ? "Update Blog" : "Add Blog"}
            </h1>
            <p className="text-gray-600 text-lg">Manage your blog details</p>
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

          {/* ROW 2: IMAGE AND STATUS */}
          {/* ROW 2: IMAGE AND STATUS */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* IMAGE */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Blog Image <span className="text-red-500">*</span>
              </label>

              <div className="mt-1 h-[42px] flex items-center justify-center border border-dashed border-gray-300 rounded-md bg-gray-50">
                {blogData.image ? (
                  <div className="relative w-full h-full">
                    <img
                      src={blogData.image}
                      alt="preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setBlogData((prev) => ({ ...prev, image: null }))
                      }
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer text-blue-600 font-medium text-sm">
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
                className="mt-1 w-full h-[42px] px-3 rounded-md border border-gray-300 bg-white"
              >
                <option value="Inactive">Inactive</option>
                <option value="Active">Active</option>
              </select>
            </div>
          </div>

          {/* TEXT EDITOR */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Blog Content <span className="text-red-500">*</span>
            </label>

            {/* EDITOR TOOLBAR */}
            <div className="border border-gray-300 rounded-t-md bg-gray-50 p-2 flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => execCommand("bold")}
                className="px-3 py-1 border border-gray-300 bg-white rounded hover:bg-gray-100 font-bold"
                title="Bold"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => execCommand("italic")}
                className="px-3 py-1 border border-gray-300 bg-white rounded hover:bg-gray-100 italic"
                title="Italic"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => execCommand("underline")}
                className="px-3 py-1 border border-gray-300 bg-white rounded hover:bg-gray-100 underline"
                title="Underline"
              >
                U
              </button>
              <div className="w-px bg-gray-300 mx-1"></div>
              <button
                type="button"
                onClick={() => execCommand("justifyLeft")}
                className="px-3 py-1 border border-gray-300 bg-white rounded hover:bg-gray-100"
                title="Align Left"
              >
                ≡
              </button>
              <button
                type="button"
                onClick={() => execCommand("justifyCenter")}
                className="px-3 py-1 border border-gray-300 bg-white rounded hover:bg-gray-100"
                title="Align Center"
              >
                ≡
              </button>
              <button
                type="button"
                onClick={() => execCommand("justifyRight")}
                className="px-3 py-1 border border-gray-300 bg-white rounded hover:bg-gray-100"
                title="Align Right"
              >
                ≡
              </button>
              <div className="w-px bg-gray-300 mx-1"></div>
              <button
                type="button"
                onClick={() => execCommand("insertUnorderedList")}
                className="px-3 py-1 border border-gray-300 bg-white rounded hover:bg-gray-100"
                title="Bullet List"
              >
                • List
              </button>
              <button
                type="button"
                onClick={() => execCommand("insertOrderedList")}
                className="px-3 py-1 border border-gray-300 bg-white rounded hover:bg-gray-100"
                title="Numbered List"
              >
                1. List
              </button>
              <div className="w-px bg-gray-300 mx-1"></div>
              <select
                onChange={(e) => execCommand("formatBlock", e.target.value)}
                className="px-2 py-1 border border-gray-300 bg-white rounded hover:bg-gray-100"
                defaultValue=""
              >
                <option value="">Normal</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="h4">Heading 4</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  const url = prompt("Enter URL:");
                  if (url) execCommand("createLink", url);
                }}
                className="px-3 py-1 border border-gray-300 bg-white rounded hover:bg-gray-100"
                title="Insert Link"
              >
                🔗
              </button>
            </div>

            {/* EDITOR CONTENT AREA */}
            <div
              ref={editorRef}
              contentEditable
              onInput={handleEditorInput}
              className="min-h-[300px] p-4 border border-t-0 border-gray-300 rounded-b-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ whiteSpace: "pre-wrap" }}
            ></div>
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { Plus } from "lucide-react";
import { SearchBar } from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import { toast } from "react-toastify";
import DeleteConfirmToast from "../../components/DeleteConfirmToast";


const BlogsList = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  // LOAD BLOGS
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(storedBlogs);
  }, []);

  // DELETE (NO ALERT / NO TOAST)
  // ACTUAL DELETE
  const confirmDelete = (id) => {
    const updated = blogs.filter((blog) => blog.id !== id);
    localStorage.setItem("blogs", JSON.stringify(updated));
    setBlogs(updated);
    toast.success("Blog deleted successfully");
  };

  // OPEN CONFIRM TOAST
  const handleDelete = (row) => {
    toast(
      <DeleteConfirmToast onDelete={() => confirmDelete(row.id)} />,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  // EDIT
  const handleEdit = (row) => {
    localStorage.setItem("editBlog", JSON.stringify(row));
    navigate("/add-blogs");
  };

  // FILTER
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    blog.slug.toLowerCase().includes(searchValue.toLowerCase()) ||
    (blog.subtitle || "").toLowerCase().includes(searchValue.toLowerCase())
  );

  // PAGINATION LOGIC
  const totalItems = filteredBlogs.length;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedBlogs =
    rowsPerPage === blogs.length
      ? filteredBlogs
      : filteredBlogs.slice(startIndex, startIndex + rowsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, rowsPerPage]);

  // TABLE COLUMNS
  const columns = [
    { key: "title", label: "Blog Title" },
    { key: "slug", label: "Slug" },
    {
      key: "subtitle",
      label: "Subtitle",
      render: (row) => (
        <span className="text-gray-600">{row.subtitle || "-"}</span>
      ),
    },
    {
      key: "content",
      label: "Content",
      render: (row) => (
        <div
          className="text-gray-600 text-sm max-w-xs truncate"
          title="Click edit to view full content"
          dangerouslySetInnerHTML={{
            __html: row.content
              ? row.content.replace(/<[^>]+>/g, "").slice(0, 80) + "..."
              : "-"
          }}
        />
      )
    },
    {
      key: "image",
      label: "Image",
      render: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt="blog"
            className="w-14 h-10 object-cover rounded border"
          />
        ) : (
          <span className="text-gray-400">N/A</span>
        ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
            }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white shadow-md p-6 mt-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-amber-600 uppercase">
          Blogs List
        </h1>

        <button
          onClick={() => navigate("/add-blogs")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Blog
        </button>
      </div>

      {/* SEARCH BAR */}
      <SearchBar
        rowsPerPage={rowsPerPage}
        totalItems={filteredBlogs.length}
        onRowsPerPageChange={setRowsPerPage}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search blogs..."
      />

      {/* TABLE */}
      <Table
        columns={columns}
        data={paginatedBlogs}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* PAGINATION */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalItems={filteredBlogs.length}
          itemsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
          label="blogs"
        />
      </div>
    </div>
  );
};

export default BlogsList;

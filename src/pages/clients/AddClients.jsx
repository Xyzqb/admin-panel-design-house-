import { useState, useEffect } from "react";
import { List } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddClients = () => {
  const navigate = useNavigate();

  const [galleryData, setGalleryData] = useState({
    name: "",
    position: "",
    organisation: "",
    url: "",
    image: null,
    status: "Inactive",
  });


  const [editId, setEditId] = useState(null);

  // ================= INPUT HANDLER =================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGalleryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= IMAGE HANDLER =================
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setGalleryData((prev) => ({
        ...prev,
        image: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem("testimonials")) || [];

    if (editId) {
      const updated = existing.map(item =>
        item.id === editId ? { ...galleryData, id: editId } : item
      );
      localStorage.setItem("testimonials", JSON.stringify(updated));
      setEditId(null);
    } else {
      const newTestimonial = {
        ...galleryData,
        id: Date.now(),
      };
      localStorage.setItem(
        "testimonials",
        JSON.stringify([newTestimonial, ...existing])
      );
    }

    setGalleryData({
      name: "",
      position: "",
      organisation: "",
      url: "",
      image: null,
      status: "Inactive",
    });

    alert("Testimonial added successfully!");
  };

  useEffect(() => {
    const editClient = JSON.parse(localStorage.getItem("editClient"));

    if (editClient) {
      setGalleryData(editClient);     
      setEditId(editClient.id);       
      localStorage.removeItem("editClient");
    }
  }, []);


  return (
    <div className="bg-white shadow-md p-4 md:p-8 mt-6 h-[500px]">
      <div className="w-full">
        <header className="mb-6 mx-3">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-amber-600 mb-2 uppercase">
                {editId ? "Update Clients" : "Add Clients"}
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your clients details
              </p>
            </div>

            <button
              onClick={() => navigate("/clients-list")}
              className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-sm hover:bg-gray-900"
            >
              <List className="w-5 h-5" />
              Clients List
            </button>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-sm shadow-sm border border-gray-200 p-6 md:p-8 space-y-6"
          >
            {/* ROW 1 */}
            <div className="grid md:grid-cols-3 gap-5">
              {/* NAME */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Client Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={galleryData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300"
                  required
                />
              </div>

              {/* ORGANISATION */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  url
                </label>
                <input
                  type="url"
                  name="url"
                  value={galleryData.url}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300"
                  required
                />
              </div>
            </div>

            {/* IMAGE */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Image <span className="text-red-500">*</span>
              </label>

              <div className="mt-2 border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                {galleryData.image ? (
                  <div className="relative">
                    <img
                      src={galleryData.image}
                      alt="preview"
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setGalleryData((prev) => ({ ...prev, image: null }))
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
                value={galleryData.status}
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
              {editId ? "Update Clients" : "Add Clients"}
            </button>
          </form>
        </header>
      </div>
    </div>
  );
};
export default AddClients;
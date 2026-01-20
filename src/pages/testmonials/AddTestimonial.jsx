import { useState } from "react";
import { List } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import { addSuccessfully } from "../../data/toast";

const AddTestimonial = () => {

  const [galleryData, setGalleryData] = useState({
    name: "",
    position: "",
    organisation: "",
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
      image: null,
      status: "Inactive",
    });
    addSuccessfully();
  };

  // ================= TOGGLE STATUS =================
  const toggleStatus = (id) => {
    setEvents((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            status: item.status === "Active" ? "Inactive" : "Active",
          }
          : item
      )
    );
  };

  return (
    <div className="bg-white shadow-md p-4 md:p-8 mt-6 h-[500px]">
      <div className="w-full">
        <header className="mb-6 mx-6">
          {/* HEADER */}
          <PageHeader
            title="Add Testimonials"
            description="Manage your testimonials details"
            buttonText="Testimonials List"
            buttonIcon={List}
            buttonPath="/testimonials-list"
          />
           </header>

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
                  Name <span className="text-red-500">*</span>
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

              {/* POSITION */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={galleryData.position}
                  onChange={handleInputChange}
                  placeholder="Enter position"
                  className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300"
                  required
                />
              </div>

              {/* ORGANISATION */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Organisation
                </label>
                <input
                  type="text"
                  name="organisation"
                  value={galleryData.organisation}
                  onChange={handleInputChange}
                  placeholder="Enter name"
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
              {editId ? "Update Testimonial" : "Add Testimonial"}
            </button>
          </form>
      </div>
    </div>
  );
};
export default AddTestimonial;
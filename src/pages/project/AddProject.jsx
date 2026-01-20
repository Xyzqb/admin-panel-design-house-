import { useState } from "react";
import { List } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import { toast } from "react-toastify";
import { addSuccessfully } from "../../data/toast";

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

    const existingProjects =
      JSON.parse(localStorage.getItem("projects")) || [];

    const newProject = {
      id: Date.now(), // unique id
      client: formData.clientName,
      projectName: formData.projectName,
      projectCategory: formData.category,
      photo: previewImage,
      status: formData.status,
    };

    const updatedProjects = [newProject, ...existingProjects];

    localStorage.setItem("projects", JSON.stringify(updatedProjects));

    setTimeout(() => {
      setIsSubmitting(false);
      toast.addSuccessfully();
    }, 800);
  };

  return (
    <div className="bg-white shadow-md mt-6 p-4">
      {/* CENTERED CONTAINER */}
      <div className="w-full">

        {/* HEADER */}
        <PageHeader
          title="Add Projects"
          description="Manage and view all your projects"
          buttonText="Project List"
          buttonIcon={List}
          buttonPath="/projects-list"
        />

        {/* FORM CARD */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="space-y-6">

            {/* Row 1 */}
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
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
                rows="3"
                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Image + Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-2">
                  Upload Image <span className="text-red-500">*</span>
                </label>

                <div className="border border-gray-300 rounded p-4">
                  {previewImage ? (
                    <div className="flex flex-col items-center">
                      <div className="relative mb-3">
                        <img
                          src={previewImage}
                          alt="preview"
                          className="w-32 h-32 object-cover border"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full"
                        >
                          ×
                        </button>
                      </div>
                      <label className="bg-gray-600 text-white px-4 py-2 rounded cursor-pointer text-sm">
                        Change Image
                        <input type="file" className="hidden" onChange={handleImageChange} />
                      </label>
                    </div>
                  ) : (
                    <div className="flex justify-center py-6">
                      <label className="bg-gray-600 text-white px-4 py-2 rounded cursor-pointer text-sm">
                        Select Image
                        <input type="file" className="hidden" onChange={handleImageChange} />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Status + Submit */}
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <div className="mt-6 w-full">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded font-semibold ${isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                      } text-white`}
                  >
                    {isSubmitting ? "Saving..." : "Add Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default AddProject;
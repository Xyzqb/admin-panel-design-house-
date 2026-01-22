import React, { useState } from "react";
import { List } from "lucide-react";
import PageHeader from "../../components/PageHeader";

const AddFacilities = () => {
  const [formData, setFormData] = useState({
    name: "",
    status: "Inactive",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Facility Added Successfully");
  };

  return (
    <div className="bg-white shadow-md mt-6">
      {/* CENTERED CONTAINER */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">

        {/* HEADER */}
        <PageHeader
          title="Add Facilities"
          description="Manage your facility details"
          buttonText="Facilities List"
          buttonIcon={List}
          buttonPath="/facilities-list"
        />

        {/* FORM CARD */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter facility name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* STATUS */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-3">
                Status <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={formData.status === "Active"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-800 font-medium">Active</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={formData.status === "Inactive"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-800 font-medium">Inactive</span>
                </label>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
              >
                Add Facilities
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFacilities;
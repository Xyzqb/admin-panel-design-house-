import React, { useState } from 'react';
import Table from "../components/Table";
import { toast } from 'react-toastify';
import { Plus, X } from 'lucide-react';
import DeleteConfirmToast from "../components/DeleteConfirmToast";

const HomeSlider = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "Test6",
      subtitle: "https://test6",
      status: "Inactive",
      bannerImage: "image1.jpg"
    },
    {
      id: 2,
      title: "Ngt",
      subtitle: "https://ntf",
      status: "Active",
      bannerImage: "image2.jpg"
    },
    {
      id: 3,
      title: "Test3",
      subtitle: "https://test3",
      status: "Active",
      bannerImage: "image3.jpg"
    },
    {
      id: 4,
      title: "Text2",
      subtitle: "https://moksha.com",
      status: "Active",
      bannerImage: "image4.jpg"
    }
  ]);

  const [editMode, setEditMode] = useState(false);
  const [editBannerId, setEditBannerId] = useState(null);
  const [sliderForms, setSliderForms] = useState([
    {
      id: Date.now(),
      title: "",
      subtitle: "",
      status: "Active",
      bannerImage: null
    }
  ]);

  const [showSchedule, setShowSchedule] = useState(false);
  const [schedule, setSchedule] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    notes: ""
  });

  // Add new slider form
  const handleAddSliderForm = () => {
    setSliderForms([
      ...sliderForms,
      {
        id: Date.now(),
        title: "",
        subtitle: "",
        status: "Active",
        bannerImage: null
      }
    ]);
    toast.info('New slider form added!');
  };

  // Remove slider form
  const handleRemoveSliderForm = (formId) => {
    if (sliderForms.length === 1) {
      toast.warning('At least one slider form is required!');
      return;
    }
    setSliderForms(sliderForms.filter(form => form.id !== formId));
    toast.success('Slider form removed!');
  };

  // Handle input change for specific form
  const handleInputChange = (formId, e) => {
    const { name, value, type, files } = e.target;

    setSliderForms(sliderForms.map(form => {
      if (form.id === formId) {
        if (type === 'file') {
          return {
            ...form,
            [name]: files[0]
          };
        } else {
          return {
            ...form,
            [name]: value
          };
        }
      }
      return form;
    }));
  };

  // Add all banners
  const handleAddBanners = () => {
    const form = sliderForms[0];

    if (!form.title.trim()) {
      toast.error("Please enter banner title");
      return;
    }

    if (!editMode && !form.bannerImage) {
      toast.error("Please upload banner image");
      return;
    }

    if (editMode) {
      // UPDATE
      setBanners((prev) =>
        prev.map((banner) =>
          banner.id === editBannerId
            ? {
              ...banner,
              title: form.title,
              subtitle: form.subtitle,
              status: form.status,
            }
            : banner
        )
      );

      toast.success("Banner updated successfully!");
    } else {
      // ADD
      const newBanner = {
        id: Date.now(),
        title: form.title,
        subtitle: form.subtitle,
        status: form.status,
        bannerImage: form.bannerImage?.name || "uploaded-image.jpg",
      };

      setBanners((prev) => [...prev, newBanner]);
      toast.success("Banner added successfully!");
    }

    // RESET
    setEditMode(false);
    setEditBannerId(null);
    setSliderForms([
      {
        id: Date.now(),
        title: "",
        subtitle: "",
        status: "Active",
        bannerImage: null,
      },
    ]);
  };


  // Cancel all forms
  const handleCancelAll = () => {
    setSliderForms([
      {
        id: Date.now(),
        title: "",
        subtitle: "",
        status: "Active",
        bannerImage: null
      }
    ]);
    toast.info('All forms cleared!');
  };

  const handleDeleteBanner = (id) => {
    toast(
      <DeleteConfirmToast
        onDelete={() => {
          setBanners((prev) =>
            prev.filter((banner) => banner.id !== id)
          );
          toast.success("Banner deleted successfully!");
        }}
      />,
      { autoClose: false }
    );
  };

  const handleEditBanner = (row) => {
    setEditMode(true);
    setEditBannerId(row.id);

    setSliderForms([
      {
        id: row.id,
        title: row.title,
        subtitle: row.subtitle,
        status: row.status,
        bannerImage: null,
      },
    ]);

    toast.info("Edit mode enabled");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  const handleScheduleSave = () => {
    if (!schedule.startDate || !schedule.startTime) {
      toast.error("Start date & time are required");
      return;
    }

    console.log("Scheduled Data:", schedule);
    toast.success('Banner scheduled successfully!');
    setShowSchedule(false);
  };

  const columns = [
    {
      key: "id",
      label: "S.No",
    },
    {
      key: "title",
      label: "Banner Title",
    },
    {
      key: "subtitle",
      label: "Subtitle",
      render: (row) => (
        <span className="text-gray-700">
          {row.subtitle}
        </span>
      ),
    },
   {
  key: "bannerImage",
  label: "Banner Image",
  render: (row) => (
    <img
      src={`${row.bannerImage}`}
      alt="banner"
      className="w-10 h-10 object-cover rounded border bg-white"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/placeholder.png";
      }}
    />
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
    <div className="w-full bg-white shadow-md mt-6 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-600 uppercase">Home Slider</h1>

        {/* Add Slider Button */}
        <button
          onClick={handleAddSliderForm}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition shadow-md"
        >
          <Plus size={18} />
          Add Slider
        </button>
      </div>

      {/* Multiple Slider Forms */}
      <div className="space-y-4 mb-6">
        {sliderForms.map((form, index) => (
          <div key={form.id} className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-md font-semibold text-gray-700">
                Slider #{index + 1}
              </h2>

              {sliderForms.length > 1 && (
                <button
                  onClick={() => handleRemoveSliderForm(form.id)}
                  className="p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Banner Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="font-bold">Banner Title</span> *
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={(e) => handleInputChange(form.id, e)}
                  placeholder="Enter banner title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="font-bold">Status</span> *
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={(e) => handleInputChange(form.id, e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="font-bold">Subtitle</span> *
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={form.subtitle}
                  onChange={(e) => handleInputChange(form.id, e)}
                  placeholder="Enter subtitle"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Banner Image */}
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="font-bold">Banner Image</span> *
                </label>
                <input
                  type="file"
                  name="bannerImage"
                  onChange={(e) => handleInputChange(form.id, e)}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {form.bannerImage && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {form.bannerImage.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 mb-6">
        {/* Schedule */}
        <button
          onClick={() => setShowSchedule(true)}
          className="px-6 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition shadow-sm"
        >
          Schedule
        </button>

        {/* Add All Banners */}
        <button
          onClick={handleAddBanners}
          className={`px-6 py-2 rounded-lg text-white font-medium transition shadow-sm ${editMode ? "bg-orange-600 hover:bg-orange-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {editMode ? "Update Banner" : "Add All Banners"}
        </button>

        {/* Cancel */}
        <button
          onClick={handleCancelAll}
          className="px-6 py-2 rounded-lg bg-gray-500 text-white font-medium hover:bg-gray-600 transition shadow-sm"
        >
          Cancel
        </button>
      </div>

      {/* Banner List Section */}
      <div className="overflow-hidden w-full">
        <Table
          columns={columns}
          data={banners}
          onEdit={(row) => handleEditBanner(row)}
          onDelete={(row) => handleDeleteBanner(row.id)}
        />
      </div>

      {/* Schedule Modal */}
      {showSchedule && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg shadow-xl p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              Schedule Banner
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Start Date */}
              <div>
                <label className="text-sm font-medium">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={schedule.startDate}
                  onChange={handleScheduleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="text-sm font-medium">Start Time *</label>
                <input
                  type="time"
                  name="startTime"
                  value={schedule.startTime}
                  onChange={handleScheduleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="text-sm font-medium">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={schedule.endDate}
                  onChange={handleScheduleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="text-sm font-medium">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={schedule.endTime}
                  onChange={handleScheduleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="mt-4">
              <label className="text-sm font-medium">Notes</label>
              <textarea
                name="notes"
                value={schedule.notes}
                onChange={handleScheduleChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Optional notes..."
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowSchedule(false)}
                className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSlider;
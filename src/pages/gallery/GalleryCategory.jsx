import React, { useState } from 'react';
import { Plus, List, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteConfirmToast from "../../components/DeleteConfirmToast";


const GalleryCategory = () => {
  const navigate = useNavigate();
  const [galleryData, setGalleryData] = useState({
    title: '',
    date: '',
    places: '',
    image: null,
    status: 'Inactive'
  });

  const [events, setEvents] = useState([
    { id: 1, title: '123', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&h=600&fit=crop', date: '13123', status: 'Active' },
    { id: 2, title: 'Z', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop', date: 'Z', status: 'Inactive' },
    { id: 3, title: 'Shop in Shop', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop', date: '15-May-2023', status: 'Active' },
    { id: 4, title: 'Space Saving Furniture', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', date: '20-Jun-2023', status: 'Active' },
    { id: 5, title: 'Sofas', image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&h=600&fit=crop', date: '10-Jul-2023', status: 'Active' },
    { id: 6, title: 'Modular LCD Units', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop', date: '25-Aug-2023', status: 'Active' },
    { id: 7, title: 'Modular Kitchens', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=600&fit=crop', date: '05-Sep-2023', status: 'Active' },
    { id: 8, title: 'Modular Wardrobes', image: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=800&h=600&fit=crop', date: '12-Oct-2023', status: 'Active' },
  ]);

  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGalleryData({
      ...galleryData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setGalleryData({
        ...galleryData,
        image: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setEvents(events.map(ev =>
        ev.id === editId ? { ...galleryData, id: editId } : ev
      ));
      setEditId(null);
    } else {
      setEvents([
        {
          ...galleryData,
          id: Date.now()
        },
        ...events
      ]);
    }

    setGalleryData({
      title: '',
      date: '',
      places: '',
      image: null,
      status: 'Inactive'
    });
  };

  const editEvent = (event) => {
    setGalleryData(event);
    setEditId(event.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleStatus = (id) => {
    setEvents(events.map(event =>
      event.id === id
        ? { ...event, status: event.status === 'Active' ? 'Inactive' : 'Active' }
        : event
    ));
  };

  const deleteEvent = (id) => {
    toast(
      <DeleteConfirmToast
        onDelete={() => {
          setEvents(prev => prev.filter(event => event.id !== id));
        }}
      />,
      { autoClose: false }
    );
  };

  return (
    <div className="bg-white shadow-md p-4 md:p-8 mt-6">
      <div className="w-full">
        <header className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-amber-600 mb-2">
                Portfolio Event Gallery
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your portfolio gallery events and images
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/add-gallery-images")}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
              >
                <Plus className="w-5 h-5" />
                Add Gallery Images
              </button>


              <button
                onClick={() => navigate("/gallery-image-list")}
                className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3 rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold">
                <List className="w-5 h-5" />
                Gallery Images List
              </button>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8">

            {/* Header */}
            <div className="mb-6 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Portfolio Category
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Create and manage your event gallery
              </p>
            </div>

            <div className="space-y-6">

              {/* Row 1 */}
              <div className="grid md:grid-cols-3 gap-5">

                {/* Title */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Event Gallery Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={galleryData.title}
                    onChange={handleInputChange}
                    placeholder="Enter gallery title"
                    className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm"
                    required
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={galleryData.date}
                    onChange={handleInputChange}
                    placeholder="12-June-2024"
                    className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm"
                    required
                  />
                </div>

                {/* Places */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="places"
                    value={galleryData.places}
                    onChange={handleInputChange}
                    placeholder="Noida, Delhi"
                    className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-12 gap-6 items-start">

                {/* Image Upload */}
                <div className="md:col-span-8">
                  <label className="text-sm font-medium text-gray-700">
                    Gallery Image <span className="text-red-500">*</span>
                  </label>

                  <div className="mt-2 border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">

                    {galleryData.image ? (
                      <div className="relative">
                        <img
                          src={galleryData.image}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => setGalleryData({ ...galleryData, image: null })}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 py-6">
                        <p className="text-sm text-gray-500">
                          No image selected
                        </p>

                        {/* SMALL BLUE BUTTON */}
                        <label className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition">
                          Upload Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Note */}
                  <p className="mt-2 text-xs text-gray-500">
                    Recommended: 800×600px • JPG / PNG • Max 5MB
                  </p>
                </div>

                {/* Status & Button */}
                <div className="md:col-span-4 space-y-5">

                  {/* Status */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="status"
                      value={galleryData.status}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm"
                    >
                      <option value="Inactive">Inactive</option>
                      <option value="Active">Active</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition shadow-sm"
                  >
                    {editId ? "Update Category" : "Add Category"}
                  </button>

                </div>
              </div>
            </div>
          </div>

        </header>

        {/* Table Section */}
        <div className="bg-gradient-to-br from-white to-indigo-50 rounded-lg shadow-sm overflow-hidden border border-indigo-100">
          <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
            <h2 className="text-2xl font-bold text-white">Portfolio Event Gallery List</h2>
          </div>

          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase">Event Title</th>
                  <th className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase">Event Image</th>
                  <th className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase">Event Date</th>
                  <th className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-gray-700 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                  >
                    <td className="py-3 px-4">
                      <span className="font-semibold text-gray-800 text-sm">{event.title}</span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-purple-200 shadow-sm">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=600&fit=crop';
                          }}
                        />
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-700">
                        {event.date || 'No Date'}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${event.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${event.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                          }`}></span>
                        {event.status}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => toggleStatus(event.id)}
                          className="p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-all duration-200"
                          title="Toggle Status"
                        >
                          {event.status === 'Active' ? (
                            <ToggleRight className="w-4 h-4" />
                          ) : (
                            <ToggleLeft className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() => editEvent(event)}
                          className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-200"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden p-6">
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-4 border-2 border-purple-100 shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-purple-200">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{event.title}</h4>
                        <p className="text-xs text-gray-500">{event.date || 'No Date'}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {event.status}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleStatus(event.id)}
                      className="flex-1 py-2 bg-purple-100 text-purple-600 rounded-lg font-semibold text-sm hover:bg-purple-200 transition-all flex items-center justify-center"
                    >
                      <ToggleLeft className="w-4 h-4 mr-1" />
                      Toggle
                    </button>
                    <button
                      onClick={() => editEvent(event)}
                      className="flex-1 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-200 transition-all flex items-center justify-center"
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
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
  );
};

export default GalleryCategory;
import { X, Upload, Plus, Trash2 } from "lucide-react";

const AddCarousel = ({
  show,
  onClose,
  onSave,
  editingCarousel,
  newCarousel,
  setNewCarousel,
  uploadedImages,
  handleImageUpload,
  removeImage,
  addTitle,
  updateTitle,
  removeTitle,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between">
          <h2 className="text-2xl font-bold">
            {editingCarousel ? "Edit Carousel" : "Add Hero Carousel"}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-6 space-y-8">

          {/* Carousel Name */}
          <div>
            <label className="block font-medium mb-2">Carousel Name</label>
            <input
              value={newCarousel.name}
              onChange={(e) =>
                setNewCarousel((p) => ({ ...p, name: e.target.value }))
              }
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Enter carousel name"
            />
          </div>

          {/* Upload Images */}
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">Carousel Slides</h3>
              <span>{uploadedImages.length}/10</span>
            </div>

            <label className="block border-2 border-dashed p-6 rounded-lg text-center cursor-pointer">
              <Upload className="mx-auto mb-2" />
              Click to upload images
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {uploadedImages.map((img) => (
                <div key={img.id} className="relative border rounded-lg">
                  <img
                    src={img.url}
                    alt=""
                    className="h-32 w-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(img.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Titles */}
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">Hero Titles</h3>
              <span>{newCarousel.titles.length}/5</span>
            </div>

            {newCarousel.titles.map((title, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  value={title}
                  onChange={(e) => updateTitle(idx, e.target.value)}
                  className="flex-1 border px-3 py-2 rounded"
                />
                {newCarousel.titles.length > 3 && (
                  <button onClick={() => removeTitle(idx)}>
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                )}
              </div>
            ))}

            {newCarousel.titles.length < 5 && (
              <button
                onClick={addTitle}
                className="flex items-center gap-2 text-blue-600 mt-2"
              >
                <Plus size={16} />
                Add Phrase
              </button>
            )}
          </div>

          {/* Subtitle */}
          <div>
            <label className="block font-medium mb-2">Subtitle</label>
            <textarea
              rows="3"
              value={newCarousel.subtitle}
              onChange={(e) =>
                setNewCarousel((p) => ({ ...p, subtitle: e.target.value }))
              }
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button onClick={onClose} className="border px-4 py-2 rounded">
              Cancel
            </button>
            <button
              onClick={onSave}
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
              Save Carousel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddCarousel;

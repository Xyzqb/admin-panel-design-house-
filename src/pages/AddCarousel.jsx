import { useState } from 'react';
import { Plus, X, Image, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCarousel = () => {

  const navigate = useNavigate();

  const [phrases, setPhrases] = useState([
    'e.g., Your Journey, Our Priority',
    'Typewriter phrase...',
    'Typewriter phrase...'
  ]);
  const [subtitle, setSubtitle] = useState('Short description shown below heading...');
  const [buttonText, setButtonText] = useState('Book Your Ride Now');
  const [opacity, setOpacity] = useState(0.80);
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState([null, null, null]);
  const [imagePreviews, setImagePreviews] = useState(['', '', '']);

  const addPhrase = () => {
    if (phrases.length < 5) {
      setPhrases([...phrases, '']);
    }
  };

  const updatePhrase = (index, value) => {
    const newPhrases = [...phrases];
    newPhrases[index] = value;
    setPhrases(newPhrases);
  };

  const removePhrase = (index) => {
    if (phrases.length > 3) {
      setPhrases(phrases.filter((_, i) => i !== index));
    }
  };

  const addImageSlot = () => {
    if (images.length < 10) {
      setImages([...images, null]);
      setImagePreviews([...imagePreviews, '']);
    }
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);

      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = reader.result;
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    newPreviews[index] = '';
    setImagePreviews(newPreviews);
  };

  const handleSave = () => {
    if (images.filter(Boolean).length < 3) {
      toast.error("Minimum 3 images required");
      return;
    }

    const newCarousel = {
      id: Date.now(),

      // ✅ REQUIRED FIELDS USED BY Carousel.jsx
      title: phrases[0] || "Untitled Carousel",
      titles: phrases,                     // 🔥 FIX
      subtitle,
      description: subtitle,               // 🔥 FIX
      priority: 1,                          // 🔥 FIX

      images: images
        .map((img, i) =>
          img
            ? {
              id: Date.now() + i,
              name: img.name,
              url: imagePreviews[i],
            }
            : null
        )
        .filter(Boolean),

      status: isActive ? "active" : "inactive",
      createdAt: new Date().toISOString(),
      festivalSchedule: null,
    };

    const existing = JSON.parse(localStorage.getItem("carousels")) || [];
    localStorage.setItem(
      "carousels",
      JSON.stringify([newCarousel, ...existing])
    );

    toast.success("Carousel added successfully 🚀");
    navigate("/carousel");
  };


  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 mt-6 shadow-md p-6">
      <div className="w-full">
        {/* Add Carousel View */}
        <div className="bg-white rounded-md shadow-lg p-8">

          {/* Header */}
          <div className="mb-10 flex items-center gap-4">
            <button
              onClick={() => navigate("/carousel")}
              className="p-2 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-700 transition-colors"
              title="Back to Carousel List"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold text-purple-900 mb-2">
              Add Hero Carousel
            </h1>
          </div>

          {/* Carousel Slides Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-purple-800">
                  Carousel Slides ({images.filter(img => img !== null).length}/{images.length} images)
                </h2>
                <p className="text-gray-600 mt-1">Minimum 3, maximum 10 images allowed</p>
              </div>
              <button
                onClick={addImageSlot}
                disabled={images.length >= 10}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Image
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-[16/9] bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border-2 border-dashed border-purple-200 flex flex-col items-center justify-center p-4">
                    {imagePreviews[index] ? (
                      <div className="relative w-full h-full">
                        <img
                          src={imagePreviews[index]}
                          alt={`Slide ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          Slide {index + 1}
                        </div>
                      </div>
                    ) : (
                      <>
                        <Image className="w-10 h-10 text-purple-400 mb-3" />
                        <span className="text-purple-600 font-medium text-sm">Upload {index + 1}</span>
                      </>
                    )}
                  </div>
                  {!imagePreviews[index] && (
                    <label className="mt-3 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all cursor-pointer font-medium text-sm">
                      <Plus className="w-4 h-4" />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(index, e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>

            <p className="text-sm text-purple-600">
              <span className="font-medium">Recommended:</span> 16:9 images, PNG/JPG up to 5MB each
            </p>
          </div>

          {/* Hero Titles Section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-blue-800">Hero Titles (Typewriter Lines)</h2>
                <p className="text-gray-600 mt-1">Minimum 3, maximum 5 phrases allowed</p>
              </div>
              <button
                onClick={addPhrase}
                disabled={phrases.length >= 5}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Phrase
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {phrases.map((phrase, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <span className="text-blue-600 font-medium min-w-6">{index + 1}.</span>
                  <input
                    type="text"
                    value={phrase}
                    onChange={(e) => updatePhrase(index, e.target.value)}
                    placeholder={index === 0 ? "e.g., Your Journey, Our Priority" : "Typewriter phrase..."}
                    className="flex-1 px-5 py-3.5 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-blue-800 placeholder-blue-400"
                  />
                  {phrases.length > 3 && (
                    <button
                      onClick={() => removePhrase(index)}
                      className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Short Description Below Hero Titles */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Subtitle / Description</h3>
              <textarea
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Short description shown below heading..."
                rows={3}
                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-green-800 placeholder-green-400 bg-white/80 resize-none"
              />
            </div>
          </div>

          {/* Active Configuration Toggle */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-300 mb-8">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${isActive ? 'bg-green-100' : 'bg-gray-200'}`}>
                <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Set as Active Configuration</p>
                <p className="text-sm text-gray-600">This configuration will be live on your site</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isActive && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Active
                </span>
              )}
              <button
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${isActive ? 'bg-green-500' : 'bg-gray-300'
                  }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Save Carousel Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCarousel;
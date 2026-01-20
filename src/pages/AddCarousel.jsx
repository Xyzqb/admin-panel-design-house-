// HeroCarouselConfig.jsx
import React, { useState } from 'react';
import { 
  Upload, 
  Save, 
  Plus, 
  X, 
  Type, 
  Image as ImageIcon,
  Sliders,
  CheckCircle,
  Edit
} from 'lucide-react';

const AddCarousel = () => {
  const [activeConfig, setActiveConfig] = useState(true);
  const [overlayOpacity, setOverlayOpacity] = useState(0.8);
  const [images, setImages] = useState([
    { id: 1, name: 'Upload 1' },
    { id: 2, name: 'Upload 2' },
    { id: 3, name: 'Upload 3' }
  ]);
  const [phrases, setPhrases] = useState([
    { id: 1, text: 'e.g., Your Journey, Our Priority' },
    { id: 2, text: 'Typewriter phrase...' },
    { id: 3, text: 'Typewriter phrase...' },
    { id: 4, text: 'Typewriter phrase...' }
  ]);
  const [subtitle, setSubtitle] = useState('Short description shown below heading...');
  const [buttonText, setButtonText] = useState('Book Your Ride Now');

  const handleAddImage = () => {
    if (images.length < 10) {
      const newId = images.length + 1;
      setImages([...images, { id: newId, name: `Upload ${newId}` }]);
    }
  };

  const handleRemoveImage = (id) => {
    if (images.length > 3) {
      setImages(images.filter(img => img.id !== id));
    }
  };

  const handleAddPhrase = () => {
    if (phrases.length < 5) {
      const newId = phrases.length + 1;
      setPhrases([...phrases, { id: newId, text: 'Typewriter phrase...' }]);
    }
  };

  const handleRemovePhrase = (id) => {
    if (phrases.length > 3) {
      setPhrases(phrases.filter(phrase => phrase.id !== id));
    }
  };

  const handlePhraseChange = (id, newText) => {
    setPhrases(phrases.map(phrase => 
      phrase.id === id ? { ...phrase, text: newText } : phrase
    ));
  };

  const handleSave = () => {
    alert('Configuration saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-900 mb-2">
            <Type className="inline-block mr-3 text-purple-600" size={28} />
            Hero Carousel Configuration
          </h1>
          <p className="text-purple-700">
            Upload 3-10 images & control hero section content and typewriter titles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Upload Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 shadow-lg border border-purple-200">
              <h2 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                <ImageIcon className="mr-2" size={20} />
                Carousel Slides ({images.length} images)
              </h2>
              <p className="text-sm text-purple-600 mb-4">
                Minimum 3, maximum 10 images allowed
              </p>

              <button
                onClick={handleAddImage}
                disabled={images.length >= 10}
                className="mb-6 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-md"
              >
                <Plus size={18} className="mr-2" />
                Add Image
              </button>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image) => (
                  <div 
                    key={image.id}
                    className="bg-white rounded-xl p-4 shadow-md border border-purple-300 relative group hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg mb-3 flex items-center justify-center">
                      <Upload className="text-purple-500" size={32} />
                    </div>
                    <p className="text-purple-800 font-medium text-center">{image.name}</p>
                    {images.length > 3 && (
                      <button
                        onClick={() => handleRemoveImage(image.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-sm text-purple-500 mt-4">
                <span className="font-medium">Recommended:</span> 16:9 images, PNG/JPG up to 5MB each
              </p>
            </div>
          </div>

          {/* Right Column - Content Configuration */}
          <div className="space-y-6">
            {/* Typewriter Phrases Section */}
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-6 shadow-lg border border-blue-200">
              <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                <Type className="mr-2" size={20} />
                Hero Titles (Typewriter Lines)
              </h2>
              <p className="text-sm text-blue-600 mb-4">
                Minimum 3, maximum 5 phrases allowed
              </p>

              <div className="space-y-3 mb-4">
                {phrases.map((phrase, index) => (
                  <div key={phrase.id} className="flex items-center gap-3 group">
                    <span className="text-blue-600 font-medium min-w-6">{index + 1}.</span>
                    <input
                      type="text"
                      value={phrase.text}
                      onChange={(e) => handlePhraseChange(phrase.id, e.target.value)}
                      className="flex-1 px-4 py-2 bg-white/80 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-blue-800 placeholder-blue-400"
                    />
                    {phrases.length > 3 && (
                      <button
                        onClick={() => handleRemovePhrase(phrase.id)}
                        className="p-2 text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddPhrase}
                disabled={phrases.length >= 5}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-md"
              >
                <Plus size={18} className="mr-2" />
                Add Phrase
              </button>
            </div>

            {/* Subtitle Section */}
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 shadow-lg border border-green-200">
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                Subtitle / Description
              </h2>
              <textarea
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-green-800 placeholder-green-400 min-h-[80px]"
                placeholder="Enter subtitle description..."
              />
            </div>

            {/* Primary Button & Configuration */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 shadow-lg border border-amber-200">
              <h2 className="text-xl font-semibold text-amber-800 mb-4">
                Primary Button Text
              </h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  className="w-full px-4 py-3 bg-white/80 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-800 mb-4"
                />

                <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-amber-300">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${activeConfig ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <CheckCircle className={activeConfig ? 'text-green-600' : 'text-gray-400'} size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-amber-800">Set as Active Configuration</p>
                      <p className="text-sm text-amber-600">This configuration will be live on your site</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeConfig}
                      onChange={(e) => setActiveConfig(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-amber-300 peer-focus:outline-none peer-focus:ring-amber-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sliders size={18} className="text-amber-600" />
                      <span className="font-medium text-amber-800">Overlay Opacity ({overlayOpacity.toFixed(2)})</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${activeConfig ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {activeConfig ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={overlayOpacity}
                    onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                    className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500"
                  />
                  <div className="flex justify-between text-sm text-amber-600">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="sticky bottom-6">
              <button
                onClick={handleSave}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 text-lg font-semibold"
              >
                <Save size={22} />
                Save Carousel Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCarousel;
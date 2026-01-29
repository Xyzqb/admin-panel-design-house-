import { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Trash2,
  Edit,
  Plus,
  Image as ImageIcon,
  Video,
  Type,
  Heading,
  Target,
  Eye as EyeIcon,
  Globe,
  FileText,
  Check,
  AlertCircle,
  ExternalLink,
  Youtube,
  Link,
  Save
} from 'lucide-react';

const About = () => {
  // Load initial data from localStorage
  const loadFromLocalStorage = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return defaultValue;
    }
  };

  // Save to localStorage
  const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // State for sections with localStorage
  const [sections, setSections] = useState(() =>
    loadFromLocalStorage('aboutSections', [])
  );

  // State for description boxes
  const [descriptionBoxes, setDescriptionBoxes] = useState(() =>
    loadFromLocalStorage('descriptionBoxes', [])
  );

  // State for active description box form
  const [activeDescriptionForm, setActiveDescriptionForm] = useState(null);
  const [newDescription, setNewDescription] = useState({
    type: 'normal',
    title: '',
    content: ''
  });

  const [missionVision, setMissionVision] = useState(() =>
    loadFromLocalStorage('missionVision', [])
  );

  const [media, setMedia] = useState(() =>
    loadFromLocalStorage('aboutMedia', {
      images: [],
      videos: []
    })
  );

  // Refs for file inputs
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // State for adding new sections
  const [newSection, setNewSection] = useState({ type: 'heading', content: '' });

  // State for video URL input
  const [videoUrl, setVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToLocalStorage('aboutSections', sections);
  }, [sections]);

  useEffect(() => {
    saveToLocalStorage('descriptionBoxes', descriptionBoxes);
  }, [descriptionBoxes]);

  useEffect(() => {
    saveToLocalStorage('missionVision', missionVision);
  }, [missionVision]);

  useEffect(() => {
    saveToLocalStorage('aboutMedia', media);
  }, [media]);

  // Handle section editing
  const toggleEdit = (id) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, isEditing: !section.isEditing } : section
    ));
  };

  const updateSection = (id, field, value) => {
    const updatedSections = sections.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  const addNewSection = () => {
    if (!newSection.content.trim()) return;

    const newId = sections.length > 0 ? Math.max(...sections.map(s => s.id)) + 1 : 1;
    const newSectionObj = {
      id: newId,
      type: newSection.type,
      content: newSection.content,
      isEditing: false
    };

    if (newSection.type === 'highlight') {
      newSectionObj.title = 'New Highlight';
    }

    setSections([...sections, newSectionObj]);
    setNewSection({ type: 'heading', content: '' });
  };

  const deleteSection = (id) => {
    setSections(sections.filter(section => section.id !== id));
  };

  // Handle description boxes
  const addDescriptionBox = (type) => {
    setActiveDescriptionForm('new');
    setNewDescription({
      type: type,
      title: type === 'normal' ? 'Description' :
        type === 'mission' ? 'Mission' :
          type === 'vision' ? 'Vision' : 'Custom',
      content: ''
    });
  };

  const editDescriptionBox = (box) => {
    setActiveDescriptionForm(box.id);
    setNewDescription({
      type: box.type,
      title: box.title,
      content: box.content
    });
  };

  const saveDescriptionBox = () => {
    if (!newDescription.title.trim() || !newDescription.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    if (activeDescriptionForm === 'new') {
      // Add new box
      const newId = descriptionBoxes.length > 0 ? Math.max(...descriptionBoxes.map(b => b.id)) + 1 : 1;
      setDescriptionBoxes([
        ...descriptionBoxes,
        {
          id: newId,
          type: newDescription.type,
          title: newDescription.title,
          content: newDescription.content
        }
      ]);
    } else {
      // Update existing box
      setDescriptionBoxes(descriptionBoxes.map(box =>
        box.id === activeDescriptionForm ? {
          ...box,
          type: newDescription.type,
          title: newDescription.title,
          content: newDescription.content
        } : box
      ));
    }

    // Reset
    setActiveDescriptionForm(null);
    setNewDescription({
      type: 'normal',
      title: '',
      content: ''
    });
  };

  const deleteDescriptionBox = (id) => {
    setDescriptionBoxes(descriptionBoxes.filter(box => box.id !== id));
  };

  const cancelDescriptionBoxEdit = () => {
    setActiveDescriptionForm(null);
    setNewDescription({
      type: 'normal',
      title: '',
      content: ''
    });
  };

  // Handle mission/vision
  const toggleMissionVision = (id) => {
    setMissionVision(missionVision.map(item =>
      item.id === id ? { ...item, isOpen: !item.isOpen } : item
    ));
  };

  const updateMissionVision = (id, field, value) => {
    const updatedMissionVision = missionVision.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setMissionVision(updatedMissionVision);
  };

  const addMissionVision = () => {
    const newId = missionVision.length > 0 ? Math.max(...missionVision.map(m => m.id)) + 1 : 1;
    setMissionVision([]);
  };

  const deleteMissionVision = (id) => {
    setMissionVision(missionVision.filter(item => item.id !== id));
  };

  // Handle media uploads
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && media.images.length < 4) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const newId = media.images.length > 0 ? Math.max(...media.images.map(img => img.id)) + 1 : 1;
        const updatedImages = [
          ...media.images,
          {
            id: newId,
            url: reader.result,
            caption: file.name,
            fileName: file.name,
            size: file.size,
            type: file.type
          }
        ];
        setMedia({
          ...media,
          images: updatedImages
        });
      };
      reader.readAsDataURL(file);
    }
    e.target.value = ''; // Reset input
  };

  const handleVideoAdd = () => {
    if (!videoUrl.trim()) {
      alert('Please enter a video URL');
      return;
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+/;

    if (!youtubeRegex.test(videoUrl) && !vimeoRegex.test(videoUrl)) {
      alert('Please enter a valid YouTube or Vimeo URL');
      return;
    }

    if (media.videos.length >= 4) {
      alert('Maximum 4 videos allowed');
      return;
    }

    // Convert YouTube URL to embed URL
    let embedUrl = videoUrl;
    if (videoUrl.includes('youtube.com/watch?v=')) {
      const videoId = videoUrl.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        embedUrl = `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
      } else {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    } else if (videoUrl.includes('youtu.be/')) {
      const videoId = videoUrl.split('youtu.be/')[1];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    const newId = media.videos.length > 0 ? Math.max(...media.videos.map(vid => vid.id)) + 1 : 1;
    const updatedVideos = [
      ...media.videos,
      {
        id: newId,
        url: embedUrl,
        originalUrl: videoUrl,
        title: newVideoTitle || 'New Video',
        platform: youtubeRegex.test(videoUrl) ? 'youtube' : 'vimeo'
      }
    ];

    setMedia({
      ...media,
      videos: updatedVideos
    });

    // Reset form
    setVideoUrl('');
    setNewVideoTitle('');
  };

  const removeImage = (id) => {
    setMedia({
      ...media,
      images: media.images.filter(img => img.id !== id)
    });
  };

  const removeVideo = (id) => {
    setMedia({
      ...media,
      videos: media.videos.filter(vid => vid.id !== id)
    });
  };

  const updateMediaCaption = (type, id, caption) => {
    if (type === 'image') {
      const updatedImages = media.images.map(img =>
        img.id === id ? { ...img, caption } : img
      );
      setMedia({
        ...media,
        images: updatedImages
      });
    } else {
      const updatedVideos = media.videos.map(vid =>
        vid.id === id ? { ...vid, title: caption } : vid
      );
      setMedia({
        ...media,
        videos: updatedVideos
      });
    }
  };

  // Get icon for section type
  const getSectionIcon = (type) => {
    switch (type) {
      case 'heading': return <Heading className="w-5 h-5 text-blue-600" />;
      case 'subheading': return <Type className="w-5 h-5 text-green-600" />;
      case 'description': return <FileText className="w-5 h-5 text-purple-600" />;
      case 'highlight': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  // Get icon for description box type
  const getDescriptionBoxIcon = (type) => {
    switch (type) {
      case 'normal': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'mission': return <Target className="w-5 h-5 text-green-600" />;
      case 'vision': return <EyeIcon className="w-5 h-5 text-purple-600" />;
      default: return <Globe className="w-5 h-5 text-gray-600" />;
    }
  };

  // Get color for description box type
  const getDescriptionBoxColor = (type) => {
    switch (type) {
      case 'normal': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'mission': return 'bg-green-50 border-green-200 text-green-800';
      case 'vision': return 'bg-purple-50 border-purple-200 text-purple-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  // Get title for description box type
  const getDescriptionBoxTitle = (type) => {
    switch (type) {
      case 'normal': return 'Description';
      case 'mission': return 'Mission';
      case 'vision': return 'Vision';
      default: return 'Custom';
    }
  };

  // Get icon for mission/vision type
  const getMissionVisionIcon = (type) => {
    switch (type) {
      case 'mission': return <Target className="w-5 h-5 text-green-600" />;
      case 'vision': return <EyeIcon className="w-5 h-5 text-blue-600" />;
      default: return <Globe className="w-5 h-5 text-purple-600" />;
    }
  };

  // Clear all data
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.removeItem('aboutSections');
      localStorage.removeItem('descriptionBoxes');
      localStorage.removeItem('missionVision');
      localStorage.removeItem('aboutMedia');
      setSections([]);
      setDescriptionBoxes([]);
      setMissionVision([
        {
          id: 1,
          type: 'mission',
          title: 'Our Mission',
          content: 'To provide innovative solutions that empower businesses and individuals to achieve their goals through technology and creativity.',
          isOpen: false
        },
        {
          id: 2,
          type: 'vision',
          title: 'Our Vision',
          content: 'To be a globally recognized leader in digital transformation, creating sustainable value for our clients and communities.',
          isOpen: false
        }
      ]);
      setMedia({
        images: [],
        videos: []
      });
    }
  };

  return (
    <div className="bg-white shadow-md mt-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-purple-900">About Page</h1>
              <p className="text-gray-600 mt-2 text-lg">Manage your company's about page content</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={clearAllData}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content Sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add New Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Plus className="w-5 h-5 text-blue-600 mr-2" />
                Add New Section
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Type
                  </label>
                  <select
                    value={newSection.type}
                    onChange={(e) => setNewSection({ ...newSection, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="heading">Heading</option>
                    <option value="subheading">Subheading</option>
                    <option value="highlight">Highlight Box</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {newSection.type === 'heading' ? 'Heading Text' :
                      newSection.type === 'subheading' ? 'Subheading Text' :
                        newSection.type === 'highlight' ? 'Highlight Title' :
                          'Description'}
                  </label>
                  <textarea
                    value={newSection.content}
                    onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
                    placeholder={
                      newSection.type === 'heading' ? 'Enter heading text...' :
                        newSection.type === 'subheading' ? 'Enter subheading text...' :
                          newSection.type === 'highlight' ? 'Enter highlight title...' :
                            'Enter description...'
                    }
                    rows={newSection.type === 'description' ? 3 : 2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={addNewSection}
                  disabled={!newSection.content.trim()}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Section
                </button>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-6">
              {sections.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No sections yet</h3>
                  <p className="text-gray-600">Add your first section using the form above</p>
                </div>
              ) : (
                sections.map((section) => (
                  <div key={section.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getSectionIcon(section.type)}
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {section.type}
                          </span>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleEdit(section.id)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            {section.isEditing ? <Check className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                          </button>
                          <button
                            onClick={() => deleteSection(section.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {section.isEditing ? (
                        <div className="space-y-4">
                          {section.type === 'highlight' ? (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Title
                                </label>
                                <input
                                  type="text"
                                  value={section.title || ''}
                                  onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Content
                                </label>
                                <textarea
                                  value={section.content}
                                  onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                                  rows="3"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                            </>
                          ) : (
                            <textarea
                              value={section.content}
                              onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                              rows={section.type === 'description' ? 4 : 2}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          )}
                        </div>
                      ) : (
                        <div>
                          {section.type === 'heading' && (
                            <h2 className="text-2xl font-bold text-gray-900">{section.content}</h2>
                          )}
                          {section.type === 'subheading' && (
                            <h3 className="text-xl text-gray-700 font-medium">{section.content}</h3>
                          )}
                          {section.type === 'description' && (
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{section.content}</p>
                          )}
                          {section.type === 'highlight' && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="text-lg font-bold text-blue-900 mb-2">{section.title}</h4>
                              <p className="text-blue-800 whitespace-pre-wrap">{section.content}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Description Boxes Section */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-purple-600 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-900">Description Boxes</h2>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addDescriptionBox('normal')}
                      className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Description
                    </button>
                    <button
                      onClick={() => addDescriptionBox('mission')}
                      className="flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Mission
                    </button>
                    <button
                      onClick={() => addDescriptionBox('vision')}
                      className="flex items-center px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Vision
                    </button>
                  </div>
                </div>

                {/* Add/Edit Description Box Form */}
                {activeDescriptionForm && (
                  <div className="mb-6 border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {activeDescriptionForm === 'new' ? 'Add New Description Box' : 'Edit Description Box'}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Content
                        </label>
                        <textarea
                          value={newDescription.content}
                          onChange={(e) => setNewDescription({ ...newDescription, content: e.target.value })}
                          rows="5"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter detailed description..."
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={cancelDescriptionBoxEdit}
                          className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={saveDescriptionBox}
                          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Display Saved Description Boxes */}
                <div className="space-y-4">
                  {descriptionBoxes.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No description boxes added yet. Click above buttons to add.</p>
                    </div>
                  ) : (
                    descriptionBoxes.map((box) => (
                      <div key={box.id} className={`border rounded-lg p-4 ${getDescriptionBoxColor(box.type)}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {getDescriptionBoxIcon(box.type)}
                            <div>
                              <h3 className="font-bold text-lg">{box.title}</h3>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white">
                                {getDescriptionBoxTitle(box.type)}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => editDescriptionBox(box)}
                              className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteDescriptionBox(box.id)}
                              className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="whitespace-pre-wrap leading-relaxed">{box.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Media */}
          <div className="space-y-6">
            {/* Images */}
            <div className="bg-white rounded-xl border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <ImageIcon className="w-4 h-4 text-green-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Images</h2>
                </div>
                <span className="text-sm text-gray-600">
                  {media.images.length}/4
                </span>
              </div>

              <div className="space-y-4">
                {media.images.length < 4 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => imageInputRef.current?.click()}
                      className="w-full flex flex-col items-center justify-center p-4"
                    >
                      <Upload className="w-5 h-5 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-700">Upload Image</span>
                      <span className="text-xs text-gray-500 mt-1">JPG, PNG, WebP (Max 5MB)</span>
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {media.images.map((image) => (
                    <div key={image.id} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={image.url}
                          alt={image.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => removeImage(image.id)}
                          className="p-1.5 bg-red-600 text-white rounded-full shadow-lg"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Videos */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Video className="w-5 h-5 text-red-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Videos</h2>
                </div>
                <span className="text-sm text-gray-600">
                  {media.videos.length}/4
                </span>
              </div>

              <div className="space-y-4">
                {media.videos.length < 4 && (
                  <div className="border border-gray-300 rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Video URL (YouTube/Vimeo)
                        </label>
                        <div className="flex items-center">
                          <Link className="w-4 h-4 text-gray-400 mr-2" />
                          <input
                            type="text"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Video Title
                        </label>
                        <input
                          type="text"
                          value={newVideoTitle}
                          onChange={(e) => setNewVideoTitle(e.target.value)}
                          placeholder="Enter video title..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                        />
                      </div>
                      <button
                        onClick={handleVideoAdd}
                        disabled={!videoUrl.trim()}
                        className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Youtube className="w-4 h-4 mr-2" />
                        Add Video
                      </button>
                      <p className="text-xs text-gray-500 text-center">
                        Supported: YouTube, Vimeo
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {media.videos.map((video) => (
                    <div key={video.id} className="relative group">
                      <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
                        <iframe
                          src={video.url}
                          title={video.title}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>

                      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                          href={video.originalUrl || video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-blue-600 text-white rounded-full shadow-lg"
                          title="Open in new tab"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => removeVideo(video.id)}
                          className="p-1.5 bg-red-600 text-white rounded-full shadow-lg"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 text-xs font-medium bg-black bg-opacity-70 text-white rounded">
                          {video.platform === 'youtube' ? 'YouTube' : 'Vimeo'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
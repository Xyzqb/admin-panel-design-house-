import React, { useState } from 'react';
import { 
  Printer, 
  Edit, 
  Save, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Building,
  Users,
  FileText,
  Globe,
  Briefcase,
  Calendar,
  CheckCircle,
  ArrowLeft,
  Shield,
  Package,
  TrendingUp,
  User,
  AlertCircle,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    companyName: "UrbanSpace Designs",
    category: "Interior Design",
    security: "High Security",
    country: "India",
    state: "Maharashtra",
    primaryContact: {
      name: "Ananya Sharma",
      designation: "CEO",
      email: "ananya.sharma@urbanspacedesigns.com",
      mobile: "+91 91234 56789",
      landline: "022-12345678"
    },
    additionalContact1: {
      name: "Rohit Kapoor",
      designation: "Project Manager",
      email: "rohit.kapoor@urbanspacedesigns.com",
      mobile: "+91 88776 55443",
      landline: "022-87654321"
    },
    additionalContact2: {
      name: "Priya Verma",
      designation: "Design Head",
      email: "priya.verma@urbanspacedesigns.com",
      mobile: "+91 77665 44332",
      landline: ""
    },
    dataSource: "Website",
    enquiryFor: "Office Interior Design",
    natureOfBusiness: "Interior Design Services",
    productLine: "Commercial Interiors",
    events: "Design Expo 2024",
    city: "Mumbai",
    pincode: "400021",
    address: "Nariman Point, Mumbai, Maharashtra 400021",
    notes: "Looking for complete office interior design for their new headquarters. Budget: ₹2.5 Crores. Prefers modern design with sustainable materials."
  });

  const [formData, setFormData] = useState(companyData);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(companyData);
  };

  const handleSave = () => {
    setCompanyData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(companyData);
  };

  const handleInputChange = (path, value) => {
    const keys = path.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  // Categories and options for selects
  const categories = ["Interior Design", "Architecture", "Construction", "Real Estate", "Consultancy"];
  const countries = ["India", "USA", "UK", "UAE", "Singapore"];
  const states = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat"];
  const dataSources = ["Website", "Referral", "Trade Show", "Email Campaign", "Social Media"];
  const enquiryForOptions = ["Office Interior Design", "Residential Design", "Retail Space", "Hospitality Design", "Custom Furniture"];
  const natureOfBusinessOptions = ["Interior Design Services", "Architecture Firm", "Construction Company", "Real Estate Developer", "Consultancy"];
  const productLines = ["Commercial Interiors", "Residential Interiors", "Modular Furniture", "Lighting Solutions", "Flooring"];
  const events = ["Design Expo 2024", "Architecture Summit", "Real Estate Conference", "Business Meet", "None"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 print:bg-white">
      {/* Modern Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm print:hidden sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200 hover:shadow-md"
                aria-label="Go back"
              >
                <ArrowLeft size={20} />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Company Profile</h1>
                  <p className="text-sm text-gray-500">Detailed Information</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Company Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white print:hidden">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30">
                <Building className="w-10 h-10 text-white" />
              </div>
              
              <div>
                <h1 className="text-4xl font-bold mb-3">{companyData.companyName}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full font-medium text-sm border border-white/30">
                    {companyData.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/90">
                    <MapPin className="w-4 h-4" />
                    {companyData.city}, {companyData.state}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/90">
                    <Globe className="w-4 h-4" />
                    {companyData.country}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/90">
                    <Shield className="w-4 h-4" />
                    {companyData.security}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/30">
              <div className="text-center">
                <p className="text-white/80 text-sm mb-1">Primary Contact</p>
                <p className="font-bold text-lg">{companyData.primaryContact.name}</p>
                <p className="text-white/90 text-sm">{companyData.primaryContact.designation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Details Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Company Information</h2>
                      <p className="text-sm text-gray-500">Basic company details and business info</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-5">
                  {/* Company Name & Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Building className="w-4 h-4 text-blue-500" />
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          placeholder="Enter company name"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl group-hover:shadow-md transition-all">
                          <p className="text-gray-900 font-semibold">{companyData.companyName}</p>
                        </div>
                      )}
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Briefcase className="w-4 h-4 text-blue-500" />
                        Category <span className="text-red-500">*</span>
                      </label>
                      {isEditing ? (
                        <select
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl group-hover:shadow-md transition-all">
                          <p className="text-gray-900 font-semibold">{companyData.category}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Security & Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        Security Level
                      </label>
                      {isEditing ? (
                        <select
                          value={formData.security}
                          onChange={(e) => handleInputChange('security', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        >
                          <option value="">Select Security Level</option>
                          <option value="High Security">High Security</option>
                          <option value="Medium Security">Medium Security</option>
                          <option value="Low Security">Low Security</option>
                        </select>
                      ) : (
                        <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl group-hover:shadow-md transition-all">
                          <p className="text-gray-900 font-semibold flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            {companyData.security}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Globe className="w-4 h-4 text-blue-500" />
                        Country
                      </label>
                      {isEditing ? (
                        <select
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl group-hover:shadow-md transition-all">
                          <p className="text-gray-900 font-semibold">{companyData.country}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* State & City */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        State
                      </label>
                      {isEditing ? (
                        <select
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        >
                          <option value="">Select State</option>
                          {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl group-hover:shadow-md transition-all">
                          <p className="text-gray-900 font-semibold">{companyData.state}</p>
                        </div>
                      )}
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        City
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Enter city"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl group-hover:shadow-md transition-all">
                          <p className="text-gray-900 font-semibold">{companyData.city}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pincode & Data Source */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        Pincode
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.pincode}
                          onChange={(e) => handleInputChange('pincode', e.target.value)}
                          placeholder="Enter pincode"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl group-hover:shadow-md transition-all">
                          <p className="text-gray-900 font-semibold">{companyData.pincode}</p>
                        </div>
                      )}
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <TrendingUp className="w-4 h-4 text-purple-500" />
                        Data Source
                      </label>
                      {isEditing ? (
                        <select
                          value={formData.dataSource}
                          onChange={(e) => handleInputChange('dataSource', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        >
                          <option value="">Select Data Source</option>
                          {dataSources.map((source) => (
                            <option key={source} value={source}>{source}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl group-hover:shadow-md transition-all">
                          <p className="text-gray-900 font-semibold">{companyData.dataSource}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-5 mt-2">
                    <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      Business Details
                    </h3>

                    {/* Enquiry & Nature */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          Enquiry For
                        </label>
                        {isEditing ? (
                          <select
                            value={formData.enquiryFor}
                            onChange={(e) => handleInputChange('enquiryFor', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                          >
                            <option value="">Select Enquiry For</option>
                            {enquiryForOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl group-hover:shadow-md transition-all">
                            <p className="text-gray-900 font-semibold">{companyData.enquiryFor}</p>
                          </div>
                        )}
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          Nature of Business
                        </label>
                        {isEditing ? (
                          <select
                            value={formData.natureOfBusiness}
                            onChange={(e) => handleInputChange('natureOfBusiness', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                          >
                            <option value="">Select Nature of Business</option>
                            {natureOfBusinessOptions.map((nature) => (
                              <option key={nature} value={nature}>{nature}</option>
                            ))}
                          </select>
                        ) : (
                          <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl group-hover:shadow-md transition-all">
                            <p className="text-gray-900 font-semibold">{companyData.natureOfBusiness}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product Line & Events */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Package className="w-4 h-4 text-orange-500" />
                          Product Line
                        </label>
                        {isEditing ? (
                          <select
                            value={formData.productLine}
                            onChange={(e) => handleInputChange('productLine', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                          >
                            <option value="">Select Product Line</option>
                            {productLines.map((line) => (
                              <option key={line} value={line}>{line}</option>
                            ))}
                          </select>
                        ) : (
                          <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl group-hover:shadow-md transition-all">
                            <p className="text-gray-900 font-semibold">{companyData.productLine}</p>
                          </div>
                        )}
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 text-indigo-500" />
                          Events
                        </label>
                        {isEditing ? (
                          <select
                            value={formData.events}
                            onChange={(e) => handleInputChange('events', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                          >
                            <option value="">Select Event</option>
                            {events.map((event) => (
                              <option key={event} value={event}>{event}</option>
                            ))}
                          </select>
                        ) : (
                          <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl group-hover:shadow-md transition-all">
                            <p className="text-gray-900 font-semibold">{companyData.events}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="border-t pt-5">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      Complete Address <span className="text-red-500">*</span>
                    </label>
                    {isEditing ? (
                      <textarea
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter complete address"
                        rows="3"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl">
                        <p className="text-gray-900 leading-relaxed">{companyData.address}</p>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      Additional Notes & Requirements
                    </label>
                    {isEditing ? (
                      <textarea
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="Add important notes, requirements, budget details, preferences..."
                        rows="4"
                        className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none resize-none bg-white"
                      />
                    ) : (
                      <div className="bg-white px-4 py-3 border border-amber-200 rounded-xl">
                        <p className="text-gray-900 leading-relaxed whitespace-pre-line">{companyData.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-5 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Contact Information</h2>
                    <p className="text-sm text-gray-500">Primary and additional contact details</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Primary Contact */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                  <div className="pl-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Primary Contact</h3>
                        <p className="text-xs text-red-500 font-semibold">Required *</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.primaryContact.name}
                            onChange={(e) => handleInputChange('primaryContact.name', e.target.value)}
                            placeholder="Enter full name"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl group-hover:shadow-md transition-all">
                            <p className="text-gray-900 font-bold">{companyData.primaryContact.name}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Designation</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.primaryContact.designation}
                            onChange={(e) => handleInputChange('primaryContact.designation', e.target.value)}
                            placeholder="e.g., CEO, Manager"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl group-hover:shadow-md transition-all">
                            <p className="text-gray-900 font-bold">{companyData.primaryContact.designation}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={formData.primaryContact.email}
                            onChange={(e) => handleInputChange('primaryContact.email', e.target.value)}
                            placeholder="email@company.com"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl flex items-center gap-2 group-hover:shadow-md transition-all">
                            <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <p className="text-gray-900 font-semibold break-all">{companyData.primaryContact.email}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={formData.primaryContact.mobile}
                            onChange={(e) => handleInputChange('primaryContact.mobile', e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl flex items-center gap-2 group-hover:shadow-md transition-all">
                            <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <p className="text-gray-900 font-semibold">{companyData.primaryContact.mobile}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="md:col-span-2 group">
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Landline Number</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={formData.primaryContact.landline}
                            onChange={(e) => handleInputChange('primaryContact.landline', e.target.value)}
                            placeholder="Enter landline number"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl group-hover:shadow-md transition-all">
                            <p className="text-gray-900 font-semibold">
                              {companyData.primaryContact.landline || "Not provided"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Contact 1 */}
                <div className="relative pt-6 border-t">
                  <div className="absolute left-0 top-6 bottom-0 w-1 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full"></div>
                  <div className="pl-6">
                    <h3 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-600" />
                      Additional Contact 1 
                      <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {['name', 'designation', 'email', 'mobile', 'landline'].map((field) => (
                        <div key={field} className={`${field === 'landline' ? 'md:col-span-2' : ''} group`}>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block capitalize">
                            {field === 'mobile' ? 'Mobile Number' : field === 'landline' ? 'Landline Number' : field}
                          </label>
                          {isEditing ? (
                            <input
                              type={field.includes('mail') ? 'email' : field.includes('mobile') || field.includes('landline') ? 'tel' : 'text'}
                              value={formData.additionalContact1[field]}
                              onChange={(e) => handleInputChange(`additionalContact1.${field}`, e.target.value)}
                              placeholder={`Enter ${field}`}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl group-hover:shadow-md transition-all">
                              <p className="text-gray-900 font-medium">
                                {companyData.additionalContact1[field] || "Not provided"}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Additional Contact 2 */}
                <div className="relative pt-6 border-t">
                  <div className="absolute left-0 top-6 bottom-0 w-1 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full"></div>
                  <div className="pl-6">
                    <h3 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-600" />
                      Additional Contact 2 
                      <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {['name', 'designation', 'email', 'mobile', 'landline'].map((field) => (
                        <div key={field} className={`${field === 'landline' ? 'md:col-span-2' : ''} group`}>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block capitalize">
                            {field === 'mobile' ? 'Mobile Number' : field === 'landline' ? 'Landline Number' : field}
                          </label>
                          {isEditing ? (
                            <input
                              type={field.includes('mail') ? 'email' : field.includes('mobile') || field.includes('landline') ? 'tel' : 'text'}
                              value={formData.additionalContact2[field]}
                              onChange={(e) => handleInputChange(`additionalContact2.${field}`, e.target.value)}
                              placeholder={`Enter ${field}`}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl group-hover:shadow-md transition-all">
                              <p className="text-gray-900 font-medium">
                                {companyData.additionalContact2[field] || "Not provided"}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Location Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 print:border">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-5">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-white" />
                  <h2 className="text-lg font-bold text-white">Location</h2>
                </div>
              </div>
              
              <div className="p-5 space-y-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-600 mb-1">Full Address</p>
                      <p className="text-gray-900 font-medium leading-relaxed">{companyData.address}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 mb-1">City</p>
                    <p className="text-gray-900 font-bold">{companyData.city}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 mb-1">State</p>
                    <p className="text-gray-900 font-bold">{companyData.state}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Pincode</p>
                    <p className="text-gray-900 font-bold">{companyData.pincode}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Country</p>
                    <p className="text-gray-900 font-bold">{companyData.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Business Overview
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-white/80 text-sm">Category</span>
                  <span className="font-bold">{companyData.category}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-white/80 text-sm">Product Line</span>
                  <span className="font-bold">{companyData.productLine}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-white/80 text-sm">Enquiry</span>
                  <span className="font-bold text-right">{companyData.enquiryFor}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">Source</span>
                  <span className="font-bold">{companyData.dataSource}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 print:hidden">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Phone className="w-5 h-5" />
                  <span className="font-bold">Call Now</span>
                </button>
                
                <button className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Mail className="w-5 h-5" />
                  <span className="font-bold">Send Email</span>
                </button>
                
                <button className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Calendar className="w-5 h-5" />
                  <span className="font-bold">Schedule Meet</span>
                </button>
              </div>
            </div>

            {/* Last Updated */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 border border-gray-300 print:hidden">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-4 h-4" />
                <div>
                  <p className="text-xs font-semibold">Last Updated</p>
                  <p className="text-sm">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:bg-white {
            background: white !important;
          }
          .print\\:border {
            border: 1px solid #e5e7eb !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CompanyProfile;



// import React, { useState } from 'react';
// import { 
//   Printer, 
//   Edit, 
//   Save, 
//   X, 
//   Phone, 
//   Mail, 
//   MapPin, 
//   Building,
//   Users,
//   FileText,
//   Globe,
//   Briefcase,
//   Tag,
//   Calendar,
//   ChevronLeft,
//   User,
//   CheckCircle,
//   ArrowLeft,
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const CompanyProfile = () => {
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState(false);
//   const [companyData, setCompanyData] = useState({
//     companyName: "UrbanSpace Designs",
//     category: "Interior Design",
//     security: "High Security",
//     country: "India",
//     state: "Maharashtra",
//     primaryContact: {
//       name: "Ananya Sharma",
//       designation: "CEO",
//       email: "ananya.sharma@urbanspacedesigns.com",
//       mobile: "+91 91234 56789",
//       landline: "022-12345678"
//     },
//     additionalContact1: {
//       name: "Rohit Kapoor",
//       designation: "Project Manager",
//       email: "rohit.kapoor@urbanspacedesigns.com",
//       mobile: "+91 88776 55443",
//       landline: "022-87654321"
//     },
//     additionalContact2: {
//       name: "Priya Verma",
//       designation: "Design Head",
//       email: "priya.verma@urbanspacedesigns.com",
//       mobile: "+91 77665 44332",
//       landline: ""
//     },
//     dataSource: "Website",
//     enquiryFor: "Office Interior Design",
//     natureOfBusiness: "Interior Design Services",
//     productLine: "Commercial Interiors",
//     events: "Design Expo 2024",
//     city: "Mumbai",
//     pincode: "400021",
//     address: "Nariman Point, Mumbai, Maharashtra 400021",
//     notes: "Looking for complete office interior design for their new headquarters. Budget: ₹2.5 Crores. Prefers modern design with sustainable materials."
//   });

//   const [formData, setFormData] = useState(companyData);

//   const handleEdit = () => {
//     setIsEditing(true);
//     setFormData(companyData);
//   };

//   const handleSave = () => {
//     setCompanyData(formData);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setFormData(companyData);
//   };

//   const handleInputChange = (path, value) => {
//     const keys = path.split('.');
//     setFormData(prev => {
//       const newData = { ...prev };
//       let current = newData;
      
//       for (let i = 0; i < keys.length - 1; i++) {
//         current = current[keys[i]];
//       }
      
//       current[keys[keys.length - 1]] = value;
//       return newData;
//     });
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleBack = () => {
//     navigate("/corporate-clients-list");
//   };

//   const handleDownloadPDF = () => {
//     alert('PDF download functionality would be implemented here');
//   };

//   // Categories and options for selects
//   const categories = ["Interior Design", "Architecture", "Construction", "Real Estate", "Consultancy"];
//   const countries = ["India", "USA", "UK", "UAE", "Singapore"];
//   const states = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat"];
//   const dataSources = ["Website", "Referral", "Trade Show", "Email Campaign", "Social Media"];
//   const enquiryForOptions = ["Office Interior Design", "Residential Design", "Retail Space", "Hospitality Design", "Custom Furniture"];
//   const natureOfBusinessOptions = ["Interior Design Services", "Architecture Firm", "Construction Company", "Real Estate Developer", "Consultancy"];
//   const productLines = ["Commercial Interiors", "Residential Interiors", "Modular Furniture", "Lighting Solutions", "Flooring"];
//   const events = ["Design Expo 2024", "Architecture Summit", "Real Estate Conference", "Business Meet", "None"];

//   return (
//     <div className="bg-white shadow-md mt-6 p-6 print:bg-white print:p-0">
//       {/* Header Section */}
//       <div className="w-full">
//         {/* Page Header */}
//         <div className="bg-white rounded-md shadow-sm p-4 mb-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div className="flex items-start gap-4">
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition"
//                   aria-label="Go back"
//                 >
//                   <ArrowLeft size={18} />
//                 </button>

//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                   {companyData.companyName}
//                 </h1>
//                 <div className="flex flex-wrap items-center gap-3 text-sm">
//                   <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
//                     {companyData.category}
//                   </span>
//                   <span className="flex items-center text-gray-600">
//                     <MapPin className="w-4 h-4 mr-1" />
//                     {companyData.city}, {companyData.state}
//                   </span>
//                   <span className="flex items-center text-gray-600">
//                     <Globe className="w-4 h-4 mr-1" />
//                     {companyData.country}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-wrap items-center gap-3">
//               <button
//                 onClick={handlePrint}
//                 className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all shadow-md hover:shadow-lg"
//               >
//                 <Printer className="w-4 h-4" />
//                 <span className="font-medium">Print</span>
//               </button>
              
//               {isEditing ? (
//                 <div className="flex gap-2">
//                   <button
//                     onClick={handleSave}
//                     className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
//                   >
//                     <Save className="w-4 h-4" />
//                     <span className="font-medium">Save</span>
//                   </button>
//                   <button
//                     onClick={handleCancel}
//                     className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all"
//                   >
//                     <X className="w-4 h-4" />
//                     <span className="font-medium">Cancel</span>
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={handleEdit}
//                   className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-md hover:shadow-lg"
//                 >
//                   <Edit className="w-4 h-4" />
//                   <span className="font-medium">Edit</span>
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Main Information */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Company Details */}
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden print:shadow-none print:border">
//               <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
//                 <h2 className="text-xl font-bold text-white flex items-center">
//                   <FileText className="w-6 h-6 mr-2" />
//                   Company Information
//                 </h2>
//               </div>

//               <div className="p-6 space-y-6">
//                 {/* Row 1 */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Company Name <span className="text-red-500">*</span>
//                     </label>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={formData.companyName}
//                         onChange={(e) => handleInputChange('companyName', e.target.value)}
//                         placeholder="Enter company name"
//                         className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       />
//                     ) : (
//                       <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
//                         <p className="text-gray-900 font-medium">{companyData.companyName}</p>
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Category <span className="text-red-500">*</span>
//                     </label>
//                     {isEditing ? (
//                       <select
//                         value={formData.category}
//                         onChange={(e) => handleInputChange('category', e.target.value)}
//                         className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       >
//                         <option value="">Select Category</option>
//                         {categories.map((cat) => (
//                           <option key={cat} value={cat}>{cat}</option>
//                         ))}
//                       </select>
//                     ) : (
//                       <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
//                         <p className="text-gray-900 font-medium">{companyData.category}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Row 2 */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">Security Level</label>
//                     {isEditing ? (
//                       <select
//                         value={formData.security}
//                         onChange={(e) => handleInputChange('security', e.target.value)}
//                         className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       >
//                         <option value="">Select Security Level</option>
//                         <option value="High Security">High Security</option>
//                         <option value="Medium Security">Medium Security</option>
//                         <option value="Low Security">Low Security</option>
//                       </select>
//                     ) : (
//                       <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
//                         <p className="text-gray-900 font-medium">{companyData.security}</p>
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
//                     {isEditing ? (
//                       <select
//                         value={formData.country}
//                         onChange={(e) => handleInputChange('country', e.target.value)}
//                         className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       >
//                         <option value="">Select Country</option>
//                         {countries.map((country) => (
//                           <option key={country} value={country}>{country}</option>
//                         ))}
//                       </select>
//                     ) : (
//                       <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
//                         <p className="text-gray-900 font-medium">{companyData.country}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Row 3 */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
//                     {isEditing ? (
//                       <select
//                         value={formData.state}
//                         onChange={(e) => handleInputChange('state', e.target.value)}
//                         className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       >
//                         <option value="">Select State</option>
//                         {states.map((state) => (
//                           <option key={state} value={state}>{state}</option>
//                         ))}
//                       </select>
//                     ) : (
//                       <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
//                         <p className="text-gray-900 font-medium">{companyData.state}</p>
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={formData.city}
//                         onChange={(e) => handleInputChange('city', e.target.value)}
//                         placeholder="Enter city"
//                         className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       />
//                     ) : (
//                       <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
//                         <p className="text-gray-900 font-medium">{companyData.city}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Row 4 */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={formData.pincode}
//                         onChange={(e) => handleInputChange('pincode', e.target.value)}
//                         placeholder="Enter pincode"
//                         className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       />
//                     ) : (
//                       <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
//                         <p className="text-gray-900 font-medium">{companyData.pincode}</p>
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">Data Source</label>
//                     {isEditing ? (
//                       <select
//                         value={formData.dataSource}
//                         onChange={(e) => handleInputChange('dataSource', e.target.value)}
//                         className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       >
//                         <option value="">Select Data Source</option>
//                         {dataSources.map((source) => (
//                           <option key={source} value={source}>{source}</option>
//                         ))}
//                       </select>
//                     ) : (
//                       <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
//                         <p className="text-gray-900 font-medium">{companyData.dataSource}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Row 5 */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">Enquiry For</label>
//                     {isEditing ? (
//                       <select
//                         value={formData.enquiryFor}
//                         onChange={(e) => handleInputChange('enquiryFor', e.target.value)}
//                         className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       >
//                         <option value="">Select Enquiry For</option>
//                         {enquiryForOptions.map((option) => (
//                           <option key={option} value={option}>{option}</option>
//                         ))}
//                       </select>
//                     ) : (
//                       <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
//                         <p className="text-gray-900 font-medium">{companyData.enquiryFor}</p>
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">Nature of Business</label>
//                     {isEditing ? (
//                       <select
//                         value={formData.natureOfBusiness}
//                         onChange={(e) => handleInputChange('natureOfBusiness', e.target.value)}
//                         className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       >
//                         <option value="">Select Nature of Business</option>
//                         {natureOfBusinessOptions.map((nature) => (
//                           <option key={nature} value={nature}>{nature}</option>
//                         ))}
//                       </select>
//                     ) : (
//                       <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
//                         <p className="text-gray-900 font-medium">{companyData.natureOfBusiness}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Row 6 */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">Product Line</label>
//                     {isEditing ? (
//                       <select
//                         value={formData.productLine}
//                         onChange={(e) => handleInputChange('productLine', e.target.value)}
//                         className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       >
//                         <option value="">Select Product Line</option>
//                         {productLines.map((line) => (
//                           <option key={line} value={line}>{line}</option>
//                         ))}
//                       </select>
//                     ) : (
//                       <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
//                         <p className="text-gray-900 font-medium">{companyData.productLine}</p>
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">Events</label>
//                     {isEditing ? (
//                       <select
//                         value={formData.events}
//                         onChange={(e) => handleInputChange('events', e.target.value)}
//                         className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       >
//                         <option value="">Select Event</option>
//                         {events.map((event) => (
//                           <option key={event} value={event}>{event}</option>
//                         ))}
//                       </select>
//                     ) : (
//                       <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
//                         <p className="text-gray-900 font-medium">{companyData.events}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Address */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Full Address <span className="text-red-500">*</span>
//                   </label>
//                   {isEditing ? (
//                     <textarea
//                       value={formData.address}
//                       onChange={(e) => handleInputChange('address', e.target.value)}
//                       placeholder="Enter complete address"
//                       rows="3"
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                     />
//                   ) : (
//                     <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
//                       <p className="text-gray-900">{companyData.address}</p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Notes */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Additional Notes
//                   </label>
//                   {isEditing ? (
//                     <textarea
//                       value={formData.notes}
//                       onChange={(e) => handleInputChange('notes', e.target.value)}
//                       placeholder="Add any important notes about this client..."
//                       rows="4"
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                     />
//                   ) : (
//                     <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
//                       <p className="text-gray-900 whitespace-pre-line">{companyData.notes}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden print:shadow-none print:border">
//               <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
//                 <h2 className="text-xl font-bold text-white flex items-center">
//                   <Users className="w-6 h-6 mr-2" />
//                   Contact Information
//                 </h2>
//               </div>

//               <div className="p-6 space-y-8">
//                 {/* Primary Contact */}
//                 <div className="border-l-4 border-blue-500 pl-6">
//                   <div className="flex items-center gap-2 mb-4">
//                     <CheckCircle className="w-5 h-5 text-blue-500" />
//                     <h3 className="text-lg font-bold text-gray-900">Primary Contact</h3>
//                     <span className="text-xs text-red-500 font-semibold">(Required)</span>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Full Name <span className="text-red-500">*</span>
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           value={formData.primaryContact.name}
//                           onChange={(e) => handleInputChange('primaryContact.name', e.target.value)}
//                           placeholder="Enter full name"
//                           className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
//                         />
//                       ) : (
//                         <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl">
//                           <p className="text-gray-900 font-medium">{companyData.primaryContact.name}</p>
//                         </div>
//                       )}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           value={formData.primaryContact.designation}
//                           onChange={(e) => handleInputChange('primaryContact.designation', e.target.value)}
//                           placeholder="e.g., Manager, Director"
//                           className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
//                         />
//                       ) : (
//                         <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl">
//                           <p className="text-gray-900 font-medium">{companyData.primaryContact.designation}</p>
//                         </div>
//                       )}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Email Address <span className="text-red-500">*</span>
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="email"
//                           value={formData.primaryContact.email}
//                           onChange={(e) => handleInputChange('primaryContact.email', e.target.value)}
//                           placeholder="email@company.com"
//                           className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
//                         />
//                       ) : (
//                         <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center">
//                           <Mail className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
//                           <p className="text-gray-900 font-medium break-all">{companyData.primaryContact.email}</p>
//                         </div>
//                       )}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Mobile Number <span className="text-red-500">*</span>
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="tel"
//                           value={formData.primaryContact.mobile}
//                           onChange={(e) => handleInputChange('primaryContact.mobile', e.target.value)}
//                           placeholder="+91 XXXXX XXXXX"
//                           className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
//                         />
//                       ) : (
//                         <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center">
//                           <Phone className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
//                           <p className="text-gray-900 font-medium">{companyData.primaryContact.mobile}</p>
//                         </div>
//                       )}
//                     </div>
                    
//                     <div className="md:col-span-2">
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Landline Number</label>
//                       {isEditing ? (
//                         <input
//                           type="tel"
//                           value={formData.primaryContact.landline}
//                           onChange={(e) => handleInputChange('primaryContact.landline', e.target.value)}
//                           placeholder="Enter landline number"
//                           className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
//                         />
//                       ) : (
//                         <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl">
//                           <p className="text-gray-900 font-medium">
//                             {companyData.primaryContact.landline || "Not provided"}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Additional Contact 1 */}
//                 <div className="border-l-4 border-gray-300 pl-6">
//                   <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Contact 1 (Optional)</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {['name', 'designation', 'email', 'mobile', 'landline'].map((field) => (
//                       <div key={field} className={field === 'landline' ? 'md:col-span-2' : ''}>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
//                           {field === 'mobile' ? 'Mobile Number' : field === 'landline' ? 'Landline Number' : field}
//                         </label>
//                         {isEditing ? (
//                           <input
//                             type={field.includes('mail') ? 'email' : field.includes('mobile') || field.includes('landline') ? 'tel' : 'text'}
//                             value={formData.additionalContact1[field]}
//                             onChange={(e) => handleInputChange(`additionalContact1.${field}`, e.target.value)}
//                             placeholder={`Enter ${field}`}
//                             className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
//                           />
//                         ) : (
//                           <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
//                             <p className="text-gray-900 font-medium">
//                               {companyData.additionalContact1[field] || "Not provided"}
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Additional Contact 2 */}
//                 <div className="border-l-4 border-gray-300 pl-6">
//                   <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Contact 2 (Optional)</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {['name', 'designation', 'email', 'mobile', 'landline'].map((field) => (
//                       <div key={field} className={field === 'landline' ? 'md:col-span-2' : ''}>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
//                           {field === 'mobile' ? 'Mobile Number' : field === 'landline' ? 'Landline Number' : field}
//                         </label>
//                         {isEditing ? (
//                           <input
//                             type={field.includes('mail') ? 'email' : field.includes('mobile') || field.includes('landline') ? 'tel' : 'text'}
//                             value={formData.additionalContact2[field]}
//                             onChange={(e) => handleInputChange(`additionalContact2.${field}`, e.target.value)}
//                             placeholder={`Enter ${field}`}
//                             className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
//                           />
//                         ) : (
//                           <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
//                             <p className="text-gray-900 font-medium">
//                               {companyData.additionalContact2[field] || "Not provided"}
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Summary Cards */}
//           <div className="space-y-6">
//             {/* Location Card */}
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden print:border">
//               <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
//                 <h2 className="text-xl font-bold text-white flex items-center">
//                   <MapPin className="w-6 h-6 mr-2" />
//                   Location Details
//                 </h2>
//               </div>
              
//               <div className="p-6 space-y-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-600 mb-2">Address</label>
//                   <div className="flex items-start gap-2">
//                     <MapPin className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
//                     <p className="text-gray-900 font-medium">{companyData.address}</p>
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4 pt-4 border-t">
//                   <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1">City</label>
//                     <p className="text-gray-900 font-bold">{companyData.city}</p>
//                   </div>
                  
//                   <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1">State</label>
//                     <p className="text-gray-900 font-bold">{companyData.state}</p>
//                   </div>
                  
//                   <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1">Pincode</label>
//                     <p className="text-gray-900 font-bold">{companyData.pincode}</p>
//                   </div>
                  
//                   <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1">Country</label>
//                     <p className="text-gray-900 font-bold">{companyData.country}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Quick Actions */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 print:hidden">
//               <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
//               <div className="space-y-3">
//                 <button className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg">
//                   <Phone className="w-5 h-5" />
//                   <span className="font-semibold">Call Primary Contact</span>
//                 </button>
                
//                 <button className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg">
//                   <Mail className="w-5 h-5" />
//                   <span className="font-semibold">Send Email</span>
//                 </button>
                
//                 <button className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg">
//                   <Calendar className="w-5 h-5" />
//                   <span className="font-semibold">Schedule Meeting</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Print Styles */}
//       <style jsx global>{`
//         @media print {
//           body {
//             background: white !important;
//           }
//           .print\\:hidden {
//             display: none !important;
//           }
//           .print\\:shadow-none {
//             box-shadow: none !important;
//           }
//           .print\\:border {
//             border: 1px solid #e5e7eb !important;
//           }
//           .print\\:bg-white {
//             background: white !important;
//           }
//           .print\\:text-gray-900 {
//             color: #111827 !important;
//           }
//           .print\\:border-gray-200 {
//             border-color: #e5e7eb !important;
//           }
//           .print\\:p-0 {
//             padding: 0 !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CompanyProfile;
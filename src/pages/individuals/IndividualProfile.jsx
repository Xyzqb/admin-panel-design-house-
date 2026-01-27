import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X,
  Globe,
  User,
  TrendingUp,
  CheckCircle,
  Clock,
  PauseCircle
} from 'lucide-react';

// Sample client data (in real app, this would come from an API)
const clientsData = [
  {
    id: 1001,
    name: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul.sharma@example.com",
    city: "Mumbai",
    address: "123 Marine Drive, Mumbai, Maharashtra 400001",
    source: "Website",
    enquiryFor: "Consultation",
    status: "Pending",
    addedDate: "2024-01-10",
    updatedDate: "2026-01-23",
    notes: "Interested in business consultation services. Prefers morning appointments.",
    lastContact: "2026-01-20",
    nextFollowUp: "2026-01-30",
    tags: ["Business", "High Priority", "Consultation"],
    activity: [
      { date: "2026-01-23", action: "Status updated to Pending" },
      { date: "2026-01-20", action: "Phone call - discussed requirements" },
      { date: "2024-01-10", action: "Initial enquiry submitted through website" }
    ]
  },
  {
    id: 1002,
    name: "Priya Patel",
    phone: "8765432109",
    email: "priya.patel@example.com",
    city: "Delhi",
    address: "456 Connaught Place, New Delhi 110001",
    source: "Referral",
    enquiryFor: "Service",
    status: "Inactive",
    addedDate: "2024-01-08",
    updatedDate: "2026-01-23",
    notes: "Referred by existing client. Interested in premium service package.",
    lastContact: "2026-01-15",
    nextFollowUp: "2026-02-15",
    tags: ["Referral", "Premium", "Follow-up"],
    activity: [
      { date: "2026-01-23", action: "Status updated to Inactive" },
      { date: "2026-01-15", action: "Email sent with service details" },
      { date: "2024-01-08", action: "Referral received" }
    ]
  },
  {
    id: 1003,
    name: "Amit Kumar",
    phone: "7654321098",
    email: "amit.kumar@example.com",
    city: "Bangalore",
    address: "789 MG Road, Bangalore, Karnataka 560001",
    source: "Walk-in",
    enquiryFor: "Product",
    status: "Completed",
    addedDate: "2024-01-05",
    updatedDate: "2024-01-13",
    notes: "Product demo completed. Purchase successful.",
    lastContact: "2024-01-13",
    nextFollowUp: "N/A",
    tags: ["Completed", "Product Sale", "Satisfied"],
    activity: [
      { date: "2024-01-13", action: "Sale completed" },
      { date: "2024-01-12", action: "Product demo conducted" },
      { date: "2024-01-05", action: "Walk-in enquiry" }
    ]
  },
  {
    id: 1004,
    name: "Sneha Reddy",
    phone: "6543210987",
    email: "sneha.reddy@example.com",
    city: "Hyderabad",
    address: "321 Banjara Hills, Hyderabad, Telangana 500034",
    source: "Social Media",
    enquiryFor: "Quotation",
    status: "Active",
    addedDate: "2024-01-03",
    updatedDate: "2024-01-12",
    notes: "Requested detailed quotation. Budget: ₹50,000-75,000",
    lastContact: "2024-01-12",
    nextFollowUp: "2026-01-25",
    tags: ["Social Media", "Quotation", "Budget"],
    activity: [
      { date: "2024-01-12", action: "Quotation sent via email" },
      { date: "2024-01-10", action: "Requirements discussed" },
      { date: "2024-01-03", action: "Enquiry through Instagram" }
    ]
  },
  {
    id: 1005,
    name: "Vikram Singh",
    phone: "5432108976",
    email: "vikram.singh@example.com",
    city: "Pune",
    address: "654 FC Road, Pune, Maharashtra 411004",
    source: "Email Campaign",
    enquiryFor: "Support",
    status: "Inactive",
    addedDate: "2024-01-01",
    updatedDate: "2024-01-10",
    notes: "Technical support request. Issue resolved on 2024-01-10",
    lastContact: "2024-01-10",
    nextFollowUp: "N/A",
    tags: ["Support", "Resolved", "Technical"],
    activity: [
      { date: "2024-01-10", action: "Support ticket closed" },
      { date: "2024-01-08", action: "Technical support provided" },
      { date: "2024-01-01", action: "Support request via email" }
    ]
  }
];

// Status icons mapping
const statusIcons = {
  Pending: Clock,
  Active: TrendingUp,
  Inactive: PauseCircle,
  Completed: CheckCircle
};

// Status colors mapping
const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-gray-100 text-gray-800",
  Completed: "bg-blue-100 text-blue-800"
};

const ClientProfile = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchClient = () => {
      setLoading(true);
      setTimeout(() => {
        const foundClient = clientsData.find(c => c.id === parseInt(id));
        setClient(foundClient);
        setEditedData(foundClient || {});
        setLoading(false);
      }, 300);
    };

    fetchClient();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // In real app, this would be an API call
    setClient({ ...client, ...editedData });
    setIsEditing(false);
    // Show success message
    alert('Changes saved successfully!');
  };

  const handleCancel = () => {
    setEditedData(client);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading client profile...</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Client Not Found</h2>
          <p className="text-gray-600 mb-4">The client you're looking for doesn't exist.</p>
          <Link 
            to="/individual-clients-list"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clients List
          </Link>
        </div>
      </div>
    );
  }

  const StatusIcon = statusIcons[client.status];
  const statusColorClass = statusColors[client.status];

  return (
    <div className="bg-white shadow-md p-4 md:p-6 mt-6">
      {/* Header with Back Button */}
      <div className="mb-6 w-full">
        <Link 
          to="/clients" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Clients List
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{client.name}</h1>
            <p className="text-gray-600">Client ID: {client.id}</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColorClass} flex items-center`}>
              {StatusIcon && <StatusIcon className="w-4 h-4 mr-1" />}
              {client.status}
            </span>
            
            {isEditing ? (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Client Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{client.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{client.phone}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{client.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  City
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{client.city}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                {isEditing ? (
                  <textarea
                    value={editedData.address || ''}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{client.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Enquiry Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-blue-600" />
              Enquiry Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  {isEditing ? (
                    <select
                      value={editedData.source || ''}
                      onChange={(e) => handleInputChange('source', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Walk-in">Walk-in</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Email Campaign">Email Campaign</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{client.source}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enquiry For</label>
                  {isEditing ? (
                    <select
                      value={editedData.enquiryFor || ''}
                      onChange={(e) => handleInputChange('enquiryFor', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Consultation">Consultation</option>
                      <option value="Service">Service</option>
                      <option value="Product">Product</option>
                      <option value="Quotation">Quotation</option>
                      <option value="Support">Support</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{client.enquiryFor}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  {isEditing ? (
                    <select
                      value={editedData.status || ''}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{client.status}</p>
                  )}
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Added Date
                  </label>
                  <p className="text-gray-900">{client.addedDate}</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Last Updated
                  </label>
                  <p className="text-gray-900">{client.updatedDate}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Next Follow-up</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editedData.nextFollowUp || ''}
                      onChange={(e) => handleInputChange('nextFollowUp', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{client.nextFollowUp}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notes Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
            {isEditing ? (
              <textarea
                value={editedData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add notes about this client..."
              />
            ) : (
              <p className="text-gray-700 whitespace-pre-line">{client.notes}</p>
            )}
          </div>
        </div>

        {/* Right Column - Tags & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Phone className="w-4 h-4 mr-2" />
                Call Client
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </button>
            </div>
          </div>

          {/* Contact Summary Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Last Contact:</span>
                <span className="font-medium">{client.lastContact}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next Follow-up:</span>
                <span className="font-medium">{client.nextFollowUp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Interactions:</span>
                <span className="font-medium">{client.activity.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;

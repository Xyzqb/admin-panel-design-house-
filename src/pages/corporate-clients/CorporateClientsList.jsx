// import { useState } from 'react';
// import Table from '../../components/table/Table';
// import { User, Search, Download, MessageSquare, Phone, Mail, Calendar, Edit, Trash2, ChevronDown, ChevronUp, CheckCircle, XCircle, AlertCircle, Filter } from 'lucide-react';
// import Pagination from '../../components/Pagination';
// import { useRef } from 'react';

// const ClientsTable = () => {
//   const [clients, setClients] = useState([
//     {
//       id: "CLI001",
//       companyName: "TechNova Solutions",
//       contactName: "Rahul Mehta",
//       contactPhone: "+91 98765 43210",
//       contactEmail: "rahul@technova.com",
//       category: "Technology",
//       nature: "Software Development",
//       state: "Delhi",
//       city: "New Delhi",
//       source: "Website",
//       enquiryFor: "Office Interior",
//       status: "active",
//       updatedStatus: "Contacted",
//       updatedDetails: "Initial discussion completed. Client requested detailed proposal.",
//       createdAt: "2024-01-12",
//       lastContact: "2024-03-10",
//       priority: "high",
//       tags: ["VIP", "Repeat"],
//       notes: "Interested in full office renovation. Budget approved."
//     },
//     {
//       id: "CLI002",
//       companyName: "UrbanSpace Designs",
//       contactName: "Ananya Sharma",
//       contactPhone: "+91 91234 56789",
//       contactEmail: "ananya@urbanspace.com",
//       category: "Design",
//       nature: "Interior Design",
//       state: "Maharashtra",
//       city: "Mumbai",
//       source: "Referral",
//       enquiryFor: "Workspace Design",
//       status: "pending",
//       updatedStatus: "Proposal Sent",
//       updatedDetails: "Awaiting approval from management. Follow-up scheduled next week.",
//       createdAt: "2024-02-03",
//       lastContact: "2024-03-14",
//       priority: "medium",
//       tags: ["New"],
//       notes: "Design-focused client. Requires modern aesthetic."
//     },
//     {
//       id: "CLI003",
//       companyName: "GreenGrid Energy",
//       contactName: "Amit Verma",
//       contactPhone: "+91 99887 66554",
//       contactEmail: "amit@greengrid.com",
//       category: "Energy",
//       nature: "Renewable Energy",
//       state: "Karnataka",
//       city: "Bengaluru",
//       source: "Trade Show",
//       enquiryFor: "Office Renovation",
//       status: "inactive",
//       updatedStatus: "On Hold",
//       updatedDetails: "Budget constraints. Will reconsider next quarter.",
//       createdAt: "2023-11-20",
//       lastContact: "2024-02-25",
//       priority: "low",
//       tags: ["Budget", "Follow-up"],
//       notes: "Environmentally conscious. Wants sustainable materials."
//     },
//     {
//       id: "CLI004",
//       companyName: "MediCare Hospitals",
//       contactName: "Dr. Priya Singh",
//       contactPhone: "+91 98989 87878",
//       contactEmail: "priya@medicare.com",
//       category: "Healthcare",
//       nature: "Hospital Management",
//       state: "Tamil Nadu",
//       city: "Chennai",
//       source: "Email Campaign",
//       enquiryFor: "Hospital Interior",
//       status: "active",
//       updatedStatus: "Meeting Scheduled",
//       updatedDetails: "Site visit arranged for next Monday at 2 PM.",
//       createdAt: "2024-02-15",
//       lastContact: "2024-03-12",
//       priority: "high",
//       tags: ["VIP", "Urgent"],
//       notes: "Large project. Requires special compliance standards."
//     },
//     {
//       id: "CLI005",
//       companyName: "EduSmart Solutions",
//       contactName: "Rohit Kumar",
//       contactPhone: "+91 97654 32109",
//       contactEmail: "rohit@edusmart.com",
//       category: "Education",
//       nature: "EdTech",
//       state: "Telangana",
//       city: "Hyderabad",
//       source: "Social Media",
//       enquiryFor: "Campus Design",
//       status: "pending",
//       updatedStatus: "Negotiation",
//       updatedDetails: "Price negotiation in progress. Finalizing terms.",
//       createdAt: "2024-01-28",
//       lastContact: "2024-03-08",
//       priority: "medium",
//       tags: ["New", "Large Project"],
//       notes: "Building new campus. Timeline: 6 months."
//     },
//     {
//       id: "CLI006",
//       companyName: "Retail Hub India",
//       contactName: "Neha Gupta",
//       contactPhone: "+91 93456 78901",
//       contactEmail: "neha@retailhub.com",
//       category: "Retail",
//       nature: "Fashion Retail",
//       state: "Gujarat",
//       city: "Ahmedabad",
//       source: "Referral",
//       enquiryFor: "Store Design",
//       status: "active",
//       updatedStatus: "Closed Won",
//       updatedDetails: "Contract signed. Project kickoff next week.",
//       createdAt: "2023-12-10",
//       lastContact: "2024-03-15",
//       priority: "high",
//       tags: ["Repeat", "VIP"],
//       notes: "Existing client. Expanding to 5 new locations."
//     }
//   ]);

//   const columns = [
//     {
//       label: "Client Details",
//       key: "companyName",
//       render: (row) => (
//         <div className="min-w-[250px]">
//           <div className="flex items-start gap-3">
//             <div className="mt-1">
//               <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">
//                 {row.companyName.charAt(0)}
//               </div>
//             </div>
//             <div className="flex-1">
//               <div className="flex items-center gap-2">
//                 <div className="font-bold text-gray-900">{row.companyName}</div>
//                 {row.tags?.includes("VIP") && (
//                   <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">VIP</span>
//                 )}
//                 {row.tags?.includes("Repeat") && (
//                   <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Repeat</span>
//                 )}
//               </div>
//               <div className="text-sm text-gray-500 mt-1">ID: {row.id}</div>
//               <div className="flex items-center gap-4 mt-2">
//                 <div className="flex items-center gap-1 text-xs text-gray-500">
//                   <Calendar className="h-3 w-3" />
//                   Created: {row.createdAt}
//                 </div>
//                 <div className={`px-2 py-1 rounded-full text-xs font-medium ${row.priority === 'high' ? 'bg-red-100 text-red-800' : row.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
//                   {row.priority.charAt(0).toUpperCase() + row.priority.slice(1)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       label: "Contact Information",
//       key: "contactName",
//       render: (row) => (
//         <div className="min-w-[200px]">
//           <div className="font-semibold text-gray-900">{row.contactName}</div>
//           <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
//             <Phone className="h-3 w-3" />
//             <a href={`tel:${row.contactPhone}`} className="hover:text-blue-600">{row.contactPhone}</a>
//           </div>
//           <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
//             <Mail className="h-3 w-3" />
//             <a href={`mailto:${row.contactEmail}`} className="hover:text-blue-600 truncate">{row.contactEmail}</a>
//           </div>
//         </div>
//       ),
//     },
//     {
//       label: "Category & Location",
//       key: "category",
//       render: (row) => (
//         <div className="min-w-[180px]">
//           <div className="flex flex-col gap-2">
//             <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-sm font-medium border border-amber-200">
//               {row.category}
//             </span>
//             <div className="mt-2">
//               <div className="text-sm font-medium text-gray-700">{row.nature}</div>
//               <div className="text-xs text-gray-500 mt-1">
//                 {row.city}, {row.state}
//               </div>
//             </div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       label: "Source & Enquiry",
//       key: "source",
//       render: (row) => (
//         <div className="min-w-[150px]">
//           <div className="font-medium text-gray-700">{row.source}</div>
//           <div className="text-xs text-gray-500 mt-1">{row.enquiryFor}</div>
//           <div className="mt-2 text-xs">
//             Last Contact: <span className="font-medium">{row.lastContact}</span>
//           </div>
//         </div>
//       ),
//     },
//     {
//       label: "Status",
//       key: "status",
//       render: (row) => (
//         <div className="min-w-[120px]">
//           <div className="flex flex-col gap-2">
//             <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(row.status)}`}>
//               {row.status === 'active' && <CheckCircle className="h-3 w-3" />}
//               {row.status === 'pending' && <AlertCircle className="h-3 w-3" />}
//               {row.status === 'inactive' && <XCircle className="h-3 w-3" />}
//               {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
//             </span>
//             <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${getUpdatedStatusColor(row.updatedStatus)}`}>
//               {row.updatedStatus}
//             </span>
//           </div>
//         </div>
//       ),
//     },
//     {
//       label: "Actions",
//       key: "actions",
//       render: (row) => (
//         <div className="min-w-[150px]">
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => startEditing(row)}
//               className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//               title="Edit"
//             >
//               <Edit className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() => handleDelete(row.id)}
//               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//               title="Delete"
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() => handleSendMessage(row)}
//               className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//               title="Send Message"
//             >
//               <MessageSquare className="h-4 w-4" />
//             </button>
//             {expandedRow === row.id ? (
//               <button
//                 onClick={() => setExpandedRow(null)}
//                 className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
//                 title="Collapse"
//               >
//                 <ChevronUp className="h-4 w-4" />
//               </button>
//             ) : (
//               <button
//                 onClick={() => setExpandedRow(row.id)}
//                 className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
//                 title="Expand"
//               >
//                 <ChevronDown className="h-4 w-4" />
//               </button>
//             )}
//           </div>
//           <div className="mt-3">
//             <button
//               onClick={() => handleCallClient(row)}
//               className="w-full py-1.5 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1"
//             >
//               <Phone className="h-3 w-3" />
//               Call Now
//             </button>
//           </div>
//         </div>
//       ),
//     },
//   ];

//   const tableScrollRef = useRef(null);
//   const [scrollValue, setScrollValue] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [editingRow, setEditingRow] = useState(null);
//   const [editData, setEditData] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [priorityFilter, setPriorityFilter] = useState('all');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [showMessageBox, setShowMessageBox] = useState(false);
//   const [messageRecipient, setMessageRecipient] = useState(null);
//   const [messageText, setMessageText] = useState('');
//   const [messageHistory, setMessageHistory] = useState([
//     { id: 1, sender: 'Rahul Mehta', time: '2024-03-10 14:30', text: 'Looking forward to the proposal!' },
//     { id: 2, sender: 'You', time: '2024-03-10 14:45', text: 'Proposal has been sent. Please check your email.' },
//   ]);

//   // Filter & sort
//   const filteredAndSortedClients = clients
//     .filter(client => {
//       const matchesSearch =
//         client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         client.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         client.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         client.id.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
//       const matchesCategory = categoryFilter === 'all' || client.category === categoryFilter;
//       const matchesPriority = priorityFilter === 'all' || client.priority === priorityFilter;

//       return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
//     })
//     .sort((a, b) => {
//       if (!sortConfig.key) return 0;

//       if (sortConfig.key === 'priority') {
//         const priorityOrder = { high: 3, medium: 2, low: 1 };
//         return sortConfig.direction === 'asc'
//           ? priorityOrder[a.priority] - priorityOrder[b.priority]
//           : priorityOrder[b.priority] - priorityOrder[a.priority];
//       }

//       if (sortConfig.key === 'createdAt' || sortConfig.key === 'lastContact') {
//         return sortConfig.direction === 'asc'
//           ? new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])
//           : new Date(b[sortConfig.key]) - new Date(a[sortConfig.key]);
//       }

//       return sortConfig.direction === 'asc'
//         ? a[sortConfig.key]?.toString().localeCompare(b[sortConfig.key]?.toString())
//         : b[sortConfig.key]?.toString().localeCompare(a[sortConfig.key]?.toString());
//     });

//   // Paginate
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedClients = filteredAndSortedClients.slice(startIndex, startIndex + itemsPerPage);

//   // Options
//   const categories = ['Technology', 'Design', 'Energy', 'Healthcare', 'Retail', 'Finance', 'Manufacturing', 'Education'];
//   const statusOptions = ['active', 'pending', 'inactive'];
//   const updatedStatusOptions = ['New Enquiry', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost', 'On Hold'];
//   const priorityOptions = ['high', 'medium', 'low'];

//   // Handle sort
//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Get status color
//   const getStatusColor = (status) => {
//     const colors = {
//       active: 'bg-green-100 text-green-800 border border-green-300',
//       pending: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
//       inactive: 'bg-red-100 text-red-800 border border-red-300',
//     };
//     return colors[status] || colors.pending;
//   };

//   const getUpdatedStatusColor = (status) => {
//     const colors = {
//       'New Enquiry': 'bg-blue-100 text-blue-800 border border-blue-300',
//       'Contacted': 'bg-indigo-100 text-indigo-800 border border-indigo-300',
//       'Meeting Scheduled': 'bg-purple-100 text-purple-800 border border-purple-300',
//       'Proposal Sent': 'bg-amber-100 text-amber-800 border border-amber-300',
//       'Negotiation': 'bg-orange-100 text-orange-800 border border-orange-300',
//       'Closed Won': 'bg-emerald-100 text-emerald-800 border border-emerald-300',
//       'Closed Lost': 'bg-rose-100 text-rose-800 border border-rose-300',
//       'On Hold': 'bg-gray-100 text-gray-800 border border-gray-300',
//     };
//     return colors[status] || colors['New Enquiry'];
//   };

//   // Edit functionality
//   const startEditing = (client) => {
//     setEditingRow(client.id);
//     setEditData({ ...client });
//   };

//   const saveEdit = () => {
//     const updatedClients = clients.map(client =>
//       client.id === editData.id ? { ...editData, lastContact: new Date().toISOString().split('T')[0] } : client
//     );
//     setClients(updatedClients);
//     setEditingRow(null);
//     setEditData({});
//     alert('Client information updated successfully!');
//   };

//   const cancelEdit = () => {
//     setEditingRow(null);
//     setEditData({});
//   };

//   const handleEditChange = (field, value) => {
//     setEditData(prev => ({ ...prev, [field]: value }));
//   };

//   // Delete functionality
//   const handleDelete = (clientId) => {
//     if (window.confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
//       setClients(clients.filter(client => client.id !== clientId));
//       alert('Client deleted successfully!');
//     }
//   };

//   // Add new client
//   const handleAddClient = () => {
//     const newClient = {
//       id: `CLI${String(clients.length + 1).padStart(3, '0')}`,
//       companyName: 'New Client Corporation',
//       contactName: 'Contact Person',
//       contactPhone: '+1 (555) 000-0000',
//       contactEmail: 'email@example.com',
//       category: 'Technology',
//       nature: 'Business Services',
//       state: 'State',
//       city: 'City',
//       source: 'Website',
//       enquiryFor: 'Office Interior',
//       status: 'pending',
//       updatedStatus: 'New Enquiry',
//       updatedDetails: 'New client added to the system',
//       createdAt: new Date().toISOString().split('T')[0],
//       lastContact: new Date().toISOString().split('T')[0],
//       priority: 'medium',
//       tags: ['New'],
//       notes: 'Initial registration. Follow up required.'
//     };
//     setClients([newClient, ...clients]);
//     alert('New client added successfully!');
//   };

//   // Export data
//   const handleExport = () => {
//     const csvContent = [
//       ['ID', 'Company Name', 'Contact Name', 'Phone', 'Email', 'Category', 'Nature', 'State', 'City', 'Source', 'Enquiry For', 'Status', 'Updated Status', 'Priority', 'Created', 'Last Contact'],
//       ...clients.map(client => [
//         client.id,
//         client.companyName,
//         client.contactName,
//         client.contactPhone,
//         client.contactEmail,
//         client.category,
//         client.nature,
//         client.state,
//         client.city,
//         client.source,
//         client.enquiryFor,
//         client.status,
//         client.updatedStatus,
//         client.priority,
//         client.createdAt,
//         client.lastContact,
//       ])
//     ].map(row => row.join(',')).join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `clients_export_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     alert('Export completed successfully!');
//   };

//   // Message functionality
//   const handleSendMessage = (client) => {
//     setMessageRecipient(client);
//     setShowMessageBox(true);
//     setMessageText('');
//   };

//   const handleCallClient = (client) => {
//     alert(`Calling ${client.contactName} at ${client.contactPhone}`);
//   };

//   const sendMessage = () => {
//     if (!messageText.trim()) return;

//     const newMessage = {
//       id: messageHistory.length + 1,
//       sender: 'You',
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       text: messageText
//     };

//     setMessageHistory([...messageHistory, newMessage]);
//     setMessageText('');

//     // Simulate auto-reply after 2 seconds
//     setTimeout(() => {
//       const autoReply = {
//         id: messageHistory.length + 2,
//         sender: messageRecipient.contactName,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         text: 'Thank you for your message. I will get back to you soon.'
//       };
//       setMessageHistory(prev => [...prev, autoReply]);
//     }, 2000);
//   };

//   // Statistics
//   const stats = {
//     total: clients.length,
//     active: clients.filter(c => c.status === 'active').length,
//     pending: clients.filter(c => c.status === 'pending').length,
//     highPriority: clients.filter(c => c.priority === 'high').length,
//     thisMonth: clients.filter(c => new Date(c.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg border border-gray-200 mt-6">
//       {/* Header */}
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-amber-700">Corporate Clients Management</h1>
//             <p className="text-gray-600 mt-2 text-lg">Manage all your corporate clients efficiently</p>
//           </div>
//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={handleAddClient}
//               className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center gap-2 shadow-md"
//             >
//               <User className="h-4 w-4" />
//               Add New Client
//             </button>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
//           <div className="flex items-center gap-2 mb-4">
//             <Filter className="h-4 w-4 text-gray-500" />
//             <h3 className="font-semibold text-gray-700">Filter & Search Clients</h3>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by name, company, ID or city..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//               />
//             </div>

//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
//             >
//               <option value="all">All Status</option>
//               <option value="active">Active</option>
//               <option value="pending">Pending</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>

//           <div className="mt-4 flex items-center justify-between">
//             <div className="text-sm text-gray-600">
//               Showing <span className="font-bold">{filteredAndSortedClients.length}</span> of <span className="font-bold">{clients.length}</span> clients
//             </div>
//             <div className="text-sm">
//               <label className="text-gray-600 mr-2">Items per page:</label>
//               <select
//                 value={itemsPerPage}
//                 onChange={(e) => setItemsPerPage(Number(e.target.value))}
//                 className="px-3 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
//               >
//                 <option value="5">5</option>
//                 <option value="10">10</option>
//                 <option value="20">20</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div
//         ref={tableScrollRef}
//         className="overflow-x-auto scroll-smooth"
//         onScroll={(e) => {
//           const el = e.target;
//           setScrollValue(
//             (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100
//           );
//         }}
//       >
//         <Table
//           columns={columns}
//           data={paginatedClients}
//           onEdit={startEditing}
//           onDelete={(row) => handleDelete(row.id)}
//         />

//         {/* Expanded Row Details */}
//         {expandedRow && clients.find(c => c.id === expandedRow) && (
//           <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//                   <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                     <MessageSquare className="h-4 w-4" />
//                     Notes & Details
//                   </h4>
//                   <p className="text-gray-600 text-sm">
//                     {clients.find(c => c.id === expandedRow).notes}
//                   </p>
//                   <div className="mt-4">
//                     <h5 className="text-sm font-medium text-gray-700 mb-2">Update Details:</h5>
//                     <p className="text-gray-600 text-sm">
//                       {clients.find(c => c.id === expandedRow).updatedDetails}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//                   <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                     <Calendar className="h-4 w-4" />
//                     Timeline
//                   </h4>
//                   <div className="space-y-3">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-500">Created:</span>
//                       <span className="font-medium">{clients.find(c => c.id === expandedRow).createdAt}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-500">Last Contact:</span>
//                       <span className="font-medium">{clients.find(c => c.id === expandedRow).lastContact}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-500">Next Follow-up:</span>
//                       <span className="font-medium text-blue-600">
//                         {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//                   <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                     <Tag className="h-4 w-4" />
//                     Tags & Actions
//                   </h4>
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {clients.find(c => c.id === expandedRow).tags?.map((tag, index) => (
//                       <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                   <div className="space-y-2">
//                     <button
//                       onClick={() => handleSendMessage(clients.find(c => c.id === expandedRow))}
//                       className="w-full py-2 text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
//                     >
//                       <MessageSquare className="h-4 w-4" />
//                       Send Message
//                     </button>
//                     <button
//                       onClick={() => handleCallClient(clients.find(c => c.id === expandedRow))}
//                       className="w-full py-2 text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
//                     >
//                       <Phone className="h-4 w-4" />
//                       Schedule Call
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Pagination */}
//         {filteredAndSortedClients.length > 0 && (
//           <div className="mt-4 mb-6 px-6">
//             <Pagination
//               currentPage={currentPage}
//               totalItems={filteredAndSortedClients.length}
//               itemsPerPage={itemsPerPage}
//               onPageChange={setCurrentPage}
//             />
//           </div>
//         )}

//         {/* Message Box */}
//         {showMessageBox && (
//           <div className="border-t border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
//             <div className="p-6">
//               <div className="bg-white rounded-xl shadow-lg border border-gray-200 max-w-4xl mx-auto">
//                 <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-xl">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <MessageSquare className="h-5 w-5 text-white" />
//                       <h3 className="text-lg font-semibold text-white">
//                         Message to {messageRecipient?.contactName} ({messageRecipient?.companyName})
//                       </h3>
//                     </div>
//                     <button
//                       onClick={() => setShowMessageBox(false)}
//                       className="text-white hover:text-gray-200 transition-colors"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 </div>

//                 <div className="p-4 max-h-96 overflow-y-auto">
//                   <div className="space-y-4">
//                     {messageHistory.map((msg) => (
//                       <div
//                         key={msg.id}
//                         className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
//                       >
//                         <div
//                           className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-3 ${msg.sender === 'You'
//                             ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
//                             : 'bg-gray-100 text-gray-800'
//                             }`}
//                         >
//                           <div className="text-xs opacity-75 mb-1">
//                             {msg.sender} • {msg.time}
//                           </div>
//                           <div className="text-sm">{msg.text}</div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="p-4 border-t border-gray-200">
//                   <div className="flex gap-3">
//                     <input
//                       type="text"
//                       value={messageText}
//                       onChange={(e) => setMessageText(e.target.value)}
//                       placeholder="Type your message here..."
//                       className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                       onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//                     />
//                     <button
//                       onClick={sendMessage}
//                       disabled={!messageText.trim()}
//                       className={`px-6 py-3 rounded-lg flex items-center gap-2 ${messageText.trim()
//                         ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
//                         : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                         } transition-all`}
//                     >
//                       <MessageSquare className="h-4 w-4" />
//                       Send
//                     </button>
//                   </div>
//                   <div className="mt-3 text-xs text-gray-500">
//                     Press Enter to send • Messages are stored locally
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClientsTable;


import { useState } from 'react';
import Table from '../../components/table/Table';
import { User, Search } from 'lucide-react';
import Pagination from '../../components/Pagination';

const ClientsTable = () => {
  const [clients, setClients] = useState([
    {
      id: "CLI001",
      companyName: "TechNova Solutions",
      contactName: "Rahul Mehta",
      contactPhone: "+91 98765 43210",
      contactEmail: "rahul@technova.com",
      category: "Technology",
      nature: "Software Development",
      state: "Delhi",
      city: "New Delhi",
      source: "Website",
      enquiryFor: "Office Interior",
      status: "active",
      updatedStatus: "Contacted",
      updatedDetails: "Initial discussion completed",
      createdAt: "2024-01-12",
      lastContact: "2024-03-10",
    },
    {
      id: "CLI002",
      companyName: "UrbanSpace Designs",
      contactName: "Ananya Sharma",
      contactPhone: "+91 91234 56789",
      contactEmail: "ananya@urbanspace.com",
      category: "Design",
      nature: "Interior Design",
      state: "Maharashtra",
      city: "Mumbai",
      source: "Referral",
      enquiryFor: "Workspace Design",
      status: "pending",
      updatedStatus: "Proposal Sent",
      updatedDetails: "Awaiting approval",
      createdAt: "2024-02-03",
      lastContact: "2024-03-14",
    },
    {
      id: "CLI003",
      companyName: "GreenGrid Energy",
      contactName: "Amit Verma",
      contactPhone: "+91 99887 66554",
      contactEmail: "amit@greengrid.com",
      category: "Energy",
      nature: "Renewable Energy",
      state: "Karnataka",
      city: "Bengaluru",
      source: "Trade Show",
      enquiryFor: "Office Renovation",
      status: "inactive",
      updatedStatus: "On Hold",
      updatedDetails: "Budget issue",
      createdAt: "2023-11-20",
      lastContact: "2024-02-25",
    },])

  const columns = [
    {
      label: "Company Name",
      key: "companyName",
      render: (row) => (
        <div>
          <div className="font-medium">{row.companyName}</div>
          <div className="text-xs text-gray-500">ID: {row.id}</div>
        </div>
      ),
    },
    {
      label: "Contact Details",
      key: "contactName",
      render: (row) => (
        <div>
          <div className="font-medium">{row.contactName}</div>
          <div className="text-sm text-gray-500">{row.contactPhone}</div>
        </div>
      ),
    },
    {
      label: "Category",
      key: "category",
      render: (row) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium text-gray-700">
          {row.category}
        </span>
      ),
    },
    {
      label: "nature",
      key: "nature",
      render: (row) => (
        <span className='px-3 py-1 rounded-full text-xs font-medium text-gray-700 '>
          {row.nature}
        </span>
      ),
    },
    {
      label: "state/City",
      key: "state",
      render: (row) => (
        <div>
          <div className="font-medium">{row.state}</div>
          <div className="text-xs text-gray-500">{row.city}</div>
        </div>
        // <span className='px-3 py-1 rounded-full text-xs font-medium text-gray-700'>
        //   {row.state}
        // </span>

      ),
    },
    // {
    //   label: "city",
    //   key: "city",
    //   render: (row) => (
    //     <span className='px-3 py-1 rounded-full text-xs font-medium text-gray-700'>
    //       {row.city}
    //     </span>
    //   ),
    // },
    {
      label: "source/enqFor",
      key: "source",
      render: (row) => (
        <div>
          <div className="font-medium">{row.source}</div>
          <div className="text-xs text-gray-500">{row.enquiryFor}</div>
        </div>
        // <span className='px-3 py-1 rounded-full text-xs font-medium text-gray-700'>
        //   {row.source}
        // </span>
      ),
    },
    // {
    //   label: "enqFor",
    //   key: "enqFor",
    //   render: (row) => (
    //     <span className='px-3 py-1 rounded-full text-xs font-medium text-gray-700'>
    //       {row.enquiryFor}
    //     </span>
    //   ),
    // },
    {
      label: "status",
      key: "status",
      render: (row) => (
        <span className='px-3 py-1 rounded-full text-xs font-medium text-gray-700'>
          {row.status}
        </span>
      ),
    },
     {
      label: "Updated status",
      key: "status",
      render: (row) => (
        <span className='px-3 py-1 rounded-full text-xs font-medium text-gray-700'>
          {row.updatedStatus}
        </span>
      ),
    },
     {
      label: "Updated Details",
      key: "status",
      render: (row) => (
        <span className='px-3 py-1 rounded-full text-xs font-medium text-gray-700'>
          {row.updatedDetails}
        </span>
      ),
    },
  ];


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // or 10
  const [editingRow, setEditingRow] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedRow, setExpandedRow] = useState(null);

  // 1️⃣ Filter & sort FIRST
  const filteredAndSortedClients = clients
    .filter(client => {
      const matchesSearch =
        client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || client.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      return sortConfig.direction === 'asc'
        ? a[sortConfig.key]?.toString().localeCompare(b[sortConfig.key]?.toString())
        : b[sortConfig.key]?.toString().localeCompare(a[sortConfig.key]?.toString());
    });

  // 2️⃣ THEN paginate
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredAndSortedClients.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Categories and status options
  const categories = ['Technology', 'Design', 'Energy', 'Healthcare', 'Retail', 'Finance', 'Manufacturing', 'Education'];
  const statusOptions = ['active', 'pending', 'inactive'];
  const updatedStatusOptions = ['New Enquiry', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost', 'On Hold'];

  // Handle sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800 border border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      inactive: 'bg-red-100 text-red-800 border border-red-200',
    };
    return colors[status] || colors.pending;
  };

  const getUpdatedStatusColor = (status) => {
    const colors = {
      'New Enquiry': 'bg-blue-100 text-blue-800 border border-blue-200',
      'Contacted': 'bg-indigo-100 text-indigo-800 border border-indigo-200',
      'Meeting Scheduled': 'bg-purple-100 text-purple-800 border border-purple-200',
      'Proposal Sent': 'bg-amber-100 text-amber-800 border border-amber-200',
      'Negotiation': 'bg-orange-100 text-orange-800 border border-orange-200',
      'Closed Won': 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      'Closed Lost': 'bg-rose-100 text-rose-800 border border-rose-200',
      'On Hold': 'bg-gray-100 text-gray-800 border border-gray-200',
    };
    return colors[status] || colors['New Enquiry'];
  };

  // Edit functionality
  const startEditing = (client) => {
    setEditingRow(client.id);
    setEditData({ ...client });
  };

  const saveEdit = () => {
    const updatedClients = clients.map(client =>
      client.id === editData.id ? { ...editData, lastContact: new Date().toISOString().split('T')[0] } : client
    );
    setClients(updatedClients);
    setEditingRow(null);
    setEditData({});
  };

  const cancelEdit = () => {
    setEditingRow(null);
    setEditData({});
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  // Delete functionality
  const handleDelete = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(client => client.id !== clientId));
    }
  };

  // Add new client
  const handleAddClient = () => {
    const newClient = {
      id: `CLI${String(clients.length + 1).padStart(3, '0')}`,
      companyName: 'New Client',
      contactName: 'Contact Person',
      contactPhone: '+1 (555) 000-0000',
      contactEmail: 'email@example.com',
      category: 'Technology',
      nature: 'Business',
      state: 'State',
      city: 'City',
      source: 'Website',
      enquiryFor: 'Office Interior',
      status: 'pending',
      updatedStatus: 'New Enquiry',
      updatedDetails: 'New client added',
      createdAt: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
    };
    setClients([newClient, ...clients]);
  };

  // Export data
  const handleExport = () => {
    const csvContent = [
      ['ID', 'Company Name', 'Contact Name', 'Phone', 'Email', 'Category', 'Nature', 'State', 'City', 'Source', 'Enquiry For', 'Status', 'Updated Status', 'Updated Details', 'Created', 'Last Contact'],
      ...clients.map(client => [
        client.id,
        client.companyName,
        client.contactName,
        client.contactPhone,
        client.contactEmail,
        client.category,
        client.nature,
        client.state,
        client.city,
        client.source,
        client.enquiryFor,
        client.status,
        client.updatedStatus,
        client.updatedDetails,
        client.createdAt,
        client.lastContact,
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clients_list.csv';
    a.click();
  };

  return (
    <div className="bg-white rounded-md shadow-lg border border-gray-200 mt-6">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-amber-600">Corporate Clients List</h1>
            <p className="text-gray-600 mt-1 text-lg">Manage all your corporate clients in one place</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAddClient}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Add New Client
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredAndSortedClients.length} of {clients.length} clients
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto ">
        <Table
          columns={columns}
          data={paginatedClients}
          onEdit={startEditing}
          onDelete={(row) => handleDelete(row.id)}
        />

        {filteredAndSortedClients.length > 0 && (
          <div className="mt-4 mb-2 p-1">
            <Pagination
              currentPage={currentPage}
              totalItems={filteredAndSortedClients.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsTable;
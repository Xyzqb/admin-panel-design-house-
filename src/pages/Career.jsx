import React, { useState } from 'react';
import { Search, Plus, MapPin, Calendar, Briefcase, Edit2, Trash2, X } from 'lucide-react';

export default function CareerPage() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Sales Executive',
      company: 'SalesForce Inc.',
      category: 'Sales',
      type: 'full time',
      salary: '$85,000 - $120,000',
      location: 'Chicago, IL',
      experience: '5+ years experience',
      applyBy: 'Dec 15, 2023',
      postedOn: 'Oct 10, 2023',
      status: 'Active',
      remote: false
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'TechSolutions LLC',
      category: 'Software',
      type: 'remote',
      salary: '$95,000 - $130,000',
      location: 'Remote',
      experience: '3+ years experience',
      applyBy: 'Nov 30, 2023',
      postedOn: 'Oct 5, 2023',
      status: 'Active',
      remote: true
    },
    {
      id: 3,
      title: 'HR Manager',
      company: 'GlobalCorp',
      category: 'HR',
      type: 'full time',
      salary: '$75,000 - $100,000',
      location: 'New York, NY',
      experience: '5+ years experience',
      applyBy: 'Dec 1, 2023',
      postedOn: 'Oct 1, 2023',
      status: 'Active',
      remote: false
    },
    {
      id: 4,
      title: 'Digital Marketing Specialist',
      company: 'MarketingPro',
      category: 'Digital',
      type: 'hybrid',
      salary: '$65,000 - $85,000',
      location: 'San Francisco, CA',
      experience: '3+ years experience',
      applyBy: 'Dec 20, 2023',
      postedOn: 'Oct 8, 2023',
      status: 'Active',
      remote: false
    },
    {
      id: 5,
      title: 'Sales Development Representative',
      company: 'CloudTech',
      category: 'Sales',
      type: 'full time',
      salary: '$55,000 - $70,000',
      location: 'Austin, TX',
      experience: '2+ years experience',
      applyBy: 'Nov 25, 2023',
      postedOn: 'Oct 3, 2023',
      status: 'Active',
      remote: false
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All Jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    category: 'Sales',
    type: 'full time',
    salary: '',
    location: '',
    experience: '',
    applyBy: '',
    remote: false
  });

  const categories = ['All Jobs', 'Sales', 'Software', 'HR', 'Digital'];
  
  const categoryColors = {
    Sales: 'bg-red-100 text-red-700',
    Software: 'bg-blue-100 text-blue-700',
    HR: 'bg-yellow-100 text-yellow-700',
    Digital: 'bg-purple-100 text-purple-700'
  };

  const typeColors = {
    'full time': 'bg-green-100 text-green-700',
    'remote': 'bg-blue-100 text-blue-700',
    'hybrid': 'bg-teal-100 text-teal-700'
  };

  const cardGradients = [
    'from-rose-50 to-pink-50',
    'from-blue-50 to-indigo-50',
    'from-amber-50 to-orange-50',
    'from-violet-50 to-purple-50',
    'from-emerald-50 to-teal-50'
  ];

  const getCategoryCount = (category) => {
    if (category === 'All Jobs') return jobs.filter(j => j.status === 'Active').length;
    return jobs.filter(j => j.category === category && j.status === 'Active').length;
  };

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = selectedCategory === 'All Jobs' || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && job.status === 'Active';
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      category: job.category,
      type: job.type,
      salary: job.salary,
      location: job.location,
      experience: job.experience,
      applyBy: job.applyBy,
      remote: job.remote
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingJob) {
      setJobs(jobs.map(job => 
        job.id === editingJob.id 
          ? { ...job, ...formData }
          : job
      ));
    } else {
      const newJob = {
        id: jobs.length + 1,
        ...formData,
        postedOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Active'
      };
      setJobs([...jobs, newJob]);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingJob(null);
    setFormData({
      title: '',
      company: '',
      category: 'Sales',
      type: 'full time',
      salary: '',
      location: '',
      experience: '',
      applyBy: '',
      remote: false
    });
  };

  return (
    <div className="min-h-screen bg-white shadow-lg p-4 sm:p-6 lg:p-8 py-4 mt-8">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto ">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Career Page
          </h1>
          <p className="text-gray-600 text-lg">Manage job postings across all departments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold mb-1">{jobs.length}</div>
            <div className="text-sm opacity-90">Total Jobs</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold mb-1">{jobs.filter(j => j.status === 'Active').length}</div>
            <div className="text-sm opacity-90">Active Jobs</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold mb-1">4</div>
            <div className="text-sm opacity-90">Categories</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs by title, company, location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat} {cat !== 'All Jobs' && `(${getCategoryCount(cat)})`}
                </button>
              ))}
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Job
              </button>
            </div>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job, index) => (
            <div
              key={job.id}
              className={`bg-gradient-to-br ${cardGradients[index % cardGradients.length]} rounded-xl p-5 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100`}
            >
              {/* Header with badges and actions */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${categoryColors[job.category]}`}>
                    {job.category}
                  </span>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${typeColors[job.type]}`}>
                    {job.type}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(job)}
                    className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Job Title and Company */}
              <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{job.company}</p>

              {/* Salary */}
              <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                {job.salary}
                <span className="text-xs text-gray-500 font-normal ml-1">per year</span>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="line-clamp-1">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 flex-shrink-0" />
                  <span className="line-clamp-1">{job.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="line-clamp-1">Apply by {job.applyBy}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="text-xs text-gray-500">Posted on {job.postedOn}</span>
                <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {job.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Job Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingJob ? 'Edit Job' : 'Add New Job'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company*</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="Sales">Sales</option>
                    <option value="Software">Software</option>
                    <option value="HR">HR</option>
                    <option value="Digital">Digital</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="full time">Full Time</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range*</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., $50,000 - $70,000"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience*</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 3+ years experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apply By*</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Dec 31, 2023"
                    value={formData.applyBy}
                    onChange={(e) => setFormData({...formData, applyBy: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="remote"
                  checked={formData.remote}
                  onChange={(e) => setFormData({...formData, remote: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="remote" className="text-sm font-medium text-gray-700">
                  Remote Position
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-medium shadow-md hover:shadow-lg transition-all"
                >
                  {editingJob ? 'Update Job' : 'Add Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


// import React, { useState, useEffect } from 'react';

// const Career = () => {
//     // Initial job data
//     const initialJobs = [
//         {
//             id: 1,
//             title: "Senior Sales Executive",
//             company: "SalesForce Inc.",
//             category: "sales",
//             type: "full-time",
//             location: "Chicago, IL",
//             salary: "$85,000 - $120,000",
//             description: "We are looking for an experienced Senior Sales Executive to join our team. You will be responsible for driving sales and building relationships with key clients.",
//             requirements: "Bachelor's degree, 5+ years sales experience, Excellent communication skills",
//             experience: "5+ years",
//             deadline: "2023-12-15",
//             posted: "2023-10-10",
//             status: "active"
//         },
//         {
//             id: 2,
//             title: "Full Stack Developer",
//             company: "TechSolutions LLC",
//             category: "software",
//             type: "remote",
//             location: "Remote",
//             salary: "$95,000 - $130,000",
//             description: "Join our engineering team as a Full Stack Developer. You'll be working on cutting-edge web applications using React and Node.js.",
//             requirements: "JavaScript, React, Node.js, MongoDB, 3+ years experience",
//             experience: "3+ years",
//             deadline: "2023-11-30",
//             posted: "2023-10-05",
//             status: "active"
//         },
//         {
//             id: 3,
//             title: "HR Manager",
//             company: "GlobalCorp",
//             category: "hr",
//             type: "full-time",
//             location: "New York, NY",
//             salary: "$75,000 - $100,000",
//             description: "We are seeking an experienced HR Manager to oversee all aspects of human resources practices and processes.",
//             requirements: "Bachelor's in HR, 5+ years HR experience, Knowledge of labor laws",
//             experience: "5+ years",
//             deadline: "2023-12-01",
//             posted: "2023-10-01",
//             status: "active"
//         },
//         {
//             id: 4,
//             title: "Digital Marketing Specialist",
//             company: "MarketingPro",
//             category: "digital",
//             type: "hybrid",
//             location: "Los Angeles, CA",
//             salary: "$65,000 - $85,000",
//             description: "Looking for a creative Digital Marketing Specialist to develop and implement effective marketing strategies.",
//             requirements: "SEO/SEM, Social Media Marketing, Google Analytics, 2+ years experience",
//             experience: "2+ years",
//             deadline: "2023-11-20",
//             posted: "2023-10-08",
//             status: "active"
//         },
//         {
//             id: 5,
//             title: "Sales Development Representative",
//             company: "CloudTech",
//             category: "sales",
//             type: "full-time",
//             location: "Austin, TX",
//             salary: "$55,000 - $70,000",
//             description: "Join our sales team as an SDR to generate leads and set up meetings for our account executives.",
//             requirements: "Excellent communication skills, Self-motivated, Tech-savvy",
//             experience: "1+ years",
//             deadline: "2023-11-15",
//             posted: "2023-10-03",
//             status: "active"
//         },
//     ];

//     // State management
//     const [jobs, setJobs] = useState(initialJobs);
//     const [filteredJobs, setFilteredJobs] = useState(initialJobs);
//     const [expandedJobId, setExpandedJobId] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedCategory, setSelectedCategory] = useState("all");
//     const [showModal, setShowModal] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [editingJob, setEditingJob] = useState(null);
//     const [jobToDelete, setJobToDelete] = useState(null);

//     // Form state
//     const [formData, setFormData] = useState({
//         title: "",
//         company: "",
//         category: "sales",
//         type: "full-time",
//         location: "",
//         salary: "",
//         description: "",
//         requirements: "",
//         experience: "",
//         deadline: ""
//     });

//     // Statistics
//     const [stats, setStats] = useState({
//         totalJobs: 0,
//         activeJobs: 0,
//         salesJobs: 0,
//         softwareJobs: 0,
//         hrJobs: 0,
//         digitalJobs: 0
//     });

//     // Update statistics
//     useEffect(() => {
//         const totalJobs = jobs.length;
//         const activeJobs = jobs.filter(job => job.status === "active").length;
//         const salesJobs = jobs.filter(job => job.category === "sales").length;
//         const softwareJobs = jobs.filter(job => job.category === "software").length;
//         const hrJobs = jobs.filter(job => job.category === "hr").length;
//         const digitalJobs = jobs.filter(job => job.category === "digital").length;

//         setStats({
//             totalJobs,
//             activeJobs,
//             salesJobs,
//             softwareJobs,
//             hrJobs,
//             digitalJobs
//         });
//     }, [jobs]);

//     // Filter jobs based on search term and category
//     useEffect(() => {
//         let filtered = jobs;

//         // Filter by search term
//         if (searchTerm) {
//             filtered = filtered.filter(job =>
//                 job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 job.description.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Filter by category
//         if (selectedCategory !== "all") {
//             filtered = filtered.filter(job => job.category === selectedCategory);
//         }

//         setFilteredJobs(filtered);
//     }, [jobs, searchTerm, selectedCategory]);

//     // Handle category selection
//     const handleCategorySelect = (category) => {
//         setSelectedCategory(category);
//         setExpandedJobId(null); // Collapse any expanded job when changing category
//     };

//     // Handle job card click to expand/collapse
//     const handleJobCardClick = (id) => {
//         if (expandedJobId === id) {
//             setExpandedJobId(null);
//         } else {
//             setExpandedJobId(id);
//         }
//     };

//     // Handle form input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     // Open modal for adding new job
//     const openAddJobModal = () => {
//         setEditingJob(null);
//         setFormData({
//             title: "",
//             company: "",
//             category: "sales",
//             type: "full-time",
//             location: "",
//             salary: "",
//             description: "",
//             requirements: "",
//             experience: "",
//             deadline: ""
//         });
//         setShowModal(true);
//     };

//     // Open modal for editing job
//     const openEditJobModal = (job) => {
//         setEditingJob(job);
//         setFormData({
//             title: job.title,
//             company: job.company,
//             category: job.category,
//             type: job.type,
//             location: job.location,
//             salary: job.salary,
//             description: job.description,
//             requirements: job.requirements,
//             experience: job.experience,
//             deadline: job.deadline
//         });
//         setShowModal(true);
//     };

//     // Handle form submission (add/edit job)
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (editingJob) {
//             // Update existing job
//             const updatedJobs = jobs.map(job =>
//                 job.id === editingJob.id
//                     ? { ...job, ...formData }
//                     : job
//             );
//             setJobs(updatedJobs);
//         } else {
//             // Add new job
//             const newJob = {
//                 id: jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1,
//                 ...formData,
//                 posted: new Date().toISOString().split('T')[0],
//                 status: "active"
//             };
//             setJobs([newJob, ...jobs]);
//         }

//         setShowModal(false);
//         setFormData({
//             title: "",
//             company: "",
//             category: "sales",
//             type: "full-time",
//             location: "",
//             salary: "",
//             description: "",
//             requirements: "",
//             experience: "",
//             deadline: ""
//         });
//     };

//     // Open delete confirmation modal
//     const openDeleteModal = (jobId) => {
//         setJobToDelete(jobId);
//         setShowDeleteModal(true);
//     };

//     // Handle job deletion
//     const handleDeleteJob = () => {
//         if (jobToDelete) {
//             const updatedJobs = jobs.filter(job => job.id !== jobToDelete);
//             setJobs(updatedJobs);
//             if (expandedJobId === jobToDelete) {
//                 setExpandedJobId(null);
//             }
//             setShowDeleteModal(false);
//             setJobToDelete(null);
//         }
//     };

//     // Format date for display
//     const formatDate = (dateString) => {
//         if (!dateString) return "Not specified";
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     // Get category name with proper formatting
//     const getCategoryName = (category) => {
//         switch (category) {
//             case 'sales': return 'Sales';
//             case 'software': return 'Software';
//             case 'hr': return 'HR';
//             case 'digital': return 'Digital Marketing';
//             default: return category;
//         }
//     };

//     // Get category color classes
//     const getCategoryColor = (category) => {
//         switch (category) {
//             case 'sales': return 'bg-red-100 text-red-800 border-red-200';
//             case 'software': return 'bg-blue-100 text-blue-800 border-blue-200';
//             case 'hr': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//             case 'digital': return 'bg-purple-100 text-purple-800 border-purple-200';
//             default: return 'bg-gray-100 text-gray-800 border-gray-200';
//         }
//     };

//     // Get job type color
//     const getJobTypeColor = (type) => {
//         switch (type) {
//             case 'full-time': return 'bg-green-100 text-green-800';
//             case 'part-time': return 'bg-orange-100 text-orange-800';
//             case 'contract': return 'bg-blue-100 text-blue-800';
//             case 'remote': return 'bg-indigo-100 text-indigo-800';
//             case 'hybrid': return 'bg-teal-100 text-teal-800';
//             default: return 'bg-gray-100 text-gray-800';
//         }
//     };

//     return (
//         // <div className="min-h-screen bg-white shadow p-4 md:p-6 ">
//         <div className="min-h-screen bg-gray-50 px-4 md:px-6 pt-8 pb-6">

//             {/* Main Content */}
//             <main className="container mx-auto ">
//                 {/* Controls Section */}
//                 <div className="p-6 mb-8">
//                     {/* Header */}
//                     <header className="mb-8">
//                         <div className="container mx-auto">
//                             <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//                                 <div className="flex items-center mb-6 md:mb-0">
//                                     <div>
//                                         <h1 className="text-3xl md:text-3xl font-bold text-gray-800">Career Page</h1>
//                                         <p className="text-gray-600 mt-1">Manage job postings across all departments</p>
//                                     </div>
//                                 </div>

//                                 {/* Stats */}
//                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
//                                     <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//                                         <div className="text-2xl font-bold text-gray-800">{stats.totalJobs}</div>
//                                         <div className="text-sm text-gray-500">Total Jobs</div>
//                                     </div>
//                                     <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//                                         <div className="text-2xl font-bold text-green-600">{stats.activeJobs}</div>
//                                         <div className="text-sm text-gray-500">Active Jobs</div>
//                                     </div>
//                                     <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 col-span-2 md:col-span-1">
//                                         <div className="text-2xl font-bold text-blue-600">4</div>
//                                         <div className="text-sm text-gray-500">Categories</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </header>

//                     <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

//                         {/* Search */}
//                         <div className="w-full lg:w-auto lg:flex-1 max-w-2xl">
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//                                     </svg>
//                                 </div>
//                                 <input
//                                     type="text"
//                                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     placeholder="Search jobs by title, company, location..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                             </div>
//                         </div>

//                         {/* Category Filters */}
//                         <div className="flex flex-wrap gap-2">
//                             <button
//                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                                 onClick={() => handleCategorySelect('all')}
//                             >
//                                 All Jobs
//                             </button>
//                             <button
//                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'sales' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                                 onClick={() => handleCategorySelect('sales')}
//                             >
//                                 Sales ({stats.salesJobs})
//                             </button>
//                             <button
//                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'software' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                                 onClick={() => handleCategorySelect('software')}
//                             >
//                                 Software ({stats.softwareJobs})
//                             </button>
//                             <button
//                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'hr' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                                 onClick={() => handleCategorySelect('hr')}
//                             >
//                                 HR ({stats.hrJobs})
//                             </button>
//                             <button
//                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'digital' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                                 onClick={() => handleCategorySelect('digital')}
//                             >
//                                 Digital ({stats.digitalJobs})
//                             </button>
//                         </div>

//                         {/* Add Job Button */}
//                         <button
//                             className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center"
//                             onClick={openAddJobModal}
//                         >
//                             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//                             </svg>
//                             Add Job
//                         </button>
//                     </div>
//                 </div>

//                 {/* Job Cards Grid */}
//                 {filteredJobs.length === 0 ? (
//                     <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
//                         <div className="text-gray-400 mb-4">
//                             <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                             </svg>
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
//                         <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
//                         <button
//                             className="px-5 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors"
//                             onClick={() => {
//                                 setSearchTerm("");
//                                 setSelectedCategory("all");
//                             }}
//                         >
//                             Clear Filters
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//                         {filteredJobs.map(job => (
//                             <div
//                                 key={job.id}
//                                 className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 ${expandedJobId === job.id ? 'lg:col-span-2 xl:col-span-3' : ''}`}
//                             >
//                                 {/* Job Card Header */}
//                                 <div
//                                     className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
//                                     onClick={() => handleJobCardClick(job.id)}
//                                 >
//                                     <div className="flex justify-between items-start mb-4">
//                                         <div className="flex-1">
//                                             <div className="flex items-center mb-2">
//                                                 <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getCategoryColor(job.category)}`}>
//                                                     {getCategoryName(job.category)}
//                                                 </span>
//                                                 <span className={`text-xs font-semibold px-3 py-1 rounded-full ml-2 ${getJobTypeColor(job.type)}`}>
//                                                     {job.type.replace('-', ' ')}
//                                                 </span>
//                                             </div>
//                                             <h3 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h3>
//                                             <p className="text-gray-600 font-medium">{job.company}</p>
//                                         </div>
//                                         <div className="text-right">
//                                             <div className="text-2xl font-bold text-gray-800 mb-1">{job.salary}</div>
//                                             <div className="text-sm text-gray-500">per year</div>
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-wrap gap-4 mt-6">
//                                         <div className="flex items-center text-gray-600">
//                                             <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                                             </svg>
//                                             <span>{job.location}</span>
//                                         </div>
//                                         <div className="flex items-center text-gray-600">
//                                             <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//                                             </svg>
//                                             <span>{job.experience} experience</span>
//                                         </div>
//                                         <div className="flex items-center text-gray-600">
//                                             <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                                             </svg>
//                                             <span>Apply by {formatDate(job.deadline)}</span>
//                                         </div>
//                                     </div>

//                                     <div className="mt-6 flex justify-between items-center">
//                                         <div className="text-sm text-gray-500">
//                                             Posted on {formatDate(job.posted)}
//                                         </div>
//                                         <div className="flex items-center">
//                                             <span className={`h-2 w-2 rounded-full mr-2 ${job.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//                                             <span className="text-sm text-gray-500 capitalize">{job.status}</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Expanded Details */}
//                                 {expandedJobId === job.id && (
//                                     <div className="border-t border-gray-200 p-6 bg-gray-50">
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                                             <div>
//                                                 <h4 className="text-lg font-semibold text-gray-800 mb-4">Job Description</h4>
//                                                 <p className="text-gray-700 mb-6">{job.description}</p>

//                                                 <h4 className="text-lg font-semibold text-gray-800 mb-4">Requirements</h4>
//                                                 <ul className="text-gray-700 list-disc pl-5 space-y-2">
//                                                     {job.requirements.split(',').map((req, idx) => (
//                                                         <li key={idx}>{req.trim()}</li>
//                                                     ))}
//                                                 </ul>
//                                             </div>

//                                             <div>
//                                                 <h4 className="text-lg font-semibold text-gray-800 mb-4">Job Details</h4>
//                                                 <div className="space-y-4">
//                                                     <div className="flex justify-between border-b border-gray-200 pb-2">
//                                                         <span className="text-gray-600">Job Type:</span>
//                                                         <span className="font-medium">{job.type.replace('-', ' ')}</span>
//                                                     </div>
//                                                     <div className="flex justify-between border-b border-gray-200 pb-2">
//                                                         <span className="text-gray-600">Experience:</span>
//                                                         <span className="font-medium">{job.experience}</span>
//                                                     </div>
//                                                     <div className="flex justify-between border-b border-gray-200 pb-2">
//                                                         <span className="text-gray-600">Location:</span>
//                                                         <span className="font-medium">{job.location}</span>
//                                                     </div>
//                                                     <div className="flex justify-between border-b border-gray-200 pb-2">
//                                                         <span className="text-gray-600">Salary:</span>
//                                                         <span className="font-medium">{job.salary}</span>
//                                                     </div>
//                                                     <div className="flex justify-between border-b border-gray-200 pb-2">
//                                                         <span className="text-gray-600">Deadline:</span>
//                                                         <span className="font-medium">{formatDate(job.deadline)}</span>
//                                                     </div>
//                                                     <div className="flex justify-between border-b border-gray-200 pb-2">
//                                                         <span className="text-gray-600">Posted:</span>
//                                                         <span className="font-medium">{formatDate(job.posted)}</span>
//                                                     </div>
//                                                 </div>

//                                                 <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
//                                                     <button
//                                                         className="px-5 py-2 bg-yellow-100 text-yellow-800 font-medium rounded-lg hover:bg-yellow-200 transition-colors flex items-center"
//                                                         onClick={(e) => {
//                                                             e.stopPropagation();
//                                                             openEditJobModal(job);
//                                                         }}
//                                                     >
//                                                         <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
//                                                         </svg>
//                                                         Edit Job
//                                                     </button>
//                                                     <button
//                                                         className="px-5 py-2 bg-red-100 text-red-800 font-medium rounded-lg hover:bg-red-200 transition-colors flex items-center"
//                                                         onClick={(e) => {
//                                                             e.stopPropagation();
//                                                             openDeleteModal(job.id);
//                                                         }}
//                                                     >
//                                                         <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
//                                                         </svg>
//                                                         Delete Job
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </main>

//             {/* Add/Edit Job Modal */}
//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                     <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//                         <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
//                             <h2 className="text-2xl font-bold text-gray-800">
//                                 {editingJob ? 'Edit Job Posting' : 'Add New Job Posting'}
//                             </h2>
//                             <button
//                                 className="text-gray-500 hover:text-gray-700 text-2xl"
//                                 onClick={() => setShowModal(false)}
//                             >
//                                 &times;
//                             </button>
//                         </div>

//                         <form onSubmit={handleSubmit} className="p-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="block text-gray-700 font-medium mb-2">Job Title *</label>
//                                     <input
//                                         type="text"
//                                         name="title"
//                                         value={formData.title}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="Senior Sales Executive"
//                                         required
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 font-medium mb-2">Company *</label>
//                                     <input
//                                         type="text"
//                                         name="company"
//                                         value={formData.company}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="SalesForce Inc."
//                                         required
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 font-medium mb-2">Category *</label>
//                                     <select
//                                         name="category"
//                                         value={formData.category}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         required
//                                     >
//                                         <option value="sales">Sales</option>
//                                         <option value="software">Software</option>
//                                         <option value="hr">HR</option>
//                                         <option value="digital">Digital Marketing</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 font-medium mb-2">Job Type *</label>
//                                     <select
//                                         name="type"
//                                         value={formData.type}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         required
//                                     >
//                                         <option value="full-time">Full-time</option>
//                                         <option value="part-time">Part-time</option>
//                                         <option value="contract">Contract</option>
//                                         <option value="remote">Remote</option>
//                                         <option value="hybrid">Hybrid</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 font-medium mb-2">Location *</label>
//                                     <input
//                                         type="text"
//                                         name="location"
//                                         value={formData.location}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="Chicago, IL"
//                                         required
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 font-medium mb-2">Salary *</label>
//                                     <input
//                                         type="text"
//                                         name="salary"
//                                         value={formData.salary}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="$85,000 - $120,000"
//                                         required
//                                     />
//                                 </div>

//                                 <div className="md:col-span-2">
//                                     <label className="block text-gray-700 font-medium mb-2">Job Description *</label>
//                                     <textarea
//                                         name="description"
//                                         value={formData.description}
//                                         onChange={handleInputChange}
//                                         rows="4"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="Enter job description and requirements..."
//                                         required
//                                     />
//                                 </div>

//                                 <div className="md:col-span-2">
//                                     <label className="block text-gray-700 font-medium mb-2">Requirements *</label>
//                                     <textarea
//                                         name="requirements"
//                                         value={formData.requirements}
//                                         onChange={handleInputChange}
//                                         rows="3"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="List key requirements separated by commas..."
//                                         required
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 font-medium mb-2">Experience Required</label>
//                                     <input
//                                         type="text"
//                                         name="experience"
//                                         value={formData.experience}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="5+ years"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 font-medium mb-2">Application Deadline</label>
//                                     <input
//                                         type="date"
//                                         name="deadline"
//                                         value={formData.deadline}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
//                                 <button
//                                     type="button"
//                                     className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
//                                     onClick={() => setShowModal(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
//                                 >
//                                     {editingJob ? 'Update Job' : 'Save Job'}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Delete Confirmation Modal */}
//             {showDeleteModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                     <div className="bg-white rounded-2xl w-full max-w-md">
//                         <div className="p-6 border-b border-gray-200">
//                             <h3 className="text-xl font-bold text-gray-800">Confirm Delete</h3>
//                         </div>

//                         <div className="p-6">
//                             <p className="text-gray-700 mb-6">
//                                 Are you sure you want to delete this job posting? This action cannot be undone.
//                             </p>

//                             <div className="flex justify-end space-x-4">
//                                 <button
//                                     className="px-5 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
//                                     onClick={() => setShowDeleteModal(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
//                                     onClick={handleDeleteJob}
//                                 >
//                                     Delete Job
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Career;
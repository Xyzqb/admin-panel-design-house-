import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Users, 
  Star, 
  MessageSquare, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Home,
  Palette,
  Sofa,
  Camera,
  Filter,
  Download,
  ChevronRight,
  Bell,
  Search,
  Plus,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  DollarSign,
  Package,
  MapPin,
  User,
  Circle,
  CheckCircle2,
  AlertTriangle,
  Clock as ClockIcon,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Reminder = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('today');
  const [time, setTime] = useState(new Date());
  const [notifications] = useState(3);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Sample projects data
  const [projects, setProjects] = useState([
    { id: 1, name: 'Modern Villa Design', client: 'John Smith', status: 'In Progress', progress: 75, dueDate: '2024-02-15', priority: 'high' },
    { id: 2, name: 'Office Renovation', client: 'Tech Corp Inc', status: 'Pending', progress: 30, dueDate: '2024-02-28', priority: 'medium' },
    { id: 3, name: 'Apartment Interior', client: 'Sarah Johnson', status: 'Completed', progress: 100, dueDate: '2024-01-30', priority: 'low' },
    { id: 4, name: 'Restaurant Design', client: 'Food Haven', status: 'In Progress', progress: 50, dueDate: '2024-03-10', priority: 'high' },
  ]);

  // Sample reminders data with completion status
  const [reminders, setReminders] = useState([
    { id: 1, title: 'Client Meeting', description: 'Discuss living room design with John Smith', time: '10:00 AM', type: 'meeting', completed: false },
    { id: 2, title: 'Material Delivery', description: 'Marble tiles arrival at site', time: '2:30 PM', type: 'delivery', completed: false },
    { id: 3, title: 'Site Visit', description: 'Check kitchen installation progress', time: '4:00 PM', type: 'site', completed: false },
    { id: 4, title: 'Invoice Due', description: 'Send invoice to Tech Corp Inc', time: '11:00 AM', type: 'payment', completed: true },
    { id: 5, title: 'Design Review', description: 'Review bathroom design with client', time: '3:00 PM', type: 'meeting', completed: false },
    { id: 6, title: 'Furniture Order', description: 'Place order for living room furniture', time: '9:00 AM', type: 'delivery', completed: false },
  ]);

  // Sample tasks data with completion status
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Create mood board', project: 'Modern Villa Design', priority: 'high', completed: true },
    { id: 2, title: '3D rendering', project: 'Office Renovation', priority: 'high', completed: false },
    { id: 3, title: 'Select furniture', project: 'Apartment Interior', priority: 'medium', completed: false },
    { id: 4, title: 'Lighting plan', project: 'Restaurant Design', priority: 'low', completed: true },
    { id: 5, title: 'Color scheme finalization', project: 'Modern Villa Design', priority: 'medium', completed: false },
    { id: 6, title: 'Material selection', project: 'Office Renovation', priority: 'high', completed: false },
  ]);

  // Sample stats
  const stats = {
    totalProjects: 12,
    activeProjects: 5,
    completedProjects: 7,
    pendingTasks: 8,
    clientRating: 4.8,
    upcomingMeetings: 3,
    overdueTasks: 2,
    todaysReminders: 4
  };

  // Calculate completed vs pending counts
  const completedReminders = reminders.filter(r => r.completed).length;
  const pendingReminders = reminders.filter(r => !r.completed).length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;

  // Filter reminders by completion status
  const getRemindersByTab = () => {
    switch(activeTab) {
      case 'completed':
        return reminders.filter(r => r.completed);
      case 'pending':
        return reminders.filter(r => !r.completed);
      case 'overdue':
        // Mock overdue reminders (reminders that are past their time)
        return reminders.filter(r => !r.completed && r.id <= 3); // First 3 as overdue for demo
      default: // 'today'
        return reminders;
    }
  };

  // Get today's incomplete reminders
  const todaysIncompleteReminders = reminders.filter(r => !r.completed && r.type !== 'payment');
  
  // Get high priority incomplete tasks
  const highPriorityIncompleteTasks = tasks.filter(t => !t.completed && t.priority === 'high');

  // Revenue data for manual chart
  const revenueData = [
    { month: 'Jan', revenue: 12000, trend: 'up' },
    { month: 'Feb', revenue: 19000, trend: 'up' },
    { month: 'Mar', revenue: 15000, trend: 'down' },
    { month: 'Apr', revenue: 25000, trend: 'up' },
    { month: 'May', revenue: 22000, trend: 'down' },
    { month: 'Jun', revenue: 30000, trend: 'up' },
  ];

  // Project type distribution
  const projectTypes = [
    { type: 'Residential', percentage: 40, color: 'bg-blue-500', projects: 5 },
    { type: 'Commercial', percentage: 25, color: 'bg-green-500', projects: 3 },
    { type: 'Hospitality', percentage: 20, color: 'bg-yellow-500', projects: 2 },
    { type: 'Office', percentage: 15, color: 'bg-red-500', projects: 2 },
  ];

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleReminderCompletion = (id) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const markAllRemindersAsCompleted = () => {
    setReminders(reminders.map(reminder => ({ ...reminder, completed: true })));
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCompletionStatusColor = (completed) => {
    return completed ? 'text-green-600' : 'text-red-600';
  };

  const getCompletionIcon = (completed) => {
    return completed ? (
      <CheckCircle2 className="w-4 h-4 text-green-600" />
    ) : (
      <Circle className="w-4 h-4 text-red-600" />
    );
  };

  const getTaskStatusIcon = (completed, priority) => {
    if (completed) {
      return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    }
    switch(priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'medium': return <ClockIcon className="w-4 h-4 text-yellow-600" />;
      case 'low': return <Circle className="w-4 h-4 text-blue-600" />;
      default: return <Circle className="w-4 h-4 text-gray-600" />;
    }
  };

  // Function to calculate max revenue for scaling bars
  const getMaxRevenue = () => {
    return Math.max(...revenueData.map(item => item.revenue));
  };

  // Get current filtered reminders
  const currentReminders = getRemindersByTab();

  return (
    <div className="bg-white shadow-sm mt-6">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Task & Reminder Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search tasks, reminders..."
                  className="pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-36 sm:w-48 md:w-64"
                />
              </div>

            </div>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{pendingTasks}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="text-xs text-red-600 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {highPriorityIncompleteTasks.length} high priority
                  </div>
                </div>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Reminders</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{todaysIncompleteReminders.length}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="text-xs text-blue-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {pendingReminders} incomplete
                  </div>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Tasks</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{completedTasks}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {Math.round((completedTasks / tasks.length) * 100)}% completion rate
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue Tasks</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stats.overdueTasks}</p>
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  Requires immediate attention
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tasks & Reminders */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Completion Progress */}
            <div className="bg-white p-5 rounded-xl shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Task Completion Progress</h2>
                <div className="text-sm text-gray-600">
                  {completedTasks} of {tasks.length} tasks completed
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div 
                  className="bg-green-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${(completedTasks / tasks.length) * 100}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{tasks.filter(t => !t.completed && t.priority === 'high').length}</div>
                  <div className="text-sm text-gray-600">High Priority</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{tasks.filter(t => !t.completed && t.priority === 'medium').length}</div>
                  <div className="text-sm text-gray-600">Medium Priority</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{tasks.filter(t => !t.completed && t.priority === 'low').length}</div>
                  <div className="text-sm text-gray-600">Low Priority</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </div>
            </div>

            {/* Incomplete Tasks Table */}
            <div className="bg-white p-5 rounded-xl shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Incomplete Tasks</h2>
                <button 
                  onClick={() => navigate('/tasks')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                >
                  View all tasks <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                {tasks
                  .filter(task => !task.completed)
                  .sort((a, b) => {
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                  })
                  .map(task => (
                    <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        {getTaskStatusIcon(task.completed, task.priority)}
                        <div>
                          <h3 className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {task.title}
                          </h3>
                          <p className="text-xs text-gray-500">{task.project}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <button
                          onClick={() => toggleTaskCompletion(task.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Mark as complete"
                        >
                          <Circle className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              
              {tasks.filter(t => !t.completed).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <p>All tasks are completed! Great job!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Reminders */}
          <div className="space-y-6">
            {/* Reminders with Filter Tabs */}
            <div className="bg-white p-5 rounded-xl shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Reminders</h2>
                <div className="flex gap-1">
                  {['today', 'pending', 'completed', 'overdue'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 text-xs rounded-lg ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                {currentReminders.length > 0 ? (
                  currentReminders.map(reminder => (
                    <div 
                      key={reminder.id} 
                      className={`p-3 rounded-lg border ${reminder.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getCompletionIcon(reminder.completed)}
                            <h3 className={`font-medium ${reminder.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                              {reminder.title}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{reminder.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {reminder.time}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                reminder.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                                reminder.type === 'delivery' ? 'bg-green-100 text-green-800' :
                                reminder.type === 'site' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {reminder.type}
                              </span>
                            </div>
                            {!reminder.completed && (
                              <button 
                                onClick={() => toggleReminderCompletion(reminder.id)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                Mark Done
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    {activeTab === 'completed' ? (
                      <>
                        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                        <p>No completed reminders</p>
                      </>
                    ) : (
                      <>
                        <Circle className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                        <p>No {activeTab} reminders</p>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={markAllRemindersAsCompleted}
                  className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Mark All as Complete
                </button>
                <button className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                  + Add New
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-10">
        <div className="flex justify-around items-center p-3">
          <button className="flex flex-col items-center p-2 text-blue-600">
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Tasks</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-600">
            <Bell className="w-5 h-5" />
            <span className="text-xs mt-1">Reminders</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-600">
            <Plus className="w-5 h-5" />
            <span className="text-xs mt-1">Add</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-600">
            <Filter className="w-5 h-5" />
            <span className="text-xs mt-1">Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reminder;
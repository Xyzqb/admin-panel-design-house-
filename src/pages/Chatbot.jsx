import React, { useState, useRef, useEffect } from 'react'
import { Send, Smile, Paperclip, MoreVertical, Search, Phone, Video, Trash2, Edit3, Check, X, Menu, Plus, MessageCircle } from 'lucide-react'

const Chatbot = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Design House Chat",
            avatar: "🏠",
            lastMessage: "Hi! Ask me about interior design",
            time: "Now",
            unread: 0,
            online: true,
            isBot: true
        },
        {
            id: 2,
            name: "Priya Sharma",
            avatar: "👩",
            lastMessage: "Kitchen design kitna cost hoga?",
            time: "10:30 AM",
            unread: 2,
            online: true,
            isBot: false
        },
        {
            id: 3,
            name: "Rahul Verma",
            avatar: "👨",
            lastMessage: "Living room ke liye color suggest karo",
            time: "Yesterday",
            unread: 0,
            online: false,
            isBot: false
        },
        {
            id: 4,
            name: "Sneha Patel",
            avatar: "👩‍🦰",
            lastMessage: "Bedroom furniture recommendations?",
            time: "Yesterday",
            unread: 1,
            online: true,
            isBot: false
        }
    ])

    const [selectedUser, setSelectedUser] = useState(users[0])
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [inputMessage, setInputMessage] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [editText, setEditText] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const messagesEndRef = useRef(null)
    const fileInputRef = useRef(null)
    const [activeTab, setActiveTab] = useState("all")
    const [chatSearch, setChatSearch] = useState("")
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null)

    const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🏠', '🎨', '✨', '💡', '🪴', '🛋️', '🏡', '🎯', '⭐', '🌟', '💫', '🔥', '💯', '👌', '🙌']

    const botResponses = {
        "color": "For modern interiors, I recommend: Warm neutrals (beige, cream), Earthy tones (terracotta, sage green), or Bold accents (navy blue, mustard yellow). What's your room size?",
        "cost": "Typical interior design costs: Basic - ₹800-1200/sq ft, Mid-range - ₹1200-2000/sq ft, Premium - ₹2000-3500/sq ft. What's your budget range?",
        "living room": "Living room essentials: Comfortable sofa set, Coffee table, TV unit, Proper lighting, Wall art/decor. Should I suggest specific styles?",
        "bedroom": "Bedroom must-haves: Quality bed with storage, Wardrobe, Side tables, Ambient lighting, Comfortable mattress. What size is your bedroom?",
        "kitchen": "Modern kitchen features: Modular cabinets, Granite/quartz countertop, Chimney & hob, Storage solutions, Good lighting. Need layout suggestions?",
        "furniture": "Popular furniture materials: Solid wood (durable), Engineered wood (budget-friendly), Metal (industrial look), Glass (modern touch). Your preference?",
        "bathroom": "Bathroom essentials: Good tiles, Proper ventilation, Storage cabinets, Mirror with lighting, Quality fixtures. Size of bathroom?",
        "design": "I can help with: Room designs, Color schemes, Furniture selection, Cost estimates, Space planning, Material choices. What specific design aspect interests you?",
        "budget": "Let me help you plan your budget! Tell me: Room type, Size (sq ft), and your approximate budget range. I'll suggest the best options!",
        "hi": "Hello! 👋 Welcome to Interior Design Assistant. I'm here to help you create your dream space. What would you like to design today?",
        "hello": "Hi there! 🏠 I'm your Interior Design Assistant. I can help with room designs, color schemes, furniture, and cost planning. How can I assist you?",
        "default": "I can help with: Room designs, Color schemes, Furniture selection, Cost estimates, Space planning, Material choices. What would you like to know?"
    }

    const [conversations, setConversations] = useState({
        1: [
            { id: 1, text: "Hi! I'm your Interior Design Assistant 🏠", sender: "bot", time: "9:00 AM", status: "read" },
            { id: 2, text: "I can help you with room designs, color schemes, furniture, and cost estimates!", sender: "bot", time: "9:00 AM", status: "read" },
            { id: 3, text: "What would you like to know about interior design?", sender: "bot", time: "9:01 AM", status: "read" }
        ],
        2: [
            { id: 1, text: "Hello! Kitchen design ke liye help chahiye", sender: "user", time: "10:25 AM", status: "read" },
            { id: 2, text: "Sure! I can help with that. What's your kitchen size?", sender: "bot", time: "10:26 AM", status: "read" },
            { id: 3, text: "10x8 feet hai, budget 2 lakh hai", sender: "user", time: "10:28 AM", status: "read" },
            { id: 4, text: "Kitchen design kitna cost hoga?", sender: "user", time: "10:30 AM", status: "delivered" }
        ],
        3: [
            { id: 1, text: "Living room ke liye color suggest karo", sender: "user", time: "Yesterday", status: "read" },
            { id: 2, text: "For living rooms, I suggest warm neutrals with accent colors!", sender: "bot", time: "Yesterday", status: "read" }
        ],
        4: [
            { id: 1, text: "Bedroom furniture recommendations?", sender: "user", time: "Yesterday", status: "delivered" }
        ]
    })

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [conversations, selectedUser])

    const getBotResponse = (message) => {
        const lowerMessage = message.toLowerCase()
        for (let key in botResponses) {
            if (lowerMessage.includes(key)) {
                return botResponses[key]
            }
        }
        return botResponses.default
    }

    const handleSend = () => {
        if (inputMessage.trim()) {
            const newMessage = {
                id: Date.now(),
                text: inputMessage,
                sender: "user",
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                status: "sent"
            }

            setConversations(prev => ({
                ...prev,
                [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage]
            }))

            setUsers(users.map(user =>
                user.id === selectedUser.id
                    ? { ...user, lastMessage: inputMessage, time: "Now" }
                    : user
            ))

            setInputMessage('')
            setShowEmojiPicker(false)

            if (selectedUser.isBot) {
                setTimeout(() => {
                    const botReply = {
                        id: Date.now() + 1,
                        text: getBotResponse(inputMessage),
                        sender: "bot",
                        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                        status: "delivered"
                    }
                    setConversations(prev => ({
                        ...prev,
                        [selectedUser.id]: [...(prev[selectedUser.id] || []), botReply]
                    }))
                }, 1500)
            }
        }
    }

    const handleDelete = (messageId) => {
        setConversations(prev => ({
            ...prev,
            [selectedUser.id]: prev[selectedUser.id].filter(msg => msg.id !== messageId)
        }))
    }

    const startEdit = (id, text) => {
        setEditingId(id)
        setEditText(text)
    }

    const saveEdit = (id) => {
        setConversations(prev => ({
            ...prev,
            [selectedUser.id]: prev[selectedUser.id].map(msg =>
                msg.id === id ? { ...msg, text: editText } : msg
            )
        }))
        setEditingId(null)
        setEditText('')
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditText('')
    }

    const handleEmojiClick = (emoji) => {
        setInputMessage(inputMessage + emoji)
        setShowEmojiPicker(false)
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const newMessage = {
                id: Date.now(),
                text: `📎 File: ${file.name}`,
                sender: "user",
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                status: "sent"
            }

            setConversations(prev => ({
                ...prev,
                [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage]
            }))

            setUsers(users.map(user =>
                user.id === selectedUser.id
                    ? { ...user, lastMessage: `📎 ${file.name}`, time: "Now" }
                    : user
            ))
        }
    }

    const filteredUsers = users.filter((user) => {
        if (activeTab === "unread") {
            return user.unread > 0
        }
        if (activeTab === "groups") {
            return user.isBot
        }
        return user.name.toLowerCase().includes(searchQuery.toLowerCase())
    })

    const handleNewChat = () => {
        const newUserId = Date.now()
        const newUser = {
            id: newUserId,
            name: `User ${users.length}`,
            avatar: "👤",
            lastMessage: "New conversation",
            time: "Now",
            unread: 0,
            online: true,
            isBot: false
        }

        setUsers([...users, newUser])
        setConversations({
            ...conversations,
            [newUserId]: []
        })
        setSelectedUser(newUser)
        setShowMenu(false)
        if (window.innerWidth < 640) setSidebarOpen(false)
    }

    const currentMessages = (conversations[selectedUser.id] || []).filter((msg) =>
        msg.text.toLowerCase().includes(chatSearch.toLowerCase())
    )

    const highlightText = (text, search) => {
        if (!search) return text

        const regex = new RegExp(`(${search})`, "gi")
        const parts = text.split(regex)

        return parts.map((part, index) =>
            part.toLowerCase() === search.toLowerCase() ? (
                <span
                    key={index}
                    className="bg-yellow-200 text-gray-900 px-1 rounded"
                >
                    {part}
                </span>
            ) : (
                part
            )
        )
    }

    return (
        <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-2 sm:p-4 mt-6">
            <div className="w-full h-[95vh] bg-white rounded-1xl shadow-md overflow-hidden flex border border-gray-200">

                {/* Sidebar */}
                <div className={`${sidebarOpen ? 'w-full sm:w-96' : 'w-0'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${!sidebarOpen && 'hidden'}`}>
                    {/* Sidebar Header */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-xl font-bold text-gray-800">DESIGN HOUSE CHAT</h1>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-white/70 rounded-full transition">
                                    <MessageCircle size={20} className="text-gray-600" />
                                </button>
                                <button className="p-2 hover:bg-white/70 rounded-full transition">
                                    <MoreVertical size={20} className="text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search chats..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white text-gray-800 placeholder-gray-400 rounded-full pl-10 pr-4 py-2.5 border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                            />
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-sm transition ${activeTab === "all" ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-200"}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setActiveTab("unread")}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-sm transition ${activeTab === "unread" ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-200"}`}
                        >
                            Unread
                        </button>
                        <button
                            onClick={() => setActiveTab("groups")}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-sm transition ${activeTab === "groups" ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-200"}`}
                        >
                            Groups
                        </button>
                    </div>

                    {/* Users List */}
                    <div className="flex-1 overflow-y-auto bg-white">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => {
                                    setSelectedUser(user)
                                    if (window.innerWidth < 640) setSidebarOpen(false)
                                }}
                                className={`flex items-center gap-3 p-4 cursor-pointer transition border-b border-gray-100 ${selectedUser.id === user.id
                                    ? 'bg-blue-50 border-l-4 border-l-blue-500'
                                    : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                                    }`}
                            >
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-2xl shadow-sm">
                                        {user.avatar}
                                    </div>
                                    {user.online && (
                                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h3 className="font-semibold text-gray-800 truncate">{user.name}</h3>
                                        <span className="text-xs text-gray-500">{user.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
                                </div>
                                {user.unread > 0 && (
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm">
                                        {user.unread}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* New Chat Button */}
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <button
                            onClick={handleNewChat}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 font-semibold flex items-center justify-center gap-2 transition shadow-sm"
                        >
                            <Plus size={20} />
                            New Chat
                        </button>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-white relative">
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3.5 flex items-center justify-between border-b border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="hover:bg-white/70 rounded-full p-2 transition"
                            >
                                <Menu size={20} className="text-gray-700" />
                            </button>
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-xl shadow-sm">
                                {selectedUser.avatar}
                            </div>
                            <div>
                                <h2 className="font-semibold text-lg text-gray-800">{selectedUser.name}</h2>
                                <p className="text-xs text-gray-600 flex items-center gap-1">
                                    {selectedUser.online ? (
                                        <>
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            Online
                                        </>
                                    ) : (
                                        'Offline'
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search in chat..."
                                    value={chatSearch}
                                    onChange={(e) => setChatSearch(e.target.value)}
                                    className="w-64 bg-white text-gray-800 placeholder-gray-400 rounded-full pl-10 pr-4 py-2 border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                                />
                            </div>
                            <div className='relative' ref={menuRef}>
                                <button
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="hover:bg-white/70 rounded-full p-2 transition"
                                >
                                    <MoreVertical size={20} className="text-gray-700" />
                                </button>

                                {showMenu && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                                        <button
                                            onClick={handleNewChat}
                                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition flex items-center gap-2"
                                        >
                                            <Plus size={16} />
                                            Add Chat
                                        </button>
                                        <button
                                            onClick={() => {
                                                console.log("Add Blog clicked")
                                                setShowMenu(false)
                                            }}
                                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition flex items-center gap-2"
                                        >
                                            <MessageCircle size={16} />
                                            Add Blog
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div
                        className="flex-1 overflow-y-auto p-4"
                        style={{
                            backgroundColor: '#f8fafc',
                            backgroundImage: `
                                radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
                                radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.03) 0%, transparent 50%)
                            `
                        }}
                    >
                        {currentMessages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} group`}
                            >
                                <div className={`relative max-w-xs lg:max-w-md xl:max-w-lg ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                                    <div
                                        className={`rounded-2xl px-4 py-2.5 shadow-sm ${message.sender === 'user'
                                            ? 'bg-blue-400 text-white rounded-tr-none'
                                            : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                                            }`}
                                    >
                                        {editingId === message.id ? (
                                            <div className="flex flex-col gap-2">
                                                <input
                                                    type="text"
                                                    value={editText}
                                                    onChange={(e) => setEditText(e.target.value)}
                                                    className="px-3 py-2 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-400"
                                                    autoFocus
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => saveEdit(message.id)}
                                                        className="p-1.5 hover:bg-green-50 rounded-lg transition"
                                                    >
                                                        <Check size={16} className="text-green-600" />
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="p-1.5 hover:bg-red-50 rounded-lg transition"
                                                    >
                                                        <X size={16} className="text-red-600" />
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-sm break-words leading-relaxed">
                                                    {highlightText(message.text, chatSearch)}
                                                </p>
                                                <div className="flex items-center justify-end gap-1 mt-1">
                                                    <span className={`text-xs ${message.sender === 'user' ? 'text-white/80' : 'text-gray-500'}`}>
                                                        {message.time}
                                                    </span>
                                                    {message.sender === 'user' && (
                                                        <span className="text-xs text-white/80">
                                                            {message.status === 'sent' && '✓'}
                                                            {message.status === 'delivered' && '✓✓'}
                                                            {message.status === 'read' && <span className="text-blue-200">✓✓</span>}
                                                        </span>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    {message.sender === 'user' && editingId !== message.id && (
                                        <div className="absolute -left-20 top-0 hidden group-hover:flex gap-1">
                                            <button
                                                onClick={() => startEdit(message.id, message.text)}
                                                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition border border-gray-200"
                                                title="Edit"
                                            >
                                                <Edit3 size={14} className="text-blue-600" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(message.id)}
                                                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition border border-gray-200"
                                                title="Delete"
                                            >
                                                <Trash2 size={14} className="text-red-600" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="bg-white px-4 py-3 border-t border-gray-200 shadow-sm relative">
                        {/* Emoji Picker */}
                        {showEmojiPicker && (
                            <div className="absolute bottom-16 left-4 bg-white rounded-xl shadow-xl p-3 border border-gray-200 z-10">
                                <div className="grid grid-cols-5 gap-2">
                                    {emojis.map((emoji, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleEmojiClick(emoji)}
                                            className="text-2xl hover:bg-gray-100 rounded-lg p-2 transition"
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <Smile size={24} className="text-gray-600" />
                            </button>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                                accept="image/*,.pdf,.doc,.docx"
                            />

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <Paperclip size={24} className="text-gray-600" />
                            </button>

                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message..."
                                className="flex-1 bg-gray-100 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition border border-transparent focus:border-blue-400"
                            />

                            <button
                                onClick={handleSend}
                                className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full transition shadow-sm"
                            >
                                <Send size={20} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatbot
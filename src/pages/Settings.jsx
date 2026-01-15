import React, { useState } from 'react';
import {
    Upload,
    Mail,
    Phone,
    MapPin,
    Plus,
    Trash2,
    X,
    Edit2,
    Globe
} from 'lucide-react';
import { showUploadSuccess } from '../data/toast';


const Settings = () => {
    // Logo state
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');

    // Email addresses state
    const [emails, setEmails] = useState([
        { id: 1, email: 'hello@interiordesign.com', isEditing: false },
        { id: 2, email: 'support@interiordesign.com', isEditing: false }
    ]);
    const [newEmail, setNewEmail] = useState('');

    // Phone numbers state
    const [phones, setPhones] = useState([
        { id: 1, phone: '+1 (555) 123-4567', isEditing: false },
        { id: 2, phone: '+1 (555) 987-6543', isEditing: false }
    ]);
    const [newPhone, setNewPhone] = useState('');

    // Company addresses state
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            street: '123 Design Avenue',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
            isEditing: false
        },
        {
            id: 2,
            street: '123 Design Avenue',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
            isEditing: false
        },
        {
            id: 3,
            street: '123 Design Avenue',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
            isEditing: false
        },
    ]);

    // Handle logo upload
    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
                showUploadSuccess();
            };
            reader.readAsDataURL(file);
        }
    };


    // Add new email
    const addEmail = () => {
        if (newEmail && !emails.some(e => e.email === newEmail)) {
            const newEmailObj = {
                id: Date.now(),
                email: newEmail,
                isEditing: false
            };
            setEmails([...emails, newEmailObj]);
            setNewEmail('');
        }
    };

    // Start editing email
    const startEditingEmail = (id) => {
        setEmails(emails.map(email =>
            email.id === id ? { ...email, isEditing: true } : email
        ));
    };

    // Save edited email
    const saveEmail = (id, newValue) => {
        if (newValue.trim()) {
            setEmails(emails.map(email =>
                email.id === id ? { ...email, email: newValue, isEditing: false } : email
            ));
        }
    };

    // Cancel email editing
    const cancelEmailEdit = (id) => {
        setEmails(emails.map(email =>
            email.id === id ? { ...email, isEditing: false } : email
        ));
    };

    // Remove email
    const removeEmail = (id) => {
        setEmails(emails.filter(email => email.id !== id));
    };

    // Add new phone
    const addPhone = () => {
        if (newPhone && !phones.some(p => p.phone === newPhone)) {
            const newPhoneObj = {
                id: Date.now(),
                phone: newPhone,
                isEditing: false
            };
            setPhones([...phones, newPhoneObj]);
            setNewPhone('');
        }
    };

    // Start editing phone
    const startEditingPhone = (id) => {
        setPhones(phones.map(phone =>
            phone.id === id ? { ...phone, isEditing: true } : phone
        ));
    };

    // Save edited phone
    const savePhone = (id, newValue) => {
        if (newValue.trim()) {
            setPhones(phones.map(phone =>
                phone.id === id ? { ...phone, phone: newValue, isEditing: false } : phone
            ));
        }
    };

    // Cancel phone editing
    const cancelPhoneEdit = (id) => {
        setPhones(phones.map(phone =>
            phone.id === id ? { ...phone, isEditing: false } : phone
        ));
    };

    // Remove phone
    const removePhone = (id) => {
        setPhones(phones.filter(phone => phone.id !== id));
    };

    // Add new address
    const addNewAddress = () => {
        const newAddress = {
            id: Date.now(),
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            isEditing: true
        };
        setAddresses([...addresses, newAddress]);
    };

    // Start editing address
    const startEditingAddress = (id) => {
        setAddresses(addresses.map(address =>
            address.id === id ? { ...address, isEditing: true } : address
        ));
    };

    // Save edited address
    const saveAddress = (id, field, value) => {
        setAddresses(addresses.map(address =>
            address.id === id ? { ...address, [field]: value } : address
        ));
    };

    // Save all address edits
    const saveAllAddressEdits = (id) => {
        setAddresses(addresses.map(address =>
            address.id === id ? { ...address, isEditing: false } : address
        ));
    };

    // Cancel address editing
    const cancelAddressEdit = (id) => {
        // If it's a new empty address, remove it
        const address = addresses.find(a => a.id === id);
        if (!address.street && !address.city && !address.country) {
            removeAddress(id);
        } else {
            setAddresses(addresses.map(address =>
                address.id === id ? { ...address, isEditing: false } : address
            ));
        }
    };

    // Remove address
    const removeAddress = (id) => {
        setAddresses(addresses.filter(address => address.id !== id));
    };

    return (
        <div className="min-h-screen bg-white shadow-md mt-6 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-3xl font-bold text-black mx-2">
                        Settings Page
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg mx-2">
                        Manage your interior design studio's branding and contact information
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Logo & Branding */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Logo Upload Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex flex-col gap-4">

                                {/* SINGLE ROW */}
                                <div className="flex items-center justify-between gap-6">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 mb-1">Company Logo</p>
                                        <p className="text-xs text-gray-500">
                                            Upload your brand logo (PNG, JPG)
                                        </p>
                                    </div>

                                    <label className="inline-flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors text-sm">
                                        <Upload className="w-4 h-4" />
                                        Upload Logo
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {/* PREVIEW BELOW */}
                                {logoPreview && (
                                    <div className="relative w-40 border-2 border-dashed border-gray-300 rounded-xl p-3">
                                        <img
                                            src={logoPreview}
                                            alt="Logo Preview"
                                            className="w-full h-28 object-contain mx-auto"
                                        />
                                        <button
                                            onClick={() => {
                                                setLogo(null);
                                                setLogoPreview("");
                                            }}
                                            className="absolute top-1 right-1 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Company Addresses Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <MapPin className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">Company Addresses</h2>
                                </div>
                                <button
                                    onClick={addNewAddress}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Address
                                </button>
                            </div>

                            <div className="space-y-4">
                                {addresses.map((address) => (
                                    <div key={address.id} className="border border-gray-200 rounded-xl p-4">
                                        {address.isEditing ? (
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-gray-700">Street Address</label>
                                                        <input
                                                            type="text"
                                                            value={address.street}
                                                            onChange={(e) => saveAddress(address.id, 'street', e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                            placeholder="Enter street address"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-gray-700">City</label>
                                                        <input
                                                            type="text"
                                                            value={address.city}
                                                            onChange={(e) => saveAddress(address.id, 'city', e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                            placeholder="Enter city"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-gray-700">State</label>
                                                        <input
                                                            type="text"
                                                            value={address.state}
                                                            onChange={(e) => saveAddress(address.id, 'state', e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                            placeholder="Enter state"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-gray-700">ZIP Code</label>
                                                        <input
                                                            type="text"
                                                            value={address.zipCode}
                                                            onChange={(e) => saveAddress(address.id, 'zipCode', e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                            placeholder="Enter ZIP code"
                                                        />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="text-sm font-medium text-gray-700">Country</label>
                                                        <input
                                                            type="text"
                                                            value={address.country}
                                                            onChange={(e) => saveAddress(address.id, 'country', e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                            placeholder="Enter country"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => saveAllAddressEdits(address.id)}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                    >
                                                        Save Address
                                                    </button>
                                                    <button
                                                        onClick={() => cancelAddressEdit(address.id)}
                                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-blue-50 rounded-lg">
                                                            <Globe className="w-5 h-5 text-blue-500" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-gray-800">{address.street}</h3>
                                                            <p className="text-gray-600 text-sm">
                                                                {address.city}, {address.state} {address.zipCode}
                                                            </p>
                                                            <p className="text-gray-600 text-sm">{address.country}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => startEditingAddress(address.id)}
                                                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        {addresses.length > 1 && (
                                                            <button
                                                                onClick={() => removeAddress(address.id)}
                                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Details */}
                    <div className="space-y-6">
                        {/* Email Addresses Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Mail className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">Email Addresses</h2>
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {emails.length} {emails.length === 1 ? 'Email' : 'Emails'}
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                {emails.map((emailItem) => (
                                    <div key={emailItem.id} className="border border-gray-200 rounded-xl p-4 hover:border-green-300 transition-colors">
                                        {emailItem.isEditing ? (
                                            <div className="flex flex-col gap-3">
                                                <input
                                                    type="email"
                                                    defaultValue={emailItem.email}
                                                    onBlur={(e) => saveEmail(emailItem.id, e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                    autoFocus
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => saveEmail(emailItem.id, document.activeElement.value)}
                                                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => cancelEmailEdit(emailItem.id)}
                                                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span className="text-gray-700">{emailItem.email}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => startEditingEmail(emailItem.id)}
                                                        className="p-1 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    {emails.length > 1 && (
                                                        <button
                                                            onClick={() => removeEmail(emailItem.id)}
                                                            className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    placeholder="Add new email address"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <button
                                    onClick={addEmail}
                                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Phone Numbers Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <Phone className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">Phone Numbers</h2>
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {phones.length} {phones.length === 1 ? 'Phone' : 'Phones'}
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                {phones.map((phoneItem) => (
                                    <div key={phoneItem.id} className="border border-gray-200 rounded-xl p-4 hover:border-orange-300 transition-colors">
                                        {phoneItem.isEditing ? (
                                            <div className="flex flex-col gap-3">
                                                <input
                                                    type="tel"
                                                    defaultValue={phoneItem.phone}
                                                    onBlur={(e) => savePhone(phoneItem.id, e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    autoFocus
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => savePhone(phoneItem.id, document.activeElement.value)}
                                                        className="px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => cancelPhoneEdit(phoneItem.id)}
                                                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                                    <span className="text-gray-700">{phoneItem.phone}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => startEditingPhone(phoneItem.id)}
                                                        className="p-1 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    {phones.length > 1 && (
                                                        <button
                                                            onClick={() => removePhone(phoneItem.id)}
                                                            className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="tel"
                                    value={newPhone}
                                    onChange={(e) => setNewPhone(e.target.value)}
                                    placeholder="Add new phone number"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <button
                                    onClick={addPhone}
                                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;

import { useState } from 'react';
import {
    Upload,
    Mail,
    Phone,
    MapPin,
    Plus,
    Trash2,
    X,
    Edit2,
    Globe,
    Building,
} from 'lucide-react';

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
            street: '456 Creative Blvd',
            city: 'Los Angeles',
            state: 'CA',
            zipCode: '90001',
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
        if (emails.length > 1) {
            setEmails(emails.filter(email => email.id !== id));
        }
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
        if (phones.length > 1) {
            setPhones(phones.filter(phone => phone.id !== id));
        }
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
        setAddresses([newAddress, ...addresses]);
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
        const address = addresses.find(a => a.id === id);
        if (address.street && address.city && address.country) {
            setAddresses(addresses.map(address =>
                address.id === id ? { ...address, isEditing: false } : address
            ));
        }
    };

    // Cancel address editing
    const cancelAddressEdit = (id) => {
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
        if (addresses.length > 1) {
            setAddresses(addresses.filter(address => address.id !== id));
        }
    };

    return (
        <div className="bg-white shadow-md mt-6 py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-3">
                        <div>
                            {/* <h1 className="text-3xl font-bold text-amber-600">Settings</h1> */}
                            <h1 className="text-3xl font-bold text-amber-600 uppercase">System Configuration</h1>
                            <p className="text-gray-600 mt-1 text-lg">
                                Manage your interior design studio's branding and contact information
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Logo & Addresses */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Logo Upload Card */}
                        <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    {/* <h2 className="text-lg font-semibold text-gray-900">Brand Logo</h2> */}
                                    <p className="text-sm text-gray-600 mt-1">
                                        Upload your studio logo (PNG, JPG, SVG)
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                {/* Logo Preview */}
                                {logoPreview ? (
                                    <div className="relative">
                                        <div className="w-20 h-20 border border-gray-200 rounded-lg bg-gray-50 p-4 flex items-center justify-center">
                                            <img
                                                src={logoPreview}
                                                alt="Logo Preview"
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>
                                        <button
                                            onClick={() => {
                                                setLogo(null);
                                                setLogoPreview("");
                                            }}
                                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center text-gray-400">
                                        <Building className="w-8 h-8 mb-2" />
                                        <span className="text-xs">No logo</span>
                                    </div>
                                )}

                                {/* Upload Button */}
                                <div className="flex-1">
                                    <div className="max-w-xs">
                                        <label className="block w-full cursor-pointer">
                                            <div className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                                                <Upload className="w-4 h-4" />
                                                Upload Logo
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleLogoUpload}
                                                className="hidden"
                                            />
                                        </label>
                                        <p className="text-xs text-gray-500 mt-3">
                                            Recommended: Square logo, transparent background, 512×512px
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Company Addresses Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <MapPin className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Company Addresses</h2>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Add multiple locations for your studio
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={addNewAddress}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Address
                                </button>
                            </div>

                            <div className="space-y-4">
                                {addresses.map((address) => (
                                    <div key={address.id} className="border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                                        {address.isEditing ? (
                                            <div className="p-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                            Street Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={address.street}
                                                            onChange={(e) => saveAddress(address.id, 'street', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                            placeholder="123 Main Street"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                            City
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={address.city}
                                                            onChange={(e) => saveAddress(address.id, 'city', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                            placeholder="New York"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                            State/Province
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={address.state}
                                                            onChange={(e) => saveAddress(address.id, 'state', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                            placeholder="NY"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                            ZIP/Postal Code
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={address.zipCode}
                                                            onChange={(e) => saveAddress(address.id, 'zipCode', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                            placeholder="10001"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                            Country
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={address.country}
                                                            onChange={(e) => saveAddress(address.id, 'country', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                            placeholder="United States"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => saveAllAddressEdits(address.id)}
                                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        Save Address
                                                    </button>
                                                    <button
                                                        onClick={() => cancelAddressEdit(address.id)}
                                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-start gap-3">
                                                        <div className="p-2 bg-blue-50 rounded-lg mt-0.5">
                                                            <Globe className="w-4 h-4 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-gray-900">{address.street}</h3>
                                                            <p className="text-gray-600 text-sm mt-0.5">
                                                                {address.city}, {address.state} {address.zipCode}
                                                            </p>
                                                            <p className="text-gray-500 text-sm mt-0.5">{address.country}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => startEditingAddress(address.id)}
                                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        {addresses.length > 1 && (
                                                            <button
                                                                onClick={() => removeAddress(address.id)}
                                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Mail className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Email Addresses</h2>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {emails.length} {emails.length === 1 ? 'email' : 'emails'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                {emails.map((emailItem) => (
                                    <div key={emailItem.id} className="border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                                        {emailItem.isEditing ? (
                                            <div className="p-3">
                                                <input
                                                    type="email"
                                                    defaultValue={emailItem.email}
                                                    onBlur={(e) => saveEmail(emailItem.id, e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            saveEmail(emailItem.id, e.target.value);
                                                        }
                                                        if (e.key === 'Escape') {
                                                            cancelEmailEdit(emailItem.id);
                                                        }
                                                    }}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm mb-2"
                                                    autoFocus
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => saveEmail(emailItem.id, document.activeElement.value)}
                                                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => cancelEmailEdit(emailItem.id)}
                                                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-3">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        <span className="text-sm text-gray-900">{emailItem.email}</span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => startEditingEmail(emailItem.id)}
                                                            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                        >
                                                            <Edit2 className="w-3.5 h-3.5" />
                                                        </button>
                                                        {emails.length > 1 && (
                                                            <button
                                                                onClick={() => removeEmail(emailItem.id)}
                                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        )}
                                                    </div>
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
                                    placeholder="Add new email"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addEmail();
                                        }
                                    }}
                                />
                                <button
                                    onClick={addEmail}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                    disabled={!newEmail.trim()}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Phone Numbers Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <Phone className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Phone Numbers</h2>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {phones.length} {phones.length === 1 ? 'phone' : 'phones'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                {phones.map((phoneItem) => (
                                    <div key={phoneItem.id} className="border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                                        {phoneItem.isEditing ? (
                                            <div className="p-3">
                                                <input
                                                    type="tel"
                                                    defaultValue={phoneItem.phone}
                                                    onBlur={(e) => savePhone(phoneItem.id, e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            savePhone(phoneItem.id, e.target.value);
                                                        }
                                                        if (e.key === 'Escape') {
                                                            cancelPhoneEdit(phoneItem.id);
                                                        }
                                                    }}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm mb-2"
                                                    autoFocus
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => savePhone(phoneItem.id, document.activeElement.value)}
                                                        className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => cancelPhoneEdit(phoneItem.id)}
                                                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-3">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                                        <span className="text-sm text-gray-900">{phoneItem.phone}</span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => startEditingPhone(phoneItem.id)}
                                                            className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                        >
                                                            <Edit2 className="w-3.5 h-3.5" />
                                                        </button>
                                                        {phones.length > 1 && (
                                                            <button
                                                                onClick={() => removePhone(phoneItem.id)}
                                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        )}
                                                    </div>
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
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addPhone();
                                        }
                                    }}
                                />
                                <button
                                    onClick={addPhone}
                                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                                    disabled={!newPhone.trim()}
                                >
                                    <Plus className="w-4 h-4" />
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
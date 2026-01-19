import { useState } from "react";
import { Eye, EyeOff, Lock, Key, Shield, CheckCircle, AlertCircle, RefreshCw, Sparkles } from "lucide-react";

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [passwordVisibility, setPasswordVisibility] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        suggestions: []
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const analyzePassword = (password) => {
        const suggestions = [];
        let score = 0;
        
        // Length check
        if (password.length >= 8) score++;
        else suggestions.push("Password should be at least 8 characters long");
        
        // Uppercase check
        if (/[A-Z]/.test(password)) score++;
        else suggestions.push("Add at least one uppercase letter (A-Z)");
        
        // Lowercase check
        if (/[a-z]/.test(password)) score++;
        else suggestions.push("Add at least one lowercase letter (a-z)");
        
        // Number check
        if (/[0-9]/.test(password)) score++;
        else suggestions.push("Add at least one number (0-9)");
        
        // Special character check
        if (/[^A-Za-z0-9]/.test(password)) score++;
        else suggestions.push("Add at least one special character (!@#$%^&*)");
        
        return { score, suggestions: suggestions.slice(0, 3) }; // Show max 3 suggestions
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }

        // Analyze new password strength
        if (name === "newPassword") {
            const analysis = analyzePassword(value);
            setPasswordStrength(analysis);
        }

        // Check password match in real-time
        if ((name === "newPassword" || name === "confirmPassword") && formData.confirmPassword) {
            if (name === "newPassword" && formData.confirmPassword !== value && formData.confirmPassword) {
                setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
            } else if (name === "confirmPassword" && formData.newPassword !== value && formData.newPassword) {
                setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
            } else if (formData.newPassword && value && formData.newPassword === value) {
                setErrors(prev => ({ ...prev, confirmPassword: null }));
            }
        }
    };

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const getPasswordStrengthColor = () => {
        switch (passwordStrength.score) {
            case 0: return "bg-gradient-to-r from-gray-300 to-gray-400";
            case 1: return "bg-gradient-to-r from-red-400 to-pink-500";
            case 2: return "bg-gradient-to-r from-orange-400 to-amber-500";
            case 3: return "bg-gradient-to-r from-yellow-400 to-yellow-500";
            case 4: return "bg-gradient-to-r from-blue-400 to-cyan-500";
            case 5: return "bg-gradient-to-r from-emerald-400 to-green-500";
            default: return "bg-gradient-to-r from-gray-300 to-gray-400";
        }
    };

    const getStrengthText = () => {
        switch (passwordStrength.score) {
            case 0: return "Enter a password";
            case 1: return "Very Weak";
            case 2: return "Weak";
            case 3: return "Fair";
            case 4: return "Good";
            case 5: return "Excellent! 🎉";
            default: return "";
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.currentPassword.trim()) {
            newErrors.currentPassword = "Current password is required";
        }

        if (!formData.newPassword.trim()) {
            newErrors.newPassword = "New password is required";
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = "Password must be at least 8 characters";
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (passwordStrength.score < 3) {
            alert("Please create a stronger password. Follow the suggestions below.");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log("Password Change Data:", formData);
            setIsSubmitting(false);
            setShowSuccess(true);
            
            // Reset form
            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
            setPasswordStrength({ score: 0, suggestions: [] });
            setErrors({});

            // Hide success message after 5 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        }, 1500);
    };

    const handleResetForm = () => {
        setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
        setPasswordStrength({ score: 0, suggestions: [] });
        setErrors({});
        setPasswordVisibility({
            current: false,
            new: false,
            confirm: false
        });
    };

    return (
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-sm mt-6 p-4 md:p-8 rounded-sm border border-purple-100">
            <div className="w-full">
                {/* Success Message */}
                {showSuccess && (
                    <div className="mb-8 animate-fade-in-down">
                        <div className="bg-gradient-to-r from-emerald-400 to-green-500 text-white rounded-2xl shadow-2xl p-6 md:p-8 flex items-center gap-6 border border-emerald-300">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-bold text-2xl">Password Changed Successfully! 🎉</h3>
                                    <Sparkles className="w-6 h-6 text-yellow-300" />
                                </div>
                                <p className="text-emerald-100 text-lg mb-4">Your password has been updated securely. You'll need to use your new password for your next login.</p>
                                <div className="flex items-center gap-2 text-emerald-100">
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="text-sm font-medium">Remember to update your password in any other devices or applications.</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="text-white/80 hover:text-white text-xl"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="text-center mb-10">
                    
                    <h1 className="text-3xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                        Change Password
                    </h1>
                    <p className="text-lg text-purple-700 max-w-lg mx-auto font-medium">
                        Enhance your account security with a new, strong password
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Panel - Requirements */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-lg border-2 border-indigo-100 p-6 h-full">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                                    <Key className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Password Requirements
                                </h2>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-5 shadow-sm">
                                    <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-lg">Must Include</span>
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3">
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm ${formData.newPassword.length >= 8 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-gray-300 to-gray-400'}`}>
                                                <span className={`text-sm font-bold ${formData.newPassword.length >= 8 ? 'text-white' : 'text-gray-500'}`}>
                                                    {formData.newPassword.length >= 8 ? '✓' : '•'}
                                                </span>
                                            </div>
                                            <span className={`font-medium ${formData.newPassword.length >= 8 ? 'text-green-700' : 'text-gray-600'}`}>
                                                Minimum 8 characters
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm ${/[A-Z]/.test(formData.newPassword) ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-gray-300 to-gray-400'}`}>
                                                <span className={`text-sm font-bold ${/[A-Z]/.test(formData.newPassword) ? 'text-white' : 'text-gray-500'}`}>
                                                    {/[A-Z]/.test(formData.newPassword) ? '✓' : '•'}
                                                </span>
                                            </div>
                                            <span className={`font-medium ${/[A-Z]/.test(formData.newPassword) ? 'text-green-700' : 'text-gray-600'}`}>
                                                One uppercase letter (A-Z)
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm ${/[a-z]/.test(formData.newPassword) ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-gray-300 to-gray-400'}`}>
                                                <span className={`text-sm font-bold ${/[a-z]/.test(formData.newPassword) ? 'text-white' : 'text-gray-500'}`}>
                                                    {/[a-z]/.test(formData.newPassword) ? '✓' : '•'}
                                                </span>
                                            </div>
                                            <span className={`font-medium ${/[a-z]/.test(formData.newPassword) ? 'text-green-700' : 'text-gray-600'}`}>
                                                One lowercase letter (a-z)
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm ${/[0-9]/.test(formData.newPassword) ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-gray-300 to-gray-400'}`}>
                                                <span className={`text-sm font-bold ${/[0-9]/.test(formData.newPassword) ? 'text-white' : 'text-gray-500'}`}>
                                                    {/[0-9]/.test(formData.newPassword) ? '✓' : '•'}
                                                </span>
                                            </div>
                                            <span className={`font-medium ${/[0-9]/.test(formData.newPassword) ? 'text-green-700' : 'text-gray-600'}`}>
                                                One number (0-9)
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm ${/[^A-Za-z0-9]/.test(formData.newPassword) ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-gray-300 to-gray-400'}`}>
                                                <span className={`text-sm font-bold ${/[^A-Za-z0-9]/.test(formData.newPassword) ? 'text-white' : 'text-gray-500'}`}>
                                                    {/[^A-Za-z0-9]/.test(formData.newPassword) ? '✓' : '•'}
                                                </span>
                                            </div>
                                            <span className={`font-medium ${/[^A-Za-z0-9]/.test(formData.newPassword) ? 'text-green-700' : 'text-gray-600'}`}>
                                                One special character (!@#$%^&*)
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-5 shadow-sm">
                                    <h3 className="font-bold text-amber-800 mb-4 flex items-center gap-3">
                                        <AlertCircle className="w-7 h-7 text-amber-600" />
                                        <span className="text-lg">Security Tips</span>
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-amber-600 font-bold">•</span>
                                            <span className="text-amber-800">Don't use personal information (name, birthdate)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-amber-600 font-bold">•</span>
                                            <span className="text-amber-800">Avoid common words and sequences</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-amber-600 font-bold">•</span>
                                            <span className="text-amber-800">Don't reuse passwords from other sites</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-amber-600 font-bold">•</span>
                                            <span className="text-amber-800">Consider using a password manager</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg border-2 border-purple-100 p-6 md:p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Current Password */}
                                <div className="space-y-4">
                                    <label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow">
                                            <Lock className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                            Current Password
                                        </span>
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={passwordVisibility.current ? "text" : "password"}
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleInputChange}
                                            placeholder="Enter your current password"
                                            className={`w-full px-5 py-3 pl-14 border-2 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg ${errors.currentPassword ? 'border-red-400 bg-red-50/50' : 'border-purple-200'}`}
                                        />
                                        <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                                            <Key className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility("current")}
                                            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
                                        >
                                            {passwordVisibility.current ? (
                                                <EyeOff className="w-6 h-6" />
                                            ) : (
                                                <Eye className="w-6 h-6" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.currentPassword && (
                                        <p className="text-sm text-red-600 font-medium flex items-center gap-2 bg-red-50 p-3 rounded-lg">
                                            <AlertCircle className="w-5 h-5" />
                                            {errors.currentPassword}
                                        </p>
                                    )}
                                </div>

                                {/* New Password */}
                                <div className="space-y-5">
                                    <label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow">
                                            <Lock className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                            New Password
                                        </span>
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={passwordVisibility.new ? "text" : "password"}
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                            placeholder="Create a strong new password"
                                            className={`w-full px-5 py-3 pl-14 border-2 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg ${errors.newPassword ? 'border-red-400 bg-red-50/50' : 'border-emerald-200'}`}
                                        />
                                        <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                                            <Lock className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility("new")}
                                            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-emerald-400 hover:text-emerald-600 transition-colors"
                                        >
                                            {passwordVisibility.new ? (
                                                <EyeOff className="w-6 h-6" />
                                            ) : (
                                                <Eye className="w-6 h-6" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.newPassword && (
                                        <p className="text-sm text-red-600 font-medium flex items-center gap-2 bg-red-50 p-3 rounded-lg">
                                            <AlertCircle className="w-5 h-5" />
                                            {errors.newPassword}
                                        </p>
                                    )}

                                    {/* Password Strength Indicator */}
                                    {formData.newPassword && (
                                        <div className="space-y-4 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 p-5 rounded-xl border border-blue-100">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-gray-800">
                                                    Password Strength: 
                                                    <span className={`font-extrabold ml-3 text-xl ${
                                                        passwordStrength.score >= 4 ? "text-emerald-600" :
                                                        passwordStrength.score >= 3 ? "text-blue-600" :
                                                        passwordStrength.score >= 2 ? "text-amber-600" :
                                                        "text-red-600"
                                                    }`}>
                                                        {getStrengthText()}
                                                    </span>
                                                </span>
                                                <span className="text-lg font-bold text-gray-900 bg-white px-4 py-2 rounded-full shadow-sm">
                                                    {passwordStrength.score}/5
                                                </span>
                                            </div>
                                            <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden shadow-inner">
                                                <div
                                                    className={`h-full ${getPasswordStrengthColor()} transition-all duration-700 shadow-lg`}
                                                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                                                />
                                            </div>
                                            
                                            {/* Suggestions */}
                                            {passwordStrength.suggestions.length > 0 && (
                                                <div className="mt-4 space-y-2">
                                                    <p className="font-bold text-gray-700">Suggestions for improvement:</p>
                                                    {passwordStrength.suggestions.map((suggestion, index) => (
                                                        <p key={index} className="text-gray-600 flex items-center gap-3 bg-white/50 p-3 rounded-lg">
                                                            <AlertCircle className="w-5 h-5 text-amber-500" />
                                                            {suggestion}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center shadow">
                                            <Lock className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                                            Confirm New Password
                                        </span>
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={passwordVisibility.confirm ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Re-enter your new password"
                                            className={`w-full px-5 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg ${
                                                errors.confirmPassword ? 'border-red-400 bg-red-50/50' :
                                                formData.confirmPassword && formData.newPassword === formData.confirmPassword ? 'border-emerald-400 bg-emerald-50/50' :
                                                'border-pink-200'
                                            }`}
                                        />
                                        <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                                            <Shield className="w-6 h-6 text-pink-400" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility("confirm")}
                                            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors"
                                        >
                                            {passwordVisibility.confirm ? (
                                                <EyeOff className="w-6 h-6" />
                                            ) : (
                                                <Eye className="w-6 h-6" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-sm text-red-600 font-medium flex items-center gap-2 bg-red-50 p-3 rounded-lg">
                                            <AlertCircle className="w-5 h-5" />
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                    {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
                                        <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200">
                                            <CheckCircle className="w-7 h-7 text-emerald-600" />
                                            <span className="font-bold text-emerald-700 text-lg">🎉 Perfect! Passwords match ✓</span>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-5 pt-8 border-t-2 border-purple-100">
                                    <button
                                        type="button"
                                        onClick={handleResetForm}
                                        className="px-8 py-4 border-2 border-gradient-to-r from-purple-300 to-indigo-300 text-gray-800 font-bold rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                                    >
                                        <RefreshCw className="w-6 h-6" />
                                        <span className="text-lg">Reset Form</span>
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`px-10 py-4 font-bold rounded-xl transition-all duration-300 flex-1 flex items-center justify-center gap-4 shadow-lg hover:shadow-xl ${
                                            isSubmitting
                                                ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600'
                                        } text-white text-lg`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-7 w-7" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                <span className="text-xl font-bold">Updating Password...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Shield className="w-7 h-7" />
                                                <span className="text-xl font-bold">Change Password</span>
                                                <Sparkles className="w-6 h-6" />
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Required Fields Note */}
                                <div className="pt-4 text-center">
                                    <p className="text-sm text-purple-600 font-medium">
                                        <span className="text-red-500 font-bold">*</span> Required fields
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChangePassword;
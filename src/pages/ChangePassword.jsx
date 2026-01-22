import { useState } from "react";
import { Eye, EyeOff, Lock, Key, Shield, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

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
        
        if (password.length >= 8) score++;
        else suggestions.push("At least 8 characters");
        
        if (/[A-Z]/.test(password)) score++;
        else suggestions.push("One uppercase letter");
        
        if (/[a-z]/.test(password)) score++;
        else suggestions.push("One lowercase letter");
        
        if (/[0-9]/.test(password)) score++;
        else suggestions.push("One number");
        
        if (/[^A-Za-z0-9]/.test(password)) score++;
        else suggestions.push("One special character");
        
        return { score, suggestions: suggestions.slice(0, 3) };
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }

        if (name === "newPassword") {
            const analysis = analyzePassword(value);
            setPasswordStrength(analysis);
        }

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
            case 0: return "bg-gray-200";
            case 1: return "bg-red-500";
            case 2: return "bg-orange-500";
            case 3: return "bg-yellow-500";
            case 4: return "bg-blue-500";
            case 5: return "bg-emerald-500";
            default: return "bg-gray-200";
        }
    };

    const getStrengthText = () => {
        switch (passwordStrength.score) {
            case 0: return "Enter password";
            case 1: return "Very Weak";
            case 2: return "Weak";
            case 3: return "Fair";
            case 4: return "Good";
            case 5: return "Strong";
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
            alert("Please create a stronger password");
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            console.log("Password Change Data:", formData);
            setIsSubmitting(false);
            setShowSuccess(true);
            
            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
            setPasswordStrength({ score: 0, suggestions: [] });
            setErrors({});

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
        <div className="bg-white shadow-md mt-6 py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full">
                {/* Success Message */}
                {showSuccess && (
                    <div className="mb-8 animate-fade-in">
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start">
                            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                                <h3 className="text-sm font-medium text-emerald-800">Password updated successfully</h3>
                                <p className="mt-1 text-sm text-emerald-700">
                                    Your password has been changed. You'll need to use your new password for your next login.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="ml-auto text-emerald-400 hover:text-emerald-600"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="md:flex">
                        {/* Left Panel - Requirements */}
                        <div className="md:w-1/3 bg-gradient-to-b from-gray-50 to-white p-8 border-r border-gray-200">
                        <div className="mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-amber-600">
                                            Password Requirements
                                        </h2>
                                        <p className="text-gray-600 text-lg">
                                            Create a strong, secure password
                                        </p>
                                    </div>
                                </div>
                            </div> 
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Must include</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center">
                                            <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${formData.newPassword.length >= 8 ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                                                <CheckCircle className={`w-3 h-3 ${formData.newPassword.length >= 8 ? 'text-white' : 'text-gray-400'}`} />
                                            </div>
                                            <span className={`text-sm ${formData.newPassword.length >= 8 ? 'text-gray-900' : 'text-gray-600'}`}>
                                                8+ characters
                                            </span>
                                        </li>
                                        <li className="flex items-center">
                                            <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${/[A-Z]/.test(formData.newPassword) ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                                                <CheckCircle className={`w-3 h-3 ${/[A-Z]/.test(formData.newPassword) ? 'text-white' : 'text-gray-400'}`} />
                                            </div>
                                            <span className={`text-sm ${/[A-Z]/.test(formData.newPassword) ? 'text-gray-900' : 'text-gray-600'}`}>
                                                Uppercase letter
                                            </span>
                                        </li>
                                        <li className="flex items-center">
                                            <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${/[a-z]/.test(formData.newPassword) ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                                                <CheckCircle className={`w-3 h-3 ${/[a-z]/.test(formData.newPassword) ? 'text-white' : 'text-gray-400'}`} />
                                            </div>
                                            <span className={`text-sm ${/[a-z]/.test(formData.newPassword) ? 'text-gray-900' : 'text-gray-600'}`}>
                                                Lowercase letter
                                            </span>
                                        </li>
                                        <li className="flex items-center">
                                            <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${/[0-9]/.test(formData.newPassword) ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                                                <CheckCircle className={`w-3 h-3 ${/[0-9]/.test(formData.newPassword) ? 'text-white' : 'text-gray-400'}`} />
                                            </div>
                                            <span className={`text-sm ${/[0-9]/.test(formData.newPassword) ? 'text-gray-900' : 'text-gray-600'}`}>
                                                Number (0-9)
                                            </span>
                                        </li>
                                        <li className="flex items-center">
                                            <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${/[^A-Za-z0-9]/.test(formData.newPassword) ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                                                <CheckCircle className={`w-3 h-3 ${/[^A-Za-z0-9]/.test(formData.newPassword) ? 'text-white' : 'text-gray-400'}`} />
                                            </div>
                                            <span className={`text-sm ${/[^A-Za-z0-9]/.test(formData.newPassword) ? 'text-gray-900' : 'text-gray-600'}`}>
                                                Special character
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-6 border-t border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-2 text-gray-400" />
                                        Security Tips
                                    </h3>
                                    <ul className="space-y-2">
                                        <li className="text-sm text-gray-600">• Don't use personal information</li>
                                        <li className="text-sm text-gray-600">• Avoid common words</li>
                                        <li className="text-sm text-gray-600">• Don't reuse passwords</li>
                                        <li className="text-sm text-gray-600">• Consider a password manager</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel - Form */}
                        <div className="md:w-2/3 p-8">
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-amber-600">Change Password</h1>
                                <p className="mt-2 text-gray-600 text-lg">Update your account password to keep it secure</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Current Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={passwordVisibility.current ? "text" : "password"}
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleInputChange}
                                            placeholder="Enter current password"
                                            className={`block w-full px-4 py-3 pl-11 text-sm rounded-lg border ${errors.currentPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors`}
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Key className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility("current")}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {passwordVisibility.current ? (
                                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.currentPassword && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {errors.currentPassword}
                                        </p>
                                    )}
                                </div>

                                {/* New Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={passwordVisibility.new ? "text" : "password"}
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                            placeholder="Enter new password"
                                            className={`block w-full px-4 py-3 pl-11 text-sm rounded-lg border ${errors.newPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors`}
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility("new")}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {passwordVisibility.new ? (
                                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.newPassword && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {errors.newPassword}
                                        </p>
                                    )}

                                    {/* Password Strength */}
                                    {formData.newPassword && (
                                        <div className="mt-4 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-medium text-gray-700">
                                                    Password strength: <span className={`font-semibold ${passwordStrength.score >= 4 ? 'text-emerald-600' : passwordStrength.score >= 3 ? 'text-blue-600' : passwordStrength.score >= 2 ? 'text-amber-600' : 'text-red-600'}`}>
                                                        {getStrengthText()}
                                                    </span>
                                                </span>
                                                <span className="text-xs font-medium text-gray-900">
                                                    {passwordStrength.score}/5
                                                </span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                                                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                                                />
                                            </div>
                                            {passwordStrength.suggestions.length > 0 && (
                                                <div className="mt-3 space-y-1">
                                                    {passwordStrength.suggestions.map((suggestion, index) => (
                                                        <p key={index} className="text-xs text-gray-600 flex items-center">
                                                            <AlertCircle className="w-3 h-3 mr-2 text-amber-500" />
                                                            {suggestion}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={passwordVisibility.confirm ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Confirm new password"
                                            className={`block w-full px-4 py-3 pl-11 text-sm rounded-lg border ${
                                                errors.confirmPassword ? 'border-red-300 bg-red-50' :
                                                formData.confirmPassword && formData.newPassword === formData.confirmPassword ? 'border-emerald-300 bg-emerald-50' :
                                                'border-gray-300'
                                            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors`}
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Shield className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility("confirm")}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {passwordVisibility.confirm ? (
                                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                    {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
                                        <p className="mt-2 text-sm text-emerald-600 flex items-center">
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                            Passwords match
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
                                    <button
                                        type="button"
                                        onClick={handleResetForm}
                                        className="px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Reset Form
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`flex-1 px-4 py-3 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                                            isSubmitting
                                                ? 'bg-blue-400 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700'
                                        } flex items-center justify-center gap-2`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <Shield className="w-4 h-4" />
                                                Change Password
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Required Note */}
                                <div className="text-center">
                                    <p className="text-xs text-gray-500">
                                        All fields are required
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
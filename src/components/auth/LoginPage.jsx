import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const showAlert = (type, title, text) => {
    const Swal = window.Swal;
    if (type === 'success') {
      Swal.fire({
        icon: 'success',
        title: title,
        text: text,
        confirmButtonColor: '#059669',
        confirmButtonText: 'Great!',
        timer: 2000
      });
    } else if (type === 'error') {
      Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        confirmButtonColor: '#dc2626',
        confirmButtonText: 'Try Again'
      });
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        onLogin();        // ✅ update auth state
        navigate('/');    // ✅ dashboard
      } else {
        setError('Invalid username or password! Please try again.');
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" />
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

      <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl -top-48 -left-48"></div>
          <div className="absolute w-96 h-96 bg-teal-200 rounded-full opacity-20 blur-3xl -bottom-48 -right-48"></div>
        </div>

        <div className="w-full max-w-6xl bg-white/95 backdrop-blur-sm rounded-sm shadow-sm overflow-hidden relative z-10 border border-blue-100">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Login Form */}
            <div className="p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
              <div className="max-w-md mx-auto w-full">
                <div className="mb-6 sm:mb-8">
                  <h1 className="text-2xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Log in.</h1>
                  <p className="text-gray-500 text-sm sm:text-base">Login with your admin credentials.</p>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {/* Email Field */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                      UserName
                    </label>
                    <input
                      type="text"
                      value={credentials.username}
                      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-2.5 sm:py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all text-sm sm:text-base bg-gray-50 hover:bg-white"
                      placeholder="admin12xyz"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-2.5 sm:py-3 pr-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all text-sm sm:text-base bg-gray-50 hover:bg-white"
                        placeholder="XXXXXXXXXXXX"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center pt-1">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer"
                    />
                    <label htmlFor="remember" className="ml-2 text-gray-600 text-sm sm:text-base cursor-pointer select-none">
                      Keep me logged in
                    </label>
                  </div>

                  {/* Login Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-[#274896] text-white py-3 sm:py-3.5 rounded-xl font-semibold hover:bg-blue-900 transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl text-sm sm:text-base mt-6"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Logging in...</span>
                      </span>
                    ) : (
                      'Log In'
                    )}
                  </button>

                  {/* Forgot Password */}
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      className="text-orange-500 hover:text-orange-600 font-semibold transition-colors text-sm sm:text-base"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Interior Design Illustration */}
            <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center relative overflow-hidden order-1 lg:order-2 min-h-[300px] sm:min-h-[400px] lg:min-h-0">
              {/* Decorative plant in corner - visible on larger screens */}
              <div className="hidden lg:block absolute bottom-4 right-4 w-24 h-32">
                <svg viewBox="0 0 100 130" className="w-full h-full">
                  {/* Plant pot */}
                  <path d="M 35 100 L 30 130 L 70 130 L 65 100 Z" fill="#d97706" />
                  <rect x="32" y="95" width="36" height="5" fill="#b45309" />
                  {/* Leaves */}
                  <ellipse cx="45" cy="80" rx="12" ry="20" fill="#16a34a" transform="rotate(-30 45 80)" />
                  <ellipse cx="55" cy="75" rx="12" ry="22" fill="#15803d" transform="rotate(20 55 75)" />
                  <ellipse cx="50" cy="60" rx="10" ry="18" fill="#16a34a" transform="rotate(-10 50 60)" />
                  <ellipse cx="48" cy="45" rx="11" ry="20" fill="#15803d" transform="rotate(15 48 45)" />
                  {/* Stem */}
                  <rect x="48" y="45" width="4" height="55" fill="#166534" />
                </svg>
              </div>

              {/* Main Interior Illustration */}
              <div className="relative z-10 w-full max-w-lg mb-6 sm:mb-8">
                <div className="relative">
                  {/* Background circle */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full opacity-30 blur-2xl transform scale-110"></div>

                  <svg viewBox="0 0 500 400" className="w-full h-auto drop-shadow-2xl relative z-10">
                    {/* Living Room Scene */}

                    {/* Back wall */}
                    <rect x="50" y="80" width="400" height="280" fill="#f5f5f4" rx="10" />

                    {/* Window with curtains */}
                    <rect x="280" y="100" width="140" height="160" fill="#bae6fd" rx="8" />
                    <rect x="285" y="105" width="65" height="150" fill="#7dd3fc" opacity="0.6" />
                    <rect x="355" y="105" width="60" height="150" fill="#7dd3fc" opacity="0.6" />

                    {/* Window frame */}
                    <rect x="280" y="175" width="140" height="4" fill="#78716c" />
                    <rect x="350" y="100" width="4" height="160" fill="#78716c" />

                    {/* Curtain left */}
                    <path d="M 260 100 Q 270 130 265 170 Q 268 200 260 240 L 275 240 Q 280 200 278 170 Q 275 130 280 100 Z" fill="#fbbf24" opacity="0.8" />

                    {/* Curtain right */}
                    <path d="M 440 100 Q 430 130 435 170 Q 432 200 440 240 L 425 240 Q 420 200 422 170 Q 425 130 420 100 Z" fill="#fbbf24" opacity="0.8" />

                    {/* Wall decorations - framed plants */}
                    <rect x="80" y="120" width="50" height="60" fill="#ffffff" rx="4" stroke="#d4a574" strokeWidth="3" />
                    <ellipse cx="105" cy="145" rx="15" ry="20" fill="#16a34a" />
                    <rect x="102" y="155" width="6" height="15" fill="#92400e" />

                    <rect x="145" y="110" width="50" height="60" fill="#ffffff" rx="4" stroke="#d4a574" strokeWidth="3" />
                    <ellipse cx="170" cy="135" rx="15" ry="20" fill="#15803d" />
                    <rect x="167" y="145" width="6" height="15" fill="#92400e" />

                    <rect x="210" y="125" width="50" height="60" fill="#ffffff" rx="4" stroke="#d4a574" strokeWidth="3" />
                    <ellipse cx="235" cy="150" rx="15" ry="20" fill="#16a34a" />
                    <rect x="232" y="160" width="6" height="15" fill="#92400e" />

                    {/* Hanging lamp */}
                    <line x1="200" y1="80" x2="200" y2="140" stroke="#78716c" strokeWidth="2" />
                    <ellipse cx="200" cy="145" rx="35" ry="20" fill="#d97706" />
                    <ellipse cx="200" cy="145" rx="30" ry="18" fill="#f59e0b" />
                    <ellipse cx="200" cy="150" rx="40" ry="15" fill="#fbbf24" opacity="0.3" />

                    {/* Floor lamp */}
                    <line x1="100" y1="250" x2="100" y2="320" stroke="#92400e" strokeWidth="3" />
                    <ellipse cx="100" cy="235" rx="25" ry="15" fill="#fef3c7" />
                    <path d="M 75 240 Q 100 245 125 240" fill="#fde68a" />
                    <circle cx="100" cy="323" r="8" fill="#78716c" />

                    {/* Sofa */}
                    <rect x="150" y="260" width="140" height="70" fill="#e7e5e4" rx="8" />
                    <rect x="145" y="255" width="150" height="15" fill="#d6d3d1" rx="8" />

                    {/* Sofa pillows */}
                    <rect x="170" y="240" width="35" height="35" fill="#fbbf24" rx="4" transform="rotate(-10 187.5 257.5)" />
                    <rect x="230" y="240" width="35" height="35" fill="#fbbf24" rx="4" transform="rotate(10 247.5 257.5)" />

                    {/* Coffee table */}
                    <ellipse cx="235" cy="320" rx="60" ry="15" fill="#92400e" />
                    <rect x="205" y="305" width="60" height="15" fill="#a16207" rx="4" />

                    {/* Coffee cup on table */}
                    <ellipse cx="220" cy="305" rx="8" ry="4" fill="#78716c" />
                    <rect x="215" y="297" width="10" height="8" fill="#10b981" rx="2" />

                    {/* Plant on table */}
                    <ellipse cx="250" cy="295" rx="12" ry="15" fill="#16a34a" />
                    <rect x="247" y="300" width="6" height="10" fill="#92400e" />

                    {/* Bookshelf */}
                    <rect x="350" y="200" width="60" height="120" fill="#92400e" rx="4" />
                    <rect x="355" y="205" width="50" height="35" fill="#d97706" />
                    <rect x="355" y="245" width="50" height="35" fill="#d97706" />
                    <rect x="355" y="285" width="50" height="30" fill="#d97706" />

                    {/* Books on shelf */}
                    <rect x="360" y="210" width="8" height="25" fill="#ef4444" />
                    <rect x="370" y="210" width="8" height="25" fill="#3b82f6" />
                    <rect x="380" y="210" width="8" height="25" fill="#22c55e" />

                    {/* Large plant */}
                    <ellipse cx="430" cy="280" rx="20" ry="30" fill="#15803d" />
                    <ellipse cx="440" cy="270" rx="18" ry="28" fill="#16a34a" />
                    <ellipse cx="420" cy="265" rx="16" ry="25" fill="#16a34a" />
                    <rect x="427" y="290" width="6" height="30" fill="#92400e" />
                    <path d="M 410 320 L 405 335 L 455 335 L 450 320 Z" fill="#d97706" />

                    {/* Rug */}
                    <ellipse cx="235" cy="345" rx="100" ry="25" fill="#fef3c7" opacity="0.8" />
                    <ellipse cx="235" cy="345" rx="90" ry="22" fill="#fde68a" opacity="0.6" />
                  </svg>
                </div>
              </div>

              {/* Bottom Text */}
              <div className="relative z-10 text-center max-w-md px-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">Don't have account yet?</h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Contact us at <span className="text-orange-500 font-semibold">name@domine.com</span> and
                </p>
                <p className="text-sm sm:text-base text-gray-600">We will take care of everything!!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
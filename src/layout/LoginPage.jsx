import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { showLoginSuccess, showLoginError } from "../data/toast";

function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const showAlert = (type, title, text) => {
  //   const Swal = window.Swal;
  //   if (type === 'success') {
  //     Swal.fire({
  //       icon: 'success',
  //       title: title,
  //       text: text,
  //       confirmButtonColor: '#059669',
  //       confirmButtonText: 'Great!',
  //       timer: 2000
  //     });
  //   } else if (type === 'error') {
  //     Swal.fire({
  //       icon: 'error',
  //       title: title,
  //       text: text,
  //       confirmButtonColor: '#dc2626',
  //       confirmButtonText: 'Try Again'
  //     });
  //   }
  // };

  const handleSubmit = () => {
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        showLoginSuccess();
        onLogin();        // ✅ update auth state
        navigate('/');    // ✅ dashboard
      } else {
        showLoginError();
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
      <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl -top-48 -left-48"></div>
          <div className="absolute w-96 h-96 bg-teal-200 rounded-full opacity-20 blur-3xl -bottom-48 -right-48"></div>
        </div>

        <div className="w-full max-w-6xl bg-gradient-to-br from-[#FFF4EC] via-[#FFE5D4] to-[#F5A56B] rounded-sm shadow-sm overflow-hidden relative z-10 border border-blue-100">
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
                      className="w-full px-4 py-2 sm:py-3 border-2 border-orange-400 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all text-sm sm:text-base bg-gray-50 hover:bg-white"
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
                        className="w-full px-4 py-2 sm:py-3 pr-12 border-2 border-orange-400 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all text-sm sm:text-base bg-gray-50 hover:bg-white"
                        placeholder="XXXXXXXXXXXX"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-400 hover:text-orange-600 transition-colors cursor-pointer"
                      >
                        {showPassword ? (
                          <RxEyeOpen size={20} />
                        ) : (
                          <RxEyeClosed size={20} />
                        )}
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
                    className="w-full bg-orange-500 text-white py-3 sm:py-3.5 rounded-xl font-semibold hover:bg-orange-500 transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl text-sm sm:text-base mt-6"
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


            {/* Right Side - Full Cover Image */}
            <div className="hidden lg:block relative lg:order-2 bg-gradient-to-br from-[#FFF4EC] via-[#FFE5D4] to-[#F5A56B]">

              {/* Image wrapper to create spacing */}
              <div className="absolute inset-4  overflow-hidden shadow-lg">
                <img
                  src="/images/interior.png"
                  alt="Interior Design"
                  className="w-full h-full object-cover"
                />

                {/* Premium overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-black/10 to-transparent" />
              </div>

              {/* Branding text */}
              <div className="absolute bottom-12 left-12 text-white">
                <h2 className="text-2xl font-semibold tracking-wide">
                  Welcome to Design House
                </h2>
                <p className="text-sm opacity-90 text-gray-800 font-bold mt-1">
                  Where ideas turn into beautifully crafted spaces
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
export default function Testimonials({ darkMode }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Client Testimonials
        </h2>
        <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2 w-fit">
          <Star size={18} />
          Add Testimonial
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 md:p-6 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-3 md:mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="text-yellow-400 fill-yellow-400"
                    size={16}
                    style={{
                      animation: 'pulse 1.5s ease-in-out infinite',
                      animationDelay: `${j * 100}ms`
                    }}
                  />
                ))}
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 italic text-sm md:text-base leading-relaxed`}>
                "Excellent service! The team delivered beyond our expectations and helped grow our business significantly. Highly recommended!"
              </p>
              <div className="flex items-center">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Client${i}`}
                  alt="Client"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 border-2 border-indigo-500 hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <h4 className={`font-bold text-sm md:text-base ${darkMode ? 'text-white' : 'text-gray-800'}`}>Client Name {i}</h4>
                  <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>CEO, Company {i}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

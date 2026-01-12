import { servicePages } from "../data/servicePages";
import { Briefcase } from "lucide-react";

export default function Services({ darkMode }) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Our Services
                </h2>
                <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2 w-fit">
                    <Briefcase size={18} />
                    Add New Service
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {servicePages.map((service, i) => {
                    const Icon = service.icon;
                    return (
                        <div
                            key={i}
                            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 md:p-8 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer group relative overflow-hidden`}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg">
                                    <Icon className="text-white" size={28} />
                                </div>
                                <h3 className={`text-lg md:text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{service.name}</h3>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                                    Professional {service.name.toLowerCase()} solutions for your business growth and success.
                                </p>
                                <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                                    Learn More
                                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

}

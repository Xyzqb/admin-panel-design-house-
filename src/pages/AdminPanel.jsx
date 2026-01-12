import { useState } from "react";
import LoginPage from "../components/auth/LoginPage";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Dashboard from "../pages/Dashboard";
import Services from "../pages/Services";
import Clients from "../pages/Clients";
import Testimonials from "../pages/Testimonials";

export default function AdminPanel({ onLogout }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [activeMenu, setActiveMenu] = useState("dashboard");
    const [serviceSubmenu, setServiceSubmenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    if (!isLoggedIn) return <LoginPage onLogin={() => setIsLoggedIn(true)} />

    const renderContent = () => {
        switch (activeMenu) {
            case "dashboard":
                return <Dashboard darkMode={darkMode} />;

            case "services":
            case "web-design":
            case "seo":
            case "marketing":
            case "consulting":
            case "branding":
            case "development":
                return <Services darkMode={darkMode} />;

            case "clients":
                return <Clients darkMode={darkMode} />;

            case "testimonials":
                return <Testimonials darkMode={darkMode} />;

            default:
                return <Dashboard darkMode={darkMode} />;
        }
    };

    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            <Navbar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                handleLogout={() => setIsLoggedIn(false)}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            <Sidebar
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                serviceSubmenu={serviceSubmenu}
                setServiceSubmenu={setServiceSubmenu}
                darkMode={darkMode}
                sidebarOpen={sidebarOpen}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            <main className={`pt-20 px-4 md:px-8 transition-all ${sidebarOpen ? "lg:ml-64" : ""}`}>
                {renderContent()}
            </main>
        </div>
    );
}

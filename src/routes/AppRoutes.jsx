import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../layout/LoginPage";
import Dashboard from "../pages/Dashboard";
import Testimonials from "../pages/Testimonials";
import AdminLayout from "../layout/AdminLayout";
import Clients from "../pages/Clients";
import Projects from "../pages/Projects";
import Career from "../pages/Career";
import Interior from "../services/Interior"; // ✅ FIXED

export default function AppRoutes({ isLoggedIn, setIsLoggedIn, onLogout }) {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />

      <Route
        path="/"
        element={
          isLoggedIn ? <AdminLayout onLogout={onLogout} /> : <Navigate to="/login" replace />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="clients" element={<Clients />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="projects" element={<Projects />} />

        {/* services */}
        <Route path="/services/interior" element={<Interior />} />
        <Route path="/career/jobs" element={<Career/>}/>
      </Route>
    </Routes>
  );
}

import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../components/auth/LoginPage";
import Dashboard from "../pages/Dashboard";
import Testimonials from "../pages/Testimonials";
import AdminLayout from "../components/layout/AdminLayout";
import Clients from "../pages/Clients";

export default function AppRoutes({ isLoggedIn, setIsLoggedIn, onLogout }) {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
      />

      <Route
        path="/"
        element={
          isLoggedIn ? (
            <AdminLayout onLogout={onLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/clients" element={<Clients/>}/>
        <Route path="testimonials" element={<Testimonials />} />
        {/* add other pages here */}
      </Route>
    </Routes>
  );
}

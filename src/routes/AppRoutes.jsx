import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../layout/LoginPage";
import Dashboard from "../pages/Dashboard";
import Testimonials from "../pages/Testimonials";
import AdminLayout from "../layout/AdminLayout";
import Clients from "../pages/Clients";
import Projects from "../pages/Projects";
import Career from "../pages/Career";
import Interior from "../pages/Services"; // ✅ FIXED
import Blog from "../pages/Blogs";
import Portfolio from "../pages/Portfolio";
import Downloads from "../pages/Downloads";
// posts
import Post from "../pages/Post";
import PostList from "../pages/PostList";

// Setting
import Settings from "../pages/Settings";

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
        {/* <Route index element={<Dashboard />} /> */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* ✅ DASHBOARD ROUTE */}
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="clients" element={<Clients />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="projects" element={<Projects />} />

        {/* services */}
        <Route path="/services/interior" element={<Interior />} />
        <Route path="/career/jobs" element={<Career/>}/>
        <Route path="/blogs" element={<Blog/>} />
        <Route path="/Portfolio-details" element={<Portfolio/>} />
        <Route path="downloads" element={<Downloads/>} />

        {/* posts */}
        <Route path="/create-a-post" element={<Post/>} />
        <Route path="/post-list" element={<PostList/>} />
        {/* settings */}
        <Route path="/settings" element={<Settings/>} />

      </Route>
    </Routes>
  );
}

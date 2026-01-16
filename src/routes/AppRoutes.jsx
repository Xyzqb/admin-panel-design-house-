import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../layout/LoginPage";
import Dashboard from "../pages/Dashboard";
import Testimonials from "../pages/Testimonials";
import AdminLayout from "../layout/AdminLayout";
import Clients from "../pages/Clients";
import Projects from "../pages/Projects";
import Career from "../pages/Career";
import Interior from "../pages/Services";
import Blog from "../pages/Blogs";
import Portfolio from "../pages/Portfolio";
import Downloads from "../pages/Downloads";

// page
import CreatePage from "../pages/CreatePage";
import PageList from "../pages/PageList";

// posts
import Post from "../pages/CreatePost";
import PostList from "../pages/PostList";

// gallery
import GalleryCategory from "../pages/gallery/GalleryCategory";
import GalleryImagesList from "../pages/gallery/GalleryImagesList";
import AddGalleryImages from "../pages/gallery/AddGalleryImages";

// Testmonials
import AddTestimonial from "../pages/testmonials/AddTestimonial";

// settings
import Settings from "../pages/Settings";

export default function AppRoutes({ isLoggedIn, setIsLoggedIn, onLogout }) {
  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/login"
        element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
      />

      {/* ADMIN LAYOUT */}
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
        {/* DEFAULT */}
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* DASHBOARD */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* MAIN PAGES */}
        <Route path="clients" element={<Clients />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="projects" element={<Projects />} />

        {/* SERVICES */}
        <Route path="services/interior" element={<Interior />} />

        {/* CAREER */}
        <Route path="career/jobs" element={<Career />} />

        {/* BLOG */}
        <Route path="blogs" element={<Blog />} />

        {/* PORTFOLIO */}
        <Route path="portfolio-details" element={<Portfolio />} />

        {/* DOWNLOADS */}
        <Route path="downloads" element={<Downloads />} />

        {/* POSTS */}
        <Route path="create-a-post" element={<Post />} />
        <Route path="post-list" element={<PostList />} />

        {/* Create page */}
        <Route path="/create-a-page" element={<CreatePage/>}/>
        <Route path="/page-list" element={<PageList/>}/>

        {/* gallery */}
        <Route path="/gallery-category" element={<GalleryCategory/>} />
        <Route path="/gallery-image-list"element={<GalleryImagesList/>} />
        <Route path="/add-gallery-images" element={<AddGalleryImages/>}/>

        {/* testmonial */}
        <Route path="/add-testimonials" element={<AddTestimonial/>} />


        {/* SETTINGS */}
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

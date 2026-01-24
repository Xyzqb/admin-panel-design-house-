import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../layout/LoginPage";
import Dashboard from "../pages/Dashboard";
import AdminLayout from "../layout/AdminLayout";
import ChangePassword from "../pages/ChangePassword";
import Crosual from "../pages/HomeSlider";
import FestivalCarousel from "../pages/FestivalCarousel";
import EnquiryList from "../pages/BookMeeting";
import Remainder from "../pages/Remainder";
import AdminUser from "../layout/AdminUser";

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
import TestimonialsList from "../pages/testmonials/TestmonialList";

// vacancy
import AddVacancy from "../pages/vacancy/AddVacancy";
import VacancyList from "../pages/vacancy/VacancyList";

// our clients
import AddClients from "../pages/clients/AddClients";
import ClientsList from "../pages/clients/ClientList";

// our projects
import AddProject from "../pages/project/AddProject";
import ProjectList from "../pages/project/ProjectList";

// facilites
import AddFacility from "../pages/facilities/AddFacility";
import FacilityList from "../pages/facilities/FacilityList";

// corporate
import CorporateProfile from "../pages/corporate-clients/CorporateProfile";
import AddCorporateClients from "../pages/corporate-clients/AddCorporateClients";
import CorporateList from "../pages/corporate-clients/CorporateClientsList";

// individual clients
import AddIndividualClients from "../pages/individuals/AddIndividualClients";
import IndividualClientList from "../pages/individuals/IndividualClientList";
import IndividualProfile from "../pages/individuals/IndividualProfile";

// blogs
import AddBlogs from "../pages/Blogs/AddBlogs";
import BlogsList from "../pages/Blogs/BlogsList";

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

        {/* POSTS */}
        <Route path="create-a-post" element={<Post />} />
        <Route path="post-list" element={<PostList />} />

        {/* Create page */}
        <Route path="/create-a-page" element={<CreatePage />} />
        <Route path="/page-list" element={<PageList />} />

        {/* gallery */}
        <Route path="/gallery-category" element={<GalleryCategory />} />
        <Route path="/gallery-image-list" element={<GalleryImagesList />} />
        <Route path="/add-gallery-images" element={<AddGalleryImages />} />

        {/* testmonial */}
        <Route path="/add-testimonials" element={<AddTestimonial />} />
        <Route path="/testimonials-list" element={<TestimonialsList />} />

        {/* Vacancy */}
        <Route path="/add-vacancy" element={<AddVacancy />} />
        <Route path="/vacancy-list" element={<VacancyList />} />

        {/* clients */}
        <Route path="/add-clients" element={<AddClients />} />
        <Route path="/clients-list" element={<ClientsList />} />

        {/* projects */}
        <Route path="/add-projects" element={<AddProject />} />
        <Route path="/projects-list" element={<ProjectList />} />

        {/* facility */}
        <Route path="/add-facilities" element={<AddFacility />} />
        <Route path="/facilities-list" element={<FacilityList />} />

        {/* corporate */}
        <Route path="/corporate-profile/:id" element={<CorporateProfile />} />
        <Route path="/add-corporate-clients" element={<AddCorporateClients />} />
        <Route path="/corporate-clients-list" element={<CorporateList />} />

        {/* individual */}
        <Route path="/add-individual-clients" element={<AddIndividualClients />} />
        <Route path="/individual-clients-list" element={<IndividualClientList />} />
        <Route path="/individual-profile/:id" element={<IndividualProfile />} />

        {/* blogs */}
        <Route path="/add-blogs" element={<AddBlogs />} />
        <Route path="/blogs-list" element={<BlogsList />} />

        {/* SETTINGS */}
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/festival-carousels" element={<FestivalCarousel />} />
        <Route path="/carousel" element={<Crosual />} />
        <Route path="/enquiry-list" element={<EnquiryList />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/remainder-list" element={<Remainder />} />
        <Route path="/admin-users" element={<AdminUser />} />
      </Route>
    </Routes>
  );
}
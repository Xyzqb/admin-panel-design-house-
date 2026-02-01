import { path } from "framer-motion/client";
import {
  LayoutDashboard,
  FileText,
  Folder,
  Image,
  Users,
  User,
  Briefcase,
  BookOpen,
  Images,
  Lock,
  Settings,
  CalendarCheck,
  Building2,
  ShieldCheck,
  MessageSquare,
  Info,
} from "lucide-react";

export const menuItems = [
  /* ================= DASHBOARD ================= */
  {
    type: "item",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },

  /* ================= HOME SECTION ================= */
  {
    type: "heading",
    label: "Home Section",
  },

  {
    type: "item",
    label: "Home Slider",
    icon: Images,
    path: "/carousel",
  },
  {
    type: "item",
    label: "About Us",
    icon: Info,
    path: "/about-us",
  },

  {
    type: "item",
    label: "Book Meeting",
    icon: CalendarCheck,
    path: "/enquiry-list",
  },

  /* ================= CHATBOT SECTION ================= */
  {
    type: "item",
    label: "Chatbot",
    icon: MessageSquare,
    path: "/chatbot",
  },

  /* ================= CONTENT SECTION ================= */
  {
    type: "heading",
    label: "Content Section",
  },

  {
    type: "dropdown",
    label: "Post Details",
    icon: FileText,
    children: [
      {
        label: "Create a Post",
        path: "/create-a-post",
      },
      {
        label: "Post List",
        path: "/post-list",
      },
    ],
  },

  {
    type: "dropdown",
    label: "Page Details",
    icon: BookOpen,
    children: [
      {
        label: "Create a Page",
        path: "/create-a-page",
      },
      {
        label: "Page List",
        path: "/page-list",
      },
    ],
  },

  /* ================= MEDIA SECTION ================= */
  {
    type: "heading",
    label: "Media Section",
  },

  {
    type: "dropdown",
    label: "Portfolio Gallery",
    icon: Image,
    children: [
      { label: "Gallery Category", path: "/gallery-category" },
      { label: "Add Gallery Images", path: "/add-gallery-images" },
      { label: "Gallery Images List", path: "/gallery-image-list" },
    ],
  },

  /* ================= SERVICES SECTION ================= */
  {
    type: "heading",
    label: "Services Section",
  },

  {
    type: "dropdown",
    label: "Our Projects",
    icon: Briefcase,
    children: [
      { label: "Add Projects", path: "/add-projects" },
      { label: "Projects List", path: "/projects-list" },
    ],
  },
  {
    type: "dropdown",
    label: "Blogs",
    icon: FileText,
    children: [
      { label: "Add Blogs", path: "/add-blogs" },
      { label: "Blogs List", path: "/blogs-list" },
    ],
  },

  {
    type: "dropdown",
    label: "Our Clients",
    icon: Building2,
    children: [
      { label: "Add Clients", path: "/add-clients" },
      { label: "Clients List", path: "/clients-list" },
    ],
  },

  {
    type: "dropdown",
    label: "Testimonials",
    icon: Users,
    children: [
      { label: "Add Testimonials", path: "/add-testimonials" },
      { label: "Testimonials List", path: "/testimonials-list" },
    ],
  },

  {
    type: "dropdown",
    label: "Facilities & Infrastructure",
    icon: Folder,
    children: [
      { label: "Add Facilities", path: "/add-facilities" },
      { label: "Facilities List", path: "/facilities-list" },
    ],
  },

  /* ================= CAREER SECTION ================= */
  {
    type: "heading",
    label: "Career Section",
  },

  {
    type: "dropdown",
    label: "Vacancy",
    icon: Briefcase,
    children: [
      { label: "Add Requirements", path: "/add-vacancy" },
      { label: "Vacancy List", path: "/vacancy-list" },
    ],
  },

  /* ================= MARKETING SECTION ================= */
  {
    type: "heading",
    label: "Marketing Section",
  },

  {
    type: "dropdown",
    label: "Corporate Clients",
    icon: Building2,
    children: [
      // {label: "Corporate Profile", path:"/corporate-profile/:id" },
      { label: "Add Corporate Clients", path: "/add-corporate-clients" },
      { label: "Corporate Clients List", path: "/corporate-clients-list" },
    ],
  },

  {
    type: "dropdown",
    label: "Individual Clients",
    icon: User,
    children: [
      // { label: "Individual Profile", path: "/profiles/:id" },
      { label: "Add Individual Clients", path: "/add-individual-clients" },
      { label: "Individual Clients List", path: "/individual-clients-list" },
    ],
  },

  /* ================= SETTINGS SECTION ================= */
  {
    type: "heading",
    label: "Account Section",
  },
   {
    type: "item",
    label: "BG Images",
    icon: Image,
    path: "/bg-images",
  },
  {
    type: "item",
    label: "Manage Admin Users",
    icon: ShieldCheck,
    path: "/admin-users",
  },
  {
    type: "item",
    label: "Change Password",
    icon: Lock,
    path: "/change-password",
  },

  {
    type: "item",
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];
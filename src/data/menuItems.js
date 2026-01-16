import {
  LayoutDashboard,
  FileText,
  Folder,
  Image,
  Users,
  Briefcase,
  BookOpen,
  Download,
  Lock,
  Settings,
  MessageSquare,
  Bell
} from "lucide-react";

export const menuItems = [
  {
    section: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    showHeading: true,
    hideDropdown: true,
    submenu: [],
  },

  {
    section: "Create a Post",
    icon: FileText,
    path: "/create-a-post",
    showHeading: false,
    hideDropdown: true,
    submenu: [],
  },

  {
    section: "Post List",
    icon: Folder,
    path: "/post-list",
    showHeading: false,
    hideDropdown: true,
    submenu: [],
  },

  {
    section: "Create a Page",
    icon: BookOpen,
    path: "/create-a-page",
    showHeading: false,
    hideDropdown: true,
    submenu: [],
  },

  {
    section: "Page List",
    icon: Folder,
    path: "/page-list",
    showHeading: false,
    hideDropdown: true,
    submenu: [],
  },

  {
    section: "Portfolio Gallery",
    icon: Image,
    path: "/portfolio-gallery",
    showHeading: true,
    hideDropdown: false,
    submenu: [
      { name: "Gallery Category", path: "/gallery-category" },
      { name: "Gallery Images List", path: "/gallery-image-list" },
      { name: "Add Gallery Images", path: "/add-gallery-images" },
    ],
  },

  {
    section: "Testimonials",
    icon: Users,
    path: "/testimonials",
    showHeading: false,
    hideDropdown: false,
    submenu: [
      { name: "Add Testimonials", path: "/add-testimonials" },
      { name: "Testimonials List", path: "/testimonials-list" },
    ],
  },

  {
    section: "Vacancy",
    icon: Briefcase,
    path: "/vacancy",
    showHeading: false,
    hideDropdown: false,
    submenu: [
      { name: "Add Requirements", path: "/vacancy-add" },
      { name: "Vacancy List", path: "/vacancy-list" },
    ],
  },

  {
    section: "Our Clients",
    icon: Users,
    path: "/clients",
    showHeading: false,
    hideDropdown: false,
    submenu: [
      { name: "Add Clients", path: "/clients-add" },
      { name: "Clients List", path: "/clients-list" },
    ],
  },

  {
    section: "Facilities & Infrastructure",
    icon: Folder,
    path: "/facilities",
    showHeading: false,
    hideDropdown: false,
    submenu: [
      { name: "Add Facilities", path: "/facilities-add" },
      { name: "Facilities List", path: "/facilities-list" },
    ],
  },
  {
    section: "Enquiry List",
    icon: MessageSquare,
    path: "/enquiry-list",
    showHeading: false,
    hideDropdown: true,
    submenu: [],
  },
  {
    section: "Remainder List",
    icon: Bell,
    path: "/remainder-list",
    showHeading: false,
    hideDropdown: true,
    submenu: [],
  },

  {
    section: "Change Password",
    icon: Lock,
    path: "/change-password",
    showHeading: false,
    hideDropdown: true,
    submenu: [],
  },
  {
    section: "Settings",
    icon: Settings,
    path: "/settings",
    showHeading: false,
    hideDropdown: true,
    submenu: [],
  },
];

// {
//   section: "Our Projects",
//   icon: Folder,
//   path: "/projects",
//   showHeading: false,
//   submenu: [
//     { name: "Add Projects", path: "/projects" },
//     { name: "Project List", path: "/projects" },
//   ],
// },
// {
//   section: "Services",
//   icon: Briefcase,
//   path: "/services",
//   showHeading: true,
//   submenu: [
//     { name: "All Services", path: "/services/interior" },
//   ],
// },
// {
//   section: "Career",
//   icon: FileText,
//   path: "/career",
//   showHeading: false,
//   submenu: [{ name: "Open Positions", path: "/career/jobs" }],
// },
// {
//   section: "Our Clients",
//   icon: Users,
//   path: "/clients",
//   showHeading: false,
//   submenu: [
//     { name: "All Clients", path: "/clients" },
//     { name: "Testimonials", path: "/testimonials" },
//   ],
// },
// {
//   section: "Blog",
//   icon: BookOpen,
//   path: "/blog",
//   showHeading: false,
//   submenu: [
//     { name: "Blogs Page", path: "/blogs" },
//   ],
// },
// {
//   section: "Portfolio",
//   icon: Image,
//   path: "/portfolio",
//   showHeading: true,
//   submenu: [
//     { name: "Portfolio details", path: "/Portfolio-details" }
//   ],
// },
// {
//   section: "Downloads",
//   icon: Download,
//   path: "/downloads",
//   showHeading: true,
//   submenu: [
//     { name: "Downloads Detail", path: "/downloads" }
//   ],
// },


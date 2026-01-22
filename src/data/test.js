import {
  LayoutDashboard,
  FileText,
  Folder,
  Image,
  Users,
  Briefcase,
  BookOpen,
  Images,
  Lock,
  Settings,
  CalendarCheck,
  Building2 
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
      { name: "Add Requirements", path: "/add-vacancy" },
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
      { name: "Add Clients", path: "/add-clients" },
      { name: "Clients List", path: "/clients-list" },
    ],
  },

  {
    section: "Our Projects",
    icon: Users,
    path: "/projects",
    showHeading: false,
    hideDropdown: false,
    submenu: [
      { name: "Add Projects", path: "/add-projects" },
      { name: "Projects List", path: "/projects-list" },
    ],
  },

  {
    section: "Facilities & Infrastructure",
    icon: Folder,
    path: "/facilities",
    showHeading: false,
    hideDropdown: false,
    submenu: [
      { name: "Add Facilities", path: "/add-facilities" },
      { name: "Facilities List", path: "/facilities-list" },
    ],
  },
  // {
  //   section: "Marketing",
  //   showHeading: true,
  //   hideDropdown: true,
  //   icon: Building2,
  //   path: "",
  //   submenu: [],
  // },
  {
    section: "Corporate Section",
    icon: Building2 ,
    path: "/corporate",
    showHeading: true,
    hideDropdown: false,
    submenu: [
      {name:"Add Corporate Clients", path:"/add-corporate-clients"},
      {name:"Corporate Clients List", path:"/corporate-clients-list"}
    ],
  },
  {
    section: "Home Slider",
    icon: Images,
    path: "/carousel",
    showHeading: true,
    hideDropdown: true,
    submenu: [],
  },
   {
    section: "Book Meeting",
    icon: CalendarCheck,
    path: "/enquiry-list",
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
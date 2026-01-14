import { path, section } from "framer-motion/client";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  BookOpen,
  Image,
  Download,
  FileText,
  Folder,
} from "lucide-react";

export const menuItems = [
  {
    section: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    showHeading: true,
    hideDropdown: true,
    submenu:[],
  },
  {
    section: "Projects",
    icon: Folder,
    path: "/projects",
    showHeading: false,
    submenu: [
      { name: "Projects", path: "/projects" },
    ],
  },
  {
    section: "Services",
    icon: Briefcase,
    path: "/services",
    showHeading: true,
    submenu: [
      { name: "All Services", path: "/services/interior" },
      // { name: "Merchandising", path: "/services/merchandising" },
      // { name: "Kiosk", path: "/services/kiosk" },
      // { name: "Exhibition & Events", path: "/services/exhibition-events" },
      // { name: "Office Interior", path: "/services/office-interior" },
      // { name: "Furniture", path: "/services/furniture" },
    ],
  },
  {
    section: "Career",
    icon: FileText,
    path: "/career",
    showHeading: false,
    submenu: [{ name: "Open Positions", path: "/career/jobs" }],
  },
  {
    section: "Our Clients",
    icon: Users,
    path: "/clients",
    showHeading: false,
    submenu: [
      { name: "All Clients", path: "/clients" },
      { name: "Testimonials", path: "/testimonials" },
    ],
  },
  {
    section: "Blog",
    icon: BookOpen,
    path: "/blog",
    showHeading: false,
    submenu: [
      { name: "Blogs Page", path: "/blogs" },
      // { name: "Categories", path: "/blog/categories" },
    ],
  },
  {
    section: "Portfolio",
    icon: Image,
    path: "/portfolio",
    showHeading: true,
    submenu: [
      { name: "Portfolio details", path: "/Portfolio-details" }
      // { name: "Interior Portfolio", path: "/Portfolio/web" },
      // { name: "Merchandising Portfolio", path: "/Portfolio/mobile" },
      // { name: "Kiosk Portfolio", path: "/Portfolios/uiux" },
      // { name: "Exhibition & Events Portfolio", path: "/Portfolio/web" },
      // { name: "Office Interior Portfolio", path: "/Portfolio/mobile" },
      // { name: "Furniture Portfolio", path: "/Portfolio/uiux" },
      // { name: "Videos", path: "/Portfolio/uiux" },
    ],
  },
  {
    section: "Downloads",
    icon: Download,
    path: "/downloads",
    showHeading: true,
    submenu: [
      { name: "Downloads Detail", path: "/downloads" }
      // { name: "E Brochure", path: "/downloads/resources" },
      // { name: "Newsletter", path: "/downloads/reports" },
      // { name: "Company Profile", path: "/downloads/reports" },
    ],
  },
];

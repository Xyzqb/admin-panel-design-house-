import {
  LayoutDashboard,
  Briefcase,
  Users,
  BookOpen,
  Image,
  Download,
  FileText,
} from "lucide-react";

export const menuItems = [
  {
    section: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    showHeading: true,
    submenu: [
      { name: "Analytics", path: "/dashboard/analytics" },
      { name: "Projects", path: "/dashboard/overview" },
    ],
  },
  {
    section: "Services",
    icon: Briefcase,
    path: "/services",
    showHeading: true,
    submenu: [
      { name: "Interior", path: "/services/web" },
      { name: "Merchandising", path: "/services/mobile" },
      { name: "Kiosk", path: "/services/uiux" },
      { name: "Exhibition & Events", path: "/services/web" },
      { name: "Office Interior", path: "/services/mobile" },
      { name: "Furniture", path: "/services/uiux" },
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
      { name: "Latest Posts", path: "/blog/latest" },
      { name: "Categories", path: "/blog/categories" },
    ],
  },
  {
    section: "Portfolio",
    icon: Image,
    path: "/portfolio",
    showHeading: true,
    submenu: [
      { name: "Interior Portfolio", path: "/services/web" },
      { name: "Merchandising Portfolio", path: "/services/mobile" },
      { name: "Kiosk Portfolio", path: "/services/uiux" },
      { name: "Exhibition & Events Portfolio", path: "/services/web" },
      { name: "Office Interior Portfolio", path: "/services/mobile" },
      { name: "Furniture Portfolio", path: "/services/uiux" },
      { name: "Videos", path: "/services/uiux" },
    ],
  },
  {
    section: "Downloads",
    icon: Download,
    path: "/downloads",
    showHeading: true,
    submenu: [
      { name: "E Brochure", path: "/downloads/resources" },
      { name: "Newsletter", path: "/downloads/reports" },
      { name: "Company Profile", path: "/downloads/reports" },
    ],
  },
];

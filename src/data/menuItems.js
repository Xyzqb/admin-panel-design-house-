import {
  Home,
  Briefcase,
  Users,
  MessageSquare,
  ShoppingCart,
  Package,
  BarChart3,
  FileText,
  Calendar,
  Inbox,
  Settings
} from "lucide-react";

export const menuItems = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: Home,
    path: "/",          // ✅
    submenu: false
  },
  {
    id: "services",
    name: "Services",
    icon: Briefcase,
    path: "/services",  // ✅
    submenu: true
  },
  {
    id: "clients",
    name: "Clients",
    icon: Users,
    path: "/clients",   // ✅
    submenu: false
  },
  {
    id: "testimonials",
    name: "Testimonials",
    icon: MessageSquare,
    path: "/testimonials", // ✅
    submenu: false
  },
  {
    id: "orders",
    name: "Orders",
    icon: ShoppingCart,
    path: "/orders",
    submenu: false
  },
  {
    id: "products",
    name: "Products",
    icon: Package,
    path: "/products",
    submenu: false
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: BarChart3,
    path: "/analytics",
    submenu: false
  },
  {
    id: "reports",
    name: "Reports",
    icon: FileText,
    path: "/reports",
    submenu: false
  },
  {
    id: "calendar",
    name: "Calendar",
    icon: Calendar,
    path: "/calendar",
    submenu: false
  },
  {
    id: "messages",
    name: "Messages",
    icon: Inbox,
    path: "/messages",
    submenu: false
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    path: "/settings",
    submenu: false
  }
];

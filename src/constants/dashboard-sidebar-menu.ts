import {
  LayoutDashboard,
  UsersRound,
  CreditCard,
  Handshake,
  HelpCircle,
  FileText,
  ShieldAlert,
  Info,
} from "lucide-react";

export const sidebarMenu = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Users Management",
      url: "/users",
      icon: UsersRound,
    },
    {
      title: "Subscriptions & Payments",
      url: "/products",
      icon: CreditCard,
    },
    {
      title: "Support",
      url: "/support",
      icon: Handshake,
    },
    {
      title: "FAQ's",
      url: "/faq",
      icon: HelpCircle,
    },
    {
      title: "Terms & Condition",
      url: "/terms",
      icon: FileText,
    },
    {
      title: "Privacy Policy",
      url: "/privacy",
      icon: ShieldAlert,
    },
    {
      title: "About Us",
      url: "/about",
      icon: Info,
    },
  ],
  settings: [],
};

export const profileData = {
  name: "Rahad Ullah",
  email: "rahadullah10@gmail.com",
  role: "Admin",
  avatar:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
};

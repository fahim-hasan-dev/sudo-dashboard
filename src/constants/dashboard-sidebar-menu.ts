import {
  LayoutDashboard,
  UsersRound,
  CreditCard,
  HelpCircle,
} from "lucide-react";

export const sidebarMenu = {
  navMain: [
    {
      title: "Overview",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "User Management",
      url: "/users",
      icon: UsersRound,
      items: [
        {
          title: "All Users",
          url: "/users",
        },
      ],
    },
    {
      title: "Finance",
      url: "/finance",
      icon: CreditCard,
      items: [
        {
          title: "Savings Groups",
          url: "/finance/savings-groups",
        },
        {
          title: "Transactions",
          url: "/finance/transactions",
        },
        {
          title: "Subscriptions",
          url: "/finance/subscriptions",
        },
      ],
    },
    {
      title: "Platform",
      url: "/platform",
      icon: HelpCircle, // Will use HelpCircle or placeholder icon
      items: [
        {
          title: "Notifications",
          url: "/platform/notifications",
        },
        {
          title: "CMS",
          url: "/platform/cms",
        },
      ],
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

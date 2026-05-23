import DashboardBreadcrumb from "@/components/layout/dashboard/navbar/dashboard-breadcrumb";
import NavUserWrapper from "@/components/layout/dashboard/navbar/nav-user-wrapper";
import { AppSidebar } from "@/components/layout/dashboard/sidebar/app-sidebar";
import SearchBar from "@/components/shared/SearchBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="no-scrollbar">
      {/* dashboard sidebar */}
      <AppSidebar className="p-4 pr-0" />
      <SidebarInset className="bg-transparent p-4 pt-0 gap-4">
        {/* dashboard header */}
        <header className="flex h-20 bg-[#07080a] border-b border-[#1b1e25]/60 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-20 sticky top-0 z-50 -mx-4 px-6 shadow-md shadow-black/10">
          <div className="flex flex-nowrap items-center gap-2">
            <SidebarTrigger className="xl:hidden -ml-1 text-white" />
            <DashboardBreadcrumb />
          </div>
          {/* searchbar */}
          <div className="flex justify-center items-center gap-4 md:gap-6">
            <SearchBar />
            {/* notification */}
            <div className="relative cursor-pointer p-2 text-zinc-400 hover:text-white transition-colors">
              <span className="absolute top-1 right-1 size-2 bg-primary rounded-full border border-[#07080a]"></span>
              <Bell className="size-5" />
            </div>
            {/* user dropdown */}
            <NavUserWrapper />
          </div>
        </header>
        {/* dashboard content */}
        <div className="rounded-xl flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

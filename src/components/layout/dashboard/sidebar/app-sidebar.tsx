"use client";

import * as React from "react";

import { NavMain } from "@/components/layout/dashboard/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { NavSettings } from "./nav-settings";
import { sidebarMenu } from "@/constants/dashboard-sidebar-menu";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout } = useAuthContext();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="py-6 flex flex-row items-center justify-center border-b border-zinc-900/40">
        <Link href={"/"} className="w-full flex justify-center items-center">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={140}
            height={70}
            priority
            className="w-auto max-h-[70px] object-contain px-4"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarMenu.navMain} />
        <NavSettings settings={sidebarMenu.settings} />
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-zinc-900/40">
        <SidebarMenu>
          <SidebarMenuItem>
            <button
              onClick={() => logout()}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-[#ff3b30]/30 text-[#ff3b30] hover:bg-[#ff3b30]/10 active:scale-[0.98] transition-all font-semibold text-sm"
            >
              <LogOut className="size-4" />
              Logout
            </button>
            <p className="text-center text-[11px] text-zinc-600 mt-4 font-medium tracking-wider">
              Copyright@app
            </p>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
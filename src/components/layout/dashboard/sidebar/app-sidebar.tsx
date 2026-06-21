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
  SidebarTrigger,
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
        <div className="w-full flex items-center justify-between px-4">
          <Link href={"/"} className="flex items-center gap-3">
            <Image
              src="/logo-image.png"
              alt="Sudo Icon"
              width={36}
              height={36}
              priority
              className="size-9 object-contain"
            />
            <div className="flex flex-col gap-0.5">
              <Image
                src="/logo-text.png"
                alt="Sudo Text"
                width={65}
                height={15}
                priority
                className="h-3.5 w-auto object-contain"
              />
              <span className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase leading-none mt-0.5">
                Admin Console
              </span>
            </div>
          </Link>
          <SidebarTrigger className="text-zinc-500 hover:text-white" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarMenu.navMain} />
        <NavSettings settings={sidebarMenu.settings} />
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-zinc-900/40 bg-[#07080a]/40">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between gap-3 p-1">
            {/* User details */}
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-blue-600/20 text-[#00ADEF] flex items-center justify-center font-bold text-xs select-none shrink-0 border border-[#00ADEF]/20">
                SA
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-xs font-bold text-white leading-none truncate">
                  Super Admin
                </span>
                <span className="text-[10px] text-zinc-500 leading-none truncate mt-0.5">
                  admin@circlepay.io
                </span>
              </div>
            </div>
            {/* Logout button */}
            <button
              onClick={() => logout()}
              className="text-zinc-500 hover:text-red-500 p-2 transition-colors cursor-pointer select-none"
              title="Logout"
            >
              <LogOut className="size-4.5" />
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
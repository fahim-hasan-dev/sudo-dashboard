"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavSettings({
  settings,
}: {
  settings: {
    name: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden gap-4">
      <SidebarMenu className="gap-2 flex flex-col">
        {settings.map((item) => {
          const isActive = item.url === pathname;

          return (
            <Link href={item.url} key={item.name}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.name}
                  className={`flex w-full items-center gap-3 py-5 px-4 rounded-xl transition-all duration-300 font-semibold text-sm ${
                    isActive
                      ? "bg-[#00ADEF]/8 text-[#00ADEF] font-bold"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-[#00ADEF]/5"
                  }`}
                >
                  {item.icon && (
                    <span className={`shrink-0 ${isActive ? "text-[#00ADEF]" : "text-zinc-450"}`}>
                      <item.icon className="size-5" />
                    </span>
                  )}

                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

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

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="gap-4">
      <SidebarMenu className="gap-2 flex flex-col">
        {items.map((item) => {
          const isActive = item.url === pathname;

          return (
            <Link href={item.url} key={item.title}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`flex w-full items-center gap-3 py-5 px-4 transition-all duration-300 font-semibold text-sm border-l-[3px] ${
                    isActive
                      ? "bg-primary/5 text-primary border-primary font-bold"
                      : "text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-900/30"
                  }`}
                >
                  {item.icon && (
                    <span className="shrink-0">
                      {item.icon && <item.icon className="size-5" />}
                    </span>
                  )}

                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

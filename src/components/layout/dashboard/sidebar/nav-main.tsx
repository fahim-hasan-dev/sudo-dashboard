"use client";

import React, { useState, useEffect } from "react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideIcon, ChevronDown, ChevronRight } from "lucide-react";
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

  // Track expanded sections
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Auto-expand sections that have active items inside
    const newExpanded: { [key: string]: boolean } = {};
    items.forEach((item) => {
      if (item.items) {
        const hasActiveChild = item.items.some((child) => child.url === pathname);
        if (hasActiveChild) {
          newExpanded[item.title] = true;
        }
      }
    });
    setExpanded((prev) => ({ ...prev, ...newExpanded }));
  }, [pathname, items]);

  const toggleExpand = (title: string) => {
    setExpanded((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <SidebarGroup className="gap-4">
      <SidebarMenu className="gap-2 flex flex-col">
        {items.map((item) => {
          const hasChildren = item.items && item.items.length > 0;
          const isParentActive =
            item.url === pathname ||
            (hasChildren && item.items!.some((child) => child.url === pathname));

          const isOpen = !!expanded[item.title];

          if (hasChildren) {
            return (
              <div key={item.title} className="flex flex-col gap-1.5 w-full">
                {/* Collapsible header button */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => toggleExpand(item.title)}
                    tooltip={item.title}
                    className={`flex w-full items-center justify-between py-5 px-4 rounded-xl transition-all duration-300 font-semibold text-sm cursor-pointer select-none ${
                      isParentActive
                        ? "text-[#00ADEF]"
                        : "text-zinc-450 hover:text-zinc-200 hover:bg-[#00ADEF]/5"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {item.icon && (
                        <span className={`shrink-0 ${isParentActive ? "text-[#00ADEF]" : "text-zinc-500"}`}>
                          <item.icon className="size-5" />
                        </span>
                      )}
                      <span className="truncate whitespace-nowrap">{item.title}</span>
                    </div>
                    <span>
                      {isOpen ? (
                        <ChevronDown className="size-4 text-zinc-500" />
                      ) : (
                        <ChevronRight className="size-4 text-zinc-500" />
                      )}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Sub items list */}
                {isOpen && (
                  <div className="flex flex-col gap-1 pl-4 ml-6 border-l border-zinc-900/30">
                    {item.items!.map((child) => {
                      const isChildActive = child.url === pathname;
                      return (
                        <Link href={child.url} key={child.title}>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              className={`flex w-full items-center gap-3 py-3.5 px-4 rounded-xl transition-all duration-300 font-semibold text-xs cursor-pointer select-none ${
                                isChildActive
                                  ? "bg-[#00ADEF]/8 text-[#00ADEF] font-bold"
                                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[#00ADEF]/5"
                              }`}
                            >
                              <span className="truncate whitespace-nowrap">{child.title}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // Single item link
          return (
            <Link href={item.url} key={item.title}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`flex w-full items-center gap-3 py-5 px-4 rounded-xl transition-all duration-300 font-semibold text-sm cursor-pointer select-none ${
                    isParentActive
                      ? "bg-[#00ADEF]/8 text-[#00ADEF] font-bold"
                      : "text-zinc-450 hover:text-zinc-200 hover:bg-[#00ADEF]/5"
                  }`}
                >
                  {item.icon && (
                    <span className={`shrink-0 ${isParentActive ? "text-[#00ADEF]" : "text-zinc-500"}`}>
                      <item.icon className="size-5" />
                    </span>
                  )}
                  <span className="truncate whitespace-nowrap">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

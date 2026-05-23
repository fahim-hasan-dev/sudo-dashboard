"use client";

import { BadgeCheck, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";

export function NavUser({
  user,
}: {
  user: {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    image: string;
  };
}) {
  const { logout } = useAuthContext();
  return (
    <SidebarMenu className="w-fit pr-4">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="bg-primary hover:bg-primary/95 text-black hover:text-black font-semibold rounded-full px-4 py-2 flex items-center gap-2 border-none shadow-md shadow-primary/20 active:scale-[0.98] transition-all h-10 w-fit"
            >
              <Avatar className="size-7 rounded-full border border-black/10">
                <AvatarImage
                  src={`${user?.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000"}`}
                  alt={user?.firstname || "Admin"}
                  className="rounded-full object-cover"
                />
                <AvatarFallback className="rounded-full bg-black/10 text-xs text-black">A</AvatarFallback>
              </Avatar>
              <span className="text-xs uppercase tracking-wider font-extrabold text-black">
                {user?.role || "Admin"} Profile
              </span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={"bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={`${user?.image}`} alt={user?.firstname} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.lastname}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={`/profile`}>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Profile
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()} className="text-red-500">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

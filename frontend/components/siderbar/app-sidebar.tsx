"use client";

import { Album, LayoutDashboard, LogOut, Moon, Sun, User2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/lib/store";
import { TUser } from "@/types/auth-type";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SignOutAction } from "@/lib/actions/auth-action";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const navMainMenu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Events",
    url: `/dashboard/my-events`,
    icon: Album,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: AppState) => state.auth.user) as TUser;

  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  useEffect(() => {
    if (isDarkMode) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [isDarkMode]);

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={user.username}
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="" alt={user.username} />
                <AvatarFallback className="rounded-lg">
                  <User2 />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.username}</span>
                <span className="truncate text-xs">{user.id}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainMenu} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={isDarkMode ? "Dark Mode" : "Light Mode"}
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign Out"
              onClick={async () => await dispatch(SignOutAction())}
            >
              <LogOut />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

interface Props {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export function NavMain({ items }: Props) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, i) => (
          <SidebarMenuItem key={i}>
            <SidebarMenuButton tooltip={item.title} asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

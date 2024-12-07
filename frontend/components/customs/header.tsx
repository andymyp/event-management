"use client";

import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { AppState } from "@/lib/store";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const formatLabel = (segment: string) =>
    segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const breadcrumbs = pathSegments.map((segment, index) => ({
    label: formatLabel(segment),
    href: `/${pathSegments.slice(0, index + 1).join("/")}`,
  }));

  const { title, actions } = useSelector((state: AppState) => state.app.header);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex flex-row justify-between w-full px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((item, i) =>
                i === breadcrumbs.length - 1 ? (
                  <BreadcrumbItem key={i}>
                    <BreadcrumbPage>
                      {title ? title : item.label}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <Fragment key={i}>
                    <BreadcrumbItem className="hidden md:block">
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </Fragment>
                )
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {actions?.map((action, i) => {
          if (action.do === "CREATE") {
            return (
              <Link key={i} href={action.link}>
                <Button type="button">
                  <Plus />
                  Create Event
                </Button>
              </Link>
            );
          }

          if (action.do === "BACK") {
            return (
              <Link key={i} href={action.link}>
                <Button type="button" variant="outline">
                  Back
                </Button>
              </Link>
            );
          }

          return null;
        })}
      </div>
    </header>
  );
}

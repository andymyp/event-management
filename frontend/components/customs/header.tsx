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

export default function Header() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1),
    href: `/${pathSegments.slice(0, index + 1).join("/")}`,
  }));

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
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
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
        {/* <DateRangePicker /> */}
      </div>
    </header>
  );
}

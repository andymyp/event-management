"use client";

import useHeader from "@/hooks/use-header";

export default function DashboardPage() {
  useHeader({ title: "Dashboard" });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1>Dashboard</h1>
    </div>
  );
}

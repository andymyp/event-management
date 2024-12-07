import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/siderbar/app-sidebar";
import Header from "@/components/customs/header";

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const authSession = await auth();

  if (!authSession) {
    return redirect("/", RedirectType.replace);
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

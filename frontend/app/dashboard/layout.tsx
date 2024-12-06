import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const authSession = await auth();

  if (!authSession) {
    return redirect("/", RedirectType.replace);
  }

  return <section>{children}</section>;
}

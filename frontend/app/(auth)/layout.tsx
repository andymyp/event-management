import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";
import AuthLayout from "@/components/layouts/auth-layout";

interface Props {
  children: React.ReactNode;
}

export default async function AuthBaseLayout({ children }: Props) {
  const authSession = await auth();

  if (authSession) {
    return redirect("/dashboard", RedirectType.replace);
  }

  return <AuthLayout>{children}</AuthLayout>;
}

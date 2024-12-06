import AuthLayout from "@/components/layouts/auth-layout";

interface Props {
  children: React.ReactNode;
}

export default async function AuthBaseLayout({ children }: Props) {
  return <AuthLayout>{children}</AuthLayout>;
}

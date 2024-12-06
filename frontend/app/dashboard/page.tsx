"use client";

import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/lib/store";
import { AuthAction } from "@/lib/store/auth-slice";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = async () => {
    dispatch(AuthAction.signOut());
    await signOut();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={() => handleSignOut()}>Sign Out</Button>
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";

const useGetAuthPage = () => {
  const url = usePathname();

  return {
    isSignUpPage: url.endsWith("/sign-up"),
  };
};

export default useGetAuthPage;

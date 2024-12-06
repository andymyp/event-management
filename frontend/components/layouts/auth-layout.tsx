"use client";

import { Button } from "@/components/ui/button";
import useGetAuthPage from "@/hooks/use-auth-page";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";

const titles = [
  {
    title: "Welcome Back!",
    description:
      "Enter your credentials to access your Event Management account",
  },
  {
    title: "Hello, Friend!",
    description:
      "Enter with your credentials to create an Event Management account",
  },
];

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  const { isSignUpPage } = useGetAuthPage();

  const key = isSignUpPage ? 1 : 0;

  return (
    <main className="flex antialiased w-full h-screen">
      <div className="relative z-10 flex md:px-4 min-h-screen w-full items-start justify-center overflow-hidden md:items-center bg-gradient-to-r from-violet-50 to-violet-200">
        <div
          className={cn(
            "bg-white",
            "absolute top-1/2 -z-10 h-1/2 w-[22%] -translate-y-1/2 drop-shadow transition rounded-[30px]",
            isSignUpPage
              ? "left-1/2 translate-x-[45%]"
              : "right-1/2 -translate-x-[45%]"
          )}
        />
        <div
          className={cn(
            "bg-primary",
            "absolute top-1/2 -z-10 h-1/2 w-[22%] -translate-y-1/2 drop-shadow transition rounded-[30px]",
            isSignUpPage
              ? "right-1/2  -translate-x-[45%]"
              : "left-1/2 translate-x-[45%]"
          )}
        />
        <div className="relative z-10 flex h-screen w-full flex-col-reverse bg-white shadow-[0_5px_15px_rgba(0,0,0,0.35)] md:h-[420px] md:w-[800px] md:flex-row rounded-[30px] text-sm">
          <div
            className={cn(
              "bg-primary",
              "z-20 flex h-full w-full origin-left scale-x-100 flex-col items-center justify-center p-4 px-8 transition-all md:w-1/2 lg:px-20 rounded-[30px]",
              isSignUpPage && "md:translate-x-full"
            )}
          >
            <div className="items-center flex flex-col gap-6">
              <h1 className="text-center !text-2xl text-white">
                {titles[key].title}
              </h1>
              <p className="text-white text-center">
                {titles[key].description}
              </p>

              <Link href={isSignUpPage ? "/" : "/sign-up"}>
                <Button
                  variant="outline"
                  className="bg-transparent text-white uppercase"
                >
                  {key === 0 ? "Sign Up" : "Sign In"}
                </Button>
              </Link>
            </div>
          </div>
          <div
            className={clsx(
              "z-10 w-full p-8 px-10 md:w-1/2 lg:p-0 transition-all ease-in-out",
              isSignUpPage && "md:-translate-x-full"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

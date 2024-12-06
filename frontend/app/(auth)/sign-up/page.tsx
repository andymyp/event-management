"use client";

import { z } from "zod";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import useHeader from "@/hooks/use-header";

const schema = z
  .object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    cpassword: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.cpassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords not match",
        path: ["cpassword"],
      });
    }
  });

type FormValues = z.infer<typeof schema>;

export default function SignUpPage() {
  useHeader({ title: "Sign Up" });

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    toast({
      variant: "error",
      description: Object.values(errors)[0].message,
    });
  };

  return (
    <form
      className="flex h-full items-center justify-center"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="flex flex-col gap-4 mx-auto h-full w-full items-center justify-center lg:w-2/3">
        <h1 className="mb-2 text-center text-3xl text-black lg:mb-4">
          Sign Up
        </h1>
        <Input
          {...register("username")}
          placeholder="Enter username"
          type="text"
          className="w-full"
          name="username"
          autoFocus
        />
        <div className="relative w-full">
          <Input
            {...register("password")}
            placeholder="Enter password"
            className="w-full pr-10"
            name="password"
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
        <div className="relative w-full">
          <Input
            {...register("cpassword")}
            placeholder="Enter confirm password"
            className="w-full pr-10"
            name="cpassword"
            type={showCPassword ? "text" : "password"}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center"
            onClick={toggleCPasswordVisibility}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
        <Button
          type="submit"
          size="lg"
          className="uppercase"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting && (
            <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign Up
        </Button>
      </div>
    </form>
  );
}

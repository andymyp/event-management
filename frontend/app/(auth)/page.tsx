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

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export default function SignInPage() {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          Sign In
        </h1>
        <Input
          {...register("username")}
          placeholder="Enter your username"
          type="text"
          className="w-full"
          name="username"
          autoFocus
        />
        <div className="relative w-full">
          <Input
            {...register("password")}
            placeholder="Enter your password"
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
        <Button
          type="submit"
          size="lg"
          className="uppercase"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting && (
            <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign In
        </Button>
      </div>
    </form>
  );
}

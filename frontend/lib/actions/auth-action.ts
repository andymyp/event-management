import { AppDispatch } from "../store";
import { AppAction } from "../store/app-slice";
import { AuthAction } from "../store/auth-slice";
import { toast } from "@/hooks/use-toast";
import { TAuth } from "@/types/auth-type";
import { signIn } from "next-auth/react";
import { signInService, signUpService } from "@/services/auth-service";

export const SignUpAction = (form: TAuth) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(AppAction.setLoading(true));

      const data = await signUpService(form);

      dispatch(
        AuthAction.signIn({
          user: data.user,
          token: data.token,
          refreshToken: data.refreshToken,
        })
      );

      await signIn("credentials", {
        user: JSON.stringify(data.user),
        redirectTo: "/dashboard",
      });
    } catch (error: any) {
      if (error.response) {
        toast({ variant: "error", description: error.response.data.message });
      } else {
        toast({ variant: "error", description: error.message });
      }
    } finally {
      dispatch(AppAction.setLoading(false));
    }
  };
};

export const SignInAction = (form: TAuth) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(AppAction.setLoading(true));

      const data = await signInService(form);

      dispatch(
        AuthAction.signIn({
          user: data.user,
          token: data.token,
          refreshToken: data.refreshToken,
        })
      );

      await signIn("credentials", {
        user: JSON.stringify(data.user),
        redirectTo: "/dashboard",
      });
    } catch (error: any) {
      if (error.response) {
        toast({ variant: "error", description: error.response.data.message });
      } else {
        toast({ variant: "error", description: error.message });
      }
    } finally {
      dispatch(AppAction.setLoading(false));
    }
  };
};

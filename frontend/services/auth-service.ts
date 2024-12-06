import axios from "@/lib/axios";
import { TAuth, TPSignIn } from "@/types/auth-type";

export const signUpService = async (data: TAuth): Promise<TPSignIn> => {
  const response = await axios.post("/auth/sign-up", data);
  return response.data;
};

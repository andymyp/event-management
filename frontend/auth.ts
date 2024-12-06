import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  providers: [
    Credentials({
      credentials: {
        user: { name: "user", type: "text" },
      },
      authorize: async (credentials) => {
        const user = await JSON.parse(credentials.user as string);
        return user;
      },
    }),
  ],
});

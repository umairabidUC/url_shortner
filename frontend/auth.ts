import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<any> => {
        try {
          const res = await axios.get(`http://localhost:3500/users`, {
            params: {
              email: credentials.email,
              password: credentials.password,
            },
          });
          console.log(res.data.result)
          if (res.data.result) {
            console.log(res.data.result);
            return res.data.result
          }
          // Return null if authentication failed
          return null;

        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
          } else {
            console.error("Unexpected error:", error);
          }
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
});

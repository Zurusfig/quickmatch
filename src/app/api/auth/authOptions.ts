import { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, user, token }) {
      if (session?.user) {
        // 1. If using Database (Adapter), 'user' is defined
        if (user) {
          session.user.id = user.id;
        }
        // 2. If using JWT (Fallback/Old Cookie), 'token' is defined
        // The user ID is usually stored in 'token.sub'
        else if (token && token.sub) {
          session.user.id = token.sub;
        }
      }
      return session;
    },
  },
};

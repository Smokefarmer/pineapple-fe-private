import NextAuth, { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

// Define extended credential types
interface ExtendedCredentials {
  address: string;
  token: string;
  name?: string;
  role?: string;
  userId?: string;
}

// Define extended user type
interface ExtendedUser {
  id: string;
  address: string;
  token: string;
  name?: string;
  role?: string;
  userId?: string;
}

// NextAuth configuration
const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        address: {
          label: "Address",
          type: "text",
        },
        token: {
          label: "Token",
          type: "text",
        },
      },
      async authorize(credentials) {
        // Type safety for credentials
        if (!credentials) return null;
        
        // Cast credentials to our extended type
        const typedCredentials = credentials as ExtendedCredentials;
        try {
          // The signature verification is now handled by the backend
          // We just need to check if we have an address from the credentials
          if (!credentials?.address) {
            return null;
          }
          
          // Return the user object with all credentials
          return {
            id: typedCredentials.address,
            address: typedCredentials.address,
            token: typedCredentials.token,
            name: typedCredentials.name,
            role: typedCredentials.role,
            userId: typedCredentials.userId,
          } as ExtendedUser;
        } catch (e) {
          console.error("Error in authorize:", e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist all user data from the backend to the JWT
      if (user) {
        token.token = user.token;
        token.name = user.name;
        token.role = user.role;
        token.userId = user.userId;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Add all user data to the session
      session.user = {
        ...session.user,
        address: token.sub,
        token: token.token,
        name: token.name as string | undefined,
        role: token.role as string | undefined,
        userId: token.userId as string | undefined,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET ,
};

// Create the NextAuth handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

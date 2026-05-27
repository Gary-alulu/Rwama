import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// ─── Extend session/token types ──────────────────────────────────
declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: UserRole;
      status: UserStatus;
      farmerId?: string;
    };
  }
  interface User {
    role: UserRole;
    status: UserStatus;
    farmerId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    status: UserStatus;
    farmerId?: string;
  }
}

// ─── Auth options ─────────────────────────────────────────────────
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,

  session: { strategy: "jwt" },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  providers: [
    // Google OAuth — for Buyers and Admin
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "BUYER" as UserRole,
          status: "ACTIVE" as UserStatus,
        };
      },
    }),

    // Email/Password — for Farmers and Factory Managers
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            farmerProfile: { select: { farmerId: true } },
          },
        });

        if (!user) {
          throw new Error("No account found. Please register first.");
        }

        if (user.status === "PENDING" || user.status === "PENDING_APPROVAL") {
          throw new Error("Your account is pending approval or verification.");
        }

        if (user.status === "REJECTED" || user.status === "SUSPENDED") {
          throw new Error("Your account is suspended or rejected.");
        }

        if (!user.emailVerified) {
          throw new Error("Please check your email and verify your account before logging in.");
        }

        // Password field lives on a separate PasswordHash record
        // (not included in the Prisma schema above for brevity — add a
        //  PasswordHash model with userId and hash fields in production)
        const isValid = await bcrypt.compare(
          credentials.password,
          (user as any).passwordHash ?? "",
        );
        if (!isValid) {
          throw new Error("Incorrect password.");
        }

        return {
          id: user.id,
          email: user.email!,
          name: user.name,
          image: user.image,
          role: user.role,
          status: user.status,
          farmerId: user.farmerProfile?.farmerId,
        };
      },
    }),
  ],

  callbacks: {
    // Embed role into JWT on sign-in
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
        token.farmerId = user.farmerId;
      }

      // Allow session updates (e.g. admin changes a user's role)
      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }
      if (trigger === "update" && session?.status) {
        token.status = session.status;
      }

      return token;
    },

    // Expose token values to the session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.status = token.status;
        session.user.farmerId = token.farmerId;
      }
      return session;
    },

    // Restrict sign-in: unverified emails rejected
    async signIn({ user, account }) {
      if (account?.provider === "google") return true;
      return !!user.email;
    },
  },

  events: {
    // Auto-create BuyerProfile when a new Google user signs in
    async createUser({ user }) {
      if (user.role === "BUYER") {
        await prisma.buyerProfile.create({
          data: { userId: user.id },
        });
      }
    },
  },
};

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/validations";
import { getUserFromDb } from "@/services/auth";
import { Currency } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const { email, password } = await signInSchema.parseAsync(credentials);
                    const user = await getUserFromDb(email, password);
                    if (!user) {
                        throw new Error("Invalid credentials.");
                    }
                    return user;
                } catch (error) {
                    console.error("Authorize error:", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        // authorized: async ({ auth }) => {
        //     console.log("callbacks - authorized - auth: ", auth);
        //     // Logged in users are authenticated, otherwise redirect to login page
        //     return !!auth
        // },
        async jwt({ token, user }) {
            // console.log("JWT CALLBACK =>", { token, user });
            if (user) {
                token.id = user.id;
                token.currency = user.currency;
                token.profilePic = user.profilePic;
                token.gender = user.gender;
            }
            return token;
        },
        session({ session, token }) {
            // console.log("SESSION CALLBACK =>", { session, token, user });
            session.user.id = token?.id as string;
            session.user.currency = token?.currency as Currency;
            session.user.profilePic = token?.profilePic as string;
            session.user.gender = token?.gender as string;
            return session // The return type will match the one returned in `useSession()`
        },
    },
    pages: {
        signIn: "/sign-in",
        signOut: "/",
    },
})
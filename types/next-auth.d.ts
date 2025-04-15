// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
import { Currency } from "@/lib/prisma";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            profilePic: string;
            currency: Currency;
            gender: string;
        };
    }

    interface User {
        id: string;
        name: string;
        email: string;
        profilePic: string;
        currency: Currency;
        gender: string;
    }
}

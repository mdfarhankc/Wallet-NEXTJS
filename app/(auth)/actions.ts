"use server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/services/auth";
import { SignUpValues } from "@/validations";

export const SignUp = async (values: SignUpValues) => {
    try {
        const { name, email, password, gender } = values;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error("User already exists!");
        }
        const defaultCurrency = await prisma.currency.findUnique({
            where: {
                name_symbol: {
                    name: "Indian Rupee", symbol: '₹'
                }
            }
        });
        if (!defaultCurrency) {
            throw new Error("Default currency not found in database!");
        }
        const hashedPassword = await hashPassword(password);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${name}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${name}`;
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
                gender,
                profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
                currency: {
                    connect: { id: defaultCurrency.id }
                }
            }
        });
        return newUser;
    } catch (error) {
        throw error;
    }
}
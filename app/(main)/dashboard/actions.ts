"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { createTransactionSchema, CreateTransactionValues } from "@/validations";
import { revalidatePath } from "next/cache";


export const createTransactionAction = async (values: CreateTransactionValues) => {
    const parsedBody = createTransactionSchema.safeParse(values);
    if (!parsedBody.success) {
        throw new Error("Bad request!");
    }

    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated!");
    }

    const {
        description,
        amount,
        date,
        type,
        account,
        category,
        tags = [],
    } = parsedBody.data;

    await prisma.transaction.create({
        data: {
            description,
            amount,
            date,
            type,
            accountId: account,
            categoryId: category,
            userId: session.user.id,
            tags: {
                connect: tags.map((id) => ({ id })),
            },
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/transactions");
}
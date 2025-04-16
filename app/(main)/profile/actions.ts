"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import {
    createAccountSchema,
    CreateAccountValues,
    createCategorySchema,
    CreateCategoryValues,
    createTagSchema,
    CreateTagValues,
    editProfileSchema,
    EditProfileValues,
} from "@/validations";
import { revalidatePath } from "next/cache";

// ------------------ Profile -------------------
export const editProfileAction = async (values: EditProfileValues) => {
    const parsedBody = editProfileSchema.safeParse(values);
    if (!parsedBody.success) {
        throw new Error("Bad request!");
    }

    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated!");
    }

    const { name, currency } = parsedBody.data;
    await prisma.user.update({
        where: {
            id: session.user.id,
        },
        data: {
            name,
            currencyId: currency,
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/profile");
};

export const deleteProfileAction = async () => {
    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated!");
    }
    const userId = session.user.id;

    await prisma.$transaction([
        prisma.transaction.deleteMany({ where: { userId } }),
        prisma.tag.deleteMany({ where: { userId } }),
        prisma.category.deleteMany({ where: { userId } }),
        prisma.account.deleteMany({ where: { userId } }),
        prisma.user.delete({ where: { id: userId } }),
    ]);

    revalidatePath("/");
};

// ---------- Account ------------
export const createAccountAction = async (values: CreateAccountValues) => {
    const parsedBody = createAccountSchema.safeParse(values);
    if (!parsedBody.success) {
        throw new Error("Bad request!");
    }

    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated!");
    }

    const { name, icon } = parsedBody.data;
    const newAccount = await prisma.account.create({
        data: {
            name,
            icon,
            user: {
                connect: { id: session.user.id },
            },
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/profile");
    return newAccount;
};

export const deleteAccountAction = async (accountId: string) => {
    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated!");
    }

    await prisma.account.delete({
        where: {
            id: accountId,
            userId: session?.user.id,
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/profile");
};

// --------- CATEGORY --------------------
export const createCategoryAction = async (values: CreateCategoryValues) => {
    const parsedBody = createCategorySchema.safeParse(values);
    if (!parsedBody.success) {
        throw new Error("Bad request!");
    }

    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated!");
    }

    const { name, icon, type } = parsedBody.data;
    const newCategory = await prisma.category.create({
        data: {
            name,
            icon,
            type,
            user: {
                connect: { id: session.user.id },
            },
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/profile");
    return newCategory;
};

export const deleteCategoryAction = async (categoryId: string) => {
    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated!");
    }

    await prisma.category.delete({
        where: {
            id: categoryId,
            userId: session?.user.id,
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/profile");
};

// -------- TAGS ----------------
export const createTagAction = async (values: CreateTagValues) => {
    const parsedBody = createTagSchema.safeParse(values);
    if (!parsedBody.success) {
        throw new Error("Bad request!");
    }

    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated!");
    }

    const { name } = parsedBody.data;
    const newTag = await prisma.tag.create({
        data: {
            name,
            user: {
                connect: { id: session.user.id },
            },
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/profile");
    return newTag;
};

export const deleteTagAction = async (tagId: string) => {
    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated!");
    }

    await prisma.tag.delete({
        where: {
            id: tagId,
            userId: session?.user.id,
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/profile");
};

import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { TransactionType } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { date, nativeEnum, number, object, string, z } from "zod";

// -------- AUTH -----------------------------
export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" }).min(
        1,
        "Password is required"
    ),
});
export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = object({
    name: string({ required_error: "Name is required" }).min(
        1,
        "Name is required"
    ),
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    gender: z.enum(["male", "female"], {
        message: "Gender must be either 'male' or 'female'.",
    }),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    confirmPassword: string({ required_error: "Confirm Password is required" })
        .min(1, "Confirm Password is required")
        .min(8, "Confirm Password must be more than 8 characters")
        .max(32, "Confirm Password must be less than 32 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
});
export type SignUpValues = z.infer<typeof signUpSchema>;

export const editProfileSchema = object({
    name: string({ required_error: "Name is required" }).min(
        1,
        "Name is required"
    ),
    currency: string({ required_error: "Currency is required" }).min(1, {
        message: "Currency is required",
    }),
});
export type EditProfileValues = z.infer<typeof editProfileSchema>;

// ------------------- Account ------------------------
export const createAccountSchema = object({
    name: string({ required_error: "Account name is required" }).min(1, {
        message: "Account name is required.",
    }),
    icon: string({ required_error: "Icons is required" }).min(1, {
        message: "Icons is required.",
    }),
});
export type CreateAccountValues = z.infer<typeof createAccountSchema>;

// ------------------- Tag ------------------------
export const createTagSchema = object({
    name: string({ required_error: "Tag name is required" }).min(1, {
        message: "Tag name is required.",
    }),
});
export type CreateTagValues = z.infer<typeof createTagSchema>;

// --------------------- CATEGORY -----------------
export const createCategorySchema = object({
    name: string({ required_error: "Category name is required" }).min(1, {
        message: "Category name is required.",
    }),
    icon: string({ required_error: "Icons is required" }).min(1, {
        message: "Icons is required.",
    }),
    type: z.enum(["income", "expense"], {
        message: "Type must be either 'income' or 'expense'.",
    }),
});
export type CreateCategoryValues = z.infer<typeof createCategorySchema>;

export const getCategoriesSchema = object({
    type: z.enum(["income", "expense"], {
        message: "Type must be either 'income' or 'expense'.",
    }),
})

// ---------- TRANSACTIONS --------------------------

export const transactionsHistorySchema = object({
    from: z.coerce.date(),
    to: z.coerce.date(),
})
    .refine((args) => {
        const { from, to } = args;
        const days = differenceInDays(to, from);

        const isValidRange = days >= 0 && days <= MAX_DATE_RANGE_DAYS;
        return isValidRange;
    });


export const createTransactionSchema = object({
    description: string().min(1, "Description is required"),
    amount: number().positive("Amount must be positive"),
    date: date(),
    type: nativeEnum(TransactionType),
    account: string().uuid(),
    category: string().uuid(),
    tags: z.array(string().uuid()).optional(),
});

export type CreateTransactionValues = z.infer<typeof createTransactionSchema>;
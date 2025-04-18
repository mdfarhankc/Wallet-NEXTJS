import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { transactionsHistorySchema } from "@/validations";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return Response.json("User not authenticated!", {
                status: 401,
            });
        }

        const user = session.user;

        const { searchParams } = new URL(request.url);
        const from = searchParams.get("from");
        const to = searchParams.get("to");

        const queryParams = transactionsHistorySchema.safeParse({
            from,
            to,
        });

        if (!queryParams.success) {
            return Response.json(queryParams.error.message, {
                status: 400,
            });
        }

        const transactions = await prisma.transaction.findMany({
            where: {
                userId: user.id,
                date: {
                    gte: queryParams.data.from,
                    lte: queryParams.data.to,
                },
            },
            orderBy: {
                date: "desc",
            },
        });
        return Response.json(transactions);
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        return new NextResponse("Failed to fetch transaction history", { status: 500 });
    }

}

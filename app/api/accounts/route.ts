import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user) return new NextResponse("User not authenticated!", { status: 401 });

        const accounts = await prisma.account.findMany({
            where: { userId: session?.user?.id },
            orderBy: { name: "asc" },
        });
        return NextResponse.json(accounts);
    } catch (error) {
        console.error("Error fetching accounts:", error);
        return new NextResponse("Failed to fetch accounts", { status: 500 });
    }
}

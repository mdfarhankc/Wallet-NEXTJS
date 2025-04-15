import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    const session = await auth();
    if (!session?.user) return new NextResponse("User not authenticated!", { status: 401 });
    try {

        const currencies = await prisma.account.findMany({
            where: { userId: session?.user?.id },
            orderBy: { name: "asc" },
        });
        return NextResponse.json(currencies);
    } catch (error) {
        console.error("Error fetching currencies:", error);
        return new NextResponse("Failed to fetch currencies", { status: 500 });
    }
}

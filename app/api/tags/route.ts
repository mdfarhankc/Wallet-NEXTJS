import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user) return new NextResponse("User not authenticated!", { status: 401 });

        const tags = await prisma.tag.findMany({
            where: { userId: session?.user?.id },
            orderBy: { name: "asc" },
        });
        return NextResponse.json(tags);
    } catch (error) {
        console.error("Error fetching tags:", error);
        return new NextResponse("Failed to fetch tags", { status: 500 });
    }
}

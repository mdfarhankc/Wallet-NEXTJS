import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { getCategoriesSchema } from "@/validations";

export async function GET(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) return new NextResponse("User not authenticated!", { status: 401 });

        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");

        const queryParams = getCategoriesSchema.safeParse({
            type,
        });

        if (!queryParams.success) {
            return Response.json(queryParams.error.message, {
                status: 400,
            });
        }

        const categories = await prisma.category.findMany({
            where: { userId: session?.user?.id, type: queryParams.data.type },
            orderBy: { name: "asc" },
        });
        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return new NextResponse("Failed to fetch categories", { status: 500 });
    }
}

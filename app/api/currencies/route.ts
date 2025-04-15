import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const currencies = await prisma.currency.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(currencies);
  } catch (error) {
    console.error("Error fetching currencies:", error);
    return new NextResponse("Failed to fetch currencies", { status: 500 });
  }
}

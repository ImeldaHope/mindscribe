// app/api/v1/users/[userId]/categories/route.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET method: Fetch categories entries for a specific user
export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  if (!userId) {
    return new Response(JSON.stringify({ error: "Invalid userId" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    // Fetch default categories for the user
    const categories = await prisma.category.findMany({
      include: {
        entries: { where: { userId } },
      },
    });

    // Fetch custom categories for the user
    const customUserCategories = await prisma.customCategory.findMany({
      where: { userId },
      include: {
        entries: true,
      },
    });

    return new Response(JSON.stringify({ categories, customUserCategories }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  const { name } = await req.json();

  if (!name) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const existingCustomCategory = await prisma.customCategory.findFirst({
      where: {
        userId: String(userId),
        name: name,
      },
    });

    if (existingCustomCategory) {
      return new Response(
        JSON.stringify({
          error: "An entry with this title already exists.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newCustomCategory = await prisma.customCategory.create({
      data: {
        name,
        userId,
      },
    });

    return new Response(JSON.stringify(newCustomCategory), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

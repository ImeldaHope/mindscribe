// app/api/v1/users/[userId]/categories/[customCategoryId]/route.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PUT method: Update a specific custom category for a specific user
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ userId: string; customCategoryId: string }> }
) {
  const { userId, customCategoryId } = await params;
  const { name } = await req.json();

  if (!name) {
    return new Response(JSON.stringify({ error: "Name is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const customCategory = await prisma.customCategory.findFirst({
      where: {
        userId: String(userId),
        id: String(customCategoryId),
      },
    });

    if (!customCategory) {
      return new Response(JSON.stringify({ error: "Custom category not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updatedCustomCategory = await prisma.customCategory.update({
      where: {
        id: String(customCategoryId),
      },
      data: {
        name,
      },
    });

    return new Response(JSON.stringify(updatedCustomCategory), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE method: Delete a specific custom category for a specific user
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ userId: string; customCategoryId: string }> }
) {
  const { userId, customCategoryId } = await params;

  try {
    const customCategory = await prisma.customCategory.findFirst({
      where: {
        userId: String(userId),
        id: String(customCategoryId),
      },
    });

    if (!customCategory) {
      return new Response(JSON.stringify({ error: "Custom category not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await prisma.customCategory.delete({
      where: {
        id: String(customCategoryId),
      },
    });

    return new Response(
      JSON.stringify({ message: "Category deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
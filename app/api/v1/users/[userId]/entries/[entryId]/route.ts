// app/api/v1/users/[userId]/entries/[entryId]/route.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PUT method: Update a specific entry for a specific user
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ userId: string; entryId: string }> }
) {
  const { userId, entryId } = await params;
  const { title, content, mood, categoryId, customCategoryId, tags } = await req.json();

  // Check if the required fields are provided
  if (!title || !content) {
    return new Response(JSON.stringify({ error: "Title and content are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Check if the entry exists for the user
    const entry = await prisma.entry.findFirst({
      where: {
        userId: String(userId),
        id: String(entryId),
      },
    });

    if (!entry) {
      return new Response(JSON.stringify({ error: "Entry not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update the entry
    const updatedEntry = await prisma.entry.update({
      where: {
        id: String(entryId),
      },
      data: {
        title,
        content,
        mood,
        categoryId,
        customCategoryId,
        tags: {
          connect: tags ? tags.map((tagId: string) => ({ id: tagId })) : [],
        },
      },
    });

    return new Response(JSON.stringify(updatedEntry), {
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


// DELETE method: Delete a specific entry for a specific user
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ userId: string; entryId: string }> }
) {
  const { userId, entryId } = await params;

  try {
    // Check if the entry exists for the user
    const entry = await prisma.entry.findFirst({
      where: {
        userId: String(userId),
        id: String(entryId),
      },
    });

    if (!entry) {
      return new Response(JSON.stringify({ error: "Entry not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete the entry
    await prisma.entry.delete({
      where: {
        id: String(entryId),
      },
    });

    return new Response(JSON.stringify({ message: "Entry deleted successfully" }), {
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

// app/api/v1/users/[userId]/route.ts
import { PrismaClient } from "@prisma/client"; 

const prisma = new PrismaClient();

// PUT method: Update a specific user
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const { name, email, password, avatar } = await req.json();

  // Check if the required fields are provided
  if (!name && !email && !password && !avatar) {
    return new Response(
      JSON.stringify({
        error:
          "At least one field (name, email, password, or avatar) is required",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Check if the user exists
    const user = await prisma.user.findFirst({
      where: {
        id: String(userId),
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: {
        id: String(userId),
      },
      data: {
        name,
        email,
        password,
        avatar
      },
    });

    return new Response(JSON.stringify(updatedUser), {
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

// DELETE method: Delete a specific user
export async function DELETE(
    req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  try {
    // Check if the user exists
    const user = await prisma.user.findFirst({
      where: {
        id: String(userId),
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete the user
    await prisma.user.delete({
      where: {
        id: String(userId),
      },
    });

    return new Response(
      JSON.stringify({ message: "User deleted successfully" }),
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
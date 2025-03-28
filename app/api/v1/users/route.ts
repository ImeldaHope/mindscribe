// app/api/v1/users/route.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST method: Create a new user
export async function POST(req: Request) {
  const { name, email, password, avatar } = await req.json();

  // Check if the required fields are provided
  if (!name || !email || !password) {
    return new Response(
      JSON.stringify({
        error: "Name, email, and password are required",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        avatar,
      },
    });

    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
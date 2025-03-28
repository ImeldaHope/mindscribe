// app/api/v1/users/[userId]/entries/route.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET method: Fetch entries for a specific user
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
    const entries = await prisma.entry.findMany({
      where: { userId },
      include: {
        category: true,
        customCategory: true,
        tags: true,
      },
    });
      return new Response(JSON.stringify(entries), {
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

// POST method: Create a new entry for a specific user
export async function POST(
    req: Request,    
  { params }: { params: Promise<{ userId: string }> }
) {
    
  const { userId } = await params; 

 
  const { title, content, mood, categoryId, customCategoryId, tags } =
        await req.json();
    
    
  if (!userId || !title || !content) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json", 
      },
    });
    }
    
    
    try {
      
        const existingEntry = await prisma.entry.findFirst({
          where: {
            userId: String(userId),
            title: title, 
          },
        });

        
        if (existingEntry) {
          return new Response(
            JSON.stringify({
              error: "An entry with this title already exists.",
            }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

    const newEntry = await prisma.entry.create({
      data: {
        title,
        content,
        mood,
        userId,
        categoryId,
        customCategoryId,
        tags: {
          connect: tags.map((tagId: string) => ({ id: tagId })),
        },
      },
    });

    return new Response(JSON.stringify(newEntry), {
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

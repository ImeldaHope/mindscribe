import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

    console.log("⛔ Deleting existing data...");
    await prisma.entry.deleteMany();
    await prisma.customCategory.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    await prisma.tag.deleteMany();
    console.log("✅ Deleted existing data");
  // ✅ Ensure only 7 users are created
  const users = await Promise.all(
    Array.from({ length: 20 }).map(async () =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          avatar: faker.image.avatar(),
        },
      })
    )
  );

  console.log(`✅ Created ${users.length} users`);

  // ✅ Ensure only 5 default categories exist
  const categoryNames = ["Work", "Personal", "Health", "Finance", "Hobbies"];
  const defaultCategories = await Promise.all(
    categoryNames.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  console.log(
    `✅ Ensured ${defaultCategories.length} default categories exist`
  );

  // ✅ Assign some users a custom category
  const usersWithCustomCategories = users.slice(0, 10); // Only 4 users get custom categories
  const customCategories = await Promise.all(
    usersWithCustomCategories.map((user) => {
      const numCustomCategories = faker.number.int({ min: 3, max: 5 });
      return Promise.all(
        Array.from({ length: numCustomCategories }).map(async () => {
          
          return prisma.customCategory.create({
            data: {
              name: `${faker.word.noun()} Journal`,
              userId: user.id,
            },
          });
        })
      );
    })
  );

  console.log(`✅ Created ${customCategories.flat().length} custom categories`);

  // ✅ Seed 10-15 entries per user
  for (const user of users) {
    const numEntries = faker.number.int({ min: 10, max: 15 });

    await Promise.all(
      Array.from({ length: numEntries }).map(async () => {
        const useDefaultCategory = Math.random() > 0.5;
        const category = useDefaultCategory
          ? faker.helpers.arrayElement(defaultCategories)
          : customCategories.find((c) => c.userId === user.id) || null;

          const numTags = faker.number.int({ min: 1, max: 3 });
          const tags = await Promise.all(
            Array.from({ length: numTags }).map(async () => {
              const tagName = faker.word.noun();
              return prisma.tag.upsert({
                where: { name: tagName },
                update: {},
                create: { name: tagName },
              });
            })
          );

        return prisma.entry.create({
          data: {
            title: faker.company.catchPhrase(),
            content: faker.lorem.paragraphs(2),
            mood: faker.helpers.arrayElement([
              "HAPPY",
              "SAD",
              "ANXIOUS",
              "CALM",
              "EXCITED",
              "TIRED",
            ]),
            userId: user.id,
            categoryId: useDefaultCategory ? category.id : null,
            customCategoryId:
              !useDefaultCategory && category ? category.id : null,
            tags: {
              connect: tags.map((tag) => ({ id: tag.id })),
            },
          },
        });
      })
    );
    console.log(`✅ User ${user.name} received ${numEntries} entries`);
  }

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

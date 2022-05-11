import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create 2000 users
  const users = Array.from({ length: 2000 }).map((_, i) => ({
    name: `User ${i}`,
    email: `user${i}@example.com`,
  }));
  await Promise.all(
    users.map(async (user) => {
      await prisma.user.upsert({
        create: user,
        update: user,
        where: {
          email: user.email,
        },
      });
    })
  );

  // Create 10 posts for each user
  const posts = Array.from({ length: 20000 }).map((_, i) => ({
    title: `Post ${i}`,
    content: `Post content ${i}`,
    published: true,
    authorId: (i % 2000) + 1,
  }));
  await prisma.post.createMany({
    data: posts,
  });

  // Create a profile for each user
  const profiles = Array.from({ length: 2000 }).map((_, i) => ({
    userId: i + 1,
    bio: `Bio ${i}`,
  }));
  await Promise.all(
    profiles.map(async (profile) => {
      await prisma.profile.upsert({
        create: profile,
        update: profile,
        where: {
          userId: profile.userId,
        },
      });
    })
  );
  console.log('Seeding successfull');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

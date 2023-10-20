import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await seedRoles();
}

async function seedRoles() {
  const roles = {
    admin: 'Admin user with full access',
    student: 'Student user',
    professor: 'Professor user',
  };

  for (const [key, value] of Object.entries(roles)) {
    await prisma.role.create({
      data: {
        name: key,
        description: value,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: Error) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

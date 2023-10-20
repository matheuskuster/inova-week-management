import { PrismaClient } from '@prisma/client';

import { CryptoEncryptService } from '@/infra/services/encrypt/crypto.encrypt.service';

const prisma = new PrismaClient();

async function main() {
  await seedRoles();
  await seedAdminUser();
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

async function seedAdminUser() {
  const encryptService = new CryptoEncryptService();
  const encryptedPassword = await encryptService.hash('admin');

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@inova-week-management.com',
      registration: '000001',
      birthDate: new Date(),
      password: encryptedPassword,
      phone: '00000000000',

      roles: {
        connect: {
          name: 'admin',
        },
      },
    },
  });
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

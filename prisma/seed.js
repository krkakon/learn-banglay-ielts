const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@learnbanglayielts.com' },
    update: {},
    create: {
      email: 'admin@learnbanglayielts.com',
      full_name: 'Admin User',
      password_hash: adminPassword,
      role: 'admin',
      account_status: 'active',
      enrollment_status: 'approved',
    },
  });

  console.log('Database seeded with admin user.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

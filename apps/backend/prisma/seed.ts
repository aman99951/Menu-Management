import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // check if menu already exists
  const existing = await prisma.menu.findFirst({
    where: { name: 'systemmanagement' },
  });

  if (existing) {
    console.log('Seed already applied, skipping');
    return;
  }

  // create menu + root node
  const menu = await prisma.menu.create({
    data: { name: 'systemmanagement' },
  });

  const root = await prisma.menuItem.create({
    data: {
      menuId: menu.id,
      name: 'root',
      depth: 0,
      position: 0,
    },
  });

  const systems = await prisma.menuItem.create({
    data: {
      menuId: menu.id,
      parentId: root.id,
      name: 'Systems',
      depth: 1,
      position: 0,
    },
  });

  await prisma.menuItem.create({
    data: {
      menuId: menu.id,
      parentId: systems.id,
      name: 'System Code',
      depth: 2,
      position: 0,
    },
  });

  console.log('Seed applied successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class MenuItemsService {
constructor(private prisma: PrismaService) {}


update(id: string, name?: string) {
return this.prisma.menuItem.update({ where: { id }, data: { name } });
}


remove(id: string) {
return this.prisma.$transaction(async (tx) => {
// delete subtree: collect ids by simple BFS
const toDelete: string[] = [id];
for (let i = 0; i < toDelete.length; i++) {
const children = await tx.menuItem.findMany({ where: { parentId: toDelete[i] }, select: { id: true } });
for (const c of children) toDelete.push(c.id);
}
await tx.menuItem.deleteMany({ where: { id: { in: toDelete } } });
return { deleted: toDelete.length };
});
}
}
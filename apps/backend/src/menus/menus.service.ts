import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto, CreateMenuDto } from './dtos';
import { buildTree } from './tree';


@Injectable()
export class MenusService {
constructor(private prisma: PrismaService) {}


list() { return this.prisma.menu.findMany({ orderBy: { createdAt: 'desc' } }); }


async create(dto: CreateMenuDto) {
const menu = await this.prisma.menu.create({ data: { name: dto.name } });
// create root item automatically
await this.prisma.menuItem.create({ data: { menuId: menu.id, name: 'root', depth: 0, position: 0 } });
return menu;
}


async tree(menuId: string, depth?: number) {
const where: any = { menuId };
const rows = await this.prisma.menuItem.findMany({ where, orderBy: [{ depth: 'asc' }, { position: 'asc' }] });
if (!rows.length) throw new Error('No items for menu');
const all = depth == null ? rows : rows.filter(r => r.depth <= depth);
return buildTree(all);
}


async addItem(menuId: string, dto: CreateItemDto) {
// determine parent and next position
const parent = dto.parentId
? await this.prisma.menuItem.findUnique({ where: { id: dto.parentId } })
: await this.prisma.menuItem.findFirst({ where: { menuId, depth: 0 } });
if (!parent) throw new Error('Parent not found');
const count = await this.prisma.menuItem.count({ where: { parentId: parent.id } });
return this.prisma.menuItem.create({
data: {
menuId,
parentId: parent.id,
name: dto.name,
depth: parent.depth + 1,
position: count, // append as last child
},
});
}
}
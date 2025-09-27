import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateItemDto, CreateMenuDto, GetTreeQuery } from './dtos';


@Controller('menus')
export class MenusController {
constructor(private svc: MenusService) {}


@Get() list() { return this.svc.list(); }
@Post() create(@Body() dto: CreateMenuDto) { return this.svc.create(dto); }


@Get(':id/tree') tree(@Param('id') id: string, @Query() q: GetTreeQuery) {
const depth = q.depth ? Number(q.depth) : undefined;
return this.svc.tree(id, depth);
}


@Post(':id/items') addItem(@Param('id') id: string, @Body() dto: CreateItemDto) {
return this.svc.addItem(id, dto);
}
}
import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';


@Controller('menu-items')
export class MenuItemsController {
constructor(private svc: MenuItemsService) {}


@Patch(':id') update(@Param('id') id: string, @Body() body: { name?: string }) {
return this.svc.update(id, body.name);
}


@Delete(':id') remove(@Param('id') id: string) {
return this.svc.remove(id);
}
}
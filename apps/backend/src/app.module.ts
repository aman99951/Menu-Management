import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MenusModule } from './menus/menus.module';
import { MenuItemsModule } from './menu-items/menu-items.module';


@Module({
imports: [PrismaModule, MenusModule, MenuItemsModule],
})
export class AppModule {}
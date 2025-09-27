import { IsOptional, IsString } from 'class-validator';


export class CreateMenuDto { @IsString() name!: string; }


export class GetTreeQuery { @IsOptional() @IsString() depth?: string; }


export class CreateItemDto {
@IsString() name!: string;
@IsOptional() @IsString() parentId?: string; // if omitted -> root child
}


export class UpdateItemDto { @IsOptional() @IsString() name?: string; }
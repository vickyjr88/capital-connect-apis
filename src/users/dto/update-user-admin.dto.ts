import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';

export class UpdateUserAdminDto extends PartialType(CreateUserDto) {
    @IsOptional()
    roles: string;
}
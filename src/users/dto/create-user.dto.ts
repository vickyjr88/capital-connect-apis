import { IsString, IsNotEmpty, MinLength, IsArray } from 'class-validator';
import { Role } from 'src/auth/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  roles: string;
}

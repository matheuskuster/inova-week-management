import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}

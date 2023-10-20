import { IsOptional, IsString } from 'class-validator';

export class UpdateThemeDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  inovaId?: string;
}

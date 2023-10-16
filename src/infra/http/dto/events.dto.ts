import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateEventDTO {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  place?: string;

  @IsOptional()
  @IsString()
  type?: string;
}

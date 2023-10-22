import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProjectDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateProjectPresentationDTO {
  @IsNotEmpty()
  @IsNumber()
  stand: number;

  @IsNotEmpty()
  @IsString()
  date: string;
}

export class ApprovalProjectDTO {
  @IsNotEmpty()
  @IsBoolean()
  approved: boolean;
}

export class CreateInviteDTO {
  @IsNotEmpty()
  @IsString()
  registration: string;
}

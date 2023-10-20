import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInovaDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;
}

export class UpdateInovaDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  from: string;

  @IsOptional()
  @IsString()
  to: string;

  @IsOptional()
  @IsNumber()
  year: number;
}

export class CreateThemeByInovaDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreateThemeByPreviousInovaDTO {
  @IsNotEmpty()
  @IsString()
  previousInovaId: string;
}

export class CreateReviewCriteriaByInovaDTO {
  @IsNotEmpty()
  @IsString()
  question: string;
}

export class CreateReviewCriteriasByPreviousInovaDTO {
  @IsNotEmpty()
  @IsString()
  previousInovaId: string;
}

export class CreateProjectByInovaDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  themeId: string;
}

export class CreateEventByInovaDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  date: string;
}

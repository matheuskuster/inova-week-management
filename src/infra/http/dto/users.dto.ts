import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class SingupDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(9)
  registration: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['admin', 'student', 'professor'])
  role: string;
}

export class AdminCreateDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(9)
  registration: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['admin', 'student', 'professor'], { each: true })
  roles: string[];
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  @Length(9)
  registration: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  newPassword: string;

  @IsOptional()
  @IsString()
  currentPassword: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  birthDate: string;

  @IsOptional()
  @IsString()
  @IsIn(['admin', 'student', 'professor'], { each: true })
  roles: string[];
}

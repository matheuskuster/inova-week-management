import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
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

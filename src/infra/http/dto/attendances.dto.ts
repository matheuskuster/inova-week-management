import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAttendanceDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}

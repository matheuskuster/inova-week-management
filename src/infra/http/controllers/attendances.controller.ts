import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';

import { CurrentUser, Roles } from '../decorators';
import { AttendanceViewModel } from '../view-models/attendance.view-model';

import { GetAttendanceById, DeleteAttendance } from '@/application/use-cases';
import { UnauthorizedError } from '@/errors/unauthorized-error';
import { AuthenticatedUser } from '@/types/entities';

@Controller('attendances')
export class AttendancesController {
  constructor(
    private readonly getAttendanceById: GetAttendanceById,
    private readonly deleteAttendance: DeleteAttendance,
  ) {}

  @Roles('admin', 'student', 'professor')
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async find(
    @Param('id') id: string,
    @CurrentUser() currentUser: AuthenticatedUser,
  ) {
    const { attendance } = await this.getAttendanceById.execute({
      id,
    });

    if (
      attendance?.userId !== currentUser.id &&
      !currentUser.roles.includes('admin')
    ) {
      throw new UnauthorizedError();
    }

    return {
      attendance: AttendanceViewModel.toHTTP(attendance),
    };
  }

  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @Delete(':/id')
  async delete(@Param('id') id: string) {
    await this.deleteAttendance.execute({ id });
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UpdateEventDTO } from '../dto/events.dto';

import {
  CreateAttendance,
  DeleteEvent,
  GetEventAttendances,
  GetEventById,
  UpdateEvent,
} from '@/application/use-cases';
import { IsPublic, Roles } from '@/infra/http/decorators';
import { CreateAttendanceDTO } from '@/infra/http/dto/attendances.dto';
import { AttendanceViewModel } from '@/infra/http/view-models/attendance.view-model';
import { EventViewModel } from '@/infra/http/view-models/event.view-model';

@Controller('events')
export class EventsController {
  constructor(
    private readonly getEventById: GetEventById,
    private readonly deleteEvent: DeleteEvent,
    private readonly updateEvent: UpdateEvent,
    private readonly createAttendance: CreateAttendance,
    private readonly getEventAttendances: GetEventAttendances,
  ) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const { event } = await this.getEventById.execute({ id });

    return {
      event: EventViewModel.toHTTP(event),
    };
  }

  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.deleteEvent.execute({ id });
  }

  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateEventDTO) {
    const { event } = await this.updateEvent.execute({
      id,
      date: body.date ? new Date(body.date) : undefined,
      description: body.description,
      name: body.name,
      place: body.place,
      type: body.type,
    });

    return {
      event: EventViewModel.toHTTP(event),
    };
  }

  @Roles('admin', 'professor')
  @HttpCode(HttpStatus.CREATED)
  @Post('/:id/attendances')
  async attend(@Param('id') id: string, @Body() body: CreateAttendanceDTO) {
    const { attendance } = await this.createAttendance.execute({
      eventId: id,
      userId: body.userId,
    });

    return {
      attendance: AttendanceViewModel.toHTTP(attendance),
    };
  }

  @Roles('admin', 'professor')
  @HttpCode(HttpStatus.OK)
  @Get('/:id/attendances')
  async getAttendances(@Param('id') id: string) {
    const { attendances } = await this.getEventAttendances.execute({
      eventId: id,
    });

    return {
      attendances: attendances.map(AttendanceViewModel.toHTTP),
      users: attendances.map((attendance) => attendance.userId),
    };
  }
}

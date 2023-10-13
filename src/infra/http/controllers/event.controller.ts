import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { IsPublic } from '../decorators';
import { EventViewModel } from '../view-models/event.view-model';

import { GetEventById } from '@/application/use-cases';

@Controller('events')
export class EventsController {
  constructor(private readonly getEventById: GetEventById) { }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const { event } = await this.getEventById.execute({ id });

    return {
      event: EventViewModel.toHTTP(event),
    };
  }
}

import {
  Controller,
  Get,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { Roles } from '../decorators';
import { InviteViewModel } from '../view-models/invite.view-model';

import { GetInvites, DeleteInvite } from '@/application/use-cases';

@Controller('invites')
export class InvitesController {
  constructor(
    private readonly getInvites: GetInvites,
    private readonly deleteInvite: DeleteInvite,
  ) {}

  @Roles('student')
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.deleteInvite.execute({ id });
  }

  @Roles('student')
  @HttpCode(HttpStatus.OK)
  @Get()
  async index() {
    const { invites } = await this.getInvites.execute();

    return {
      invites: invites.map((invite) => InviteViewModel.toHTTP(invite)),
    };
  }
}

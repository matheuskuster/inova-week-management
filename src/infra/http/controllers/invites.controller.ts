import {
  Controller,
  Get,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { CurrentUser, Roles } from '../decorators';
import { InviteViewModel } from '../view-models/invite.view-model';

import { DeleteInvite, GetUserInvites } from '@/application/use-cases';
import { AuthenticatedUser } from '@/types/entities';

@Controller('invites')
export class InvitesController {
  constructor(
    private readonly deleteInvite: DeleteInvite,
    private readonly getUserInvites: GetUserInvites,
  ) {}

  @Roles('student')
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    await this.deleteInvite.execute({ id, userId: user.id });
  }

  @Roles('student')
  @HttpCode(HttpStatus.OK)
  @Get('/my')
  async getMyInvites(@CurrentUser() user: AuthenticatedUser) {
    const { invites } = await this.getUserInvites.execute({
      userId: user.id,
    });

    return {
      invites: invites.map((invite) => InviteViewModel.toHTTP(invite)),
    };
  }
}

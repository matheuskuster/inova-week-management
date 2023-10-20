import { Injectable } from '@nestjs/common';

import { InvitesRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';
import { UnauthorizedError } from '@/errors/unauthorized-error';

interface DeleteInviteRequest {
  id: string;
  userId: string;
}

@Injectable()
export class DeleteInvite {
  constructor(private readonly invitesRepository: InvitesRepository) {}

  async execute({ id, userId }: DeleteInviteRequest) {
    const invite = await this.invitesRepository.findById(id);

    if (invite?.userId !== userId) {
      throw new UnauthorizedError(
        `User ${userId} is not allowed to delete invite ${id}`,
      );
    }

    if (!invite) {
      throw new NotFoundError(`Invite with id ${id} not found`);
    }

    await this.invitesRepository.delete(id);
  }
}

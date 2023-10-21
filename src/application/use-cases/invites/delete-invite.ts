import { Injectable } from '@nestjs/common';

import {
  InvitesRepository,
  ProjectsRepository,
} from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';
import { UnauthorizedError } from '@/errors/unauthorized-error';

interface DeleteInviteRequest {
  id: string;
  userId: string;
}

@Injectable()
export class DeleteInvite {
  constructor(
    private readonly invitesRepository: InvitesRepository,
    private readonly projectRepository: ProjectsRepository,
  ) {}

  async execute({ id, userId }: DeleteInviteRequest) {
    const invite = await this.invitesRepository.findById(id);

    if (!invite) {
      throw new NotFoundError(`Invite with id ${id} not found`);
    }

    const project = await this.projectRepository.findById(invite.projectId);

    if (!project) {
      throw new NotFoundError(`Project with id ${invite.projectId} not found`);
    }

    if (userId !== project.leaderUserId) {
      throw new UnauthorizedError(
        `User ${userId} is not allowed to delete invite ${id}`,
      );
    }

    await this.invitesRepository.delete(id);
  }
}

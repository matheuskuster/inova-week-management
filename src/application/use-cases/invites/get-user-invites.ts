import { Injectable } from '@nestjs/common';

import { InvitesRepository, UsersRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface GetUserInvitesRequest {
  userId: string;
}

@Injectable()
export class GetUserInvites {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly invitesRepository: InvitesRepository,
  ) {}

  async execute({ userId }: GetUserInvitesRequest) {
    const foundUser = await this.usersRepository.findById(userId);

    if (!foundUser) {
      throw new NotFoundError(`User with id ${userId} not found`);
    }

    const invites = await this.invitesRepository.findByUserId(userId);

    return {
      invites,
    };
  }
}

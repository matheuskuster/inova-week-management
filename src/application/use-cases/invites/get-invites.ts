import { Injectable } from '@nestjs/common';

import { Invite } from '@/application/entities';
import { InvitesRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface GetInvitesResponse {
  invites: Invite[];
}

@Injectable()
export class GetInvites {
  constructor(private readonly invitesRepository: InvitesRepository) {}

  public async execute(): Promise<GetInvitesResponse> {
    const invites = await this.invitesRepository.findAll();

    if (invites.length === 0) {
      throw new NotFoundError(`No invites were found`);
    }

    return { invites };
  }
}

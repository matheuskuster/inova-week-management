import { Injectable } from '@nestjs/common';

import { InvitesRepository } from '@/application/repositories';

@Injectable()
export class GetInvites {
  constructor(private readonly inviteRepository: InvitesRepository) {}

  async execute() {
    const invites = await this.inviteRepository.findAll();
    return { invites };
  }
}

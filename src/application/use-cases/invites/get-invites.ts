import { InviteRepository } from '@/application/repositories/invitesRepository';

export class GetInvites {
  constructor(private readonly inviteRepository: InviteRepository) {}

  async execute() {
    const invites = await this.inviteRepository.findAll();

    return { invites };
  }
}

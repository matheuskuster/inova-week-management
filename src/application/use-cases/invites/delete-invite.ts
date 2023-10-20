import { InviteRepository } from '@/application/repositories/invitesRepository';
import { NotFoundError } from '@/errors/not-found.error';

interface inviteInviteRequest {
  id: string;
}

export class DeleteInvite {
  constructor(private readonly inviteRepository: InviteRepository) {}

  async execute({ id }: inviteInviteRequest) {
    const invite = await this.inviteRepository.findById(id);

    if (!invite) {
      throw new NotFoundError(`Invite with id ${id} not found`);
    }

    await this.inviteRepository.delete(id);
  }
}

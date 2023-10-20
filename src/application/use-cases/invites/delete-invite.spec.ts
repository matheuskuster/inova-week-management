import { makeInvite } from '@test/factories/invite.factory';
import { InMemoryInvitesRepository } from '@test/repositories/in-memory.invites.repository';

import { DeleteInvite } from './delete-invite';

import { NotFoundError } from '@/errors/not-found.error';

describe('Delete Invite', () => {
  let invitesRepository: InMemoryInvitesRepository;
  let deleteInvite: DeleteInvite;
  beforeEach(() => {
    invitesRepository = new InMemoryInvitesRepository();
    deleteInvite = new DeleteInvite(invitesRepository);
  });

  it('should throw if invite not found', async () => {
    await expect(deleteInvite.execute({ id: '1' })).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should delete given invite', async () => {
    const invite = makeInvite();
    await invitesRepository.create(invite);

    expect(await invitesRepository.findById(invite.id)).toEqual(invite);

    await deleteInvite.execute({ id: invite.id });

    const invites = await invitesRepository.findAll();
    expect(invites).toEqual([]);
  });
});

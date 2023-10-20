import { makeInvite } from '@test/factories/invite.factory';
import { InMemoryInvitesRepository } from '@test/repositories/in-memory.invites.repository';

import { DeleteInvite } from './delete-invite';

import { NotFoundError } from '@/errors/not-found.error';
import { UnauthorizedError } from '@/errors/unauthorized-error';

describe('Delete Invite', () => {
  let invitesRepository: InMemoryInvitesRepository;
  let deleteInvite: DeleteInvite;

  beforeEach(() => {
    invitesRepository = new InMemoryInvitesRepository();
    deleteInvite = new DeleteInvite(invitesRepository);
  });

  it('should throw if invite not found', async () => {
    await expect(
      deleteInvite.execute({ id: '1', userId: '1' }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw if invite does not belong to the user', async () => {
    const invite = makeInvite({ userId: '123' });
    await invitesRepository.create(invite);

    await expect(
      deleteInvite.execute({ id: invite.id, userId: '321' }),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should delete given invite', async () => {
    const invite = makeInvite({ userId: '1' });
    await invitesRepository.create(invite);

    await deleteInvite.execute({ id: invite.id, userId: '1' });

    const invites = await invitesRepository.findAll();
    expect(invites).toEqual([]);
  });
});

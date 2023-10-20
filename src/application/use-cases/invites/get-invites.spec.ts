import { makeInvite } from '@test/factories/invite.factory';
import { InMemoryInvitesRepository } from '@test/repositories/in-memory.invites.repository';

import { GetInvites } from './get-invites';

describe('Get invites', () => {
  let invitesRepository: InMemoryInvitesRepository;
  let getInvites: GetInvites;

  beforeEach(() => {
    invitesRepository = new InMemoryInvitesRepository();
    getInvites = new GetInvites(invitesRepository);
  });

  it('should be able to get all invites', async () => {
    const invite = makeInvite();

    await invitesRepository.create(invite);

    const { invites } = await getInvites.execute();
    expect(invites).toEqual([invite]);
  });
});

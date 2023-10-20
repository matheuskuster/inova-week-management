import { makeUser } from '@test/factories';
import { makeInvite } from '@test/factories/invite.factory';
import { InMemoryInvitesRepository } from '@test/repositories/in-memory.invites.repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory.users.repository';

import { GetUserInvites } from './get-user-invites';

import { NotFoundError } from '@/errors/not-found.error';

describe('Get user invites', () => {
  let usersRepository: InMemoryUsersRepository;
  let invitesRepository: InMemoryInvitesRepository;
  let getUserInvites: GetUserInvites;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    invitesRepository = new InMemoryInvitesRepository();
    getUserInvites = new GetUserInvites(usersRepository, invitesRepository);
  });

  it('should throw if user not found', async () => {
    await expect(getUserInvites.execute({ userId: 'invalid' })).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should get empty array if no invites for user', async () => {
    const user = makeUser();
    await usersRepository.create(user);

    const { invites } = await getUserInvites.execute({ userId: user.id });

    expect(invites).toHaveLength(0);
  });

  it('should get user invites', async () => {
    const user = makeUser();
    await usersRepository.create(user);

    const createdInvites = [
      makeInvite({ userId: user.id }),
      makeInvite({ userId: user.id }),
    ];

    await invitesRepository.create(createdInvites[0]);
    await invitesRepository.create(createdInvites[1]);

    const { invites } = await getUserInvites.execute({ userId: user.id });

    expect(invites).toHaveLength(2);
    expect(invites).toEqual(createdInvites);
  });
});

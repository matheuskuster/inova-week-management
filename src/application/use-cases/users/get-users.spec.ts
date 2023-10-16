import { makeUser } from '@test/factories';
import { InMemoryUsersRepository } from '@test/repositories/in-memory.users.repository';

import { GetUsers } from './get-users';

describe('Get users', () => {
  let usersRepository: InMemoryUsersRepository;
  let getUsers: GetUsers;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    getUsers = new GetUsers(usersRepository);
  });

  it('should be able to get all users', async () => {
    const user = makeUser();

    await usersRepository.create(user);

    const { users } = await getUsers.execute();
    expect(users).toEqual([user]);
  });
});

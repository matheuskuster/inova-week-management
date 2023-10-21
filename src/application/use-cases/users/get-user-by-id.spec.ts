import { makeUser } from '@test/factories/user.factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory.users.repository';

import { GetUserById } from './get-user-by-id';

import { NotFoundError } from '@/errors/not-found.error';

describe('Get User By Id', () => {
  let usersRepository: InMemoryUsersRepository;
  let getUserById: GetUserById;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    getUserById = new GetUserById(usersRepository);
  });

  it('should throw an error if user does not exist', async () => {
    await expect(getUserById.execute({ id: 'invalid-id' })).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should return the user if it exists', async () => {
    const User = makeUser();
    await usersRepository.create(User);

    const response = await getUserById.execute({ id: User.id });
    expect(response.user.id).toBe(User.id);
  });
});

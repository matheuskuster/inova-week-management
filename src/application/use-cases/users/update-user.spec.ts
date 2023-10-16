import { makeUser } from '@test/factories';
import { InMemoryUsersRepository } from '@test/repositories/in-memory.users.repository';
import { LocalEncryptService } from '@test/services/local.encrypt.service';

import { UpdateUser } from './update-user';

import { InvalidRequestError } from '@/errors/invalid-request.error';
import { NotFoundError } from '@/errors/not-found.error';

describe('Update user', () => {
  let usersRepository: InMemoryUsersRepository;
  let encryptService: LocalEncryptService;
  let updateUser: UpdateUser;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    encryptService = new LocalEncryptService();
    updateUser = new UpdateUser(usersRepository, encryptService);
  });

  it('should throw if user does not exist', async () => {
    const promise = updateUser.execute({
      id: 'non-existing-user-id',
    });

    await expect(promise).rejects.toThrowError(NotFoundError);
  });

  it('should throw if new password is provided and current is not', async () => {
    const user = makeUser();
    await usersRepository.create(user);

    const promise = updateUser.execute({
      id: user.id,
      newPassword: 'new-password',
    });

    expect(promise).rejects.toThrowError(InvalidRequestError);
  });

  it('should throw if current password is invalid', async () => {
    const user = makeUser();
    await usersRepository.create(user);

    const promise = updateUser.execute({
      id: user.id,
      currentPassword: 'invalid-password',
      newPassword: 'new-password',
    });

    expect(promise).rejects.toThrowError(InvalidRequestError);
  });

  it('should update the user', async () => {
    const hashed = await encryptService.hash('current-password');

    const user = makeUser({ passwordHash: hashed });
    await usersRepository.create(user);

    await updateUser.execute({
      id: user.id,
      currentPassword: 'current-password',
      newPassword: 'new-password',
      name: 'new-name',
    });

    const updatedUser = await usersRepository.findById(user.id);

    expect(updatedUser?.name).toBe('new-name');

    const isValidPassword = await encryptService.compare(
      'new-password',
      updatedUser?.passwordHash,
    );

    expect(isValidPassword).toBe(true);
  });
});

import { makeUser } from '@test/factories';
import { InMemoryUsersRepository } from '@test/repositories/in-memory.users.repository';
import { LocalEncryptService } from '@test/services/local.encrypt.service';

import { AuthenticateUser } from './authenticate-user';

describe('Authenticate user', () => {
  let usersRepository: InMemoryUsersRepository;
  let encryptService: LocalEncryptService;

  let authenticateUser: AuthenticateUser;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    encryptService = new LocalEncryptService();

    authenticateUser = new AuthenticateUser(usersRepository, encryptService);
  });

  it('should be able to authenticate an user', async () => {
    const rawPassword = '123456';
    const encryptedPassword = await encryptService.hash(rawPassword);

    const user = makeUser({ passwordHash: encryptedPassword });
    await usersRepository.create(user);

    const authenticatedUser = await authenticateUser.execute({
      email: user.email,
      password: rawPassword,
    });

    expect(authenticatedUser.user).toEqual(user);
  });

  it('should not be able to authenticate an user with wrong password', async () => {
    const rawPassword = '123456';
    const encryptedPassword = await encryptService.hash(rawPassword);

    const user = makeUser({ passwordHash: encryptedPassword });
    await usersRepository.create(user);

    await expect(
      authenticateUser.execute({
        email: user.email,
        password: 'wrong_password',
      }),
    ).rejects.toThrowError('Invalid credentials');
  });

  it('should not be able to authenticate an user with wrong email', async () => {
    const rawPassword = '123456';
    const encryptedPassword = await encryptService.hash(rawPassword);

    const user = makeUser({ passwordHash: encryptedPassword });
    await usersRepository.create(user);

    await expect(
      authenticateUser.execute({
        email: 'wrong_email',
        password: rawPassword,
      }),
    ).rejects.toThrowError('Invalid');
  });
});

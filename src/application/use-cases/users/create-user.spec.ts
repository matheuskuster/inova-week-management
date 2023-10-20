import { makeRole, makeUser } from '@test/factories';
import {
  InMemoryRolesRepository,
  InMemoryUsersRepository,
} from '@test/repositories';
import { LocalEncryptService } from '@test/services/local.encrypt.service';

import { CreateUser, CreateUserRequest } from './create-user';

import { NotFoundError } from '@/errors/not-found.error';

const makeRequest = (
  overrides?: Partial<CreateUserRequest>,
): CreateUserRequest => ({
  birthDate: new Date(),
  email: 'any_email',
  name: 'any_name',
  password: 'any_password',
  phone: 'any_phone',
  registration: 'any_registration',
  roles: ['any_role'],
  ...overrides,
});

describe('Create user', () => {
  let usersRepository: InMemoryUsersRepository;
  let rolesRepository: InMemoryRolesRepository;
  let encryptService: LocalEncryptService;
  let createUser: CreateUser;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    rolesRepository = new InMemoryRolesRepository();
    encryptService = new LocalEncryptService();

    createUser = new CreateUser(
      usersRepository,
      rolesRepository,
      encryptService,
    );
  });

  it('should throw if role does not exist', async () => {
    const request = makeRequest({ roles: ['invalid_role'] });

    await expect(createUser.execute(request)).rejects.toThrow(NotFoundError);
  });

  it('should throw if email already registered', async () => {
    const user = makeUser({ email: 'exists@email.com' });
    const request = makeRequest({ email: user.email });

    await usersRepository.create(user);

    await expect(createUser.execute(request)).rejects.toThrow(NotFoundError);
  });

  it('should throw if phone already registered', async () => {
    const user = makeUser({ phone: 'exists_phone' });
    const request = makeRequest({ phone: user.phone });

    await usersRepository.create(user);

    await expect(createUser.execute(request)).rejects.toThrow(NotFoundError);
  });

  it('should throw if registration already registered', async () => {
    const user = makeUser({ registration: 'exists_registration' });
    const request = makeRequest({ registration: user.registration });

    await usersRepository.create(user);

    await expect(createUser.execute(request)).rejects.toThrow(NotFoundError);
  });

  it('should create user', async () => {
    const role = makeRole({ name: 'admin' });
    const request = makeRequest({ roles: [role.name] });

    await rolesRepository.create(role);

    const response = await createUser.execute(request);

    expect(response.user).toEqual(
      expect.objectContaining({
        email: request.email,
        name: request.name,
        birthDate: request.birthDate,
        phone: request.phone,
        registration: request.registration,
        roles: expect.any(Array),
      }),
    );
  });
});

import { makeRole, makeUser } from '@test/factories';
import {
  InMemoryRolesRepository,
  InMemoryUsersRepository,
} from '@test/repositories';

import { CreateRole } from './create-role';

import { NotFoundError } from '@/errors/not-found.error';
import { UnauthorizedError } from '@/errors/unauthorized-error';

describe('Create role', () => {
  let rolesRepository: InMemoryRolesRepository;
  let usersRepository: InMemoryUsersRepository;
  let createRole: CreateRole;

  beforeEach(() => {
    rolesRepository = new InMemoryRolesRepository();
    usersRepository = new InMemoryUsersRepository();
    createRole = new CreateRole(rolesRepository, usersRepository);
  });

  it('should throw a NotFoundError if given user id does not exist', async () => {
    const request = {
      userId: 'non-existent-user-id',
      name: 'admin',
      description: 'Administrator',
    };

    await expect(createRole.execute(request)).rejects.toThrowError(
      NotFoundError,
    );
  });

  it('should throw UnauthorizedError if user is not an admin', async () => {
    const user = makeUser({ roles: [] });
    await usersRepository.create(user);

    const request = {
      userId: user.id.toString(),
      name: 'admin',
      description: 'Administrator',
    };

    await expect(createRole.execute(request)).rejects.toThrow(
      UnauthorizedError,
    );
  });

  it('should throw AlreadyExistsError if role with given name already exists', async () => {
    const adminRole = makeRole({ name: 'admin' });
    await rolesRepository.create(adminRole);

    const user = makeUser({ roles: [adminRole] });
    await usersRepository.create(user);

    const request = {
      userId: user.id.toString(),
      name: 'admin',
      description: 'Administrator',
    };

    await expect(createRole.execute(request)).rejects.toThrow(
      'Role with name admin already exists',
    );
  });

  it('should create a new role', async () => {
    const adminRole = makeRole({ name: 'admin' });
    await rolesRepository.create(adminRole);

    const user = makeUser({ roles: [adminRole] });
    await usersRepository.create(user);

    const request = {
      userId: user.id.toString(),
      name: 'user',
      description: 'User',
    };

    const { role } = await createRole.execute(request);

    expect(role).toMatchObject({
      name: 'user',
      description: 'User',
    });
  });
});

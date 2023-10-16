import { makeRole } from '@test/factories';
import { InMemoryRolesRepository } from '@test/repositories/in-memory.roles.repository';

import { GetRoles } from './get-roles';

describe('Get roles', () => {
  let rolesRepository: InMemoryRolesRepository;
  let getRoles: GetRoles;

  beforeEach(() => {
    rolesRepository = new InMemoryRolesRepository();
    getRoles = new GetRoles(rolesRepository);
  });

  it('should be able to get all roles', async () => {
    const { roles } = await getRoles.execute();
    expect(roles).toEqual([]);
  });

  it('should be able to get all roles', async () => {
    const role = makeRole();
    await rolesRepository.create(role);

    const { roles } = await getRoles.execute();
    expect(roles).toEqual([role]);
  });
});

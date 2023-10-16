import { makeRole } from '@test/factories';
import { InMemoryRolesRepository } from '@test/repositories/in-memory.roles.repository';

import { UpdateRole } from './update-role';

import { NotFoundError } from '@/errors/not-found.error';

describe('Update role', () => {
  let rolesRepository: InMemoryRolesRepository;
  let updateRole: UpdateRole;

  beforeEach(() => {
    rolesRepository = new InMemoryRolesRepository();
    updateRole = new UpdateRole(rolesRepository);
  });

  it('should throw if role not found', async () => {
    await expect(
      updateRole.execute({
        id: 'invalid-id',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should be able to update a role', async () => {
    const role = makeRole({ name: 'role-name' });
    await rolesRepository.create(role);

    const { role: updatedRole } = await updateRole.execute({
      id: role.id,
      name: 'new-role-name',
    });

    expect(updatedRole.name).toBe('new-role-name');

    const foundRole = await rolesRepository.findById(role.id);

    expect(foundRole).toEqual(updatedRole);
  });
});

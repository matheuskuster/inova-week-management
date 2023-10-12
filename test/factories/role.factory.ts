import { Role, RoleProps } from '@/application/entities';
import { Override } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export function makeRole(overrides?: Override<RoleProps>) {
  return new Role(
    {
      name: 'admin',
      description: 'Administrator',
      ...overrides,
    },
    new UniqueEntityId(overrides?.id),
  );
}

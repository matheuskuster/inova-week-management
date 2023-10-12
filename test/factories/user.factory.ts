import { User, UserProps } from '@/application/entities';
import { Override } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export function makeUser(overrides?: Override<UserProps>) {
  return new User(
    {
      name: 'John Doe',
      email: 'john@doe.com',
      birthDate: new Date('1990-01-01'),
      passwordHash: '123456',
      phone: '1234567890',
      registration: '1234567890',
      roles: [],
      ...overrides,
    },
    new UniqueEntityId(overrides?.id),
  );
}

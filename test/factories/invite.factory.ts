import { Invite, InviteProps } from '@/application/entities';
import { Override } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export function makeInvite(overrides?: Override<InviteProps>) {
  return new Invite(
    {
      userId: '123456',
      projectId: '123456',
      acceptedAt: new Date('1990-01-02'),
      createdAt: new Date('1990-01-01'),
      ...overrides,
    },
    new UniqueEntityId(overrides?.id),
  );
}

import { Invite, InviteProps } from '@/application/entities';
import { Override } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export function makeInvite(overrides?: Override<InviteProps>) {
  return new Invite(
    {
      userId: new UniqueEntityId().value,
      projectId: new UniqueEntityId().value,
      ...overrides,
    },
    new UniqueEntityId(overrides?.id),
  );
}

import { Event, EventProps } from '@/application/entities';
import { Override } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export function makeEvent(overrides?: Override<EventProps>) {
  return new Event(
    {
      name: 'test',
      description: 'Event test',
      type: 'test',
      date: new Date(),
      inovaId: '123456',
      ...overrides,
    },
    new UniqueEntityId(overrides?.id),
  );
}

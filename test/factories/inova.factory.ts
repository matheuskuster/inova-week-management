import { Inova, InovaProps } from '@/application/entities';
import { Override } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export function makeInova(overrides?: Override<InovaProps>) {
  return new Inova(
    {
      name: 'InovaWeek 2333',
      description: 'InovaWeek 2333 Description',
      from: new Date('2333-10-10'),
      to: new Date('2333-10-20'),
      year: 2333,
      ...overrides,
    },
    new UniqueEntityId(overrides?.id),
  );
}

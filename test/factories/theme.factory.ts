import { Theme, ThemeProps } from '@/application/entities';
import { Override } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export function makeTheme(overrides?: Override<ThemeProps>) {
  return new Theme(
    {
      inovaId: '123456',
      name: 'Theme',
      description: 'Theme description',
      ...overrides,
    },
    new UniqueEntityId(overrides?.id),
  );
}

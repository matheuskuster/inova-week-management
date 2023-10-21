import { Project, ProjectProps } from '@/application/entities';
import { Override } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export function makeProject(overrides?: Override<ProjectProps>) {
  return new Project(
    {
      name: 'Project Name',
      description: 'Project Description',
      approved: false,
      leaderUserId: new UniqueEntityId().value,
      themeId: new UniqueEntityId().value,
      inovaId: new UniqueEntityId().value,
      ...overrides,
    },
    new UniqueEntityId(overrides?.id),
  );
}

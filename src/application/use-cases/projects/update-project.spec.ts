import { makeProject } from '@test/factories';
import { InMemoryProjectsRepository } from '@test/repositories';

import { UpdateProject } from './update-project';

import { NotFoundError } from '@/errors/not-found.error';
import { UnauthorizedError } from '@/errors/unauthorized-error';

describe('Update Project', () => {
  let projectsRepository: InMemoryProjectsRepository;
  let updateProject: UpdateProject;

  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository();

    updateProject = new UpdateProject(projectsRepository);
  });

  it('should be defined', async () => {
    expect(updateProject).toBeDefined();
  });

  it('should throw if Project entity was not found', async () => {
    await expect(
      updateProject.execute({
        id: 'non-existing-id',
        userId: 'valid-id',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw if user is not the leader of the project', async () => {
    const project = makeProject();

    await projectsRepository.create(project);

    await expect(
      updateProject.execute({
        id: project.id,
        userId: 'invalid-id',
      }),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should be able to update a project', async () => {
    const projectInMemo = makeProject();

    await projectsRepository.create(projectInMemo);

    await expect(
      updateProject.execute({
        id: projectInMemo.id,
        userId: projectInMemo.leaderUserId,
        name: 'new name',
      }),
    ).resolves.toBeDefined();

    const { project } = await updateProject.execute({
      id: projectInMemo.id,
      userId: projectInMemo.leaderUserId,
      description: 'new description',
    });

    expect(project.name).toBe('new name');
    expect(project.description).toBe('new description');
  });
});

import { makeProject, makeRole, makeUser } from '@test/factories';
import {
  InMemoryProjectsRepository,
  InMemoryUsersRepository,
} from '@test/repositories';

import { DeleteProject } from './delete-project';

import { NotFoundError } from '@/errors/not-found.error';
import { UnauthorizedError } from '@/errors/unauthorized-error';

describe('Delete Invite', () => {
  let projectsRepository: InMemoryProjectsRepository;
  let usersRepository: InMemoryUsersRepository;
  let deleteProject: DeleteProject;

  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository();
    usersRepository = new InMemoryUsersRepository();

    deleteProject = new DeleteProject(projectsRepository, usersRepository);
  });

  it('should throw if project was not found', async () => {
    await expect(
      deleteProject.execute({
        id: 'non-existing-id',
        userId: 'user-id',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw if user was not found', async () => {
    const projectInMemo = makeProject();

    await projectsRepository.create(projectInMemo);

    await expect(
      deleteProject.execute({
        id: projectInMemo.id,
        userId: 'non-existing-user-id',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw if projects already has a review and user is not admin', async () => {
    const projectInMemo = makeProject({ reviewedAt: new Date() });

    await projectsRepository.create(projectInMemo);

    const user = makeUser();
    await usersRepository.create(user);

    await expect(
      deleteProject.execute({
        id: projectInMemo.id,
        userId: user.id,
      }),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should be able to delete a project if user is admin and project has a review', async () => {
    const projectInMemo = makeProject({ reviewedAt: new Date() });

    await projectsRepository.create(projectInMemo);

    const role = makeRole({ name: 'admin' });

    const user = makeUser({ roles: [role] });
    await usersRepository.create(user);

    await expect(
      deleteProject.execute({
        id: projectInMemo.id,
        userId: user.id,
      }),
    ).resolves.not.toThrow();

    expect(projectsRepository.findById(projectInMemo.id)).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should be able to delete a project if project has no review', async () => {
    const projectInMemo = makeProject();

    await projectsRepository.create(projectInMemo);

    const user = makeUser();
    await usersRepository.create(user);

    await expect(
      deleteProject.execute({
        id: projectInMemo.id,
        userId: user.id,
      }),
    ).resolves.not.toThrow();

    expect(projectsRepository.findById(projectInMemo.id)).rejects.toThrow(
      NotFoundError,
    );
  });
});

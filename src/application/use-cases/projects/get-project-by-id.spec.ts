import { makeProject, makeRole, makeUser } from '@test/factories';
import {
  InMemoryProjectsRepository,
  InMemoryUsersRepository,
} from '@test/repositories';

import { GetProjectById } from './get-project-by-id';

import { NotFoundError } from '@/errors/not-found.error';
import { UnauthorizedError } from '@/errors/unauthorized-error';

describe('Get Project By Id', () => {
  let projectsRepository: InMemoryProjectsRepository;
  let usersRepository: InMemoryUsersRepository;

  let getProjectById: GetProjectById;

  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository();
    usersRepository = new InMemoryUsersRepository();

    getProjectById = new GetProjectById(projectsRepository, usersRepository);
  });

  it('should throw an error if project does not exist', async () => {
    await expect(
      getProjectById.execute({ id: 'invalid-id', userId: 'valid-id' }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw an error project was not approved and user does not exist', async () => {
    const project = makeProject({ approved: false });
    await projectsRepository.create(project);

    await expect(
      getProjectById.execute({ id: project.id, userId: 'invalid-id' }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw if project was not approved and user is not the leader or admin', async () => {
    const project = makeProject({ approved: false });
    await projectsRepository.create(project);

    const user = makeUser();
    await usersRepository.create(user);

    await expect(
      getProjectById.execute({ id: project.id, userId: user.id }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('should be able to find a project if it was not approved and user is the leader', async () => {
    const projectInMemory = makeProject({ approved: false });
    await projectsRepository.create(projectInMemory);

    const user = makeUser({ id: projectInMemory.leaderUserId });
    await usersRepository.create(user);

    const { project } = await getProjectById.execute({
      id: projectInMemory.id,
      userId: user.id,
    });

    expect(project).toEqual(projectInMemory);
  });

  it('should be able to find a project if it was not approved and user is an admin', async () => {
    const projectInMemory = makeProject({ approved: false });
    await projectsRepository.create(projectInMemory);

    const role = makeRole({ name: 'admin' });

    const user = makeUser({ roles: [role] });
    await usersRepository.create(user);

    const { project } = await getProjectById.execute({
      id: projectInMemory.id,
      userId: user.id,
    });

    expect(project).toEqual(projectInMemory);
  });

  it('should be able to find a project that was approved', async () => {
    const projectInMemory = makeProject({ approved: true });
    await projectsRepository.create(projectInMemory);

    const { project } = await getProjectById.execute({
      id: projectInMemory.id,
      userId: 'any-id',
    });

    expect(project).toEqual(projectInMemory);
  });
});

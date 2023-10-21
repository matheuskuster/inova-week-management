import { makeInova, makeInvite, makeTheme } from '@test/factories';
import {
  InMemoryInovasRepository,
  InMemoryInvitesRepository,
  InMemoryProjectsRepository,
  InMemoryThemesRepository,
} from '@test/repositories';

import { CreateProject } from './create-project';

import { NotFoundError } from '@/errors/not-found.error';
import { UnauthorizedError } from '@/errors/unauthorized-error';

describe('Create Project', () => {
  let projectsRepository: InMemoryProjectsRepository;
  let inovasRepository: InMemoryInovasRepository;
  let themesRepository: InMemoryThemesRepository;
  let invitesRepository: InMemoryInvitesRepository;

  let createProject: CreateProject;

  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository();
    inovasRepository = new InMemoryInovasRepository();
    themesRepository = new InMemoryThemesRepository();
    invitesRepository = new InMemoryInvitesRepository();

    createProject = new CreateProject(
      projectsRepository,
      inovasRepository,
      themesRepository,
      invitesRepository,
    );
  });

  it('should be defined', async () => {
    expect(createProject).toBeDefined();
  });

  it('should throw if inova does not exist', async () => {
    await expect(
      createProject.execute({
        userId: 'user-id',
        name: 'mockName',
        description: 'mockDescription',
        themeId: 'theme-id',
        inovaId: 'inova-id',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw if theme does not exist', async () => {
    const inova = makeInova();
    await inovasRepository.create(inova);

    await expect(
      createProject.execute({
        userId: 'user-id',
        name: 'mockName',
        description: 'mockDescription',
        themeId: 'theme-id',
        inovaId: inova.id,
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw if theme does not belongs to inova', async () => {
    const inova = makeInova();
    await inovasRepository.create(inova);

    const theme = makeTheme();
    await themesRepository.create(theme);

    await expect(
      createProject.execute({
        userId: 'user-id',
        name: 'mockName',
        description: 'mockDescription',
        themeId: theme.id,
        inovaId: inova.id,
      }),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should throw if user was already invited to a project', async () => {
    const inova = makeInova();
    await inovasRepository.create(inova);

    const theme = makeTheme({ inovaId: inova.id });
    await themesRepository.create(theme);

    const invite = makeInvite({ userId: 'user-id', acceptedAt: new Date() });
    await invitesRepository.create(invite);

    await expect(
      createProject.execute({
        userId: invite.userId,
        name: 'mockName',
        description: 'mockDescription',
        themeId: theme.id,
        inovaId: inova.id,
      }),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should be able to create a project', async () => {
    const inova = makeInova();
    await inovasRepository.create(inova);

    const theme = makeTheme({ inovaId: inova.id });
    await themesRepository.create(theme);

    const project = await createProject.execute({
      userId: 'user-id',
      name: 'mockName',
      description: 'mockDescription',
      themeId: theme.id,
      inovaId: inova.id,
    });

    expect(project).toHaveProperty('project');
    expect(project.project).toHaveProperty('id');
    expect(project.project).toHaveProperty('name');
    expect(project.project).toHaveProperty('description');
    expect(project.project).toHaveProperty('approved');
    expect(project.project).toHaveProperty('leaderUserId');
    expect(project.project).toHaveProperty('themeId');
    expect(project.project).toHaveProperty('inovaId');
  });
});

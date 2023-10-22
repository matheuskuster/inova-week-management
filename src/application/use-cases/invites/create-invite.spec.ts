import {
  InMemoryInvitesRepository,
  InMemoryProjectsRepository,
  InMemoryUsersRepository,
} from '@test/repositories';

import { CreateInvite } from './create-invite';

import {
  InvitesRepository,
  ProjectsRepository,
  UsersRepository,
} from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

describe('Create Invite', () => {
  let invitesRepository: InvitesRepository;
  let projectsRepository: ProjectsRepository;
  let usersRepository: UsersRepository;

  let createInvite: CreateInvite;

  beforeEach(() => {
    invitesRepository = new InMemoryInvitesRepository();
    projectsRepository = new InMemoryProjectsRepository();
    usersRepository = new InMemoryUsersRepository();

    createInvite = new CreateInvite(
      invitesRepository,
      projectsRepository,
      usersRepository,
    );
  });

  it('should be defined', async () => {
    expect(createInvite).toBeDefined();
  });

  it('should throw if project not found', async () => {
    await expect(
      createInvite.execute({
        userId: 'any_user_id',
        registration: 'any_registration',
        projectId: 'any_project_id',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it.todo('should throw if user is not the leader of the project');

  it.todo('should throw if user not found');

  it.todo('should be able to create a new invite');
});

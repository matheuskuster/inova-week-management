import { makeProject } from '@test/factories';
import { makeInvite } from '@test/factories/invite.factory';
import {
  InMemoryProjectsRepository,
  InMemoryInvitesRepository,
} from '@test/repositories';

import { DeleteInvite } from './delete-invite';

import { NotFoundError } from '@/errors/not-found.error';
import { UnauthorizedError } from '@/errors/unauthorized-error';

describe('Delete Invite', () => {
  let invitesRepository: InMemoryInvitesRepository;
  let deleteInvite: DeleteInvite;
  let projectsRepository: InMemoryProjectsRepository;

  beforeEach(() => {
    invitesRepository = new InMemoryInvitesRepository();
    projectsRepository = new InMemoryProjectsRepository();
    deleteInvite = new DeleteInvite(invitesRepository, projectsRepository);
  });

  it('should throw if invite not found', async () => {
    await expect(
      deleteInvite.execute({ id: '1', userId: '1' }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw if invite does not belong to the leader', async () => {
    const project = makeProject({ leaderUserId: '321' });
    const invite = makeInvite({
      userId: 'any-id',
      projectId: project.id,
    });

    await projectsRepository.create(project);
    await invitesRepository.create(invite);

    await expect(
      deleteInvite.execute({ id: invite.id, userId: '123' }),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should delete given invite', async () => {
    const project = makeProject();
    const invite = makeInvite({
      userId: project.leaderUserId,
      projectId: project.id,
    });

    await projectsRepository.create(project);
    await invitesRepository.create(invite);

    await deleteInvite.execute({ id: invite.id, userId: project.leaderUserId });

    const invites = await invitesRepository.findAll();
    expect(invites).toEqual([]);
  });
});

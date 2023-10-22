import { makeProject } from '@test/factories';
import { InMemoryProjectsRepository } from '@test/repositories';

import { ApprovalProject } from './approval-project';

import { InvalidRequestError } from '@/errors/invalid-request.error';
import { NotFoundError } from '@/errors/not-found.error';

describe('Approval Project', () => {
  let projectsRepository: InMemoryProjectsRepository;
  let approvalProject: ApprovalProject;

  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository();

    approvalProject = new ApprovalProject(projectsRepository);
  });

  it('should be defined', async () => {
    expect(approvalProject).toBeDefined();
  });

  it('should throw if Project entity was not found', async () => {
    await expect(
      approvalProject.execute({
        id: 'non-existing-id',
        approved: true,
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw if Project entity has the same approval status', async () => {
    const projectInMemo = makeProject();

    await projectsRepository.create(projectInMemo);

    await expect(
      approvalProject.execute({
        id: projectInMemo.id,
        approved: projectInMemo.approved,
      }),
    ).rejects.toThrow(InvalidRequestError);
  });

  it('should be able to approve a Project entity', async () => {
    const projectInMemo = makeProject();

    await projectsRepository.create(projectInMemo);

    const { project } = await approvalProject.execute({
      id: projectInMemo.id,
      approved: true,
    });

    expect(project.approved).toBe(true);
    expect(project.reviewedAt).toBeDefined();
  });
});

import { makeProject } from '@test/factories';
import { InMemoryProjectsRepository } from '@test/repositories';

import { UpdateProjectPresentation } from './update-project-presentation';

import { InvalidRequestError } from '@/errors/invalid-request.error';
import { NotFoundError } from '@/errors/not-found.error';

describe('Update Project Presentation', () => {
  let projectsRepository: InMemoryProjectsRepository;
  let updateProjectPresentation: UpdateProjectPresentation;

  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository();

    updateProjectPresentation = new UpdateProjectPresentation(
      projectsRepository,
    );
  });

  it('should be defined', async () => {
    expect(updateProjectPresentation).toBeDefined();
  });

  it('should throw if Project entity was not found', async () => {
    await expect(
      updateProjectPresentation.execute({
        id: 'non-existing-id',
        stand: 1,
        date: '2021-01-01',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw if Project entity was not approved', async () => {
    const projectInMemo = makeProject({ approved: false });

    await projectsRepository.create(projectInMemo);

    await expect(
      updateProjectPresentation.execute({
        id: projectInMemo.id,
        stand: 1,
        date: '2021-01-01',
      }),
    ).rejects.toThrow(InvalidRequestError);
  });

  it('should be able to set a project presentation and stand', async () => {
    const projectInMemo = makeProject({ approved: true });

    await projectsRepository.create(projectInMemo);

    const { project } = await updateProjectPresentation.execute({
      id: projectInMemo.id,
      stand: 1,
      date: '2021-01-01',
    });

    expect(project.stand).toEqual(1);
    expect(project.presentationDay).toEqual(new Date('2021-01-01'));
  });
});

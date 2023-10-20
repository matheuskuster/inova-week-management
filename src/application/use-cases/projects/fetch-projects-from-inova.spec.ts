import { makeProject } from '@test/factories';
import { makeInova } from '@test/factories/inova.factory';
import {
  InMemoryInovasRepository,
  InMemoryProjectsRepository,
} from '@test/repositories';

import { FetchProjectsFromInova } from './fetch-projects-from-inova';

import { NotFoundError } from '@/errors/not-found.error';

describe('Fetch Projects from Inova', () => {
  let projectsRepository: InMemoryProjectsRepository;
  let inovasRepository: InMemoryInovasRepository;
  let fetchProjectsFromInova: FetchProjectsFromInova;

  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository();
    inovasRepository = new InMemoryInovasRepository();

    fetchProjectsFromInova = new FetchProjectsFromInova(
      projectsRepository,
      inovasRepository,
    );
  });

  it('should be defined', async () => {
    expect(fetchProjectsFromInova).toBeDefined();
  });

  it('should throw if inova was not found', async () => {
    const inovaId = 'inova-id';

    await expect(
      fetchProjectsFromInova.execute({ inovaId }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should be able to return all projects approveds from an inova', async () => {
    const inovaInMemory = makeInova();
    const projectsInMemory = [
      makeProject({ inovaId: inovaInMemory.id, approved: true }),
      makeProject({ inovaId: inovaInMemory.id, approved: true }),
      makeProject({ inovaId: inovaInMemory.id, approved: false }),
    ];

    await inovasRepository.create(inovaInMemory);
    await projectsRepository.create(projectsInMemory[0]);
    await projectsRepository.create(projectsInMemory[1]);
    await projectsRepository.create(projectsInMemory[2]);

    const { projects } = await fetchProjectsFromInova.execute({
      inovaId: inovaInMemory.id,
    });

    expect(projects).toHaveLength(2);
    expect(projects[0].id).toBe(projectsInMemory[0].id);
    expect(projects[0].name).toBe(projectsInMemory[0].name);
    expect(projects[0].inovaId).toBe(inovaInMemory.id);
    expect(projects[1].id).toBe(projectsInMemory[1].id);
    expect(projects[1].name).toBe(projectsInMemory[1].name);
    expect(projects[1].inovaId).toBe(inovaInMemory.id);
  });
});

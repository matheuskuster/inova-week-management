import { makeInova } from '@test/factories/inova.factory';
import { InMemoryInovasRepository } from '@test/repositories';

import { UpdateInova } from './update-inova';

import { NotFoundError } from '@/errors/not-found.error';

describe('Update Inova', () => {
  let inovasRepository: InMemoryInovasRepository;
  let updateInova: UpdateInova;

  beforeEach(() => {
    inovasRepository = new InMemoryInovasRepository();

    updateInova = new UpdateInova(inovasRepository);
  });

  it('should be defined', async () => {
    expect(updateInova).toBeDefined();
  });

  it('should throw if Inova entity was not found', async () => {
    await expect(
      updateInova.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should be able to update any Inova properties', async () => {
    const inovaInMemory = makeInova();
    await inovasRepository.create(inovaInMemory);

    const inovaRequest = makeInova({
      name: 'InovaWeek 2333',
      description: 'InovaWeek 2333 Description',
      from: new Date('2077-11-12'),
      to: new Date('2077-11-15'),
      year: 2077,
    });

    const { inova: updatedInova } = await updateInova.execute({
      id: inovaInMemory.id,
      name: inovaRequest.name,
      description: inovaRequest.description ?? undefined,
      from: inovaRequest.from.toISOString(),
      to: inovaRequest.to.toISOString(),
      year: inovaRequest.year,
    });

    expect(updatedInova).toBeDefined();
    expect(updatedInova.id).toBe(inovaInMemory.id);
    expect(updatedInova.name).toBe(inovaRequest.name);
    expect(updatedInova.description).toBe(inovaRequest.description);
    expect(updatedInova.from).toEqual(inovaRequest.from);
    expect(updatedInova.to).toEqual(inovaRequest.to);
    expect(updatedInova.year).toBe(inovaRequest.year);
  });
});

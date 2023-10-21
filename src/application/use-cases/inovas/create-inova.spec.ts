import { makeInova } from '@test/factories/inova.factory';
import { InMemoryInovasRepository } from '@test/repositories';

import { CreateInova } from './create-inova';

describe('Create Inova', () => {
  let inovasRepository: InMemoryInovasRepository;
  let createInova: CreateInova;

  beforeEach(() => {
    inovasRepository = new InMemoryInovasRepository();

    createInova = new CreateInova(inovasRepository);
  });

  it('should be defined', async () => {
    expect(createInova).toBeDefined();
  });

  it('should be able to create a new Inova entity', async () => {
    const inovaRequest = makeInova();

    const { inova } = await createInova.execute({
      name: inovaRequest.name,
      description: inovaRequest.description ?? undefined,
      from: inovaRequest.from.toISOString(),
      to: inovaRequest.to.toISOString(),
      year: inovaRequest.year,
    });

    expect(inova).toBeDefined();
    expect(inova.name).toBe(inovaRequest.name);
    expect(inova.description).toBe(inovaRequest.description);
    expect(inova.from).toEqual(inovaRequest.from);
    expect(inova.to).toEqual(inovaRequest.to);
    expect(inova.year).toBe(inovaRequest.year);
  });
});

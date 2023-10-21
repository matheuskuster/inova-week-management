import { makeInova } from '@test/factories/inova.factory';
import { InMemoryInovasRepository } from '@test/repositories';

import { GetInovaById } from './get-inova-by-id';

import { NotFoundError } from '@/errors/not-found.error';

describe('Get Inova By Id', () => {
  let inovasRepository: InMemoryInovasRepository;
  let getInovaById: GetInovaById;

  beforeEach(() => {
    inovasRepository = new InMemoryInovasRepository();

    getInovaById = new GetInovaById(inovasRepository);
  });

  it('should be defined', async () => {
    expect(getInovaById).toBeDefined();
  });

  it('should throw if Inova entity was not found', async () => {
    const inova = makeInova();

    await expect(getInovaById.execute({ id: inova.id })).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should be able to find a Inova entity', async () => {
    const inova = makeInova();

    await inovasRepository.create(inova);

    const { inova: foundInova } = await getInovaById.execute({ id: inova.id });

    expect(foundInova).toBeDefined();
    expect(foundInova.id).toBe(inova.id);
    expect(foundInova.name).toBe(inova.name);
    expect(foundInova.description).toBe(inova.description);
    expect(foundInova.from).toEqual(inova.from);
    expect(foundInova.to).toEqual(inova.to);
    expect(foundInova.year).toBe(inova.year);
  });
});

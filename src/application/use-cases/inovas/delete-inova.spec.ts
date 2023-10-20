import { makeInova } from '@test/factories/inova.factory';
import { InMemoryInovasRepository } from '@test/repositories';

import { DeleteInova } from './delete-inova';

import { NotFoundError } from '@/errors/not-found.error';

describe('Delete Inova', () => {
  let inovasRepository: InMemoryInovasRepository;
  let deleteInova: DeleteInova;

  beforeEach(() => {
    inovasRepository = new InMemoryInovasRepository();

    deleteInova = new DeleteInova(inovasRepository);
  });

  it('should be defined', async () => {
    expect(deleteInova).toBeDefined();
  });

  it('should throw if Inova entity was not found', async () => {
    const inova = makeInova();

    await expect(deleteInova.execute({ id: inova.id })).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should be able to delete a Inova entity', async () => {
    const inova = makeInova();

    await inovasRepository.create(inova);

    await deleteInova.execute({ id: inova.id });

    await expect(inovasRepository.findById(inova.id)).rejects.toThrow(
      NotFoundError,
    );
  });
});

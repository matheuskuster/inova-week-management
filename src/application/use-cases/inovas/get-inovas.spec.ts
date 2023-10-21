import { makeInova } from '@test/factories/inova.factory';
import { InMemoryInovasRepository } from '@test/repositories';

import { GetInovas } from './get-inovas';

import { NotFoundError } from '@/errors/not-found.error';

describe('Get Inovas', () => {
  let inovasRepository: InMemoryInovasRepository;
  let getInovas: GetInovas;

  beforeEach(() => {
    inovasRepository = new InMemoryInovasRepository();

    getInovas = new GetInovas(inovasRepository);
  });

  it('should be defined', async () => {
    expect(GetInovas).toBeDefined();
  });

  it('should throw if no Inovas were found', async () => {
    await expect(getInovas.execute()).rejects.toThrow(NotFoundError);
  });

  it('should be able to get all Inovas', async () => {
    const inovaInMemory = [
      makeInova({ name: 'mockName1' }),
      makeInova({ name: 'mockName2' }),
    ];

    await inovasRepository.create(inovaInMemory[0]);
    await inovasRepository.create(inovaInMemory[1]);

    const { inovas } = await getInovas.execute();

    expect(inovas).toBeDefined();
    expect(inovas).toHaveLength(2);
    expect(inovas[0]).toEqual(inovaInMemory[0]);
    expect(inovas[1]).toEqual(inovaInMemory[1]);
  });
});

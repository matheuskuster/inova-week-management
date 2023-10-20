import { makeInova } from '@test/factories/inova.factory';
import { makeTheme } from '@test/factories/theme.factory';
import { InMemoryInovasRepository } from '@test/repositories';
import { InMemoryThemesRepository } from '@test/repositories/in-memory.themes.repository';

import { FetchThemesFromInova } from './fetch-themes-from-inova';

import { NotFoundError } from '@/errors/not-found.error';

describe('Fetch Themes from Inova', () => {
  let themesRepository: InMemoryThemesRepository;
  let inovasRepository: InMemoryInovasRepository;
  let fetchThemesFromInova: FetchThemesFromInova;

  beforeEach(() => {
    themesRepository = new InMemoryThemesRepository();
    inovasRepository = new InMemoryInovasRepository();

    fetchThemesFromInova = new FetchThemesFromInova(
      themesRepository,
      inovasRepository,
    );
  });

  it('should be defined', async () => {
    expect(fetchThemesFromInova).toBeDefined();
  });

  it('should throw if inova was not found', async () => {
    const inovaId = 'inova-id';

    await expect(
      fetchThemesFromInova.execute({ inovaId }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw if no themes were found', async () => {
    const inovaInMemory = makeInova();

    await inovasRepository.create(inovaInMemory);

    await expect(
      fetchThemesFromInova.execute({ inovaId: inovaInMemory.id }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should be able to return all themes from an inova', async () => {
    const inovaInMemory = makeInova();
    const themesInMemory = [
      makeTheme({ inovaId: inovaInMemory.id, name: 'mockName1' }),
      makeTheme({ inovaId: inovaInMemory.id, name: 'mockName2' }),
    ];

    await inovasRepository.create(inovaInMemory);
    await themesRepository.create(themesInMemory[0]);
    await themesRepository.create(themesInMemory[1]);

    const { themes } = await fetchThemesFromInova.execute({
      inovaId: inovaInMemory.id,
    });

    expect(themes).toHaveLength(2);
    expect(themes[0].id).toBe(themesInMemory[0].id);
    expect(themes[0].name).toBe(themesInMemory[0].name);
    expect(themes[0].inovaId).toBe(inovaInMemory.id);
    expect(themes[1].id).toBe(themesInMemory[1].id);
    expect(themes[1].name).toBe(themesInMemory[1].name);
    expect(themes[1].inovaId).toBe(inovaInMemory.id);
  });
});

import { makeInova } from '@test/factories/inova.factory';
import {
  InMemoryInovasRepository,
  InMemoryThemesRepository,
} from '@test/repositories';

import { CreateTheme } from './create-theme';

import { NotFoundError } from '@/errors/not-found.error';

describe('Create Theme', () => {
  let themesRepository: InMemoryThemesRepository;
  let inovasRepository: InMemoryInovasRepository;
  let createTheme: CreateTheme;

  beforeEach(() => {
    themesRepository = new InMemoryThemesRepository();
    inovasRepository = new InMemoryInovasRepository();

    createTheme = new CreateTheme(themesRepository, inovasRepository);
  });

  it('should be defined', async () => {
    expect(createTheme).toBeDefined();
  });

  it('should throw if inova does not exist', async () => {
    await expect(
      createTheme.execute({
        inovaId: 'inova-id',
        name: 'any_name',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should be able to create a new Theme', async () => {
    const inova = makeInova();
    await inovasRepository.create(inova);

    const { theme } = await createTheme.execute({
      inovaId: inova.id,
      name: 'any_name',
    });

    expect(theme).toBeDefined();
    expect(theme.name).toBe('any_name');
    expect(theme.inovaId).toBe(inova.id);
  });
});

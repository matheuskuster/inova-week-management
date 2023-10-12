import { makeTheme } from '@test/factories/theme.factory';
import { InMemoryThemesRepository } from '@test/repositories/in-memory.themes.repository';

import { GetThemeById } from './get-theme-by-id';

import { NotFoundError } from '@/errors/not-found.error';

describe('Get Theme By Id', () => {
  let themesRepository: InMemoryThemesRepository;
  let getThemeById: GetThemeById;

  beforeEach(() => {
    themesRepository = new InMemoryThemesRepository();
    getThemeById = new GetThemeById(themesRepository);
  });

  it('should throw an error if theme does not exist', async () => {
    await expect(getThemeById.execute({ id: 'invalid-id' })).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should return the theme if it exists', async () => {
    const theme = makeTheme();
    await themesRepository.create(theme);

    const response = await getThemeById.execute({ id: theme.id });
    expect(response.theme.id).toBe(theme.id);
  });
});

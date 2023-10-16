import { makeTheme } from '@test/factories';
import { InMemoryThemesRepository } from '@test/repositories/in-memory.themes.repository';

import { DeleteTheme } from './delete-theme';

import { NotFoundError } from '@/errors/not-found.error';

describe('Delete Theme', () => {
  let themesRepository: InMemoryThemesRepository;
  let deleteTheme: DeleteTheme;

  beforeEach(() => {
    themesRepository = new InMemoryThemesRepository();
    deleteTheme = new DeleteTheme(themesRepository);
  });

  it('should throw if theme not found', async () => {
    await expect(deleteTheme.execute({ id: '1' })).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should delete given theme', async () => {
    const theme = makeTheme();
    await themesRepository.create(theme);

    expect(await themesRepository.findById(theme.id)).toEqual(theme);

    await deleteTheme.execute({ id: theme.id });

    const themes = await themesRepository.findAll();
    expect(themes).toEqual([]);
  });
});

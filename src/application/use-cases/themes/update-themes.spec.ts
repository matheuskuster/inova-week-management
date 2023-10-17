import { makeTheme } from '@test/factories';
import { InMemoryThemesRepository } from '@test/repositories/in-memory.themes.repository';

import { UpdateTheme } from './update-themes';

import { NotFoundError } from '@/errors/not-found.error';

describe('Update theme', () => {
  let themesRepository: InMemoryThemesRepository;
  let updateTheme: UpdateTheme;

  beforeEach(() => {
    themesRepository = new InMemoryThemesRepository();
    updateTheme = new UpdateTheme(themesRepository);
  });

  it('should throw if theme does not exist', async () => {
    await expect(
      updateTheme.execute({
        id: '1',
        name: 'INOVA 2023',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should update theme', async () => {
    const theme = makeTheme();
    await themesRepository.create(theme);

    await updateTheme.execute({
      id: theme.id,
      name: 'new name',
    });
  });
});

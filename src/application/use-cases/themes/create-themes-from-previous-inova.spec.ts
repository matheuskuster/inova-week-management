import { makeTheme } from '@test/factories';
import { makeInova } from '@test/factories/inova.factory';
import {
  InMemoryInovasRepository,
  InMemoryThemesRepository,
} from '@test/repositories';

import { CreateThemesFromPreviousInova } from './create-themes-from-previous-inova';

import { InvalidCredentialsError } from '@/errors/invalid-credentials.error';
import { NotFoundError } from '@/errors/not-found.error';

describe('Create Theme', () => {
  let themesRepository: InMemoryThemesRepository;
  let inovasRepository: InMemoryInovasRepository;
  let createThemesFromPreviousInova: CreateThemesFromPreviousInova;

  beforeEach(() => {
    themesRepository = new InMemoryThemesRepository();
    inovasRepository = new InMemoryInovasRepository();

    createThemesFromPreviousInova = new CreateThemesFromPreviousInova(
      themesRepository,
      inovasRepository,
    );
  });

  it('should be defined', async () => {
    expect(createThemesFromPreviousInova).toBeDefined();
  });

  it('should throw if inova does not exist', async () => {
    await expect(
      createThemesFromPreviousInova.execute({
        inovaId: 'inova-id',
        previousInovaId: 'previous-inova-id',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw if inova id is the same as previous inova id', async () => {
    const inova = makeInova();
    await inovasRepository.create(inova);

    await expect(
      createThemesFromPreviousInova.execute({
        inovaId: inova.id,
        previousInovaId: inova.id,
      }),
    ).rejects.toThrow(InvalidCredentialsError);
  });

  it('should throw if previous inova does not exist', async () => {
    const inova = makeInova();
    await inovasRepository.create(inova);

    await expect(
      createThemesFromPreviousInova.execute({
        inovaId: inova.id,
        previousInovaId: 'previous-inova-id',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw if previous inova has no themes', async () => {
    const inova = makeInova();
    await inovasRepository.create(inova);

    const previousInova = makeInova();
    await inovasRepository.create(previousInova);

    await expect(
      createThemesFromPreviousInova.execute({
        inovaId: inova.id,
        previousInovaId: previousInova.id,
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should be able to create new themes from previous inova', async () => {
    const inova = makeInova();
    await inovasRepository.create(inova);

    const previousInova = makeInova();
    await inovasRepository.create(previousInova);

    const themesInMemory = [
      makeTheme({ inovaId: previousInova.id }),
      makeTheme({ inovaId: previousInova.id }),
    ];

    await themesRepository.create(themesInMemory[0]);
    await themesRepository.create(themesInMemory[1]);

    const { themes } = await createThemesFromPreviousInova.execute({
      inovaId: inova.id,
      previousInovaId: previousInova.id,
    });

    expect(themes.length).toBe(themesInMemory.length);
  });
});

import { Injectable } from '@nestjs/common';

import { Theme } from '@/application/entities';
import { ThemesRepository, InovasRepository } from '@/application/repositories';
import { InvalidCredentialsError } from '@/errors/invalid-credentials.error';
import { NotFoundError } from '@/errors/not-found.error';

interface CreateThemesFromPreviousInovaRequest {
  inovaId: string;
  previousInovaId: string;
}

interface CreateThemesFromPreviousInovaResponse {
  themes: Theme[];
}

@Injectable()
export class CreateThemesFromPreviousInova {
  constructor(
    private readonly themesRepository: ThemesRepository,
    private readonly inovasRepository: InovasRepository,
  ) {}

  public async execute(
    request: CreateThemesFromPreviousInovaRequest,
  ): Promise<CreateThemesFromPreviousInovaResponse> {
    const inova = await this.inovasRepository.findById(request.inovaId);

    if (!inova) {
      throw new NotFoundError(
        `Inova with id [${request.inovaId}] was not found`,
      );
    }

    if (request.inovaId === request.previousInovaId) {
      throw new InvalidCredentialsError(
        `Inova with id [${request.inovaId}] is the same as previous inova id [${request.previousInovaId}]`,
      );
    }

    const previousInova = await this.inovasRepository.findById(
      request.previousInovaId,
    );

    if (!previousInova) {
      throw new NotFoundError(
        `Previous Inova with id [${request.previousInovaId}] was not found`,
      );
    }

    const previousThemes = await this.themesRepository.findManyByInovaId(
      previousInova.id,
    );

    if (previousThemes.length === 0) {
      throw new NotFoundError(
        `Themes from previous Inova with id [${request.previousInovaId}] were not found`,
      );
    }

    previousThemes.map(async (theme) => {
      const newTheme = new Theme({
        name: theme.name,
        inovaId: request.inovaId,
      });

      await this.themesRepository.create(newTheme);
    });

    return { themes: previousThemes };
  }
}

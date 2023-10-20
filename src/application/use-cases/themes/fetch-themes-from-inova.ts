import { Injectable } from '@nestjs/common';

import { Theme } from '@/application/entities';
import { InovasRepository, ThemesRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface FetchThemesFromInovaRequest {
  inovaId: string;
}

interface FetchThemesFromInovaResponse {
  themes: Theme[];
}

@Injectable()
export class FetchThemesFromInova {
  constructor(
    private readonly themesRepository: ThemesRepository,
    private readonly inovasRepository: InovasRepository,
  ) {}

  async execute(
    request: FetchThemesFromInovaRequest,
  ): Promise<FetchThemesFromInovaResponse> {
    const foundInova = await this.inovasRepository.findById(request.inovaId);

    if (!foundInova) {
      throw new NotFoundError(
        `Inova with id [${request.inovaId}] was not found`,
      );
    }

    const themes = await this.themesRepository.findManyByInovaId(
      request.inovaId,
    );

    if (themes.length === 0) {
      throw new NotFoundError(
        `No themes from inova [${request.inovaId}] were found`,
      );
    }

    return {
      themes,
    };
  }
}

import { Injectable } from '@nestjs/common';

import { Theme } from '@/application/entities';
import { ThemesRepository, InovasRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface CreateThemeRequest {
  inovaId: string;
  name: string;
  description?: string;
}

interface CreateThemeResponse {
  theme: Theme;
}

@Injectable()
export class CreateTheme {
  constructor(
    private readonly themesRepository: ThemesRepository,
    private readonly inovasRepository: InovasRepository,
  ) {}

  public async execute(
    request: CreateThemeRequest,
  ): Promise<CreateThemeResponse> {
    const inova = await this.inovasRepository.findById(request.inovaId);

    if (!inova) {
      throw new NotFoundError(
        `Inova with id [${request.inovaId}] was not found`,
      );
    }

    const theme = new Theme({
      name: request.name,
      description: request.description,
      inovaId: request.inovaId,
    });

    await this.themesRepository.create(theme);

    return {
      theme,
    };
  }
}

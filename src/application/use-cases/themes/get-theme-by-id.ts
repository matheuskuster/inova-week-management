import { Injectable } from '@nestjs/common';

import { ThemesRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface GetThemeByIdRequest {
  id: string;
}

@Injectable()
export class GetThemeById {
  constructor(private readonly themesRepository: ThemesRepository) {}

  async execute(request: GetThemeByIdRequest) {
    const foundTheme = await this.themesRepository.findById(request.id);

    if (!foundTheme) {
      throw new NotFoundError(`Theme with id ${request.id} not found`);
    }

    return {
      theme: foundTheme,
    };
  }
}

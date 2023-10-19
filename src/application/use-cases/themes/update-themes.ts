import { ThemesRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface UpdateThemeRequest {
  id: string;
  name: string;
  description?: string;
  inovaId?: string;
}

export class UpdateTheme {
  constructor(private readonly themesRepository: ThemesRepository) {}

  async execute({ id, ...request }: UpdateThemeRequest) {
    const theme = await this.themesRepository.findById(id);

    if (!theme) {
      throw new NotFoundError(`Theme with id ${id} not found`);
    }

    theme.update({
      name: request.name,
      description: request.description,
      inovaId: request.inovaId,
    });

    await this.themesRepository.save(theme);

    return {
      theme,
    };
  }
}

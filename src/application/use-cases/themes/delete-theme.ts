import { ThemesRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface DeleteThemeRequest {
  id: string;
}

export class DeleteTheme {
  constructor(private readonly themeRepository: ThemesRepository) { }

  async execute({ id }: DeleteThemeRequest) {
    const theme = await this.themeRepository.findById(id);

    if (!theme) {
      throw new NotFoundError(`Theme with id ${id} not found`);
    }

    await this.themeRepository.delete(id);
  }
}

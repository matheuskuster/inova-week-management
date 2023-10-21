import { ThemesRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface DeleteThemeRequest {
  id: string;
}

export class DeleteTheme {
  constructor(private readonly themesRepository: ThemesRepository) {}

  async execute({ id }: DeleteThemeRequest) {
    const theme = await this.themesRepository.findById(id);

    if (!theme) {
      throw new NotFoundError(`Theme with id ${id} not found`);
    }

    await this.themesRepository.delete(id);
  }
}

import { Theme } from '@/application/entities';

export class ThemeViewModel {
  public static toHTTP(theme: Theme) {
    return {
      id: theme.id,
      name: theme.name,
      description: theme.description,
    };
  }
}

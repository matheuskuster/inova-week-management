import { Injectable } from '@nestjs/common';

import { PrismaThemeMapper } from '../mappers/prisma.theme.mapper';
import { PrismaService } from '../prisma.service';

import { Theme } from '@/application/entities';
import { ThemesRepository } from '@/application/repositories';

@Injectable()
export class PrismaThemesRepository implements ThemesRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(theme: Theme): Promise<void> {
    const raw = PrismaThemeMapper.toPrisma(theme);
    await this.prisma.theme.create({ data: raw });
  }

  public async save(theme: Theme): Promise<void> {
    const raw = PrismaThemeMapper.toPrisma(theme);
    await this.prisma.theme.upsert({
      where: { id: theme.id },
      create: raw,
      update: raw,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.theme.delete({ where: { id } });
  }

  public async findById(id: string): Promise<Theme | null> {
    const theme = await this.prisma.theme.findUnique({
      where: { id },
    });

    if (!theme) {
      return null;
    }

    return PrismaThemeMapper.toDomain(theme);
  }

  public async findAll(): Promise<Theme[]> {
    const themes = await this.prisma.theme.findMany();
    return themes.map((theme) => PrismaThemeMapper.toDomain(theme));
  }

  public async findManyByInovaId(inovaId: string): Promise<Theme[]> {
    const themes = this.prisma.theme.findMany({
      where: {
        inovaId,
      },
    });

    return themes.then((themes) => themes.map(PrismaThemeMapper.toDomain));
  }
}

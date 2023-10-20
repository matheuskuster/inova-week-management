import { Injectable } from '@nestjs/common';

import { PrismaReviewCriteriaMapper } from '../mappers/prisma.review-criteria.mapper';
import { PrismaService } from '../prisma.service';

import { ReviewCriteria } from '@/application/entities';
import { ReviewsCriteriasRepository } from '@/application/repositories';

@Injectable()
export class PrismaReviewCriteriasRepository
  implements ReviewsCriteriasRepository
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(criteria: ReviewCriteria): Promise<void> {
    const raw = PrismaReviewCriteriaMapper.toPrisma(criteria);
    await this.prisma.reviewCriteria.create({ data: raw });
  }

  public async save(criteria: ReviewCriteria): Promise<void> {
    const raw = PrismaReviewCriteriaMapper.toPrisma(criteria);
    await this.prisma.reviewCriteria.upsert({
      where: { id: criteria.id },
      create: raw,
      update: raw,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.reviewCriteria.delete({ where: { id } });
  }

  public async findById(id: string): Promise<ReviewCriteria | null> {
    const theme = await this.prisma.reviewCriteria.findUnique({
      where: { id },
    });

    if (!theme) {
      return null;
    }

    return PrismaReviewCriteriaMapper.toDomain(theme);
  }

  public async findAll(): Promise<ReviewCriteria[]> {
    const themes = await this.prisma.reviewCriteria.findMany();
    return themes.map((theme) => PrismaReviewCriteriaMapper.toDomain(theme));
  }
}

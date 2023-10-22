import { Injectable } from '@nestjs/common';

import { PrismaReviewMapper } from '../mappers/prisma.review.mapper';
import { PrismaService } from '../prisma.service';

import { Review } from '@/application/entities';
import { ReviewsRepository } from '@/application/repositories';

@Injectable()
export class PrismaReviewsRepository implements ReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(criteria: Review): Promise<void> {
    const raw = PrismaReviewMapper.toPrisma(criteria);
    await this.prisma.review.create({ data: raw });
  }

  public async save(criteria: Review): Promise<void> {
    const raw = PrismaReviewMapper.toPrisma(criteria);
    await this.prisma.review.upsert({
      where: { id: criteria.id },
      create: raw,
      update: raw,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.review.delete({ where: { id } });
  }

  public async findById(id: string): Promise<Review | null> {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return null;
    }

    return PrismaReviewMapper.toDomain(review);
  }

  public async findAll(): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany();
    return reviews.map((review) => PrismaReviewMapper.toDomain(review));
  }
}

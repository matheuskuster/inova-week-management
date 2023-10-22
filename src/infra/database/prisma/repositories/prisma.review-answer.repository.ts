import { Injectable } from '@nestjs/common';

import { PrismaReviewAnswerMapper } from '../mappers/prisma.review-answer.mapper';
import { PrismaService } from '../prisma.service';

import { ReviewAnswer } from '@/application/entities';
import { ReviewAnswersRepository } from '@/application/repositories';

@Injectable()
export class PrismaReviewAnswerRepository implements ReviewAnswersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(reviewAnswer: ReviewAnswer): Promise<void> {
    const raw = PrismaReviewAnswerMapper.toPrisma(reviewAnswer);
    await this.prisma.reviewAnswer.create({ data: raw });
  }

  public async save(reviewAnswer: ReviewAnswer): Promise<void> {
    const raw = PrismaReviewAnswerMapper.toPrisma(reviewAnswer);
    await this.prisma.reviewAnswer.upsert({
      where: { id: reviewAnswer.id },
      create: raw,
      update: raw,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.reviewAnswer.delete({ where: { id } });
  }

  public async findById(id: string): Promise<ReviewAnswer | null> {
    const review = await this.prisma.reviewAnswer.findUnique({
      where: { id },
    });

    if (!review) {
      return null;
    }

    return PrismaReviewAnswerMapper.toDomain(review);
  }

  public async findAll(): Promise<ReviewAnswer[]> {
    const reviewAnswers = await this.prisma.reviewAnswer.findMany();
    return reviewAnswers.map((reviewAnswer) =>
      PrismaReviewAnswerMapper.toDomain(reviewAnswer),
    );
  }
}

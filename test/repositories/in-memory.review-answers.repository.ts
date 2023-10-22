import { ReviewAnswer } from '@/application/entities';
import { ReviewAnswersRepository } from '@/application/repositories';
import { InMemoryRepository } from '@/types/repositories/in-memory.repository';

export class InMemoryReviewAnswersRepository
  extends InMemoryRepository<ReviewAnswer>
  implements ReviewAnswersRepository
{
  public get reviewAnswer(): ReviewAnswer[] {
    return this.entities;
  }
}

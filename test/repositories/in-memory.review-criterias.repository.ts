import { ReviewCriteria } from '@/application/entities';
import { ReviewsCriteriasRepository } from '@/application/repositories';
import { InMemoryRepository } from '@/types/repositories/in-memory.repository';

export class InMemoryReviewCriteriasRepository
  extends InMemoryRepository<ReviewCriteria>
  implements ReviewsCriteriasRepository
{
  public get themes(): ReviewCriteria[] {
    return this.entities;
  }
}

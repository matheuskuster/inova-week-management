import { ReviewCriteria } from '@/application/entities';
import { ReviewsCriteriasRepository } from '@/application/repositories';
import { InMemoryRepository } from '@/types/repositories/in-memory.repository';

export class InMemoryReviewCriteriasRepository
  extends InMemoryRepository<ReviewCriteria>
  implements ReviewsCriteriasRepository
{
  public get reviewCriteria(): ReviewCriteria[] {
    return this.entities;
  }

  public async findManyByInovaId(inovaId: string): Promise<ReviewCriteria[]> {
    return this.entities.filter(
      (reviewCriteria) => reviewCriteria.inovaId === inovaId,
    );
  }
}

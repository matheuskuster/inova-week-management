import { ReviewAnswer } from '@/application/entities';
import { RepositoryInterface } from '@/types/repositories/repository-contracts';

export abstract class ReviewAnswersRepository
  implements RepositoryInterface<ReviewAnswer>
{
  public abstract create(entity: ReviewAnswer): Promise<void>;
  public abstract save(entity: ReviewAnswer): Promise<void>;
  public abstract delete(id: string): Promise<void>;
  public abstract findById(id: string): Promise<ReviewAnswer | null>;
  public abstract findAll(): Promise<ReviewAnswer[]>;
}

import { Review } from '@/application/entities';
import { RepositoryInterface } from '@/types/repositories/repository-contracts';

export abstract class ReviewsRepository implements RepositoryInterface<Review> {
  public abstract create(entity: Review): Promise<void>;
  public abstract save(entity: Review): Promise<void>;
  public abstract delete(id: string): Promise<void>;
  public abstract findById(id: string): Promise<Review | null>;
  public abstract findAll(): Promise<Review[]>;
}

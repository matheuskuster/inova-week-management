import { ReviewCriteria } from './../entities';
import { RepositoryInterface } from '@/types/repositories/repository-contracts';

export abstract class ReviewsCriteriasRepository implements RepositoryInterface<ReviewCriteria> {
  public abstract create(entity: ReviewCriteria): Promise<void>;
  public abstract save(entity: ReviewCriteria): Promise<void>;
  public abstract delete(id: string): Promise<void>;
  public abstract findById(id: string): Promise<ReviewCriteria | null>;
  public abstract findAll(): Promise<ReviewCriteria[]>;
}

import { Review } from '@/application/entities';
import { ReviewsRepository } from '@/application/repositories';
import { InMemoryRepository } from '@/types/repositories/in-memory.repository';

export class InMemoryReviewsRepository
  extends InMemoryRepository<Review>
  implements ReviewsRepository
{
  public get review(): Review[] {
    return this.entities;
  }
}

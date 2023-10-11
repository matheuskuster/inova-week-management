import { type Entity } from '../entities/entity';

export interface RepositoryInterface<E extends Entity> {
  create: (entity: E) => Promise<void>;
  save: (entity: E) => Promise<void>;
  delete: (id: string) => Promise<void>;
  findById: (id: string) => Promise<E | null>;
  findAll: () => Promise<E[]>;
}

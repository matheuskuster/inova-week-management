import { Inova } from '@/application/entities';
import { RepositoryInterface } from '@/types/repositories/repository-contracts';

export abstract class InovasRepository implements RepositoryInterface<Inova> {
  public abstract create(entity: Inova): Promise<void>;
  public abstract save(entity: Inova): Promise<void>;
  public abstract delete(id: string): Promise<void>;
  public abstract findById(id: string): Promise<Inova | null>;
  public abstract findAll(): Promise<Inova[]>;
}

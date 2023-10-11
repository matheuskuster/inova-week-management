import { RepositoryInterface } from './repository-contracts';

import { AlreadyExistsError } from '@/errors/already-exists.error';
import { NotFoundError } from '@/errors/not-found.error';
import { Entity } from '@/types/entities/entity';

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  public entities: E[] = [];

  async create(entity: E): Promise<void> {
    try {
      await this._get(entity.id);
      throw new AlreadyExistsError(
        `${entity.constructor.name} with id ${entity.id} already exists`,
      );
    } catch (error) {
      if (!(error instanceof NotFoundError)) {
        throw error;
      }
      this.entities.push(entity);
    }
  }

  async save(entity: E): Promise<void> {
    await this._get(entity.id);
    const index = this.entities.findIndex((item) => item.id === entity.id);
    this.entities[index] = entity;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    this.entities = this.entities.filter((item) => item.id !== id);
  }

  async findById(id: string): Promise<E> {
    return await this._get(id);
  }

  async findAll(): Promise<E[]> {
    return this.entities;
  }

  protected async _get(id: string): Promise<E> {
    const item = this.entities.find((item) => item.id === id);

    if (!item) {
      throw new NotFoundError(`ID ${id} not found in ${this.constructor.name}`);
    }

    return item;
  }
}

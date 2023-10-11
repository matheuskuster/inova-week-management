import { randomUUID } from 'node:crypto';

import { ValueObject } from './value-object';

import { InvalidUUIDError } from '@/errors/invalid-uuid.error';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class UniqueEntityId extends ValueObject<string> {
  constructor(id?: string) {
    super(id ?? randomUUID());
    this.validate();
  }

  private validate(): void {
    const isValid = this.value?.match(UUID_REGEX) != null;

    if (!isValid) {
      throw new InvalidUUIDError();
    }
  }
}

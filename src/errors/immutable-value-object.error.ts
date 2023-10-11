export class ImmutableValueObjectError extends Error {
  constructor(objectName: string) {
    super(`[${objectName}] is immutable`);
    this.name = 'ImmutableValueObjectError';
  }
}

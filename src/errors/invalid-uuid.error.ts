export class InvalidUUIDError extends Error {
  constructor(value?: string) {
    super(`[${value}] is not a valid UUID`);
    this.name = 'InvalidUUIDError';
  }
}

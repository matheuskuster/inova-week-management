import { ImmutableValueObjectError } from '@/errors/immutable-value-object.error';

export abstract class ValueObject<V = any> {
  protected readonly _value: V;

  constructor(value: V) {
    this._value = value;
  }

  get value(): V {
    return this._value;
  }

  set value(_v: V) {
    throw new ImmutableValueObjectError(this.constructor.name);
  }

  // needs to be an arrow function to override the default toString() method
  toString = (): string => {
    if (this._value === undefined) return 'undefined';
    if (this._value === null) return 'null';
    return JSON.stringify(this._value);
  };
}

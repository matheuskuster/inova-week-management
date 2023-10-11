import { UniqueEntityId } from '../value-objects';

type JSONReturn<T> = Required<{ id: string } & T>;

export class Entity<T = any> {
  public readonly uniqueEntityId: UniqueEntityId;
  public readonly props: T;

  constructor(props: T, id?: UniqueEntityId) {
    this.uniqueEntityId = id ?? new UniqueEntityId();
    this.props = props;
  }

  public get id(): string {
    return this.uniqueEntityId.value;
  }

  public toJSON(): JSONReturn<T> {
    const props = Object.entries(this.props as object).reduce(
      (acc, [key, value]) => {
        if (value instanceof Entity) {
          return {
            ...acc,
            [key]: value.toJSON(),
          };
        }

        return {
          ...acc,
          [key]: value,
        };
      },
      {} as T,
    );

    return {
      id: this.id,
      ...props,
    } as Required<{ id: string } & T>;
  }
}

import { Inova } from '@/application/entities';

export class InovaViewModel {
  public static toHTTP(inova: Inova) {
    return {
      id: inova.id,
      name: inova.name,
      descripiton: inova.description,
      from: inova.from,
      to: inova.to,
      year: inova.year,
    };
  }
}

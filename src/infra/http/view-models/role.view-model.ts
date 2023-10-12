import { Role } from '@/application/entities';

export class RoleViewModel {
  public static toHTTP(role: Role) {
    return {
      id: role.id,
      name: role.name,
      description: role.description,
    };
  }
}

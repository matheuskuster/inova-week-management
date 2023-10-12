import { User } from '@/application/entities';

export class UserViewModel {
  public static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      birthDate: user.birthDate,
      registration: user.registration,
      roles: user.roles.map((role) => role.name),
    };
  }
}

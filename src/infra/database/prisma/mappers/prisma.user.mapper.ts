import { User as PrismaUser, Role as PrismaRole } from '@prisma/client';

import { PrismaRoleMapper } from './prisma.role.mapper';

import { User } from '@/application/entities';
import { UniqueEntityId } from '@/types/value-objects';

export class PrismaUserMapper {
  public static toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      registration: user.registration,
      password: user.passwordHash,
      birthDate: user.birthDate,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public static toDomain(user: PrismaUser, roles: PrismaRole[]): User {
    return new User(
      {
        name: user.name,
        email: user.email,
        phone: user.phone,
        registration: user.registration,
        passwordHash: user.password,
        birthDate: user.birthDate,
        roles: roles.map(PrismaRoleMapper.toDomain),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      new UniqueEntityId(user.id),
    );
  }
}

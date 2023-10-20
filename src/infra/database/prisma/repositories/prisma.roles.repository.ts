import { Injectable } from '@nestjs/common';

import { PrismaRoleMapper } from '../mappers/prisma.role.mapper';
import { PrismaService } from '../prisma.service';

import { Role } from '@/application/entities';
import { RolesRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

@Injectable()
export class PrismaRolesRepository implements RolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(role: Role): Promise<void> {
    const raw = PrismaRoleMapper.toPrisma(role);

    await this.prisma.role.create({
      data: raw,
    });
  }

  async save(role: Role): Promise<void> {
    const raw = PrismaRoleMapper.toPrisma(role);

    await this.prisma.role.update({
      where: { id: role.id },
      data: raw,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.role.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<Role> {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!role) {
      throw new NotFoundError(`Role with id [${id}] not found`);
    }

    return PrismaRoleMapper.toDomain(role);
  }

  async findAll(): Promise<Role[]> {
    const roles = await this.prisma.role.findMany();
    return roles.map(PrismaRoleMapper.toDomain);
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({
      where: { name },
    });

    if (!role) {
      return null;
    }

    return PrismaRoleMapper.toDomain(role);
  }

  public async findManyByNames(names: string[]): Promise<Role[]> {
    const roles = await this.prisma.role.findMany({
      where: {
        name: {
          in: names,
        },
      },
    });

    return roles.map(PrismaRoleMapper.toDomain);
  }
}

import { Injectable } from '@nestjs/common';

import { PrismaUserMapper } from '../mappers/prisma.user.mapper';
import { PrismaService } from '../prisma.service';

import { User } from '@/application/entities';
import { UsersRepository } from '@/application/repositories';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);
    await this.prisma.user.create({ data: raw });
  }

  public async save(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);
    await this.prisma.user.upsert({
      where: { id: user.id },
      create: raw,
      update: raw,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: true,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user, user.roles);
  }

  public async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        roles: true,
      },
    });

    return users.map((user) => PrismaUserMapper.toDomain(user, user.roles));
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: true,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user, user.roles);
  }

  public async findByPhone(phone: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { phone },
      include: {
        roles: true,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user, user.roles);
  }

  public async findByRegistration(registration: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { registration },
      include: {
        roles: true,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user, user.roles);
  }
}

import { Injectable } from '@nestjs/common';

import { PrismaInviteMapper } from '../mappers/prisma.invite.mapper';
import { PrismaService } from '../prisma.service';

import { Invite } from '@/application/entities';
import { InvitesRepository } from '@/application/repositories';

@Injectable()
export class PrismaInvitesRepository implements InvitesRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(invite: Invite): Promise<void> {
    const raw = PrismaInviteMapper.toPrisma(invite);
    await this.prisma.invite.create({ data: raw });
  }

  public async save(invite: Invite): Promise<void> {
    const raw = PrismaInviteMapper.toPrisma(invite);
    await this.prisma.invite.upsert({
      where: { id: invite.id },
      create: raw,
      update: raw,
    });
  }

  public async delete(id: string) {
    await this.prisma.invite.delete({ where: { id } });
  }

  public async findById(id: string): Promise<Invite | null> {
    const invite = await this.prisma.invite.findUnique({ where: { id } });
    return invite ? PrismaInviteMapper.toDomain(invite) : null;
  }

  public async findAll(): Promise<Invite[]> {
    const invites = await this.prisma.invite.findMany();
    return invites.map(PrismaInviteMapper.toDomain);
  }
}

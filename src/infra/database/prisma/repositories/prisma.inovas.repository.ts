import { Injectable } from '@nestjs/common';

import { PrismaInovaMapper } from '../mappers/prisma.inova.mapper';
import { PrismaService } from '../prisma.service';

import { Inova } from '@/application/entities';
import { InovasRepository } from '@/application/repositories';

@Injectable()
export class PrismaInovasRepository implements InovasRepository {
  constructor(private readonly prisma: PrismaService) {}
  public async create(inova: Inova): Promise<void> {
    const raw = PrismaInovaMapper.toPrisma(inova);
    await this.prisma.inova.create({ data: raw });
  }

  public async save(inova: Inova): Promise<void> {
    const raw = PrismaInovaMapper.toPrisma(inova);
    await this.prisma.inova.upsert({
      where: { id: inova.id },
      create: raw,
      update: raw,
    });
  }

  public async delete(id: string) {
    await this.prisma.inova.delete({ where: { id } });
  }

  public async findById(id: string): Promise<Inova | null> {
    const inova = await this.prisma.inova.findUnique({ where: { id } });
    return inova ? PrismaInovaMapper.toDomain(inova) : null;
  }

  public async findAll(): Promise<Inova[]> {
    const inovas = await this.prisma.inova.findMany();
    return inovas.map(PrismaInovaMapper.toDomain);
  }
}

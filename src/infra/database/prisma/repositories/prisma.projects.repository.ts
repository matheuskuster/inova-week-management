import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaProjectMapper } from '../mappers/prisma.project.mapper';
import { PrismaService } from '../prisma.service';

import { Project } from '@/application/entities';
import { ProjectsRepository } from '@/application/repositories';

@Injectable()
export class PrismaProjectsRepository implements ProjectsRepository {
  constructor(private readonly prisma: PrismaService) {}
  public async create(project: Project): Promise<void> {
    const raw = PrismaProjectMapper.toPrisma(project);
    await this.prisma.project.create({ data: raw });
  }

  public async save(project: Project): Promise<void> {
    const raw = PrismaProjectMapper.toPrisma(project);
    await this.prisma.project.upsert({
      where: { id: project.id },
      create: raw,
      update: raw,
    });
  }

  public async delete(id: string) {
    await this.prisma.project.delete({ where: { id } });
  }

  public async findById(id: string): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({ where: { id } });
    return project ? PrismaProjectMapper.toDomain(project) : null;
  }

  public async findAll(): Promise<Project[]> {
    const projects = await this.prisma.project.findMany();
    return projects.map(PrismaProjectMapper.toDomain);
  }

  public async findManyByInovaId(inovaId: string): Promise<Project[]> {
    const where: Prisma.ProjectWhereInput = {};

    where.approved = { equals: true };
    where.inovaId = { equals: inovaId };

    const projects = await this.prisma.project.findMany({
      where,
    });

    return projects.map((project) => PrismaProjectMapper.toDomain(project));
  }
}

import { Injectable } from '@nestjs/common';

import { Project } from '@/application/entities';
import {
  InovasRepository,
  ProjectsRepository,
} from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface FetchProjectsFromInovaRequest {
  inovaId: string;
}

interface FetchProjectsFromInovaResponse {
  projects: Project[];
}

@Injectable()
export class FetchProjectsFromInova {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly inovasRepository: InovasRepository,
  ) {}

  async execute(
    request: FetchProjectsFromInovaRequest,
  ): Promise<FetchProjectsFromInovaResponse> {
    const foundInova = await this.inovasRepository.findById(request.inovaId);

    if (!foundInova) {
      throw new NotFoundError(
        `Inova with id [${request.inovaId}] was not found`,
      );
    }

    const projects = await this.projectsRepository.findManyByInovaId(
      request.inovaId,
    );

    if (projects.length === 0) {
      throw new NotFoundError(
        `No projects from inova [${request.inovaId}] were found`,
      );
    }

    return {
      projects,
    };
  }
}

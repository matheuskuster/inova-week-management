import { Injectable } from '@nestjs/common';

import { Project } from '@/application/entities';
import { ProjectsRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';
import { UnauthorizedError } from '@/errors/unauthorized-error';

interface UpdateProjectRequest {
  userId: string;
  id: string;
  name?: string;
  description?: string;
}

interface UpdateProjectResponse {
  project: Project;
}

@Injectable()
export class UpdateProject {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  public async execute({
    userId,
    id,
    name,
    description,
  }: UpdateProjectRequest): Promise<UpdateProjectResponse> {
    const foundProject = await this.projectsRepository.findById(id);

    if (!foundProject) {
      throw new NotFoundError(`Project with id [${id}] was not found`);
    }

    if (foundProject.leaderUserId !== userId) {
      throw new UnauthorizedError(
        `User with id [${userId}] is not allowed to update project [${id}]`,
      );
    }

    foundProject.update({
      name: name ?? undefined,
      description: description ?? undefined,
    });

    await this.projectsRepository.save(foundProject);

    return { project: foundProject };
  }
}

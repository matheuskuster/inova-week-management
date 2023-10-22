import { Injectable } from '@nestjs/common';

import {
  ProjectsRepository,
  UsersRepository,
} from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';
import { UnauthorizedError } from '@/errors/unauthorized-error';

interface DeleteProjectRequest {
  id: string;
  userId: string;
}

@Injectable()
export class DeleteProject {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async execute({ id, userId }: DeleteProjectRequest): Promise<void> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new NotFoundError(`Project with id [${id}] was not found`);
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundError(`User with id [${userId}] was not found`);
    }

    if (project.reviewedAt) {
      const isAdmin = user.roles.some((roles) => roles.name === 'admin');

      if (!isAdmin) {
        throw new UnauthorizedError(
          `User with id [${userId}] is not allowed to delete this project`,
        );
      }
    }

    await this.projectsRepository.delete(project.id);
  }
}

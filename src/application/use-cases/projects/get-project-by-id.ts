import { Injectable } from '@nestjs/common';

import {
  ProjectsRepository,
  UsersRepository,
} from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';
import { UnauthorizedError } from '@/errors/unauthorized-error';

interface GetProjectByIdRequest {
  id: string;
  userId: string;
}

@Injectable()
export class GetProjectById {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ id, userId }: GetProjectByIdRequest) {
    const foundProject = await this.projectsRepository.findById(id);

    if (!foundProject) {
      throw new NotFoundError(`Project with id ${id} was not found`);
    }

    if (!foundProject.approved) {
      const foundUser = await this.usersRepository.findById(userId);

      if (!foundUser) {
        throw new NotFoundError(`User with id ${userId} was not found`);
      }

      const isLeader = foundProject.leaderUserId === foundUser.id;

      if (!isLeader) {
        const isAdmin = foundUser.roles.some((roles) => roles.name === 'admin');

        if (!isAdmin) {
          throw new UnauthorizedError(
            `User with id [${userId}] is not allowed to see this project`,
          );
        }
      }
    }

    return {
      project: foundProject,
    };
  }
}

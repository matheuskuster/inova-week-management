import { Injectable } from '@nestjs/common';

import { Role } from '@/application/entities';
import { RolesRepository, UsersRepository } from '@/application/repositories';
import { AlreadyExistsError } from '@/errors/already-exists.error';
import { NotFoundError } from '@/errors/not-found.error';
import { UnauthorizedError } from '@/errors/unauthorized-error';

interface CreateRoleRequest {
  userId: string;
  name: string;
  description?: string;
}

@Injectable()
export class CreateRole {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async execute(request: CreateRoleRequest) {
    const currentUser = await this.usersRepository.findById(request.userId);

    if (!currentUser) {
      throw new NotFoundError(`User with id ${request.userId} not found`);
    }

    const isAdmin = currentUser.roles.some((role) => role.name === 'admin');

    if (!isAdmin) {
      throw new UnauthorizedError();
    }

    const foundRole = await this.rolesRepository.findByName(request.name);

    if (foundRole) {
      throw new AlreadyExistsError(
        `Role with name ${request.name} already exists`,
      );
    }

    const newRole = new Role({
      name: request.name,
      description: request.description,
    });

    await this.rolesRepository.create(newRole);

    return { role: newRole };
  }
}

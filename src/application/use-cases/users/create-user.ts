import { Injectable } from '@nestjs/common';

import { User } from '@/application/entities';
import { RolesRepository, UsersRepository } from '@/application/repositories';
import { EncryptService } from '@/application/services';
import { AlreadyExistsError } from '@/errors/already-exists.error';
import { NotFoundError } from '@/errors/not-found.error';

export interface CreateUserRequest {
  name: string;
  phone: string;
  registration: string;
  email: string;
  password: string;
  birthDate: Date;
  roles: string[];
}

@Injectable()
export class CreateUser {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
    private readonly encryptService: EncryptService,
  ) {}

  async execute(request: CreateUserRequest) {
    const roles = await this.rolesRepository.findManyByNames(request.roles);

    if (roles.length !== request.roles.length) {
      const diff = request.roles.filter(
        (role) => !roles.map((r) => r.name).includes(role),
      );

      throw new NotFoundError(`Roles [${diff.join(', ')}] not found`);
    }

    const foundUserByEmail = await this.usersRepository.findByEmail(
      request.email,
    );

    if (foundUserByEmail) {
      throw new AlreadyExistsError(`Email ${request.email} already registered`);
    }

    const foundUserByPhone = await this.usersRepository.findByPhone(
      request.phone,
    );

    if (foundUserByPhone) {
      throw new AlreadyExistsError(
        `Phone number ${request.phone} already registered`,
      );
    }

    const foundUserByRegistration =
      await this.usersRepository.findByRegistration(request.registration);

    if (foundUserByRegistration) {
      throw new AlreadyExistsError(
        `Registration ${request.registration} already registered`,
      );
    }

    const passwordHash = await this.encryptService.hash(request.password);

    const user = new User({
      email: request.email,
      name: request.name,
      passwordHash,
      birthDate: request.birthDate,
      phone: request.phone,
      registration: request.registration,
      roles,
    });

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}

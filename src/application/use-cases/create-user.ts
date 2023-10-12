import { Injectable } from '@nestjs/common';

import { User } from '../entities';
import { RolesRepository, UsersRepository } from '../repositories';
import { EncryptService } from '../services';

import { AlreadyExistsError } from '@/errors/already-exists.error';
import { NotFoundError } from '@/errors/not-found.error';

export interface CreateUserRequest {
  name: string;
  phone: string;
  registration: string;
  email: string;
  password: string;
  birthDate: Date;
  role: string;
}

@Injectable()
export class CreateUser {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
    private readonly encryptService: EncryptService,
  ) {}

  async execute(request: CreateUserRequest) {
    const role = await this.rolesRepository.findByName(request.role);

    if (!role) {
      throw new NotFoundError(`Role ${request.role} not found`);
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
      roles: [role],
    });

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}

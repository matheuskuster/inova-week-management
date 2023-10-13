import { Injectable } from '@nestjs/common';

import { UsersRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface GetUserByIdRequest {
  id: string;
}

@Injectable()
export class GetUserById {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: GetUserByIdRequest) {
    const foundUser = await this.usersRepository.findById(request.id);

    if (!foundUser) {
      throw new NotFoundError(`User with id ${request.id} not found`);
    }

    return {
      user: foundUser,
    };
  }
}

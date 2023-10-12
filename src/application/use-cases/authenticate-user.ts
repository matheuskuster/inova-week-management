import { Injectable } from '@nestjs/common';

import { User } from '@/application/entities';
import { UsersRepository } from '@/application/repositories';
import { EncryptService } from '@/application/services';
import { InvalidCredentialsError } from '@/errors/invalid-credentials.error';

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

interface AuthenticateUserResponse {
  user: User;
}

@Injectable()
export class AuthenticateUser {
  constructor(
    private usersRepository: UsersRepository,
    private encryptService: EncryptService,
  ) {}

  public async execute(
    request: AuthenticateUserRequest,
  ): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(request.email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordCorrect = await this.encryptService.compare(
      request.password,
      user.passwordHash!,
    );

    if (!isPasswordCorrect) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}

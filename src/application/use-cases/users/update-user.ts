import { UsersRepository } from '@/application/repositories';
import { EncryptService } from '@/application/services';
import { InvalidRequestError } from '@/errors/invalid-request.error';
import { NotFoundError } from '@/errors/not-found.error';

interface UpdateUserRequest {
  id: string;
  birthDate?: Date;
  email?: string;
  name?: string;
  newPassword?: string;
  currentPassword?: string;
  phone?: string;
  registration?: string;
  roles?: string[];
}

export class UpdateUser {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly encryptService: EncryptService,
  ) {}

  async execute(request: UpdateUserRequest) {
    const user = await this.usersRepository.findById(request.id);

    if (!user) {
      throw new NotFoundError(`User with id ${request.id} not found`);
    }

    if (request.newPassword) {
      if (!request.currentPassword) {
        throw new InvalidRequestError('Current password is required');
      }

      const isValidPassword = await this.encryptService.compare(
        request.currentPassword,
        user.passwordHash,
      );

      if (!isValidPassword) {
        throw new InvalidRequestError('Current password is invalid');
      }

      user.update({
        passwordHash: await this.encryptService.hash(request.newPassword),
      });
    }

    user.update({
      birthDate: request.birthDate,
      email: request.email,
      name: request.name,
      phone: request.phone,
      registration: request.registration,
    });

    await this.usersRepository.save(user);

    return {
      user,
    };
  }
}

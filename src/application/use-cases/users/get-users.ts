import { UsersRepository } from '@/application/repositories';

export class GetUsers {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute() {
    const users = await this.usersRepository.findAll();

    return { users };
  }
}

import { RolesRepository } from '@/application/repositories';

export class GetRoles {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async execute() {
    const roles = await this.rolesRepository.findAll();

    return {
      roles,
    };
  }
}

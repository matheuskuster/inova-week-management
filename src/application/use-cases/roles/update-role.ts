import { RolesRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface UpdateRoleRequest {
  id: string;
  name?: string;
  description?: string;
}

export class UpdateRole {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async execute(request: UpdateRoleRequest) {
    const role = await this.rolesRepository.findById(request.id);

    if (!role) {
      throw new NotFoundError(`Role with id ${request.id} not found`);
    }

    role.update({
      name: request.name,
      description: request.description,
    });

    await this.rolesRepository.save(role);

    return {
      role,
    };
  }
}

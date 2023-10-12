import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { CurrentUser, Roles } from '../decorators';
import { CreateRoleDTO } from '../dto/roles.dto';
import { RoleViewModel } from '../view-models/role.view-model';

import { CreateRole } from '@/application/use-cases';
import { AuthenticatedUser } from '@/types/entities';

@Controller('roles')
export class RolesController {
  constructor(private readonly createRole: CreateRole) {}

  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: CreateRoleDTO,
  ) {
    const { role } = await this.createRole.execute({
      name: body.name,
      description: body.description,
      userId: user.id,
    });

    return {
      role: RoleViewModel.toHTTP(role),
    };
  }
}

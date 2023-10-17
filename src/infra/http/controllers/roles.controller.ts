import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CurrentUser, Roles } from '../decorators';
import { CreateRoleDTO } from '../dto/roles.dto';
import { RoleViewModel } from '../view-models/role.view-model';

import { CreateRole, GetRoles, UpdateRole } from '@/application/use-cases';
import { AuthenticatedUser } from '@/types/entities';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly createRole: CreateRole,
    private readonly getRoles: GetRoles,
    private readonly updateRole: UpdateRole,
  ) {}

  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @Get()
  async index() {
    const { roles } = await this.getRoles.execute();

    return {
      roles: roles.map((role) => RoleViewModel.toHTTP(role)),
    };
  }

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

  @Roles('admin')
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string) {
    const { role } = await this.updateRole.execute({
      id,
    });

    return {
      role: RoleViewModel.toHTTP(role),
    };
  }
}

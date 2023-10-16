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
import { AdminCreateDTO, UpdateUserDTO } from '../dto/users.dto';
import { UserViewModel } from '../view-models/user.view-model';

import {
  CreateUser,
  GetUserById,
  GetUsers,
  UpdateUser,
} from '@/application/use-cases';
import { UnauthorizedError } from '@/errors/unauthorized-error';
import { AuthenticatedUser } from '@/types/entities';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserById: GetUserById,
    private readonly getUsers: GetUsers,
    private readonly createUser: CreateUser,
    private readonly updateUser: UpdateUser,
  ) {}

  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const { user } = await this.getUserById.execute({ id });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get('/me')
  async me(@CurrentUser() currentUser: AuthenticatedUser) {
    const { user } = await this.getUserById.execute({ id: currentUser.id });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @Get()
  async index() {
    const { users } = await this.getUsers.execute();

    return {
      users: users.map((user) => UserViewModel.toHTTP(user)),
    };
  }

  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() body: AdminCreateDTO) {
    const { user } = await this.createUser.execute({
      birthDate: new Date(body.birthDate),
      email: body.email,
      name: body.name,
      password: body.password,
      phone: body.phone,
      registration: body.registration,
      roles: body.roles,
    });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @CurrentUser() currentUser: AuthenticatedUser,
    @Body() body: UpdateUserDTO,
  ) {
    if (currentUser.id !== id && !currentUser.roles.includes('admin')) {
      throw new UnauthorizedError();
    }

    if (body.roles && !currentUser.roles.includes('admin')) {
      throw new UnauthorizedError();
    }

    const { user } = await this.updateUser.execute({
      id,
      birthDate: new Date(body.birthDate),
      email: body.email,
      name: body.name,
      currentPassword: body.currentPassword,
      newPassword: body.newPassword,
      phone: body.phone,
      registration: body.registration,
      roles: body.roles,
    });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }
}

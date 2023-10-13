import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { Roles } from '../decorators';
import { UserViewModel } from './../view-models/user.view-model';

import { GetUserById } from '@/application/use-cases/';

@Controller('users')
export class UsersController {
  constructor(private readonly getUserById: GetUserById) {}

  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const { user } = await this.getUserById.execute({ id });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }
}

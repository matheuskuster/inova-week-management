import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthenticatedRequest, IsPublic } from '../decorators';
import { SingupDTO } from '../dto/users.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserViewModel } from '../view-models/user.view-model';

import { User } from '@/application/entities';
import { CreateUser } from '@/application/use-cases';
import { GenerateJWT } from '@/application/use-cases/generate-jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly generateJWT: GenerateJWT,
  ) {}

  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  async signup(@Body() body: SingupDTO) {
    const { user } = await this.createUser.execute({
      birthDate: new Date(body.birthDate),
      email: body.email,
      name: body.name,
      password: body.password,
      phone: body.phone,
      registration: body.registration,
      role: body.role,
    });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @IsPublic()
  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async authenticate(@Req() request: AuthenticatedRequest<User>) {
    const { token } = await this.generateJWT.execute({
      user: request.user,
    });

    return {
      user: UserViewModel.toHTTP(request.user),
      token,
    };
  }
}

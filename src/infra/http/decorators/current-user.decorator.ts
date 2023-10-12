import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { type Request } from 'express';

import { AuthenticatedUser } from '@/types/entities';
import { UniqueEntityId } from '@/types/value-objects';

// @ts-ignore
export interface AuthenticatedRequest<U> extends Request {
  user: U;
}

export interface JWTUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
  registration: string;
}

export interface AuthenticatedRequestWithToken extends Request {
  user: JWTUser;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthenticatedUser => {
    const request = context
      .switchToHttp()
      .getRequest<AuthenticatedRequestWithToken>();

    return new AuthenticatedUser(
      {
        name: request.user.name,
        email: request.user.email,
        roles: request.user.roles,
        registration: request.user.registration,
      },
      new UniqueEntityId(request.user.id),
    );
  },
);

import { Injectable } from '@nestjs/common';

import { User } from '@/application/entities';
import { JWTService } from '@/application/services';
import { JWTPayload } from '@/types/entities/jwt-payload';

interface GenerateJWTRequest {
  user: User;
}

interface GenerateJWTResponse {
  token: string;
}

@Injectable()
export class GenerateJWT {
  constructor(private readonly jwtService: JWTService) {}

  public async execute(
    request: GenerateJWTRequest,
  ): Promise<GenerateJWTResponse> {
    const payload = new JWTPayload({
      email: request.user.email,
      sub: request.user.id,
      name: request.user.name,
      roles: request.user.roles.map((role) => role.name),
      registration: request.user.registration,
    });

    const token = await this.jwtService.sign(payload);

    return { token };
  }
}

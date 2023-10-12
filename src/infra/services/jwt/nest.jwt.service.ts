import { JwtService } from '@nestjs/jwt';

import { JWTPayload } from '@/types/entities/jwt-payload';

export class NestJWTService extends JwtService {
  // @ts-ignore
  sign(payload: JWTPayload) {
    return super.sign(payload.props, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    });
  }
}

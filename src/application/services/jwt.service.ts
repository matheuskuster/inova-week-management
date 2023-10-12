import { JWTPayload } from '@/types/entities/jwt-payload';

export abstract class JWTService {
  sign: (payload: JWTPayload) => Promise<string>;
}

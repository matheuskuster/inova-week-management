import { JWTService } from '@/application/services';
import { JWTPayload } from '@/types/entities/jwt-payload';

export class LocalJWTService implements JWTService {
  public signed: Record<string, string> = {};

  public async sign(payload: JWTPayload): Promise<string> {
    const signed = JSON.stringify(payload.props);
    this.signed[signed] = signed;
    return signed;
  }
}

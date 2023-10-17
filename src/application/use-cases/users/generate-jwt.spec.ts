import { makeUser } from '@test/factories';
import { LocalJWTService } from '@test/services/loca.jwt.service';

import { GenerateJWT } from './generate-jwt';

describe('Generate JWT', () => {
  let generateJWT: GenerateJWT;
  let jwtService: LocalJWTService;

  beforeEach(() => {
    jwtService = new LocalJWTService();

    generateJWT = new GenerateJWT(jwtService);
  });

  it('should be able to generate a JWT', async () => {
    const user = makeUser();

    const token = await generateJWT.execute({
      user,
    });

    expect(token).toBeTruthy();
  });
});

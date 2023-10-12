import { Injectable } from '@nestjs/common';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

import { EncryptService } from '@/application/services';

@Injectable()
export class CryptoEncryptService implements EncryptService {
  async hash(value: string) {
    const salt = randomBytes(16).toString('hex');
    return this.encrypt(value, salt) + salt;
  }

  async compare(value: string, hash: string) {
    const salt = hash.slice(64);
    const originalPassHash = hash.slice(0, 64);
    const originalPasshHashBuffer = Buffer.from(originalPassHash, 'hex');
    const currentPassHash = this.encrypt(value, salt);
    const currentPassHashBuffer = Buffer.from(currentPassHash, 'hex');
    return timingSafeEqual(originalPasshHashBuffer, currentPassHashBuffer);
  }

  private encrypt(value: string, salt: string) {
    return scryptSync(value, salt, 32).toString('hex');
  }
}

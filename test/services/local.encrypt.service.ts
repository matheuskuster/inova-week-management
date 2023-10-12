import { EncryptService } from '@/application/services';

export class LocalEncryptService implements EncryptService {
  public crypted: Record<string, string> = {};

  async hash(value: string): Promise<string> {
    const encrypted = value.split('').reverse().join('');
    this.crypted[String(value)] = encrypted;
    return encrypted;
  }

  public async compare(value: string, hash: string): Promise<boolean> {
    return this.crypted[value] === hash;
  }
}

import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      errorFormat: 'pretty',
      log: [{ emit: 'stdout', level: 'error' }],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // @ts-expect-error
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    try {
      await this.$queryRaw`SELECT 1`;
      return Promise.resolve({
        prisma: {
          status: 'up',
        },
      });
    } catch {
      return Promise.resolve({
        prisma: {
          status: 'down',
        },
      });
    }
  }
}

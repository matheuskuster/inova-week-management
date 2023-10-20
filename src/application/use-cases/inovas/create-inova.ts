import { Injectable } from '@nestjs/common';

import { Inova } from '@/application/entities';
import { InovasRepository } from '@/application/repositories/inovas.repository';

interface CreateInovaRequest {
  name: string;
  description?: string;
  from: string;
  to: string;
  year: number;
}

interface CreateInovaResponse {
  inova: Inova;
}

@Injectable()
export class CreateInova {
  constructor(private readonly inovasRepository: InovasRepository) {}

  public async execute(
    request: CreateInovaRequest,
  ): Promise<CreateInovaResponse> {
    const inova = new Inova({
      name: request.name,
      description: request.description,
      from: new Date(request.from),
      to: new Date(request.to),
      year: request.year,
    });

    await this.inovasRepository.create(inova);

    return {
      inova,
    };
  }
}

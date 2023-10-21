import { Injectable } from '@nestjs/common';

import { Inova } from '@/application/entities';
import { InovasRepository } from '@/application/repositories/inovas.repository';
import { NotFoundError } from '@/errors/not-found.error';

interface UpdateInovaRequest {
  id: string;
  name?: string;
  description?: string;
  from?: string;
  to?: string;
  year?: number;
}

interface UpdateInovaResponse {
  inova: Inova;
}

@Injectable()
export class UpdateInova {
  constructor(private readonly inovasRepository: InovasRepository) {}

  public async execute(
    request: UpdateInovaRequest,
  ): Promise<UpdateInovaResponse> {
    const inova = await this.inovasRepository.findById(request.id);

    if (!inova) {
      throw new NotFoundError(`Inova with id [${request.id}] was not found`);
    }

    inova.update({
      name: request.name ?? undefined,
      description: request.description ?? undefined,
      from: request.from ? new Date(request.from) : undefined,
      to: request.to ? new Date(request.to) : undefined,
      year: request.year ?? undefined,
    });

    await this.inovasRepository.save(inova);

    return { inova };
  }
}

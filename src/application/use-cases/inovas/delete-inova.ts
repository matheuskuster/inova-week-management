import { Injectable } from '@nestjs/common';

import { InovasRepository } from '@/application/repositories/inovas.repository';
import { NotFoundError } from '@/errors/not-found.error';

interface DeleteInovaRequest {
  id: string;
}

@Injectable()
export class DeleteInova {
  constructor(private readonly inovasRepository: InovasRepository) {}

  public async execute(request: DeleteInovaRequest): Promise<void> {
    const inova = await this.inovasRepository.findById(request.id);

    if (!inova) {
      throw new NotFoundError(`Inova with id [${request.id}] was not found`);
    }

    await this.inovasRepository.delete(inova.id);
  }
}

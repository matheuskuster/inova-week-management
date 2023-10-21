import { Injectable } from '@nestjs/common';

import { Inova } from '@/application/entities';
import { InovasRepository } from '@/application/repositories/inovas.repository';
import { NotFoundError } from '@/errors/not-found.error';

interface GetInovaByIdRequest {
  id: string;
}

interface GetInovaByIdResponse {
  inova: Inova;
}

@Injectable()
export class GetInovaById {
  constructor(private readonly inovasRepository: InovasRepository) {}

  public async execute(
    request: GetInovaByIdRequest,
  ): Promise<GetInovaByIdResponse> {
    const inova = await this.inovasRepository.findById(request.id);

    if (!inova) {
      throw new NotFoundError(`Inova with id [${request.id}] was not found`);
    }

    return { inova };
  }
}

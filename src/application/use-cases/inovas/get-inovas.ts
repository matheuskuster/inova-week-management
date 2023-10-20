import { Injectable } from '@nestjs/common';

import { Inova } from '@/application/entities';
import { InovasRepository } from '@/application/repositories/inovas.repository';
import { NotFoundError } from '@/errors/not-found.error';

interface GetInovasResponse {
  inovas: Inova[];
}

@Injectable()
export class GetInovas {
  constructor(private readonly inovasRepository: InovasRepository) {}

  public async execute(): Promise<GetInovasResponse> {
    const inovas = await this.inovasRepository.findAll();

    if (inovas.length === 0) {
      throw new NotFoundError(`No Inovas were found`);
    }

    return { inovas };
  }
}

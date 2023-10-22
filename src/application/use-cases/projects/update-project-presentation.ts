import { Injectable } from '@nestjs/common';

import { Project } from '@/application/entities';
import { ProjectsRepository } from '@/application/repositories';
import { InvalidRequestError } from '@/errors/invalid-request.error';
import { NotFoundError } from '@/errors/not-found.error';

interface UpdateProjectPresentationRequest {
  id: string;
  stand: number;
  date: string;
}

interface UpdateProjectPresentationResponse {
  project: Project;
}

@Injectable()
export class UpdateProjectPresentation {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  public async execute({
    id,
    stand,
    date,
  }: UpdateProjectPresentationRequest): Promise<UpdateProjectPresentationResponse> {
    const foundProject = await this.projectsRepository.findById(id);

    if (!foundProject) {
      throw new NotFoundError(`Project with id [${id}] was not found`);
    }

    if (!foundProject.approved) {
      throw new InvalidRequestError(`Project [${id}] is not approved`);
    }

    foundProject.setPresentation({
      stand,
      presentationDay: new Date(date),
    });

    await this.projectsRepository.save(foundProject);

    return { project: foundProject };
  }
}

import { Injectable } from '@nestjs/common';

import { Project } from '@/application/entities';
import { ProjectsRepository } from '@/application/repositories';
import { InvalidRequestError } from '@/errors/invalid-request.error';
import { NotFoundError } from '@/errors/not-found.error';

interface ApprovalProjectRequest {
  id: string;
  approved: boolean;
}

interface ApprovalProjectResponse {
  project: Project;
}

@Injectable()
export class ApprovalProject {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  public async execute({
    id,
    approved,
  }: ApprovalProjectRequest): Promise<ApprovalProjectResponse> {
    const foundProject = await this.projectsRepository.findById(id);

    if (!foundProject) {
      throw new NotFoundError(`Project with id [${id}] was not found`);
    }

    if (foundProject.approved === approved) {
      throw new InvalidRequestError(
        `Project [${id}] is already ${approved ? 'approved' : 'disapproved'}`,
      );
    }

    foundProject.setApproval(approved);

    await this.projectsRepository.save(foundProject);

    return { project: foundProject };
  }
}

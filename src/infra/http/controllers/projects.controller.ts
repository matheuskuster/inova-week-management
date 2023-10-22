import {
  Controller,
  Get,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  Body,
  Put,
} from '@nestjs/common';

import { CurrentUser, Roles } from '../decorators';
import {
  ApprovalProjectDTO,
  CreateInviteDTO,
  UpdateProjectDTO,
  UpdateProjectPresentationDTO,
} from '../dto/projects.dto';
import { InviteViewModel } from '../view-models/invite.view-model';
import { ProjectViewModel } from '../view-models/project.view-model';

import {
  ApprovalProject,
  CreateProject,
  GetProjectById,
  UpdateProject,
  UpdateProjectPresentation,
  DeleteProject,
  CreateInvite,
} from '@/application/use-cases';
import { AuthenticatedUser } from '@/types/entities';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly createProject: CreateProject,
    private readonly getProjectById: GetProjectById,
    private readonly updateProject: UpdateProject,
    private readonly updateProjectPresentation: UpdateProjectPresentation,
    private readonly approvalProject: ApprovalProject,
    private readonly deleteProject: DeleteProject,
    private readonly createInvite: CreateInvite,
  ) {}

  @Roles('student', 'professor', 'admin')
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findById(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
  ) {
    const { project } = await this.getProjectById.execute({
      id,
      userId: user.id,
    });

    return {
      project: ProjectViewModel.toHTTP(project),
    };
  }

  @Roles('student')
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  async update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() body: UpdateProjectDTO,
  ) {
    const { project } = await this.updateProject.execute({
      id,
      userId: user.id,
      name: body.name,
      description: body.description,
    });

    return {
      project: ProjectViewModel.toHTTP(project),
    };
  }

  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @Put('/:id/presentation')
  async updatePresentation(
    @Param('id') id: string,
    @Body() body: UpdateProjectPresentationDTO,
  ) {
    const { project } = await this.updateProjectPresentation.execute({
      id,
      stand: body.stand,
      date: body.date,
    });

    return {
      project: ProjectViewModel.toHTTP(project),
    };
  }

  @Roles('admin', 'professor')
  @HttpCode(HttpStatus.OK)
  @Put('/:id/approval')
  async approval(@Param('id') id: string, @Body() body: ApprovalProjectDTO) {
    const { project } = await this.approvalProject.execute({
      id,
      approved: body.approved,
    });

    return {
      project: ProjectViewModel.toHTTP(project),
    };
  }

  @Roles('admin', 'student')
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async delete(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
  ) {
    await this.deleteProject.execute({
      id,
      userId: user.id,
    });
  }

  // TODO: Implements create review route (:id/reviews)
  // TODO: Implements update review route (:id/reviews)

  @Roles('student')
  @HttpCode(HttpStatus.CREATED)
  @Get('/:id/invites')
  async createProjectInvite(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() body: CreateInviteDTO,
  ) {
    const { invite } = await this.createInvite.execute({
      userId: user.id,
      projectId: id,
      registration: body.registration,
    });

    return {
      project: InviteViewModel.toHTTP(invite),
    };
  }

  // TODO: Implements get all students from project route (:id/students)
}

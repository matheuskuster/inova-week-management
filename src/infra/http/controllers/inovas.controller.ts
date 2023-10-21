import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CurrentUser, IsPublic, Roles } from '../decorators';
import {
  CreateEventByInovaDTO,
  CreateInovaDTO,
  CreateProjectByInovaDTO,
  CreateReviewCriteriaByInovaDTO,
  CreateReviewCriteriasByPreviousInovaDTO,
  CreateThemeByInovaDTO,
  CreateThemeByPreviousInovaDTO,
  UpdateInovaDTO,
} from '../dto/inovas.dto';
import { EventViewModel } from '../view-models/event.view-model';
import { InovaViewModel } from '../view-models/inova.view-model';
import { ProjectViewModel } from '../view-models/project.view-model';
import { ReviewCriteriaViewModel } from '../view-models/review-criteria.view-model';
import { ThemeViewModel } from '../view-models/theme.view-model';

import {
  CreateEvent,
  CreateInova,
  CreateReviewCriteria,
  CreateReviewCriteriasFromPreviousInova,
  CreateTheme,
  CreateThemesFromPreviousInova,
  DeleteInova,
  FetchEventsFromInova,
  FetchProjectsFromInova,
  FetchReviewCriteriasFromInova,
  FetchThemesFromInova,
  GetInovaById,
  GetInovas,
  UpdateInova,
} from '@/application/use-cases';
import { CreateProject } from '@/application/use-cases/projects/create-project';
import { AuthenticatedUser } from '@/types/entities';

@Controller('inovas')
export class InovasController {
  constructor(
    private readonly getInovaById: GetInovaById,
    private readonly getInovas: GetInovas,
    private readonly createInova: CreateInova,
    private readonly deleteInova: DeleteInova,
    private readonly updateInova: UpdateInova,
    private readonly createTheme: CreateTheme,
    private readonly createThemesFromPreviousInova: CreateThemesFromPreviousInova,
    private readonly fetchThemesFromInova: FetchThemesFromInova,
    private readonly createReviewCriteria: CreateReviewCriteria,
    private readonly createReviewCriteriasFromPreviousInova: CreateReviewCriteriasFromPreviousInova,
    private readonly fetchReviewCriteriasFromInova: FetchReviewCriteriasFromInova,
    private readonly createProject: CreateProject,
    private readonly fetchProjectsFromInova: FetchProjectsFromInova,
    private readonly createEvent: CreateEvent,
    private readonly fetchEventsFromInova: FetchEventsFromInova,
  ) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const { inova } = await this.getInovaById.execute({ id });

    return {
      inova: InovaViewModel.toHTTP(inova),
    };
  }

  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @Get()
  async index() {
    const { inovas } = await this.getInovas.execute();

    return {
      inovas: inovas.map((inova) => InovaViewModel.toHTTP(inova)),
    };
  }

  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() body: CreateInovaDTO) {
    const { inova } = await this.createInova.execute({
      name: body.name,
      description: body.description,
      from: body.from,
      to: body.to,
      year: body.year,
    });

    return {
      inova: InovaViewModel.toHTTP(inova),
    };
  }

  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.deleteInova.execute({
      id,
    });
  }

  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateInovaDTO) {
    const { inova } = await this.updateInova.execute({
      id,
      name: body.name,
      description: body.description,
      from: body.from,
      to: body.to,
      year: body.year,
    });

    return {
      inova: InovaViewModel.toHTTP(inova),
    };
  }

  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @Post('/:id/themes')
  async createThemeByInova(
    @Param('id') id: string,
    @Body() body: CreateThemeByInovaDTO,
  ) {
    const { theme } = await this.createTheme.execute({
      inovaId: id,
      name: body.name,
      description: body.description,
    });

    return {
      theme: ThemeViewModel.toHTTP(theme),
    };
  }

  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @Post('/:id/themes/import')
  async createThemeByPreviousInova(
    @Param('id') id: string,
    @Body() body: CreateThemeByPreviousInovaDTO,
  ) {
    const { themes } = await this.createThemesFromPreviousInova.execute({
      inovaId: id,
      previousInovaId: body.previousInovaId,
    });

    return {
      themes: themes.map((theme) => ThemeViewModel.toHTTP(theme)),
    };
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('/:id/themes')
  async themesIndex(@Param('id') id: string) {
    const { themes } = await this.fetchThemesFromInova.execute({
      inovaId: id,
    });

    return {
      themes: themes.map((theme) => ThemeViewModel.toHTTP(theme)),
    };
  }

  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @Post('/:id/review-criteria')
  async createReviewCriteriaByInova(
    @Param('id') id: string,
    @Body() body: CreateReviewCriteriaByInovaDTO,
  ) {
    const { reviewCriteria } = await this.createReviewCriteria.execute({
      inovaId: id,
      question: body.question,
    });

    return {
      reviewCriteria: ReviewCriteriaViewModel.toHTTP(reviewCriteria),
    };
  }

  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @Post('/:id/review-criterias/import')
  async createReviewCriteriasByPreviousInova(
    @Param('id') id: string,
    @Body() body: CreateReviewCriteriasByPreviousInovaDTO,
  ) {
    const { reviewCriterias } =
      await this.createReviewCriteriasFromPreviousInova.execute({
        inovaId: id,
        previousInovaId: body.previousInovaId,
      });

    return {
      reviewCriterias: reviewCriterias.map((reviewCriteria) =>
        ReviewCriteriaViewModel.toHTTP(reviewCriteria),
      ),
    };
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('/:id/review-criterias')
  async reviewCriteriasIndex(@Param('id') id: string) {
    const { reviewCriterias } =
      await this.fetchReviewCriteriasFromInova.execute({
        inovaId: id,
      });

    return {
      reviewCriterias: reviewCriterias.map((reviewCriteria) =>
        ReviewCriteriaViewModel.toHTTP(reviewCriteria),
      ),
    };
  }

  @Roles('student')
  @HttpCode(HttpStatus.CREATED)
  @Post('/:id/projects')
  async createProjectByInova(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() body: CreateProjectByInovaDTO,
  ) {
    const { project } = await this.createProject.execute({
      userId: user.id,
      name: body.name,
      description: body.description,
      inovaId: id,
      themeId: body.themeId,
    });

    return {
      project: ProjectViewModel.toHTTP(project),
    };
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('/:id/projects')
  async projectsIndex(@Param('id') id: string) {
    const { projects } = await this.fetchProjectsFromInova.execute({
      inovaId: id,
    });

    return {
      projects: projects.map((project) => ProjectViewModel.toHTTP(project)),
    };
  }

  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @Post('/:id/events')
  async createEventByInova(
    @Param('id') id: string,
    @Body() body: CreateEventByInovaDTO,
  ) {
    const { event } = await this.createEvent.execute({
      inovaId: id,
      name: body.name,
      description: body.description,
      type: body.type,
      date: body.date,
    });

    return {
      event: EventViewModel.toHTTP(event),
    };
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('/:id/events')
  async eventsIndex(@Param('id') id: string) {
    const { events } = await this.fetchEventsFromInova.execute({
      inovaId: id,
    });

    return {
      events: events.map((event) => EventViewModel.toHTTP(event)),
    };
  }
}

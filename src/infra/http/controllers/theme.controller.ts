import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';

import { IsPublic, Roles } from '../decorators';
import { UpdateThemeDTO } from '../dto/themes.dto';
import { ThemeViewModel } from '../view-models/theme.view-model';

import {
  GetThemeById,
  UpdateTheme,
  DeleteTheme,
} from '@/application/use-cases';

@Controller('themes')
export class ThemesController {
  constructor(
    private readonly getThemeById: GetThemeById,
    private readonly deleteTheme: DeleteTheme,
    private readonly updateTheme: UpdateTheme,
  ) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const { theme } = await this.getThemeById.execute({ id });

    return {
      theme: ThemeViewModel.toHTTP(theme),
    };
  }

  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.deleteTheme.execute({ id });
  }

  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateThemeDTO) {
    const { theme } = await this.updateTheme.execute({
      id,
      name: body.name,
    });

    return {
      theme: ThemeViewModel.toHTTP(theme),
    };
  }
}

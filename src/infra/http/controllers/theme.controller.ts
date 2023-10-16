import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';

import { IsPublic, Roles } from '../decorators';
import { ThemeViewModel } from '../view-models/theme.view-model';

import { GetThemeById } from '@/application/use-cases';
import { DeleteTheme } from '@/application/use-cases/themes/delete-theme';

@Controller('themes')
export class ThemesController {
  constructor(
    private readonly getThemeById: GetThemeById,
    private readonly deleteTheme: DeleteTheme,
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
}

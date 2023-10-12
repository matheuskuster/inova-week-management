import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { IsPublic } from '../decorators';
import { ThemeViewModel } from '../view-models/theme.view-model';

import { GetThemeById } from '@/application/use-cases';

@Controller('themes')
export class ThemesController {
  constructor(private readonly getThemeById: GetThemeById) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const { theme } = await this.getThemeById.execute({ id });

    return {
      theme: ThemeViewModel.toHTTP(theme),
    };
  }
}

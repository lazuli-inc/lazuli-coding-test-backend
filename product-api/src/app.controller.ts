import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHellos(): string {
    return this.appService.getHello();
  }

  @Post()
  post(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  get(@Param() params: { id: string }): string {
    return this.appService.getHello(params.id);
  }

  @Patch(':id')
  patch(@Param() params: { id: string }): string {
    return this.appService.getHello(params.id);
  }

  @ApiResponse({ status: 204, description: 'no content' })
  @Delete(':id')
  delete(@Param() params: { id: string }): string {
    return this.appService.getHello(params.id);
  }
}

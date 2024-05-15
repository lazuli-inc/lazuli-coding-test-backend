import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getHellos(): string {
    return this.productService.getHello();
  }

  @Post()
  post(): string {
    return this.productService.getHello();
  }

  @Get(':id')
  get(@Param() params: { id: string }) {
    return this.productService.getProduct(Number(params.id));
  }

  @Patch(':id')
  patch(@Param() params: { id: string }) {
    return this.productService.getProduct(Number(params.id));
  }

  @ApiResponse({ status: 204, description: 'no content' })
  @Delete(':id')
  delete(@Param() params: { id: string }) {
    return this.productService.getProduct(Number(params.id));
  }
}

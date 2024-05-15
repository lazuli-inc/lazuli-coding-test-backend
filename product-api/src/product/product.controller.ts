import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductPatchDto, ProductPostDto } from './product.dto';
import { ProductResponse, ProductListResponse } from './product.schema';
import { ProductEntity } from './product.entity';

@ApiTags('Product')
@ApiProduces('application/json; charset=utf-8')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiExtraModels(ProductEntity)
  @ApiOkResponse({ type: ProductListResponse })
  async list(): Promise<{ products: ProductEntity[] }> {
    const products = await this.productService.getProducts();
    return { products };
  }

  @Post()
  @ApiCreatedResponse({ type: ProductResponse })
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  post(@Body() param: ProductPostDto) {
    return this.productService.create(param);
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductResponse })
  async get(@Param('id') id: number) {
    return await this.productService.getProduct(Number(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProductResponse })
  async patch(@Param('id') id: number, @Body() param: ProductPatchDto) {
    return await this.productService.update(id, param);
  }

  @ApiResponse({ status: 204, description: 'no content' })
  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(Number(id));
  }
}

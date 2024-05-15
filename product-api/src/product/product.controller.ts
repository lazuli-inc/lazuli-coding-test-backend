import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Query,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProduces,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductPutDto, ProductPostDto } from './product.dto';
import { ProductResponse, ProductListResponse } from './product.schema';

@ApiTags('Product')
@ApiProduces('application/json; charset=utf-8')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOkResponse({ type: ProductListResponse })
  @ApiQuery({ name: 'token', required: false, type: Number })
  async list(@Query('limit') limit: number, @Query('token') token?: number) {
    const res = await this.productService.getProducts(
      Number(limit),
      token == null ? null : Number(token),
    );
    return {
      total: res.count,
      nextToken: res.nextToken,
      limit: res.limit,
      data: res.data,
    };
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

  @Put(':id')
  @ApiOkResponse({ type: ProductResponse })
  @UsePipes(ValidationPipe)
  async put(@Param('id') id: number, @Body() param: ProductPutDto) {
    return await this.productService.update(id, param);
  }

  @ApiResponse({ status: 204, description: 'no content' })
  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(Number(id));
  }
}

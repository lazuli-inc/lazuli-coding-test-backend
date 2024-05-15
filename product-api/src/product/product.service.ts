import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
  async getProduct(id: number): Promise<ProductEntity> {
    return await this.productRepository.findOne({ where: { id } });
  }

  getHello(): string {
    return 'Hello World!';
  }
}

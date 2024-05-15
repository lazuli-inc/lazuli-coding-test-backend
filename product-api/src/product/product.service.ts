import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
  async getProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getProduct(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    return await this.productRepository.save(product);
  }

  async update(id: number, param: ProductEntity): Promise<ProductEntity> {
    const target = await this.productRepository.findOne({ where: { id } });
    if (target == null) {
      throw new NotFoundException();
    }
    await this.productRepository.update(id, {
      title: param.title ?? target.title,
      description: param.description ?? target.description,
      status: param.status ?? target.status,
    });
    return await this.productRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException();
    }
    await this.productRepository.delete(id);
  }
}

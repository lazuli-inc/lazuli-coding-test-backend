import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LessThanOrEqual, Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
  async getProducts(
    limit: number,
    token?: number,
  ): Promise<{
    data: ProductEntity[];
    count: number;
    nextToken: number | null;
    limit: number;
  }> {
    console.table({ limit, token });
    let take = limit;
    if (limit >= 100) {
      console.log({ limit });
      take = 100;
    }
    let where = {};
    if (token != null) {
      where = { id: LessThanOrEqual(token) };
    }
    const [products, count] = await this.productRepository.findAndCount({
      where,
      take: take + 1,
      order: {
        createdAt: 'DESC',
      },
    });

    if (count === 0) {
      return {
        data: products,
        count,
        limit: take,
        nextToken: null,
      };
    }

    let data = products.slice(0, -1);
    let nextToken = products[products.length - 1].id;
    if (count <= take) {
      data = products;
      nextToken = null;
    }

    return {
      data,
      count,
      limit: take,
      nextToken: nextToken,
    };
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

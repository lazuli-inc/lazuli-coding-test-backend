import { ApiProperty } from '@nestjs/swagger';

export class ProductResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: string;
}

export class ProductListResponse {
  @ApiProperty({
    type: [ProductResponse],
  })
  products: ProductResponse;
}

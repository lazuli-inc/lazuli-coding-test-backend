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
  @ApiProperty()
  total: number;

  @ApiProperty()
  nextToken: number | null;

  @ApiProperty()
  limit: number;

  @ApiProperty({
    type: [ProductResponse],
  })
  data: ProductResponse;
}

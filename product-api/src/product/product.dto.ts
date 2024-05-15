import { IsIn, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const STATUS = ['DONE', 'PENDING', 'IN_PROGRESS'];

export class ProductPostDto {
  @IsString({ message: 'title should be string' })
  @ApiProperty()
  title: string;

  @IsString({ message: 'description should be string' })
  @ApiProperty()
  description: string;

  @IsIn(STATUS)
  @ApiProperty({ enum: STATUS })
  status: string;
}

export class ProductPutDto {
  @IsString({ message: 'title should be string' })
  @ApiProperty()
  title: string;

  @IsString({ message: 'description should be string' })
  @ApiProperty()
  description: string;

  @IsIn(STATUS, {
    message: 'status should be "DONE", "PENDING" or "IN_PROGRESS"',
  })
  @ApiProperty({ enum: STATUS })
  status: string;
}

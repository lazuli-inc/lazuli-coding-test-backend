import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Timestamp } from 'typeorm';

const STATUS = ['DONE', 'PENDING', 'IN_PROGRESS'];

export class ProductPostDto {
  @IsString({ message: 'title should be string' })
  @ApiProperty()
  title: string;

  @IsString({ message: 'description should be string' })
  @ApiProperty()
  description: string;

  @IsIn(STATUS)
  @ApiProperty({
    enum: STATUS,
  })
  status: string;
}

export class ProductPatchDto {
  @IsOptional()
  @IsString({ message: 'title should be string' })
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString({ message: 'description should be string' })
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsIn(STATUS)
  @ApiProperty({
    enum: STATUS,
  })
  status: string;
}

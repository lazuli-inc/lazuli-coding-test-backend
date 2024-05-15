import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Timestamp,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt?: Timestamp;

  constructor(title: string, description: string, status: string) {
    this.title = title;
    this.description = description;
    this.status = status;
  }
}

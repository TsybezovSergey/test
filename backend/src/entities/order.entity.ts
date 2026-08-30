import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryColumn()
  id: string;

  @Column()
  customerId: string;

  @Column()
  restaurantId: string;

  @Column({ type: 'jsonb' })
  items: Array<{ dishId: string; quantity: number }>;

  @Column({ type: 'int' })
  totalAmount: number;

  @Column({ type: 'int' })
  deliveryFee: number;

  @Column({ default: 'created' })
  status: string;

  @Column()
  deliveryAddress: string;

  @Column({ nullable: true })
  idempotencyKey: string;

  @CreateDateColumn()
  createdAt: Date;
}

import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('restaurants')
export class Restaurant {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  apiKey: string;

  @Column()
  baseUrl: string;

  @Column({ default: true })
  enabled: boolean;

  @Column({ type: 'int' })
  deliveryFee: number;

  @Column({ type: 'int' })
  avgDeliveryTime: number;
}

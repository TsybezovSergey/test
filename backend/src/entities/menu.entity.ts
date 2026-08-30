import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  parentId: string | null;
}

@Entity('dishes')
export class Dish {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  categoryId: string;

  @Column({ default: true })
  available: boolean;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}

@Entity('offers')
export class Offer {
  @PrimaryColumn()
  id: string;

  @Column()
  restaurantId: string;

  @Column()
  dishId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ default: true })
  available: boolean;
}

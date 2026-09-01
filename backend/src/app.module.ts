import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { InventoryModule } from './inventory/inventory.module';
import { OrderModule } from './order/order.module';
import { BalanceModule } from './balance/balance.module';
import { Customer } from './entities/customer.entity';
import { Restaurant } from './entities/restaurant.entity';
import { Category, Dish, Offer } from './entities/menu.entity';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 300, // 5 минут
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'food_delivery',
      entities: [Customer, Restaurant, Category, Dish, Offer, Order],
      synchronize: true, // Только для разработки!
    }),
    AuthModule,
    InventoryModule,
    OrderModule,
    BalanceModule,
  ],
})
export class AppModule {}

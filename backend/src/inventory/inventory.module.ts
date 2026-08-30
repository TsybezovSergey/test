import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { Restaurant } from '../entities/restaurant.entity';
import { Category, Dish, Offer } from '../entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Category, Dish, Offer])],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}

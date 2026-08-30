import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { Restaurant } from '../entities/restaurant.entity';
import { Offer } from '../entities/menu.entity';

/**
 * InventoryController — управление каталогом ресторанов и меню.
 *
 * Роль в бизнес-модели:
 * Агрегатор получает данные от ресторанов-партнёров и предоставляет
 * клиентам единый каталог блюд с актуальными ценами и наличием.
 *
 * Основные функции:
 * - Получение списка подключённых ресторанов
 * - Получение полного меню (категории, блюда, предложения)
 * - Синхронизация предложений (цен и наличия) от ресторанов
 *
 * Бизнес-процесс:
 * Рестораны периодически обновляют свои предложения (цены, наличие блюд)
 * через endpoint sync. Агрегатор сохраняет эти данные и предоставляет
 * клиентам актуальный каталог для формирования заказов.
 */
@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get('restaurants')
  @ApiOperation({ summary: 'Список ресторанов' })
  @ApiResponse({ status: 200, type: [Restaurant] })
  async getRestaurants(): Promise<Restaurant[]> {
    return this.inventoryService.getRestaurants();
  }

  @Get('menu')
  @ApiOperation({ summary: 'Получить полное меню' })
  async getFullMenu() {
    return this.inventoryService.getFullMenu();
  }

  // #Ошибка 7
  @Post('sync')
  @ApiOperation({ summary: 'Синхронизация предложений от ресторанов' })
  @ApiResponse({ status: 200 })
  async syncOffers(@Body() offers: Offer[]): Promise<void> {
    return this.inventoryService.syncOffers(offers);
  }
}

import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({ description: 'ID блюда', example: 'dish-whopper' })
  dishId: string;

  @ApiProperty({ description: 'Количество', example: 2 })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Список блюд для заказа', isArray: true, type: [OrderItemDto] })
  items: OrderItemDto[];

  @ApiProperty({ description: 'Адрес доставки', example: 'ул. Пушкина, д. 10, кв. 5' })
  deliveryAddress: string;
}

export class OrderModel {
  @ApiProperty() id: string;
  @ApiProperty() customerId: string;
  @ApiProperty() restaurantId: string;
  @ApiProperty({ type: [OrderItemDto] }) items: OrderItemDto[];
  @ApiProperty() totalAmount: number;
  @ApiProperty() deliveryFee: number;
  @ApiProperty() status: string;
  @ApiProperty() deliveryAddress: string;
  @ApiProperty() createdAt: string;
}

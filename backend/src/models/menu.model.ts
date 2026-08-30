import { ApiProperty } from '@nestjs/swagger';

export class CategoryModel {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ required: false }) parentId: string | null;
}

export class DishModel {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() categoryId: string;
  @ApiProperty() available: boolean;
}

export class OfferModel {
  @ApiProperty() id: string;
  @ApiProperty() restaurantId: string;
  @ApiProperty() dishId: string;
  @ApiProperty() price: number;
  @ApiProperty() stock: number;
  @ApiProperty() available: boolean;
}

export class MenuModel {
  @ApiProperty({ type: [CategoryModel] }) categories: CategoryModel[];
  @ApiProperty({ type: [DishModel] }) dishes: DishModel[];
  @ApiProperty({ type: [OfferModel] }) offers: OfferModel[];
}

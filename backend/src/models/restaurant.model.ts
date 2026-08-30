import { ApiProperty } from '@nestjs/swagger';

export class RestaurantModel {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() apiKey: string;
  @ApiProperty() baseUrl: string;
  @ApiProperty() enabled: boolean;
  @ApiProperty() deliveryFee: number;
  @ApiProperty() avgDeliveryTime: number;
}

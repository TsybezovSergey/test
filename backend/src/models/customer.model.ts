import { ApiProperty } from '@nestjs/swagger';

export class CustomerModel {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() apiKey: string;
  @ApiProperty() balance: number;
  @ApiProperty() phone: string;
  @ApiProperty() address: string;
  @ApiProperty() createdAt: string;
}

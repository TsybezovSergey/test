import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';

export class TopUpDto {
  @ApiProperty({ description: 'Сумма пополнения', example: 500 })
  @IsNumber()
  @Min(100)
  @Max(10000)
  amount: number;
}

export class BalanceModel {
  @ApiProperty() customerId: string;
  @ApiProperty() balance: number;
}

export class TopUpResponseModel {
  @ApiProperty() balanceBefore: number;
  @ApiProperty() amount: number;
  @ApiProperty() balanceAfter: number;
  @ApiProperty() status: string;
}

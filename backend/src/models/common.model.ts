import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseModel {
  @ApiProperty() customerId: string;
  @ApiProperty() name: string;
  @ApiProperty() balance: number;
}

export class ErrorResponseModel {
  @ApiProperty() statusCode: number;
  @ApiProperty() message: string;
  @ApiProperty() timestamp: string;
}

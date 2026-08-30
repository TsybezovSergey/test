import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class RegisterCustomerDto {
  @ApiProperty({ description: 'Имя клиента', example: 'Иван Петров' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Телефон', example: '+7-999-123-45-67' })
  phone: string;

  @ApiProperty({ description: 'Адрес доставки', example: 'ул. Пушкина, д. 10, кв. 5' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(200)
  address: string;
}

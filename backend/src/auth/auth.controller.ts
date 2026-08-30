import { Controller, Post, Body, Get, UseGuards, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponseModel, ErrorResponseModel } from '../models/common.model';
import { Customer } from '../entities/customer.entity';
import { RegisterCustomerDto } from '../models/register-customer.model';
import { ApiKeyGuard } from './api-key.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Авторизация по API-ключу' })
  @ApiResponse({ status: 200, type: AuthResponseModel })
  @ApiResponse({ status: 401, type: ErrorResponseModel })
  @ApiHeader({ name: 'x-api-key', required: true })
  async login(@Headers('x-api-key') apiKey: string): Promise<AuthResponseModel> {
    return this.authService.validateApiKey(apiKey);
  }

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового клиента' })
  @ApiResponse({ status: 201, type: Customer })
  async register(@Body() dto: RegisterCustomerDto): Promise<Customer> {
    return this.authService.registerCustomer(dto.name, dto.phone, dto.address);
  }

  @Get('profile')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Профиль текущего клиента' })
  @ApiResponse({ status: 200, type: AuthResponseModel })
  @ApiHeader({ name: 'x-api-key', required: true })
  async getProfile(@Headers('x-api-key') apiKey: string): Promise<AuthResponseModel> {
    return this.authService.validateApiKey(apiKey);
  }
}

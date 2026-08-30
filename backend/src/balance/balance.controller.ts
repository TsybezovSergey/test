import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { BalanceService } from './balance.service';
import { BalanceModel, TopUpDto, TopUpResponseModel } from '../models/balance.model';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { Customer } from '../entities/customer.entity';

@ApiTags('Balance')
@Controller('balance')
@UseGuards(ApiKeyGuard)
@ApiHeader({ name: 'x-api-key', required: true })
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @Get()
  @ApiOperation({ summary: 'Получить текущий баланс' })
  @ApiResponse({ status: 200, type: BalanceModel })
  async getBalance(@Req() req: any): Promise<BalanceModel> {
    const customer: Customer = req['customer'];
    return this.balanceService.getBalance(customer.id);
  }

  @Post('top-up')
  @ApiOperation({ summary: 'Пополнить баланс' })
  @ApiResponse({ status: 200, type: TopUpResponseModel })
  async topUp(@Req() req: any, @Body() dto: TopUpDto): Promise<TopUpResponseModel> {
    const customer: Customer = req['customer'];
    return this.balanceService.topUp(customer.id, dto.amount);
  }
}

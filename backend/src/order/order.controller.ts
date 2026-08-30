/** @format */

import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Headers,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "../models/order.model";
import { ApiKeyGuard } from "../auth/api-key.guard";
import { Customer } from "../entities/customer.entity";
import { Order } from "../entities/order.entity";

@ApiTags("Orders")
@Controller("orders")
@UseGuards(ApiKeyGuard)
@ApiHeader({ name: "x-api-key", required: true })
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: "Создать заказ на доставку" })
  @ApiResponse({ status: 201, type: Order })
  // #Ошибка 18
  async createOrder(
    @Req() req: any,
    @Body() dto: CreateOrderDto,
    @Headers("Idempotency-Key") idempotencyKey?: string,
  ): Promise<Order> {
    const customer: Customer = req["customer"];
    return this.orderService.createOrder(customer, dto, idempotencyKey);
  }

  @Get()
  @ApiOperation({ summary: "Список заказов текущего клиента" })
  @ApiResponse({ status: 200, type: [Order] })
  async getMyOrders(@Req() req: any): Promise<Order[]> {
    const customer: Customer = req["customer"];
    return this.orderService.getCustomerOrders(customer.id);
  }

  @Get(":id")
  @ApiOperation({ summary: "Получить заказ по ID" })
  @ApiResponse({ status: 200, type: Order })
  async getOrderById(@Req() req: any): Promise<Order[]> {
    const customer: Customer = req["customer"];
    return this.orderService.getCustomerOrders(customer.id);
  }
}

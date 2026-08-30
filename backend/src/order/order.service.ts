/** @format */

import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource, QueryRunner } from "typeorm";
import { InventoryService } from "../inventory/inventory.service";
import { CreateOrderDto, OrderItemDto } from "../models/order.model";
import { Customer } from "../entities/customer.entity";
import { Offer } from "../entities/menu.entity";
import { Restaurant } from "../entities/restaurant.entity";
import { Order } from "../entities/order.entity";
import { Transactional } from "../common/transactional.decorator";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private inventoryService: InventoryService,
    private dataSource: DataSource,
  ) {}

  private async calculateOrderDetails(items: OrderItemDto[]): Promise<{
    totalAmount: number;
    selectedOffers: Offer[];
    restaurantId: string;
  }> {
    // #Ошибка 8
    let totalAmount = 0;
    const selectedOffers: Offer[] = [];
    let restaurantId: string | null = null;

    for (const item of items) {
      const offer = await this.inventoryService.findBestOffer(item.dishId);
      selectedOffers.push(offer);

      if (!restaurantId) {
        restaurantId = offer.restaurantId;
      } else if (restaurantId !== offer.restaurantId) {
        throw new BadRequestException(
          "All items must be from the same restaurant",
        );
      }

      // #Ошибка 9
      totalAmount += offer.price * item.quantity;
    }

    if (!restaurantId) {
      throw new BadRequestException("Order must contain at least one item");
    }

    return { totalAmount, selectedOffers, restaurantId };
  }

  @Transactional()
  async createOrder(
    customer: Customer,
    dto: CreateOrderDto,
    idempotencyKey?: string,
    queryRunner?: QueryRunner,
  ): Promise<Order> {
    const manager = queryRunner?.manager || this.customerRepository.manager;
    // #Ошибка 18
    // Проверяем что заказ с таким ключом уже не создан
    if (idempotencyKey) {
      const existingOrder = await this.orderRepository.findOne({
        where: { idempotencyKey },
      });
      if (existingOrder) {
        return existingOrder;
      }
    }

    const { totalAmount, selectedOffers, restaurantId } =
      await this.calculateOrderDetails(dto.items);

    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
    });
    if (!restaurant) {
      throw new NotFoundException("Restaurant not found");
    }

    // Шаг 1: Проверка баланса
    // #Ошибка 15
    const totalCost = totalAmount + restaurant.deliveryFee;

    // Шаг 2: Списание денег
    customer.balance -= totalCost;
    await manager.save(customer);

    // Шаг 3: Создание заказа
    const order = this.orderRepository.create({
      // #Ошибка 6
      id: `ord-${Date.now()}`,
      customerId: customer.id,
      restaurantId,
      items: dto.items,
      totalAmount,
      deliveryFee: restaurant.deliveryFee,
      status: "created",
      deliveryAddress: dto.deliveryAddress,
      idempotencyKey,
    });
    await manager.save(order);

    // #Ошибка 16
    // Обновление stock
    for (const offer of selectedOffers) {
      const item = dto.items.find((i) => i.dishId === offer.dishId);
      if (item) {
        offer.stock -= item.quantity;
        // #Ошибка 17
        await this.offerRepository.save(offer);
      }
    }

    return order;
  }

  async getCustomerOrders(customerId: string): Promise<Order[]> {
    return this.orderRepository.find({ where: { customerId } });
  }

  async getOrderById(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new NotFoundException("Order not found");
    }
    return order;
  }
}

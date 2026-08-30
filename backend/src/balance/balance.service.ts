import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { BalanceModel, TopUpResponseModel } from '../models/balance.model';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async getBalance(customerId: string): Promise<BalanceModel> {
    const customer = await this.customerRepository.findOne({ where: { id: customerId } });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return { customerId: customer.id, balance: customer.balance };
  }

  async topUp(customerId: string, amount: number): Promise<TopUpResponseModel> {
    const customer = await this.customerRepository.findOne({ where: { id: customerId } });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const balanceBefore = customer.balance;
    customer.balance += amount;
    await this.customerRepository.save(customer);

    return {
      balanceBefore,
      amount,
      balanceAfter: customer.balance,
      status: 'success',
    };
  }
}

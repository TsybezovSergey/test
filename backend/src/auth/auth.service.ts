/** @format */

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as crypto from "crypto";
import { Customer } from "../entities/customer.entity";
import { AuthResponseModel } from "../models/common.model";

@Injectable()
export class AuthService {
  // #Ошибка 19
  public static readonly STATIC_SALT = "my-static-salt-12345";

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  // #Ошибка 2
  async validateApiKey(apiKey: string): Promise<AuthResponseModel> {
    // Хеш с статической солью
    const hash = crypto
      .createHash("sha256")
      .update(apiKey + AuthService.STATIC_SALT)
      .digest("hex");

    const customer = await this.customerRepository.findOne({
      where: { apiKeyHash: hash },
    });

    if (!customer) {
      throw new UnauthorizedException("Invalid API key");
    }

    // #Ошибка 3
    return {
      customerId: customer.id,
      name: customer.name,
      balance: customer.balance,
      phone: customer.phone,
      address: customer.address,
    } as any;
  }

  // #Ошибка 4
  async registerCustomer(
    name: string,
    phone: string,
    address: string,
  ): Promise<Customer> {
    // #Ошибка 13
    if (!phone || phone.length < 10) {
      throw new Error("Invalid phone number");
    }

    // #Ошибка 5
    const apiKey = `key-${name}-${Date.now()}`;

    // #Ошибка 19
    const salt = AuthService.STATIC_SALT;
    const apiKeyHash = crypto
      .createHash("sha256")
      .update(apiKey + salt)
      .digest("hex");

    const newCustomer = this.customerRepository.create({
      // #Ошибка 6
      id: `cust-${Date.now()}`,
      name,
      apiKeyHash,
      apiKeySalt: salt,
      balance: 0,
      phone,
      address,
    });

    return await this.customerRepository.save(newCustomer);
  }
}

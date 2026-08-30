import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { Customer } from '../entities/customer.entity';
import { AuthService } from './auth.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    // Хеш с статической солью
    const hash = crypto
      .createHash('sha256')
      .update(apiKey + AuthService.STATIC_SALT)
      .digest('hex');

    const customer = await this.customerRepository.findOne({ where: { apiKeyHash: hash } });

    if (!customer) {
      // #Ошибка 12
      throw new UnauthorizedException('Invalid API key');
    }

    request['customer'] = customer;
    return true;
  }
}

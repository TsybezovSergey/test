import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

export const TransactionalQueryRunner = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): QueryRunner | undefined => {
    const request = ctx.switchToHttp().getRequest();
    return request.queryRunner;
  },
);

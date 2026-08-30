/** @format */

import { DataSource } from "typeorm";

export function Transactional(): MethodDecorator {
  return function (
    _target: any,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // Ищем DataSource в контексте сервиса
      const dataSource: DataSource = this.dataSource || this.connection;

      if (!dataSource) {
        throw new Error(
          "DataSource not found. Make sure the service has dataSource injected.",
        );
      }

      const queryRunner = dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        // Передаём queryRunner как последний аргумент
        const result = await originalMethod.apply(this, [...args, queryRunner]);
        await queryRunner.commitTransaction();
        return result;
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      } finally {
        await queryRunner.release();
      }
    };

    return descriptor;
  };
}

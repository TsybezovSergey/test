import { Cache } from 'cache-manager';

type CacheKeyResolver = (...args: any[]) => string;

export function Cacheable(key: string | CacheKeyResolver): MethodDecorator {
  return function (
    _target: any,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheManager = (this as any).cacheManager as Cache;
      if (!cacheManager) {
        throw new Error('cacheManager not found. Inject CACHE_MANAGER into the service.');
      }

      const cacheKey = typeof key === 'function' ? key(...args) : key;
      const cached = await cacheManager.get(cacheKey);
      if (cached) return cached;

      const result = await originalMethod.apply(this, args);
      await cacheManager.set(cacheKey, result);
      return result;
    };

    return descriptor;
  };
}

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  public async get<T>(key: string): Promise<T | undefined> {
    return await this.cache.get<T>(key);
  }

  public async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.cache.set(key, value, { ttl } as any);
  }

  public async del(key: string): Promise<void> {
    await this.cache.del(key);
  }

  public async reset(): Promise<void> {
    await this.cache.reset();
  }

  public async onModuleDestroy() {
    const redisClient = (this.cache.store as any).getClient();
    redisClient.quit();
  }
}

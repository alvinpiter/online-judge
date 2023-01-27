import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { hasValue } from 'src/lib/hasValue';

const DEFAULT_CACHE_TTL_IN_SECONDS = 60;

@Injectable()
export class CacheService {
  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  async getFromCacheOrSource<Data>(
    key: string,
    query: () => Promise<Data>,
    ttl = DEFAULT_CACHE_TTL_IN_SECONDS,
  ): Promise<Data> {
    const fromCache = await this.redisClient.get(key);
    if (!hasValue(fromCache)) {
      const data = await query();
      await this.redisClient.set(key, JSON.stringify(data), 'EX', ttl);

      return data;
    } else {
      return JSON.parse(fromCache) as Data;
    }
  }
}

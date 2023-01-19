import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { hasValue } from 'src/lib/hasValue';

const DEFAULT_CACHE_TTL_IN_SECONDS = 60;

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getFromCacheOrSource<Data>(
    key: string,
    query: () => Promise<Data>,
    ttl = DEFAULT_CACHE_TTL_IN_SECONDS,
  ): Promise<Data> {
    const fromCache = await this.cacheManager.get<string>(key);
    if (!hasValue(fromCache)) {
      const data = await query();
      await this.cacheManager.set(key, JSON.stringify(data), { ttl });

      return data;
    } else {
      return JSON.parse(fromCache) as Data;
    }
  }
}

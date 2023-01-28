import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { SortedSetService } from 'src/modules/cache/sorted-set.service';

const GLOBAL_SCOREBOARD_SORTED_SET_KEY = 'GlobalScoreboard';

@Injectable()
export class GlobalScoreboardSortedSetService extends SortedSetService {
  constructor(@InjectRedis() redisClient: Redis) {
    super(redisClient, GLOBAL_SCOREBOARD_SORTED_SET_KEY);
  }
}

import { Module } from '@nestjs/common';
import { PaginationModule } from '../pagination/pagination.module';
import { UsersModule } from '../users/users.module';
import { UserSearchScoreCalculationEventsController } from './controllers/user-search-score-calculation-events.controller';
import { UserSearchController } from './controllers/user-search.controller';
import { UserSearchScoreCalculationQueue } from './queues/user-search-score-calculation.queue';
import { UserRegisteredEventSubscriber } from './services/user-registered-event.subscriber';
import { UserSearchEntityIdentityIdentifierMapper } from './services/user-search-service/user-search-entity-identifier-mapper';
import { UserSearchEntityScoreCalculator } from './services/user-search-service/user-search-entity-score-calculator';
import { UserSearchService } from './services/user-search-service/user-search.service';
import { JobModule } from '../job/job.module';

@Module({
  imports: [UsersModule, PaginationModule, JobModule],
  providers: [
    UserSearchService,
    UserSearchEntityIdentityIdentifierMapper,
    UserSearchEntityScoreCalculator,
    UserRegisteredEventSubscriber,
    UserSearchScoreCalculationQueue,
  ],
  controllers: [
    UserSearchController,
    UserSearchScoreCalculationEventsController,
  ],
})
export class SearchModule {}

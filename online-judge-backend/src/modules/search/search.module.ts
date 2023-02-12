import { Module } from '@nestjs/common';
import { PaginationModule } from '../pagination/pagination.module';
import { UsersModule } from '../users/users.module';
import { UserSearchController } from './controllers/user-search.controller';
import { UserSearchEntityIdentityIdentifierMapper } from './services/user-search-service/user-search-entity-identifier-mapper';
import { UserSearchEntityScoreCalculator } from './services/user-search-service/user-search-entity-score-calculator';
import { UserSearchService } from './services/user-search-service/user-search.service';

@Module({
  imports: [UsersModule, PaginationModule],
  providers: [
    UserSearchService,
    UserSearchEntityIdentityIdentifierMapper,
    UserSearchEntityScoreCalculator,
  ],
  controllers: [UserSearchController],
})
export class SearchModule {}

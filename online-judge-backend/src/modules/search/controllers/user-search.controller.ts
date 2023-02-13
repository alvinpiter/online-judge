import { Controller, Get, Query } from '@nestjs/common';
import { UserFormatter } from 'src/modules/users/formatters/user.formatter';
import { UserSearchService } from '../services/user-search-service/user-search.service';

@Controller('api')
export class UserSearchController {
  constructor(
    private readonly userSearchService: UserSearchService,
    private readonly userFormatter: UserFormatter,
  ) {}

  @Get('user-search-suggestions')
  async getUserSearchSuggestions(
    @Query() userSearchQueryParameters: { query: string },
  ) {
    const users = await this.userSearchService.getSuggestions(
      userSearchQueryParameters.query,
    );
    return users.map((user) => this.userFormatter.format(user));
  }
}

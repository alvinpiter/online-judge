import { Controller, Get, Query } from '@nestjs/common';
import { UserFormatter } from 'src/modules/users/formatters/user.formatter';
import { UsersService } from 'src/modules/users/users.service';
import { UserSearchService } from '../services/user-search-service/user-search.service';

@Controller('api')
export class UserSearchController {
  constructor(
    private readonly userSearchService: UserSearchService,
    private readonly usersService: UsersService,
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

  @Get('upsert-search-suggestions')
  async upsertSearchSuggestions() {
    const users = await this.usersService.getAllUsers();
    await Promise.all(
      users.map((user) => this.userSearchService.upsertSuggestion(user.id)),
    );

    return 'ok';
  }
}

import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../authentication/guards/jwt.guard';
import { UserFormatter } from './formatters/user.formatter';
import { User } from './user.entity';

@Controller('api')
export class UsersController {
  constructor(private readonly userFormatter: UserFormatter) {}

  @UseGuards(JwtGuard)
  @Get('current-user')
  async currentUser(@Request() request) {
    const user: User = request.user;
    return this.userFormatter.format(user);
  }
}
